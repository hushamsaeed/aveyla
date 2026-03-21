# Claude Code Starter Kit

A complete Claude Code workspace with two modes: **Manual** for iterative feature work, and **Autopilot** for building entire projects unattended.

---

## Which mode should I use?

| Situation | Mode |
|---|---|
| Building a new project from scratch | **Autopilot** |
| Adding a feature to an existing project | **Manual** |
| Fixing a bug | **Manual** (`/bug`) |
| I want full control and visibility | **Manual** |
| I want to walk away and come back to a result | **Autopilot** |

Both modes use the same CLAUDE.md, lessons.md, and git checkpoint system.

### Autopilot works best when:
- Requirements are clear and stable upfront
- Success criteria can be expressed as runnable commands (`npm test`, `curl`, etc.)
- Phases are independent — later phases don't radically reshape earlier ones
- The project is greenfield (no existing codebase to navigate)

### Autopilot struggles with:
- Heavy UI/UX iteration (needs a human eye)
- Unclear or rapidly-changing requirements
- Projects requiring live external feedback during build (OAuth flows, payment webhooks)
- Highly exploratory work where the right architecture isn't known yet

---

## Quick Start (tmux)

```bash
# 1. Extract and rename
unzip claude-code-starter.zip
mv claude-starter-v2 my-project-name
cd my-project-name

# 2. Start a tmux session (if you don't have one)
tmux new -s dev

# 3. Open Claude Code
claude

# 4. First-time setup
/init my-project-name

# 5. Set up the recommended split-pane layout
/tmux-setup
```

---

## Manual Mode

For day-to-day iterative work where you stay in the loop.

| Command | What it does |
|---|---|
| `/session-start` | Orient Claude: re-reads context, lessons, current task |
| `/plan [task]` | Write a checkable plan to tasks/todo.md before any code |
| `/checkpoint [label]` | Git snapshot before risky changes |
| `/done` | Review + verify + update task log |
| `/bug [error]` | Autonomous bug fix — root cause, fix, verify |
| `/review` | Senior code review: Critical / Important / Minor |
| `/elegant` | Challenge current implementation for a cleaner solution |
| `/research [topic]` | Subagent research — keeps main context clean |
| `/compact-lessons` | Distill lessons.md into permanent CLAUDE.md rules |

**Manual workflow:**
```
/session-start → /plan [task] → [confirm] → [implement] → /done
```

---

## Autopilot Mode

For building entire projects with minimal babysitting.

```
# Step 1 — intake interview (5-10 mins, interactive)
/autopilot

# Claude asks about your project, proposes a phase breakdown,
# then writes tasks/SPEC.md and tasks/phases.md

# Step 2 — review the spec
# Open tasks/SPEC.md and tasks/phases.md — make sure they're right

# Step 3 — launch and walk away
# (creates a new tmux window named 'autopilot' automatically)
/autopilot-run
```

**Monitor progress:**
```bash
# Switch to the autopilot tmux window
Ctrl-b, then click/select the 'autopilot' window

# Or watch the log from your Claude pane
tail -f tasks/autopilot.log
```
Or from Claude Code: `/autopilot-status`

The tmux window title updates live: `autopilot: phase 2/5` → `autopilot: phase 2 done ✅` → `autopilot: 🎉 done`

**Control the loop:**
```bash
touch tasks/PAUSE        # pause after current phase
touch tasks/SKIP_PHASE   # skip current phase, advance to next
touch tasks/STOP         # stop cleanly after current phase
rm tasks/PAUSE           # resume
```
Or switch to the autopilot tmux window and Ctrl+C to kill immediately.
From Claude Code: `/autopilot-resume`, `/abort-autopilot`

**How it works internally:**
```
orchestrator.sh (shell loop — survives closing Claude Code)
  └─ finds next TODO phase in tasks/phases.md
  └─ calls claude -p headless → orchestrator agent (Opus)
       ├─ delegates to: implementer agent (Sonnet) → writes code
       └─ delegates to: verifier agent (Sonnet) → runs actual tests
  ├─ PHASE_COMPLETE → git checkpoint, advance phase, loop
  ├─ PHASE_BLOCKED → exponential retry (3x), then pause for you
  └─ ALL DONE → commit, notify, exit
```

---

## Self-Improvement Loop

Claude accumulates lessons as you work:

1. You correct Claude → Claude appends to `tasks/lessons.md` immediately
2. Next `/session-start` → Claude re-reads all lessons (non-negotiable rules)
3. After 8+ entries → `/compact-lessons` distills them into permanent `CLAUDE.md` rules
4. `tasks/lessons.md` resets; rules stay in CLAUDE.md forever

Over time, the rule set compounds — Claude makes fewer of the same mistakes.

---

## File Structure

```
.claude/
  commands/          Slash commands (10 total)
  agents/            Subagent definitions (5 total: planner, reviewer,
  │                  orchestrator, implementer, verifier)
  skills/
    deep-research/   Forked Explore agent for codebase research
  settings.json      Permissions, deny list, quality hooks

scripts/
  orchestrator.sh    The autonomous execution loop

tasks/
  todo.md            Manual task log (used by /plan and /done)
  lessons.md         Self-improvement log (distill with /compact-lessons)
  SPEC.md            Autopilot project spec (written by /autopilot)
  phases.md          Autopilot phase plan with live status
  status.json        Machine-readable autopilot state
  decisions.md       Autonomous decisions logged during execution
  autopilot.log      Full execution log
  archive/           Archived plans, lessons snapshots
  examples/          Example SPEC.md and phases.md for reference

CLAUDE.md            Project context — fill this in with /init
.gitignore           Covers Node, Python, Rust, Go, IDE files
```

---

## Customising

- **Add a command**: `.md` file in `.claude/commands/`
- **Add an agent**: `.md` file in `.claude/agents/`
- **Adjust permissions**: edit `.claude/settings.json`
- **Add quality hooks**: extend the `hooks` section in `settings.json`
- **Keep CLAUDE.md under 150 lines** — instruction-following degrades beyond that
- **See examples**: `tasks/examples/` has a fully-filled SPEC.md and phases.md for a simple todo API
