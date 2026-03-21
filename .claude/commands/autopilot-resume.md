---
description: Resume autonomous execution after a pause, blockage, or system restart.
---

1. Read `tasks/status.json`. Check if the orchestrator window is alive:
   ```bash
   [ -n "${TMUX:-}" ] && tmux list-windows 2>/dev/null | grep autopilot || echo "no tmux window"
   ```

2. **If paused AND window exists:** `rm -f tasks/PAUSE` — it resumes within 10s. Done.

3. **If blocked (`waiting_for_input`):**
   Read `tasks/phase-[N].blocked`. Translate the failure into plain language before asking for a decision:
   - `build_failed` → "Phase N couldn't be built. Reason: [reason]. Something is missing or contradictory in the spec or environment."
   - `verify_failed` → "Phase N was built but the acceptance test failed. The command [command] produced [output] instead of passing."
   - `needs_clarification` → "Phase N is waiting for a decision: [question]"
   - No file or unknown → "Phase N failed without writing a reason. Check tasks/autopilot-errors.log for raw output."

   Then ask:
   - (a) Retry as-is
   - (b) Skip this phase: `touch tasks/SKIP_PHASE`
   - (c) Fix it — guide the specific fix based on the failure type, then relaunch

4. **If window is gone (after reboot or /abort-autopilot):** Reset and relaunch:
   ```bash
   python3 -c "import json; d=json.load(open('tasks/status.json')); d['status']='ready'; d['error_count']=0; open('tasks/status.json','w').write(json.dumps(d,indent=2))"
   rm -f tasks/BLOCKED tasks/PAUSE tasks/STOP
   if [ -n "${TMUX:-}" ]; then
     tmux new-window -n "autopilot" "bash scripts/orchestrator.sh; echo '--- finished ---'; read"
   else
     nohup bash scripts/orchestrator.sh >> tasks/autopilot.log 2>&1 & echo "PID: $!"; disown $!
   fi
   ```

5. Confirm relaunch and current phase.
