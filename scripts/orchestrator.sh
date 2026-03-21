#!/usr/bin/env bash
# orchestrator.sh — Autonomous project execution loop
#
# Run via: /autopilot-run  (creates tmux window automatically)
# Manual:  tmux new-window -n autopilot 'bash scripts/orchestrator.sh'
#
# Control files:
#   touch tasks/PAUSE       — pause after current phase
#   touch tasks/STOP        — stop after current phase
#   touch tasks/SKIP_PHASE  — skip current phase
#
# Phase signals (written by worker agent):
#   tasks/phase-N.done     — success
#   tasks/phase-N.blocked  — failure with reason
#
# Requires: claude CLI v2.1+ and python3

# Intentionally NOT using set -e: we handle errors explicitly.
# Using set -u to catch unbound variables, set -o pipefail for pipes.
set -uo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$(cd "$SCRIPT_DIR/.." && pwd)"

# ── config ────────────────────────────────────────────────────────────────────
MAX_RETRIES=3
MAX_TURNS=30
MAX_TOTAL_TURNS=300
RATE_LIMIT_SLEEP=65
PAUSE_POLL=10
RETRY_BACKOFF_1=10   # seconds before attempt 2
RETRY_BACKOFF_2=30   # seconds before attempt 3

STATUS_FILE="tasks/status.json"
PHASES_FILE="tasks/phases.md"
LOCKFILE="tasks/.autopilot.lock"

START_TIME=$(date +%s)
TOTAL_TURNS=0

# ── lockfile — prevent concurrent runs ───────────────────────────────────────
if [ -f "$LOCKFILE" ]; then
  LOCK_PID=$(cat "$LOCKFILE" 2>/dev/null || echo "unknown")
  echo "❌ Another orchestrator is running (PID $LOCK_PID). Remove $LOCKFILE if stale."
  exit 1
fi
echo $$ > "$LOCKFILE"
trap 'rm -f "$LOCKFILE"' EXIT

# ── helpers ───────────────────────────────────────────────────────────────────
log()    { echo "[$(date '+%H:%M:%S')] $*"; }
banner() { echo; echo "━━━ $* ━━━"; }
mins()   { echo "$(( ($(date +%s) - START_TIME) / 60 ))m"; }

tmux_status() {
  [ -n "${TMUX:-}" ] && tmux rename-window "autopilot: $1" 2>/dev/null || true
}

notify() {
  echo "$1" > tasks/NOTIFICATION
  [ -n "${TMUX:-}" ] && tmux display-message "Autopilot: $1" 2>/dev/null || true
  command -v osascript   &>/dev/null && osascript   -e "display notification \"$1\" with title \"Autopilot\"" 2>/dev/null || true
  command -v notify-send &>/dev/null && notify-send "Autopilot" "$1" 2>/dev/null || true
}

json_get() {
  # Pass key as argument to python, not interpolated into code string
  python3 - "$STATUS_FILE" "$1" << 'PY'
import json, sys
d = json.load(open(sys.argv[1]))
print(d.get(sys.argv[2], ''))
PY
}

json_set() {
  python3 - "$STATUS_FILE" "$1" "$2" << 'PY'
import json, sys
from datetime import datetime
p, k, v = sys.argv[1:4]
d = json.load(open(p))
try:    d[k] = int(v)
except: d[k] = v.strip('"')
d['last_updated'] = datetime.now().strftime('%Y-%m-%d %H:%M')
open(p,'w').write(json.dumps(d, indent=2))
PY
}

# Update phases.md — bounded match that won't cross phase boundaries
update_phase_status() {
  python3 - "$PHASES_FILE" "$1" "$2" << 'PY'
import sys, re
path, num, status = sys.argv[1:4]
content = open(path).read()
# Match only within the target phase block (up to next ## or end of file)
pattern = (
  r'(## Phase ' + re.escape(num) +
  r'(?:(?!## Phase).)*?\*\*Status\*\*:\s*)([^\n]*)(\n)'
)
result = re.sub(pattern, r'\g<1>' + status + r'\3', content, count=1, flags=re.DOTALL)
open(path, 'w').write(result)
PY
}

update_phase_outputs() {
  python3 - "$PHASES_FILE" "$1" "$2" << 'PY'
import sys, re
path, num, outputs = sys.argv[1:4]
content = open(path).read()
pattern = (
  r'(## Phase ' + re.escape(num) +
  r'(?:(?!## Phase).)*?\*\*Outputs\*\*:)([^\n]*)(\n)'
)
result = re.sub(pattern, r'\g<1> ' + outputs + r'\3', content, count=1, flags=re.DOTALL)
open(path, 'w').write(result)
PY
}

mark_skipped() {
  update_phase_status "$1" "SKIPPED ⏭"
}

wait_if_paused() {
  while true; do
    if [ -f tasks/STOP ]; then
      log "🛑 Stopped."
      json_set status stopped
      tmux_status "stopped"
      exit 0
    fi
    [ ! -f tasks/PAUSE ] && break
    sleep "$PAUSE_POLL"
  done
  json_set status running
}

