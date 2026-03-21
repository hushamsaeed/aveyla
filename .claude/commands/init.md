---
description: First-time project setup. Replaces placeholders, fills in CLAUDE.md, inits git.
argument-hint: [project-name-use-hyphens]
---

1. Replace placeholders (cross-platform):
   ```bash
   python3 -c "
   import os
   name = '$ARGUMENTS'
   for p in ['CLAUDE.md','tasks/SPEC.md','tasks/status.json','README.md']:
       os.path.exists(p) and open(p,'w').write(open(p).read().replace('{{PROJECT_NAME}}',name))
   print('Done')
   "
   ```

2. Read CLAUDE.md. Identify blank sections. Ask me to fill them in one at a time: Stack → Commands → Structure → Reference Files → Conventions.

3. Init git if needed: `git rev-parse --git-dir 2>/dev/null || (git init && git add -A && git commit -m "init")`

4. Confirm: "Project '$ARGUMENTS' ready. Run /session-start to begin."
