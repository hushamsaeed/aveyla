---
description: Write a plan before starting work. Archives the previous plan, delegates to planner agent, waits for confirmation.
argument-hint: [task description]
---

Task: $ARGUMENTS

1. Archive current todo if it has content: `cp tasks/todo.md "tasks/archive/todo-$(date +%Y-%m-%d-%H%M).md" 2>/dev/null || true`

2. Delegate to the `planner` agent to produce the plan in `tasks/todo.md`.

3. Present the plan. Ask: "Shall I proceed?"

4. Do NOT write any code until confirmed.
