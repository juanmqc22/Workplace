# Backend Dynamic Rooms Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove hardcoded room assignment from the backend and replace it with dynamic rooms managed via REST API.

**Architecture:** All new Claude Code sessions land in `unassigned`. The frontend calls REST endpoints to create named rooms and move agents into them. The watcher never overwrites a room that was manually assigned.

**Tech Stack:** Node.js 24 (ESM), Express 4, `node:test` for unit tests, `node:assert` for assertions.

---

## File Map

| File | Action | Responsibility |
|------|--------|----------------|
| `claude-office/backend/logParser.js` | Modify | Remove `determineAgentType`, `roomMap`. All agents → `unassigned`. |
| `claude-office/backend/logParser.test.js` | Create | Unit tests for `extractAgentInfo` and `getLastAction`. |
| `claude-office/backend/state.js` | Modify | Add `createRoom`, `assignAgent`, `deleteRoom`. Fix `upsertAgent` to not overwrite manual rooms. |
| `claude-office/backend/state.test.js` | Create | Unit tests for all state mutation functions. |
| `claude-office/backend/server.js` | Modify | Add `POST /api/rooms`, `DELETE /api/rooms/:roomId`, `PATCH /api/agents/:sessionId`. |

---

## Task 1: Simplify logParser.js

**Files:**
- Modify: `claude-office/backend/logParser.js`
- Create: `claude-office/backend/logParser.test.js`

- [ ] **Step 1: Write failing tests**

Create `claude-office/backend/logParser.test.js`:

```js
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { extractAgentInfo, getLastAction } from './logParser.js'

test('extractAgentInfo: always returns unassigned room', () => {
  const events = [{ sessionId: 'abc-123', cwd: '/home/user/planning', timestamp: new Date().toISOString() }]
  const result = extractAgentInfo(events, '/home/user/.claude/projects/abc/planning-agent.jsonl')
  assert.equal(result.room, 'unassigned')
  assert.equal(result.type, 'agent')
  assert.equal(result.sessionId, 'abc-123')
})

test('extractAgentInfo: meta path still goes to unassigned (no auto-detect)', () => {
  const events = [{ sessionId: 'meta-999', cwd: '/home/user/meta', timestamp: new Date().toISOString() }]
  const result = extractAgentInfo(events, '/home/user/.claude/projects/abc/meta-hub.jsonl')
  assert.equal(result.room, 'unassigned')
})

test('extractAgentInfo: active if last event < 5 min ago', () => {
  const events = [{ sessionId: 's1', timestamp: new Date().toISOString() }]
  const result = extractAgentInfo(events, '/tmp/s1.jsonl')
  assert.equal(result.status, 'active')
})

test('extractAgentInfo: idle if last event > 5 min ago', () => {
  const old = new Date(Date.now() - 10 * 60 * 1000).toISOString()
  const events = [{ sessionId: 's2', timestamp: old }]
  const result = extractAgentInfo(events, '/tmp/s2.jsonl')
  assert.equal(result.status, 'idle')
})

test('getLastAction: returns last assistant text', () => {
  const events = [
    { type: 'assistant', message: { content: [{ type: 'text', text: 'Hello world' }] } },
    { type: 'assistant', message: { content: [{ type: 'text', text: 'Done.' }] } }
  ]
  assert.equal(getLastAction(events), 'Done.')
})

test('getLastAction: skips xml-looking user messages', () => {
  const events = [
    { type: 'user', message: { content: [{ type: 'text', text: '<result>data</result>' }] } },
    { type: 'assistant', message: { content: [{ type: 'text', text: 'Processed.' }] } }
  ]
  assert.equal(getLastAction(events), 'Processed.')
})
```

- [ ] **Step 2: Run tests — expect FAIL**

```bash
cd claude-office/backend && node --test logParser.test.js
```

Expected: some pass, `extractAgentInfo: always returns unassigned room` fails (returns `'dev'` currently).

- [ ] **Step 3: Rewrite logParser.js**

Replace the full file content:

