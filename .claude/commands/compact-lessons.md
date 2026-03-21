---
description: Archive the lessons log once rules have been promoted to CLAUDE.md. Run when the log has grown long.
---

1. Archive: `cp tasks/lessons.md "tasks/archive/lessons-$(date +%Y-%m-%d-%H%M).md"`

2. Reset `tasks/lessons.md`:
   ```
   # Lessons Log
   Historical record. Add each rule immediately to ## Learned Rules in CLAUDE.md — do not wait for this command.

   **Date** | **What happened** | **Root cause** | **Rule** (also in CLAUDE.md)
   ```
