import React from 'react'
import Desk, { DESK_W, DESK_H } from './Desk.jsx'

const ROOM_COLORS = {
  hub: { bg: '#1a1535', wall: '#2a2555', label: '#8888ff' },
  planning: { bg: '#1a2e14', wall: '#2a4a20', label: '#88cc66' },
  prototype: { bg: '#0d1f2d', wall: '#1a3a50', label: '#00ccff' },
  dev: { bg: '#2e1414', wall: '#4a2020', label: '#ff6644' }
}
const ROOM_LABELS = { hub: 'HUB — CENTRAL', planning: 'PLANNING', prototype: 'PROTOTYPE', dev: 'DEV' }
const PADDING = 24, DESK_GAP = 20

export default function Room({ roomId, agents, x, y, width, height, onAgentClick }) {
  const colors = ROOM_COLORS[roomId] || ROOM_COLORS.dev
  const label = ROOM_LABELS[roomId] || roomId.toUpperCase()
  const desksPerRow = Math.max(1, Math.floor((width - PADDING * 2) / (DESK_W + DESK_GAP)))
  const deskPositions = agents.map((_, i) => ({
    dx: PADDING + (i % desksPerRow) * (DESK_W + DESK_GAP),
    dy: PADDING + Math.floor(i / desksPerRow) * (DESK_H + DESK_GAP) + 20
  }))
  return (
    <g>
      <rect x={x} y={y} width={width} height={height} rx="6" fill={colors.bg} />
      <rect x={x} y={y} width={width} height={height} rx="6" fill="none" stroke={colors.wall} strokeWidth="2" />
      {Array.from({ length: Math.ceil(width/32) }).map((_, col) =>
        Array.from({ length: Math.ceil(height/32) }).map((_, row) => (
          <rect key={`${col}-${row}`} x={x+col*32+1} y={y+row*32+1} width={30} height={30} rx="1" fill="none" stroke={colors.wall} strokeWidth="0.3" opacity="0.3" />
        ))
      )}
      <text x={x+10} y={y+16} fill={colors.label} fontSize="9" fontFamily="Courier New, monospace" fontWeight="bold" letterSpacing="2">{label}</text>
      {agents.map((agent, i) => (
        <Desk key={agent.sessionId} agent={agent} x={x+deskPositions[i].dx} y={y+deskPositions[i].dy} onClick={() => onAgentClick(agent)} />
      ))}
      {agents.length === 0 && (
        <text x={x+width/2} y={y+height/2} textAnchor="middle" fill={colors.label} fontSize="9" fontFamily="Courier New, monospace" opacity="0.4">EMPTY</text>
      )}
    </g>
  )
}