```js
import { readFileSync } from 'fs'
import { basename } from 'path'

export function parseLogLine(line) {
  try { return JSON.parse(line.trim()) } catch { return null }
}

export function parseLogFile(filePath) {
  try {
    const content = readFileSync(filePath, 'utf8')
    return content.split('\n').filter(Boolean).map(parseLogLine).filter(Boolean)
  } catch { return [] }
}

export function getLastAction(events) {
  for (let i = events.length - 1; i >= 0; i--) {
    const e = events[i]
    if (e.type === 'assistant' && e.message?.content) {
      for (const c of e.message.content)
        if (c.type === 'text' && c.text?.trim()) return c.text.trim().slice(0, 80)
    }
    if (e.type === 'user' && e.message?.content) {
      for (const c of e.message.content)
        if (c.type === 'text' && c.text?.trim() && !c.text.startsWith('<'))
          return c.text.trim().slice(0, 80)
    }
  }
  return null
}

export function extractAgentInfo(events, filePath) {
  let cwd = null, gitBranch = null, sessionId = null
  for (const e of events) {
    if (e.sessionId && !sessionId) sessionId = e.sessionId
    if (e.cwd && !cwd) cwd = e.cwd
    if (e.gitBranch && !gitBranch) gitBranch = e.gitBranch
  }
  const lastEvent = events[events.length - 1]
  const isRecent = lastEvent?.timestamp &&
    (Date.now() - new Date(lastEvent.timestamp).getTime()) < 5 * 60 * 1000
  return {
    sessionId: sessionId || basename(filePath, '.jsonl'),
    name: basename(filePath, '.jsonl').slice(0, 8),
    type: 'agent',
    room: 'unassigned',
    status: isRecent ? 'active' : 'idle',
    lastAction: getLastAction(events),
    cwd,
    gitBranch
  }
}
```

- [ ] **Step 4: Run tests — expect all PASS**

```bash
node --test logParser.test.js
```

Expected: `✓ 6 tests passed`

- [ ] **Step 5: Commit**

```bash
git add claude-office/backend/logParser.js claude-office/backend/logParser.test.js
git commit -m "feat: logParser always assigns unassigned room, removes type guessing"
```

---

## Task 2: Add room management to state.js

**Files:**
- Modify: `claude-office/backend/state.js`
- Create: `claude-office/backend/state.test.js`

- [ ] **Step 1: Write failing tests**

Create `claude-office/backend/state.test.js`:

```js
import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  _resetForTest, createRoom, assignAgent, deleteRoom, upsertAgent, getState
} from './state.js'

// _resetForTest() resets in-memory state; saveState() still writes state.json
// during tests (accepted side effect — run tests before prod use).

test('createRoom: creates a new room', () => {
  _resetForTest()
  createRoom('research')
  const s = getState()
  assert.ok(s.rooms.research)
  assert.deepEqual(s.rooms.research.agents, [])
})

test('createRoom: no-op if room exists', () => {
  _resetForTest()
  createRoom('research')
  createRoom('research')
  assert.deepEqual(Object.keys(getState().rooms).filter(k => k === 'research'), ['research'])
})

test('assignAgent: moves agent from unassigned to target room', () => {
  _resetForTest()
  upsertAgent({ sessionId: 'abc', name: 'abc', type: 'agent', room: 'unassigned', status: 'idle', lastAction: null })
  assignAgent('abc', 'research')
  const s = getState()
  assert.ok(s.rooms.research.agents.includes('abc'))
  assert.ok(!s.rooms.unassigned.agents.includes('abc'))
  assert.equal(s.agents.abc.room, 'research')
})

test('assignAgent: creates room if it does not exist', () => {
  _resetForTest()
  upsertAgent({ sessionId: 'xyz', name: 'xyz', type: 'agent', room: 'unassigned', status: 'idle', lastAction: null })
  assignAgent('xyz', 'brandnew')
  const s = getState()
  assert.ok(s.rooms.brandnew)
  assert.ok(s.rooms.brandnew.agents.includes('xyz'))
})

test('deleteRoom: moves agents to unassigned, removes room', () => {
  _resetForTest()
  upsertAgent({ sessionId: 'p1', name: 'p1', type: 'agent', room: 'unassigned', status: 'idle', lastAction: null })
  assignAgent('p1', 'temp')
  deleteRoom('temp')
  const s = getState()
  assert.ok(!s.rooms.temp)
  assert.ok(s.rooms.unassigned.agents.includes('p1'))
  assert.equal(s.agents.p1.room, 'unassigned')
})

test('deleteRoom: rejects hub and unassigned', () => {
  _resetForTest()
  assert.throws(() => deleteRoom('hub'), /cannot delete/)
  assert.throws(() => deleteRoom('unassigned'), /cannot delete/)
})

test('upsertAgent: does not overwrite manual room assignment', () => {
  _resetForTest()
  upsertAgent({ sessionId: 'q1', name: 'q1', type: 'agent', room: 'unassigned', status: 'idle', lastAction: null })
  assignAgent('q1', 'research')
  // watcher fires again with room: 'unassigned'
  upsertAgent({ sessionId: 'q1', name: 'q1', type: 'agent', room: 'unassigned', status: 'active', lastAction: 'working' })
  const s = getState()
  assert.equal(s.agents.q1.room, 'research')   // room preserved
  assert.equal(s.agents.q1.status, 'active')   // status updated
  assert.equal(s.agents.q1.lastAction, 'working') // lastAction updated
})
```

- [ ] **Step 2: Run tests — expect FAIL**

```bash
node --test state.test.js
```

