---
description: Orient to the current project state. Synthesizes a handoff summary, not just a list of files read.
---

1. If `tasks/status.json` exists, read it. Surface any active autopilot state:
   - `running` / `paused` / `budget_paused` → show phase, suggest /autopilot-status
   - `waiting_for_input` → "⚠️ Autopilot blocked on phase [N] — run /autopilot-resume"
   - `complete` → "✅ Project complete"

2. Read `tasks/todo.md`. Read the last few lines of `tasks/autopilot.log` if it exists.

3. Synthesize a single paragraph handoff note — not a description of what you read, but a direct statement of where work stands:
   "We're building [project]. Last session we [completed X / were partway through Y]. The immediate next step is [Z]. [Any blockers or open questions]."

4. Ask: "What are we working on today?"
