---
description: Launch autonomous execution. Creates a dedicated tmux window for the orchestrator loop.
---

Pre-flight — stop on any failure:

1. Verify spec is complete:
   ```bash
   grep -c '{{PROJECT_NAME}}' tasks/SPEC.md 2>/dev/null || echo 0
   python3 -c "import json; d=json.load(open('tasks/status.json')); print('OK' if d['total_phases']>0 else 'FAIL')"
   grep -c 'Status.*TODO' tasks/phases.md 2>/dev/null || echo 0
   ```
   If any show 0 or FAIL: tell the user what's missing. Stop.

2. Clean stale files and set status:
   ```bash
   rm -f tasks/PAUSE tasks/STOP tasks/SKIP_PHASE tasks/BLOCKED tasks/DONE tasks/phase-*.done tasks/phase-*.blocked
   python3 -c "import json; d=json.load(open('tasks/status.json')); d['status']='ready'; open('tasks/status.json','w').write(json.dumps(d,indent=2))"
   chmod +x scripts/orchestrator.sh
   git add -A && git commit -m "chore: spec locked, starting autopilot" --allow-empty 2>/dev/null || true
   ```

3. Launch in a named tmux window (survives closing this pane — it's tmux-attached, not process-attached):
   ```bash
   if [ -n "${TMUX:-}" ]; then
     tmux new-window -n "autopilot" "bash scripts/orchestrator.sh; echo '--- finished ---'; read"
     echo "Orchestrator running in tmux window 'autopilot'"
   else
     echo "Not in tmux — launching with nohup instead"
     nohup bash scripts/orchestrator.sh > tasks/autopilot.log 2>&1 &
     echo "PID: $!"
     disown $!
   fi
   ```

4. Print:
   ```
   ✅ Autopilot running in tmux window 'autopilot'.

   Switch to it:   Ctrl-b then 'autopilot' window (or: tmux select-window -t autopilot)
   Watch log:      Right pane (if you ran /tmux-setup) or: tail -f tasks/autopilot.log
   Pause:          touch tasks/PAUSE
   Skip phase:     touch tasks/SKIP_PHASE
   Stop:           touch tasks/STOP
   Status here:    /autopilot-status
   ```