Expected: fails because `createRoom`, `assignAgent`, `deleteRoom`, `_resetForTest` don't exist yet.

- [ ] **Step 3: Rewrite state.js**

Replace the full file content:

```js
import { readFileSync, writeFileSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const STATE_FILE = join(__dirname, 'state.json')

const PROTECTED_ROOMS = new Set(['hub', 'unassigned'])

function makeDefaultState() {
  return {
    agents: {},
    rooms: {
      hub: { agents: [] },
      unassigned: { agents: [] }
    },
    objectives: []
  }
}

let state = makeDefaultState()

export function _resetForTest() {
  state = makeDefaultState()
}

export function loadState() {
  if (existsSync(STATE_FILE)) {
    try { state = JSON.parse(readFileSync(STATE_FILE, 'utf8')) }
    catch { state = makeDefaultState() }
  }
  // Ensure protected rooms always exist after load
  if (!state.rooms.hub) state.rooms.hub = { agents: [] }
  if (!state.rooms.unassigned) state.rooms.unassigned = { agents: [] }
}

export function saveState() {
  writeFileSync(STATE_FILE, JSON.stringify(state, null, 2))
}

export function getState() { return state }

export function createRoom(name) {
  if (!state.rooms[name]) {
    state.rooms[name] = { agents: [] }
    saveState()
  }
}

export function assignAgent(sessionId, targetRoomId) {
  if (!state.agents[sessionId]) return
  // Remove from all current rooms
  for (const room of Object.values(state.rooms)) {
    room.agents = room.agents.filter(id => id !== sessionId)
  }
  // Create target room if needed
  if (!state.rooms[targetRoomId]) state.rooms[targetRoomId] = { agents: [] }
  state.rooms[targetRoomId].agents.push(sessionId)
  state.agents[sessionId].room = targetRoomId
  state.agents[sessionId].updatedAt = new Date().toISOString()
  saveState()
}

export function deleteRoom(roomId) {
  if (PROTECTED_ROOMS.has(roomId)) throw new Error(`cannot delete protected room: ${roomId}`)
  const room = state.rooms[roomId]
  if (!room) return
  for (const sessionId of room.agents) {
    state.rooms.unassigned.agents.push(sessionId)
    if (state.agents[sessionId]) {
      state.agents[sessionId].room = 'unassigned'
      state.agents[sessionId].updatedAt = new Date().toISOString()
    }
  }
  delete state.rooms[roomId]
  saveState()
}

export function upsertAgent(agentData) {
  const existing = state.agents[agentData.sessionId]
  const preservedRoom = existing && existing.room !== 'unassigned'
    ? existing.room
    : agentData.room

  state.agents[agentData.sessionId] = {
    ...existing,
    ...agentData,
    room: preservedRoom,
    logs: existing ? existing.logs : [],
    updatedAt: new Date().toISOString()
  }

  if (!existing) {
    state.agents[agentData.sessionId].createdAt = new Date().toISOString()
    const targetRoom = agentData.room || 'unassigned'
    if (!state.rooms[targetRoom]) state.rooms[targetRoom] = { agents: [] }
    if (!state.rooms[targetRoom].agents.includes(agentData.sessionId))
      state.rooms[targetRoom].agents.push(agentData.sessionId)
  }

  saveState()
}

export function updateAgentStatus(sessionId, status) {
  if (state.agents[sessionId]) {
    state.agents[sessionId].status = status
    state.agents[sessionId].updatedAt = new Date().toISOString()
    saveState()
  }
}

export function addLog(sessionId, logEntry) {
  if (!state.agents[sessionId]) return
  if (!state.agents[sessionId].logs) state.agents[sessionId].logs = []
  state.agents[sessionId].logs.push(logEntry)
  if (state.agents[sessionId].logs.length > 20)
    state.agents[sessionId].logs = state.agents[sessionId].logs.slice(-20)
  saveState()
}
```

- [ ] **Step 4: Run tests — expect all PASS**

```bash
node --test state.test.js
```

Expected: `✓ 7 tests passed`

- [ ] **Step 5: Commit**

```bash
git add claude-office/backend/state.js claude-office/backend/state.test.js
git commit -m "feat: add createRoom, assignAgent, deleteRoom; preserve manual room assignments in upsertAgent"
```

---

## Task 3: Add REST endpoints to server.js

**Files:**
- Modify: `claude-office/backend/server.js`

No unit tests for the HTTP layer — verify manually with curl after restart.

- [ ] **Step 1: Update imports in server.js**

At the top of `server.js`, add `createRoom`, `assignAgent`, `deleteRoom` to the import from `./state.js`:

```js
import { loadState, getState, createRoom, assignAgent, deleteRoom } from './state.js'
```

- [ ] **Step 2: Add the three new route handlers**

