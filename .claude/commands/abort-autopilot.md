---
description: Kill the autopilot loop and reset all state cleanly.
---

**1. Kill the orchestrator:**
```bash
if [ -n "${TMUX:-}" ]; then
  tmux kill-window -t autopilot 2>/dev/null && echo "tmux window killed" || echo "No autopilot window found"
else
  pkill -f "orchestrator.sh" 2>/dev/null && echo "Process killed" || echo "Not running"
fi
```

**2. Remove all runtime files:**
```bash
rm -f tasks/PAUSE tasks/STOP tasks/SKIP_PHASE tasks/BLOCKED tasks/DONE tasks/NOTIFICATION
rm -f tasks/phase-*.done tasks/phase-*.blocked
```

**3. Reset status.json:**
```bash
python3 -c "
import json
d = json.load(open('tasks/status.json'))
d.update({'status':'not_started','current_phase':1,'error_count':0,'last_updated':''})
open('tasks/status.json','w').write(json.dumps(d,indent=2))
"
```

**4. Ask:** "Reset all phases to TODO in tasks/phases.md?" If yes:
```bash
python3 -c "
import re
c = open('tasks/phases.md').read()
c = re.sub(r'\*\*Status\*\*:.*', '**Status**: TODO', c)
open('tasks/phases.md','w').write(c)
"
```

**5. Confirm:** "Aborted. Run /autopilot for a new spec, or /autopilot-run to re-run."
