# Backend: Dynamic Rooms & Agent Assignment

**Date:** 2026-06-01  
**Status:** Approved  
**Scope:** claude-office/backend

---

## Context

The Agent Office is a visualization layer over real Claude Code sessions (which run on Claude Pro — no API access). The backend watches `~/.claude/projects` for JSONL session logs and broadcasts state to the frontend via WebSocket.

Currently, the backend hardcodes room assignment by guessing agent type from file paths and CWDs (`planning`, `prototype`, `dev`). The new model is fully dynamic: sessions land in `unassigned` and the user moves them to named rooms via the frontend.

---

## Goal

Remove all hardcoded room logic. Give the frontend REST endpoints to create rooms and move agents between them. Preserve existing manual assignments across restarts.

---

## Changes

### `logParser.js`

- Remove `determineAgentType()` and the `roomMap`.
- `extractAgentInfo()` always returns `room: 'unassigned'` and `type: 'agent'`.
- Keep: `sessionId`, `name`, `lastAction`, `status` (active if last event < 5 min ago), `cwd`, `gitBranch`.
- **Preserve rule:** if the agent already exists in state with a room other than `unassigned`, `upsertAgent` must not overwrite that room. This protects manual assignments from being reset on every file change.

### `state.js`

Default state changes from `{ hub, planning, prototype, dev }` to:
```js
{ hub: { agents: [] }, unassigned: { agents: [] } }
```

New functions:
- `createRoom(name)` — creates `rooms[name] = { agents: [] }` if it doesn't exist. No-op if already exists.
- `assignAgent(sessionId, targetRoomId)` — removes `sessionId` from every room, then pushes to `rooms[targetRoomId].agents`. Creates the room if it doesn't exist. Updates `agents[sessionId].room`.
- `deleteRoom(roomId)` — forbidden for `hub` and `unassigned`. Moves all agents in the room to `unassigned`, then deletes `rooms[roomId]`.

Migration: `loadState()` keeps any rooms already in `state.json` as-is. Existing sessions in `planning`/`prototype`/`dev` are untouched.

### `server.js`

Four new endpoints:

| Method | Path | Body | Effect |
|--------|------|------|--------|
| `POST` | `/api/rooms` | `{ name: string }` | Creates room, broadcasts state |
| `DELETE` | `/api/rooms/:roomId` | — | Deletes room, moves agents to unassigned, broadcasts |
| `PATCH` | `/api/agents/:sessionId` | `{ room: string }` | Moves agent to room, broadcasts |
| *(existing)* | `GET /api/state` | — | Returns full state |

All mutating endpoints broadcast `{ type: 'state-update', state }` to all WebSocket clients after the change.

Validation:
- `POST /api/rooms`: reject if `name` is empty, `hub`, or `unassigned`.
- `DELETE /api/rooms/:roomId`: reject if `roomId` is `hub` or `unassigned`.
- `PATCH /api/agents/:sessionId`: reject if agent doesn't exist in state.

### `watcher.js`

No changes.

---

## What Does NOT Change

- WebSocket server and broadcast logic
- `server.listen`, CORS, express setup
- `watcher.js` file watch loop
- Frontend WebSocket hook
- `state.json` schema (additive only)

---

## Out of Scope

- Auto-proposal by meta-agent (no Claude API available)
- Agent spawning from the office UI
- Room ordering or drag-and-drop
- Authentication
