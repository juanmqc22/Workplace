import express from 'express'
import { WebSocketServer } from 'ws'
import { createServer } from 'http'
import { loadState, getState } from './state.js'
import { startWatcher } from './watcher.js'

const app = express()
app.use(express.json())

app.get('/api/state', (req, res) => {
  res.json(getState())
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
