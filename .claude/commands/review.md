---
description: Senior code review of current changes. Delegates to reviewer agent. Outputs Critical / Important / Minor findings.
---

Delegate to the `reviewer` agent to review all changes since the last commit.

Present findings as:
- **🔴 Critical** — must fix before merging
- **🟡 Important** — should fix
- **🟢 Minor** — optional improvement

If there are Critical items: fix them now, re-run verification.
If no Critical items: confirm "Review passed ✅"
