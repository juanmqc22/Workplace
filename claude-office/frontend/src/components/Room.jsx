import React from 'react'
import Desk from './Desk.jsx'

const ROOM_COLORS = [
  { bg: 'rgba(229,168,48,0.26)',   border: '#e5a830', dot: '#e5a830' },
  { bg: 'rgba(155,107,214,0.22)',  border: '#9b6bd6', dot: '#9b6bd6' },
  { bg: 'rgba(59,169,154,0.22)',   border: '#3ba99a', dot: '#3ba99a' },
  { bg: 'rgba(70,130,210,0.22)',   border: '#4682d2', dot: '#4682d2' },
  { bg: 'rgba(220,90,90,0.18)',    border: '#dc5a5a', dot: '#dc5a5a' },
  { bg: 'rgba(80,170,80,0.18)',    border: '#50aa50', dot: '#50aa50' },
]

let colorIndex = 0
const roomColorCache = {}

function getRoomColor(roomId) {
  if (!roomColorCache[roomId]) {
    roomColorCache[roomId] = ROOM_COLORS[colorIndex % ROOM_COLORS.length]
    colorIndex++
  }
  return roomColorCache[roomId]
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export default function Room({ roomId, agents, onAgentClick }) {
  const color = getRoomColor(roomId)
  const label = capitalize(roomId.replace(/-/g, ' '))
  const hasActive = agents.some(a => a.status === 'active')
  const statusText = hasActive ? 'WORKING' : 'QUEUED'

  return (
    <div
      className="dept"
      style={{ background: color.bg, border: `2px solid ${color.border}` }}
    >
      <div className="dept-head">
        <div className="dept-label">
          <span className="dept-dot" style={{ background: color.dot }} />
          {label}
        </div>
        <span className="dept-badge">{statusText}</span>
      </div>
      <div className="dept-agents">
        {agents.map(agent => (
          <Desk key={agent.sessionId} agent={agent} onClick={() => onAgentClick(agent)} />
        ))}
        {agents.length === 0 && <div className="dept-empty">QUEUED</div>}
      </div>
    </div>
  )
}
