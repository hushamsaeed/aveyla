---
description: Show current autopilot execution status.
---

1. Read `tasks/status.json` — show phase, total phases, status, error count, last updated.

2. Read `tasks/phases.md` — list phases with their current status (DONE/IN_PROGRESS/TODO/BLOCKED).

3. If `waiting_for_input`: read `tasks/phase-[N].blocked` and show the failure reason.

4. Show last 15 lines of `tasks/autopilot.log` if it exists.
