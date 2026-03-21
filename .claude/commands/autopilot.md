---
description: Project intake interview. Asks everything needed, writes SPEC.md, phases.md, status.json, and .env.example, then validates for consistency before handing off.
---

Interview the user — one question at a time:
1. What is the project? (one paragraph)
2. What does "done" look like? (concrete deliverables)
3. Tech stack? (language, framework, database, testing, package manager)
4. Hard constraints? (must-haves, must-nots)
5. Existing files, APIs, or services to integrate?
6. Environment variables needed? (API keys, DB URLs, ports)
7. Does running tests require any service to start first? (DB, server, docker)
8. Expected scale? (prototype vs production)

Propose a phase breakdown — each phase must have a runnable command that proves it's done. Ask: "Does this look right?" before writing anything.

When confirmed, write all four files:

**`tasks/SPEC.md`** — summary, tech stack, architecture, env vars table, test setup, features with acceptance criteria, out of scope, definition of done.

**`tasks/phases.md`** — use this exact format per phase:
```
## Phase N: [name]
**Status**: TODO
**Goal**: [what this produces]
**Tasks**:
- [ ] task
**Done when**:
- [ ] `[command that exits 0]`
- [ ] `[file that must exist at path]`
**Outputs**: <!-- filled on completion -->
```

**`tasks/status.json`**:
```json
{
  "project": "[actual project name]",
  "current_phase": 1,
  "total_phases": [N],
  "status": "ready",
  "last_updated": "[YYYY-MM-DD HH:MM]",
  "error_count": 0,
  "notes": ""
}
```

**`.env.example`** — one line per env var with dummy value, plus a copy-to-.env comment.

**After writing, validate consistency before confirming:**
- Do the "Done when" commands match the tech stack? (Python project shouldn't have `npm test`)
- Does every phase have at least one runnable verification command?
- Are there any phases with no tasks?
- Are the phases in dependency order?

If any inconsistency is found, fix it before proceeding.

Confirm: "Spec written and validated. Review tasks/SPEC.md and tasks/phases.md. Then run /autopilot-run."
Do NOT start implementation.
