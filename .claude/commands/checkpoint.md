---
description: Create a git checkpoint commit before risky changes. Safe to run any time.
argument-hint: [optional label describing what comes next]
---

Create a safety checkpoint:

1. `git add -A`
2. `git commit -m "checkpoint: $ARGUMENTS" --allow-empty`
3. Show the commit hash.
4. Confirm: "Checkpoint saved at [hash]. Run `git reset --hard [hash]` to return here."

If no git repo exists: `git init && git add -A && git commit -m "checkpoint: initial"`
