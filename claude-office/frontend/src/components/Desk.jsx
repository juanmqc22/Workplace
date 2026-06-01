import React from 'react'
import Creature from './Creature.jsx'
import SpeechBubble from './SpeechBubble.jsx'
import StatusBadge from './StatusBadge.jsx'

const DESK_W = 80
const DESK_H = 110

export default function Desk({ agent, x, y, onClick }) {
  const cx = x + DESK_W / 2
  return (
    <g onClick={onClick} style={{ cursor: 'pointer' }}>
      <rect x={x+5} y={y+55} width={DESK_W-10} height={40} rx="3" fill="#2a1f3d" stroke="#3d2b5e" strokeWidth="1" />
      <rect x={x+8} y={y+90} width={4} height={10} fill="#1a1028" />
      <rect x={x+DESK_W-18} y={y+90} width={4} height={10} fill="#1a1028" />
      <rect x={x+18} y={y+60} width={30} height={20} rx="2" fill="#0d0d1a" stroke="#334" strokeWidth="1" />
      <rect x={x+19} y={y+61} width={28} height={17} rx="1" fill="#001133" />
      {agent.status === 'active' && (
        <>
          <rect x={x+21} y={y+63} width={16} height={2} rx="1" fill="#00ff88" opacity="0.6" />
          <rect x={x+21} y={y+67} width={10} height={2} rx="1" fill="#00ff88" opacity="0.4" />
          <rect x={x+21} y={y+71} width={20} height={2} rx="1" fill="#00ff88" opacity="0.3" />
        </>
      )}
      <g transform={`translate(${cx-24}, ${y+10})`}>
        <Creature type={agent.type} status={agent.status} size={48} />
      </g>
      <g transform={`translate(${x+DESK_W-8}, ${y+58})`}>
        <StatusBadge status={agent.status} />
      </g>
      <text x={cx} y={y+DESK_H-2} textAnchor="middle" fill="#8899aa" fontSize="8" fontFamily="Courier New, monospace">
        {agent.name.toUpperCase()}
      </text>
      {(agent.status === 'active' || agent.status === 'waiting') && agent.lastAction && (
        <SpeechBubble text={agent.lastAction} x={cx} y={y+8} />
      )}
      <rect x={x} y={y} width={DESK_W} height={DESK_H} rx="4" fill="transparent" stroke="#445566" strokeWidth="0.5" />
    </g>
  )
}
export { DESK_W, DESK_H }
