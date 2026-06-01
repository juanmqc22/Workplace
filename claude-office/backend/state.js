import { readFileSync, writeFileSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const STATE_FILE = join(__dirname, 'state.json')

const defaultState = {
  agents: {},
  rooms: {
    hub: { floor: 0, agents: [] },
    planning: { floor: 0, agents: [] },
    prototype: { floor: 0, agents: [] },
    dev: { floor: 0, agents: [] }
  },
  objectives: []
}

let state = { ...defaultState }

export function loadState() {
  if (existsSync(STATE_FILE)) {
    try { state = JSON.parse(readFileSync(STATE_FILE, 'utf8')) }
    catch { state = { ...defaultState } }
  }
}

export function saveState() {
  writeFileSync(STATE_FILE, JSON.stringify(state, null, 2))
}

export function getState() { return state }

export function upsertAgent(agentData) {
  const existing = state.agents[agentData.sessionId]
  state.agents[agentData.sessionId] = {
    ...existing, ...agentData,
    logs: existing ? existing.logs : [],
    updatedAt: new Date().toISOString()
  }
  if (!existing) {
    state.agents[agentData.sessionId].createdAt = new Date().toISOString()
    const room = agentData.room || 'dev'
    if (!state.rooms[room]) state.rooms[room] = { floor: 0, agents: [] }
    if (!state.rooms[room].agents.includes(agentData.sessionId))
      state.rooms[room].agents.push(agentData.sessionId)
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
