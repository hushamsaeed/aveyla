---
description: Fix a bug. Root cause → minimal fix → verify → done.
argument-hint: [error, stack trace, or description]
---

Bug: $ARGUMENTS

1. Checkpoint: `git add -A && git commit -m "checkpoint: before fix" 2>/dev/null || true`

2. Find the root cause — not just the symptom. Check logs, failing tests, stack trace.

3. Apply the minimal fix. Do not touch surrounding code.

4. Run tests. Show full output. All must pass.

5. If this mistake pattern is repeatable: append to `tasks/lessons.md` AND add the rule to `## Learned Rules` in CLAUDE.md right now.
