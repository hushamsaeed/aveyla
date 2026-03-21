---
description: Set up the recommended tmux layout for this project — Claude Code pane plus autopilot monitor pane.
---

Set up the tmux workspace:

1. Check we're inside tmux: `echo ${TMUX:-not_in_tmux}`
   If `not_in_tmux`: "You're not in a tmux session. Start one with: `tmux new -s dev`" — stop.

2. Create the project window layout:
   ```bash
   # Rename current window to 'claude'
   tmux rename-window claude

   # Split horizontally: right pane shows live autopilot log
   tmux split-window -h -l 40% "tail -f tasks/autopilot.log 2>/dev/null || echo 'No log yet — start /autopilot-run'; exec bash"

   # Focus left pane (Claude Code stays here)
   tmux select-pane -L
   ```

3. Confirm: "Layout ready. Left pane: Claude Code. Right pane: live log.
   When you run /autopilot-run, the orchestrator opens in a new window named 'autopilot'."
