# Project: Aveyla Manta Village

> Keep this file under 150 lines. Loaded every session — every line costs context.

## Stack
- **Language / Runtime**: TypeScript / Node.js
- **Framework**: Next.js 14+ (App Router, RSC)
- **CMS**: Sanity (headless, GROQ queries)
- **Styling**: Tailwind CSS 3.4 + CSS custom properties
- **Testing**: Vitest + React Testing Library, Playwright (E2E)
- **Package manager**: pnpm

## Commands
```bash
# Dev server:   pnpm dev
# Build:        pnpm build
# Lint + fix:   pnpm lint
# Tests (all):  pnpm test
# Tests (one):  pnpm vitest run src/path/to/file.test.ts
# E2E:          pnpm test:e2e
```

## Structure
```
src/
  app/          # Next.js App Router pages (route groups)
  components/   # Feature-organized (global/, home/, rooms/, activities/, packages/, gallery/, shared/, ui/)
  lib/          # Utilities (sanity client, analytics helpers, test-setup)
  sanity/       # CMS config, client, env
  styles/       # globals.css (Tailwind directives + CSS custom properties)
```

## Design System
- **Colours**: deep-ocean (#0A1628), ocean-blue (#0D4F6E), reef-teal (#0E7490), sand-gold (#C8A96E), lagoon-light (#E8F4F8), coral-white (#FDFAF6), pure-white (#FFFFFF), slate (#4A5568)
- **Fonts**: Cormorant Garamond (display, 300/600) + Inter (body, 400/500/600) — loaded via next/font
- **Spacing**: 8px base unit, 12-column grid, max-width 1440px

## Reference Files
- Design tokens: tailwind.config.ts, src/app/globals.css
- Layout: src/app/layout.tsx
- Sanity config: src/sanity/config.ts, src/sanity/env.ts

---

## Core Rules
- **Plan first.** 3+ steps → write tasks/todo.md before code.
- **Verify before done.** Tests must pass. Show output.
- **No hacks.** Workarounds get replaced with real fixes.
- **Minimal impact.** Only change what the task requires.
- **Ask before destroying.** Deletes, force-pushes, truncates → confirm first.

## Learned Rules
- next.config must be .mjs (not .ts) for Next.js 14.2 — TypeScript config requires Next.js 15+
- Orchestrator worker needs `pnpm` in allowedTools, not just `npm`
