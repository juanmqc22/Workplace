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
  for (const room of Object.values(state.rooms))
    room.agents = room.agents.filter(id => id !== sessionId)
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
