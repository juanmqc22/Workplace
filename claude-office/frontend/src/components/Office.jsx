import React from 'react'
import Room from './Room.jsx'

const CANVAS_W = 1100, CANVAS_H = 780
const ROOM_LAYOUT = {
  hub:       { x: 50,  y: 20,  w: 1000, h: 200 },
  planning:  { x: 50,  y: 240, w: 320,  h: 240 },
  prototype: { x: 390, y: 240, w: 340,  h: 240 },
  dev:       { x: 50,  y: 500, w: 1000, h: 260 }
}

export default function Office({ state, onAgentClick }) {
  const { agents, rooms } = state
  function getRoomAgents(roomId) {
    const roomData = rooms[roomId]
    if (!roomData) return []
    return (roomData.agents || []).map(id => agents[id]).filter(Boolean)
  }
  return (
    <div className="office-canvas">
      <svg width={CANVAS_W} height={CANVAS_H} viewBox={`0 0 ${CANVAS_W} ${CANVAS_H}`}>
        <rect width={CANVAS_W} height={CANVAS_H} fill="#0a0a15" />
        <defs>
          <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
            <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#1a1a2e" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width={CANVAS_W} height={CANVAS_H} fill="url(#grid)" opacity="0.4" />
        {Object.entries(ROOM_LAYOUT).map(([roomId, layout]) => (
          <Room key={roomId} roomId={roomId} agents={getRoomAgents(roomId)} x={layout.x} y={layout.y} width={layout.w} height={layout.h} onAgentClick={onAgentClick} />
        ))}
        <rect x={150} y={220} width={40} height={20} fill="#111122" stroke="#223" strokeWidth="1" />
        <rect x={500} y={220} width={40} height={20} fill="#111122" stroke="#223" strokeWidth="1" />
        <rect x={150} y={480} width={40} height={20} fill="#111122" stroke="#223" strokeWidth="1" />
        <rect x={500} y={480} width={40} height={20} fill="#111122" stroke="#223" strokeWidth="1" />
        <text x={CANVAS_W/2} y={CANVAS_H-10} textAnchor="middle" fill="#334" fontSize="9" fontFamily="Courier New, monospace">
          CLAUDE OFFICE v0.1 — {Object.keys(agents).length} AGENTS ACTIVE
        </text>
      </svg>
    </div>
  )
}
