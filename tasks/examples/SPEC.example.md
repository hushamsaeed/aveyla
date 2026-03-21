# Project Specification: todo-api

> EXAMPLE FILE — shows what a good SPEC.md looks like.
> Copy the structure, replace the content.

---

## Summary
A REST API for managing todo items. Users can create, read, update, and delete todos. Built with Node.js/Express, stored in SQLite, tested with Vitest.

## Tech Stack
- Language / Runtime: TypeScript / Node.js 22
- Framework: Express 5
- Database: SQLite (better-sqlite3)
- Testing: Vitest
- Package manager: npm

## Architecture Overview
Single Express app. Routes in `src/routes/`. Database access in `src/db/`. Each route file handles one resource. Tests alongside source in `*.test.ts` files.

## Environment Variables

| Variable | Required | Description | Example |
|---|---|---|---|
| `PORT` | No | Server port (default 3000) | `3000` |
| `DATABASE_PATH` | No | SQLite file path (default ./todos.db) | `./todos.db` |

## Test Setup
No setup required — tests use an in-memory SQLite database.

## Features & Acceptance Criteria

### Feature 1: Todo CRUD
- [ ] `POST /todos` creates a todo with `{ title, done: false }`, returns 201 + created todo
- [ ] `GET /todos` returns array of all todos
- [ ] `GET /todos/:id` returns single todo or 404
- [ ] `PATCH /todos/:id` updates title or done status, returns updated todo
- [ ] `DELETE /todos/:id` deletes todo, returns 204

### Feature 2: Validation
- [ ] Creating a todo without a title returns 400 with error message
- [ ] Requesting a non-existent todo returns 404 with error message

## Out of Scope
- User authentication
- Pagination
- Frontend UI
- Deployment / Docker

## Definition of Done (Whole Project)
- [ ] All phases DONE ✅
- [ ] `npm test` passes with 0 failures
- [ ] `node src/index.js` starts without errors
- [ ] README has install + run instructions
