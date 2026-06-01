import React from 'react'
import Creature from './Creature.jsx'

export const DESK_W = 90
export const DESK_H = 130

export default function Desk({ agent, onClick }) {
  const statusClass = agent.status === 'active' ? 'agent-active' : agent.status === 'waiting' ? 'agent-waiting' : 'agent-idle'
  const dotClass = agent.status === 'active' ? 'active' : agent.status === 'waiting' ? 'waiting' : ''
  const displayName = agent.name || agent.sessionId?.slice(0, 8) || '???'
  const task = agent.lastAction ? agent.lastAction.slice(0, 55) : null

  return (
    <div className={`agent-slot ${statusClass}`} onClick={onClick}>
      {task && (
        <div className="task-card">
          <span className={`task-dot ${dotClass}`} />
          {task}
        </div>
      )}
      <Creature type={agent.type} status={agent.status} size={52} sessionId={agent.sessionId} />
      <div className="agent-badge">
        <span>{displayName}</span>
        {agent.role && <span className="agent-role">· {agent.role}</span>}
      </div>
    </div>
  )
}