Add these three blocks immediately after the existing `app.post('/api/command', ...)` block:

```js
app.post('/api/rooms', (req, res) => {
  const { name } = req.body
  if (!name || typeof name !== 'string' || !name.trim()) {
    return res.status(400).json({ error: 'name is required' })
  }
  const safe = name.trim().toLowerCase().replace(/\s+/g, '-')
  if (safe === 'hub' || safe === 'unassigned') {
    return res.status(400).json({ error: `cannot create protected room: ${safe}` })
  }
  createRoom(safe)
  broadcast({ type: 'state-update', state: getState() })
  res.json({ ok: true, room: safe })
})

app.delete('/api/rooms/:roomId', (req, res) => {
  try {
    deleteRoom(req.params.roomId)
    broadcast({ type: 'state-update', state: getState() })
    res.json({ ok: true })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

app.patch('/api/agents/:sessionId', (req, res) => {
  const { sessionId } = req.params
  const { room } = req.body
  const state = getState()
  if (!state.agents[sessionId]) {
    return res.status(404).json({ error: 'agent not found' })
  }
  if (!room || typeof room !== 'string') {
    return res.status(400).json({ error: 'room is required' })
  }
  assignAgent(sessionId, room.trim().toLowerCase())
  broadcast({ type: 'state-update', state: getState() })
  res.json({ ok: true })
})
```

- [ ] **Step 3: Restart backend and verify endpoints**

```bash
# Kill existing backend and restart
cd claude-office/backend && npm run dev
```

In a second terminal, verify each endpoint:

```bash
# Create a room
curl -s -X POST http://localhost:3001/api/rooms \
  -H 'Content-Type: application/json' \
  -d '{"name":"research"}' | python3 -m json.tool
# Expected: {"ok": true, "room": "research"}

# Try protected room (should fail)
curl -s -X POST http://localhost:3001/api/rooms \
  -H 'Content-Type: application/json' \
  -d '{"name":"hub"}' | python3 -m json.tool
# Expected: {"error": "cannot create protected room: hub"}

# Move an agent (replace SESSION_ID with a real ID from GET /api/state)
SESSION_ID=$(curl -s http://localhost:3001/api/state | python3 -c "import sys,json; d=json.load(sys.stdin); print(next(iter(d['agents'])))" 2>/dev/null)
curl -s -X PATCH http://localhost:3001/api/agents/$SESSION_ID \
  -H 'Content-Type: application/json' \
  -d '{"room":"research"}' | python3 -m json.tool
# Expected: {"ok": true}

# Verify agent moved
curl -s http://localhost:3001/api/state | python3 -c "
import sys, json
d = json.load(sys.stdin)
print('rooms:', list(d['rooms'].keys()))
print('research agents:', d['rooms'].get('research', {}).get('agents', []))
"

# Delete room
curl -s -X DELETE http://localhost:3001/api/rooms/research | python3 -m json.tool
# Expected: {"ok": true}

# Try deleting protected room
curl -s -X DELETE http://localhost:3001/api/rooms/hub | python3 -m json.tool
# Expected: {"error": "cannot delete protected room: hub"}
```

- [ ] **Step 4: Confirm frontend reflects changes in real time**

Open `http://localhost:3000` in browser. Run the POST room curl again and watch the office update live (new room card appears). Run the DELETE curl and watch it disappear.

- [ ] **Step 5: Commit**

```bash
git add claude-office/backend/server.js
git commit -m "feat: add REST endpoints for room creation, deletion, and agent assignment"
```

---

## Task 4: Clean state.json to remove legacy rooms

- [ ] **Step 1: Stop the backend**

```bash
# Ctrl+C in the backend terminal
```

- [ ] **Step 2: Reset state.json to clean slate**

```bash
cat > claude-office/backend/state.json << 'EOF'
{
  "agents": {},
  "rooms": {
    "hub": { "agents": [] },
    "unassigned": { "agents": [] }
  },
  "objectives": []
}
EOF
```

- [ ] **Step 3: Restart backend**

```bash
cd claude-office/backend && npm run dev
```

Expected: watcher detects existing Claude Code sessions, they appear in `unassigned`.

- [ ] **Step 4: Verify in browser**

Open `http://localhost:3000`. The office should show:
- Empty floor above (no rooms yet)
- Meta-agent placeholder in hub area
- Sessions from `~/.claude/projects` should appear as unassigned (the frontend will need a small update to show the `unassigned` room — see note below)

- [ ] **Step 5: Commit**

```bash
git add claude-office/backend/state.json
git commit -m "chore: reset state to clean slate with dynamic room model"
```

---

## Note: Frontend unassigned area

After this backend work, the frontend needs a small addition to show agents in the `unassigned` room (so the user can see and move them). This is a separate frontend task — out of scope for this plan but should follow immediately after.
