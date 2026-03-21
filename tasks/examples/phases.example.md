# Project Phases: todo-api

> EXAMPLE FILE — shows what good phases.md looks like.

---

## Phase 1: Project scaffold
**Status**: DONE ✅
**Goal**: Working Express server with health endpoint and test harness in place
**Tasks**:
- [x] `npm init -y` and install express, better-sqlite3, vitest, typescript dependencies
- [x] Configure tsconfig.json
- [x] Create `src/index.ts` — Express app, `GET /health` returns `{ status: "ok" }`
- [x] Write first test: `GET /health` returns 200
**Done when**:
- [ ] `npm test` exits 0
- [ ] `npx ts-node src/index.ts` starts without errors
**Outputs**: `src/index.ts`, `src/index.test.ts`, `tsconfig.json`, `package.json` with all deps

---

## Phase 2: Database + todo model
**Status**: TODO
**Goal**: SQLite database with todos table and typed model functions
**Tasks**:
- [ ] Create `src/db/index.ts` — open SQLite connection, export db instance
- [ ] Create `src/db/todos.ts` — `createTodo`, `getTodos`, `getTodoById`, `updateTodo`, `deleteTodo`
- [ ] Use in-memory DB for tests (`:memory:`)
- [ ] Write unit tests for each db function
**Done when**:
- [ ] `npm test` exits 0
- [ ] `src/db/todos.ts` exports all 5 functions with correct TypeScript types
**Outputs**: `src/db/index.ts`, `src/db/todos.ts`, `src/db/todos.test.ts`

---

## Phase 3: Todo routes
**Status**: TODO
**Goal**: All 5 CRUD endpoints implemented and tested
**Tasks**:
- [ ] Create `src/routes/todos.ts` with all 5 routes
- [ ] Mount router in `src/index.ts`
- [ ] Input validation: return 400 for missing title
- [ ] Write integration tests for all routes + error cases
**Done when**:
- [ ] `npm test` exits 0 (all route tests pass)
- [ ] Manual check: `curl -X POST localhost:3000/todos -H 'Content-Type: application/json' -d '{"title":"test"}'` returns 201
**Outputs**: `src/routes/todos.ts`, `src/routes/todos.test.ts`, updated `src/index.ts`

---

## Phase 4: Polish + README
**Status**: TODO
**Goal**: Production-ready: proper error handling, README, clean build
**Tasks**:
- [ ] Global error handler middleware in `src/index.ts`
- [ ] Write `README.md` with install, run, test instructions
- [ ] Ensure `npm run build` produces no TypeScript errors
**Done when**:
- [ ] `npm test` exits 0
- [ ] `npm run build` exits 0 with no errors
- [ ] `README.md` exists with working instructions
**Outputs**: Updated `src/index.ts`, `README.md`
