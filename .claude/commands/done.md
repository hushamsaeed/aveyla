---
description: Verify a task is complete before marking it done. Includes review, elegance check for significant changes, tests, and lesson capture.
---

1. Delegate to the `reviewer` agent — fix any Critical findings before continuing.

2. Check change size: `git diff HEAD --stat`
   If more than 3 files changed or more than 50 lines added, pause and ask:
   "Is there a simpler approach? Would removing anything make this clearer?"
   If yes to either — address it before continuing. If no — proceed.

3. Run the test suite (command from CLAUDE.md). Show full output. All tests must pass.

4. In `tasks/todo.md`: mark completed items ✅, add a ## Review section with what was done and any tradeoffs.

5. Did anything go wrong during this task? If yes, append to `tasks/lessons.md` AND add the rule to `## Learned Rules` in CLAUDE.md immediately.
