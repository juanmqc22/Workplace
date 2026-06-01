import express from 'express'
import { WebSocketServer } from 'ws'
import { createServer } from 'http'
import { loadState, getState, createRoom, assignAgent, deleteRoom } from './state.js'
import { startWatcher } from './watcher.js'

const app = express()
app.use(express.json())

app.get('/api/state', (req, res) => {
  res.json(getState())
})

app.post('/api/rooms', (req, res) => {
  const { name } = req.body
  if (!name || typeof name !== 'string' || !name.trim())
    return res.status(400).json({ error: 'name is required' })
  const safe = name.trim().toLowerCase().replace(/\s+/g, '-')
  if (safe === 'hub' || safe === 'unassigned')
    return res.status(400).json({ error: `cannot create protected room: ${safe}` })
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
  if (!getState().agents[sessionId])
    return res.status(404).json({ error: 'agent not found' })
  if (!room || typeof room !== 'string')
    return res.status(400).json({ error: 'room is required' })
  assignAgent(sessionId, room.trim().toLowerCase())
  broadcast({ type: 'state-update', state: getState() })
  res.json({ ok: true })
})

app.post('/api/command', (req, res) => {
  const { command, agentId } = req.body
  broadcast({ type: 'command-echo', command, agentId, timestamp: new Date().toISOString() })
  res.json({ ok: true })
})

const server = createServer(app)
const wss = new WebSocketServer({ server, path: '/ws' })

function broadcast(data) {
  const msg = JSON.stringify(data)
  wss.clients.forEach(client => {
    if (client.readyState === 1) client.send(msg)
  })
}

wss.on('connection', (ws) => {
  ws.send(JSON.stringify({ type: 'state-update', state: getState() }))
  ws.on('message', (data) => {
    try {
      const msg = JSON.parse(data)
      if (msg.type === 'command') broadcast({ type: 'command-echo', ...msg, timestamp: new Date().toISOString() })
    } catch {}
  })
})

loadState()
startWatcher(() => broadcast({ type: 'state-update', state: getState() }))
server.listen(3001, () => console.log('Claude Office backend on http://localhost:3001'))