check_controls() {
  if [ -f tasks/STOP ]; then
    log "🛑 Stopped."
    json_set status stopped
    tmux_status "stopped"
    exit 0
  fi
  if [ -f tasks/PAUSE ]; then
    log "⏸  Paused — rm tasks/PAUSE to resume"
    json_set status paused
    tmux_status "⏸ paused"
    wait_if_paused
    log "▶  Resumed"
  fi
  if [ "$TOTAL_TURNS" -ge "$MAX_TOTAL_TURNS" ]; then
    log "💰 Turn budget ($MAX_TOTAL_TURNS) reached"
    notify "Turn budget reached — rm tasks/PAUSE to continue"
    json_set status budget_paused
    tmux_status "💰 budget paused"
    touch tasks/PAUSE
    wait_if_paused
  fi
}

run_phase() {
  local n="$1" attempt="$2"

  # Pass actual failure content on retry — don't just point to the file
  local retry_note=""
  if [ "$attempt" -gt 1 ]; then
    local blocked_file="tasks/phase-${n}.blocked"
    if [ -f "$blocked_file" ]; then
      retry_note="Attempt $attempt. Previous failure:
$(cat "$blocked_file")
Fix the specific issue above before proceeding."
    else
      retry_note="Attempt $attempt of $MAX_RETRIES."
    fi
  fi

  rm -f "tasks/phase-${n}.done" "tasks/phase-${n}.blocked"

  # Capture stderr to a per-run temp file — prevents cross-attempt contamination
  local stderr_file
  stderr_file=$(mktemp /tmp/autopilot-phase-${n}-attempt-${attempt}.XXXXXX)

  local out exit_code
  exit_code=0
  out=$(claude -p \
    "You are the worker agent. PHASE_NUM=$n. $retry_note
Execute phase $n per your agent instructions." \
    --allowedTools "Read,Write,Edit,MultiEdit,Glob,Grep,Bash(npm run *),Bash(npm install *),Bash(npx *),Bash(python *),Bash(python3 *),Bash(pip *),Bash(pip3 *),Bash(go run *),Bash(go build *),Bash(go test *),Bash(cargo *),Bash(make *),Bash(ls *),Bash(cat *),Bash(echo *),Bash(mkdir *),Bash(cp *),Bash(mv *),Bash(touch *),Bash(which *),Bash(node *),Bash(find *),Bash(grep *),TodoRead,TodoWrite" \
    --max-turns "$MAX_TURNS" \
    --output-format json \
    2>"$stderr_file") || exit_code=$?

  # Log actual errors if claude failed
  if [ "$exit_code" -ne 0 ]; then
    log "⚠️  claude -p exited $exit_code"
    cat "$stderr_file" >> tasks/autopilot-errors.log
  fi

  # Turn count tracking
  local turns=0
  if [ -n "$out" ]; then
    turns=$(echo "$out" | python3 -c \
      "import json,sys; print(json.load(sys.stdin).get('num_turns',0))" 2>/dev/null || echo 0)
  fi
  TOTAL_TURNS=$((TOTAL_TURNS + turns))
  log "Turns: +$turns (total $TOTAL_TURNS/$MAX_TOTAL_TURNS)"

  # Check THIS run's stderr for rate limiting — use a dedicated file descriptor
  local rate_limited=false
  if grep -qi "rate.limit\|429\|too many requests\|overloaded" "$stderr_file" 2>/dev/null; then
    rate_limited=true
  fi

  # Append to cumulative diagnostics log
  if [ -s "$stderr_file" ]; then
    { echo "--- phase $n attempt $attempt $(date) ---"; cat "$stderr_file"; } >> tasks/autopilot-errors.log
  fi
  rm -f "$stderr_file"

  # Return rate limit status via a file — not via stdout (which carries log output)
  if $rate_limited; then
    touch "tasks/phase-${n}.rate_limited"
  fi
}

# Log rotation — keep autopilot.log under 5MB
rotate_log() {
  local log="tasks/autopilot.log"
  if [ -f "$log" ] && [ "$(wc -c < "$log" 2>/dev/null || echo 0)" -gt 5242880 ]; then
    mv "$log" "tasks/archive/autopilot-$(date +%Y-%m-%d-%H%M).log"
    log "Log rotated"
  fi
}

# ── preflight ─────────────────────────────────────────────────────────────────
banner "Autopilot Preflight"

for f in tasks/SPEC.md tasks/phases.md "$STATUS_FILE"; do
  if [ ! -f "$f" ]; then
    log "❌ Missing $f — run /autopilot first"
    exit 1
  fi
done

if ! command -v claude &>/dev/null; then
  log "❌ claude CLI not found. Install: npm i -g @anthropic-ai/claude-code"
  exit 1
fi
if ! command -v python3 &>/dev/null; then
  log "❌ python3 required"
  exit 1
fi

if ! git rev-parse --git-dir &>/dev/null; then
  log "⚠️  No git repo — checkpoints disabled. Run: git init"
fi

TOTAL_PHASES=$(json_get total_phases)
if [ -z "$TOTAL_PHASES" ] || [ "$TOTAL_PHASES" -eq 0 ] 2>/dev/null; then
  log "❌ total_phases=0 — run /autopilot first"
  exit 1
fi

rm -f tasks/DONE tasks/NOTIFICATION
rotate_log
tmux_status "starting"
log "✅ Ready — $TOTAL_PHASES phases"
banner "Starting"

# ── main loop ─────────────────────────────────────────────────────────────────
while true; do
  check_controls

  PHASE=$(json_get current_phase)
  STATUS=$(json_get status)

  # Completion check
  if [ "$STATUS" = "complete" ] || \
     { [ -n "$PHASE" ] && [ -n "$TOTAL_PHASES" ] && \
       [ "$PHASE" -gt "$TOTAL_PHASES" ] 2>/dev/null; }; then
    banner "🎉 PROJECT COMPLETE — $(mins) | ~$TOTAL_TURNS turns"
    json_set status complete
    json_set notes "Completed in $(mins) using ~$TOTAL_TURNS turns"
    touch tasks/DONE
    tmux_status "🎉 done"
    notify "Project complete — $(mins) | ~$TOTAL_TURNS turns"
    git add -A && git commit -m "chore: project complete — $(mins), ~$TOTAL_TURNS turns" \
      --allow-empty 2>/dev/null || true
    exit 0
  fi

  banner "Phase $PHASE/$TOTAL_PHASES | $(mins)"
  tmux_status "phase $PHASE/$TOTAL_PHASES"
  T0=$(date +%s)

  if [ -f tasks/SKIP_PHASE ]; then
    log "⏭  Skipping phase $PHASE"
    rm -f tasks/SKIP_PHASE
    mark_skipped "$PHASE"
    json_set current_phase "$((PHASE + 1))"
    continue
  fi

  ATTEMPT=1
  DONE=false

  while [ "$ATTEMPT" -le "$MAX_RETRIES" ]; do
    check_controls
    json_set status running
    json_set error_count "$((ATTEMPT - 1))"

    log "Attempt $ATTEMPT/$MAX_RETRIES"
    rm -f "tasks/phase-${PHASE}.rate_limited"
    run_phase "$PHASE" "$ATTEMPT"

    # Rate limit check — via dedicated signal file, not stdout contamination
    if [ -f "tasks/phase-${PHASE}.rate_limited" ]; then
      rm -f "tasks/phase-${PHASE}.rate_limited"
      log "⏳ Rate limited — sleeping ${RATE_LIMIT_SLEEP}s"
      tmux_status "⏳ rate limited"
      sleep "$RATE_LIMIT_SLEEP"
      continue  # retry without incrementing ATTEMPT
    fi

    DONE_FILE="tasks/phase-${PHASE}.done"
    BLOCKED_FILE="tasks/phase-${PHASE}.blocked"

    if [ -f "$DONE_FILE" ]; then
      ELAPSED=$(( ($(date +%s) - T0) / 60 ))
      log "✅ Phase $PHASE done in ${ELAPSED}m"
      update_phase_status "$PHASE" "DONE ✅"
      OUTPUTS=$(sed -n '3p' "$DONE_FILE" 2>/dev/null || echo "")
      [ -n "$OUTPUTS" ] && update_phase_outputs "$PHASE" "$OUTPUTS"
      DONE=true
      json_set current_phase "$((PHASE + 1))"
      json_set status ready
      json_set error_count 0
      tmux_status "phase $PHASE ✅"
      git add -A && git commit -m "feat: phase $PHASE complete" --allow-empty 2>/dev/null || true
      break

    elif [ -f "$BLOCKED_FILE" ]; then
      log "❌ Phase $PHASE blocked (attempt $ATTEMPT)"
      tmux_status "phase $PHASE ❌ attempt $ATTEMPT"
      update_phase_status "$PHASE" "BLOCKED"
      ATTEMPT=$((ATTEMPT + 1))
      if [ "$ATTEMPT" -le "$MAX_RETRIES" ]; then
        if [ "$ATTEMPT" -eq 2 ]; then
          SLEEP="$RETRY_BACKOFF_1"
        else
          SLEEP="$RETRY_BACKOFF_2"
        fi
        log "Retry in ${SLEEP}s..."
        sleep "$SLEEP"
      fi

    else
      log "⚠️  No signal file written — treating as failure"
      ATTEMPT=$((ATTEMPT + 1))
      [ "$ATTEMPT" -le "$MAX_RETRIES" ] && sleep 10
    fi
  done

  if [ "$DONE" = false ]; then
    banner "🛑 Phase $PHASE blocked after $MAX_RETRIES attempts"
    if [ -f "tasks/phase-${PHASE}.blocked" ]; then
      log "Reason: $(cat "tasks/phase-${PHASE}.blocked")"
    fi
    log "Fix with /autopilot-resume in Claude Code"
    json_set status waiting_for_input
    tmux_status "🛑 blocked ph$PHASE"
    notify "Autopilot blocked on phase $PHASE — check Claude Code"
    exit 1
  fi

  rotate_log
  sleep 5
done
