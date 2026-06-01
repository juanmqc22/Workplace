import React from 'react'
import Room from './Room.jsx'
import Creature from './Creature.jsx'

const SKIP_ROOMS = new Set(['hub'])

export default function Office({ state, onAgentClick, clock }) {
  const { agents, rooms } = state

  function getRoomAgents(roomId) {
    const room = rooms[roomId]
    if (!room) return []
    return (room.agents || []).map(sid => agents[sid]).filter(Boolean)
  }

  const hubAgents = getRoomAgents('hub')
  const metaAgent = hubAgents[0] || null

  const dynamicRooms = Object.keys(rooms).filter(id => !SKIP_ROOMS.has(id))
  const hasRooms = dynamicRooms.length > 0

  return (
    <div className="office-wrap">
      <header className="office-header">
        <div className="header-brand">
          <h1>The Agent Office</h1>
          <div className="sub">workflow monitor · {clock}</div>
        </div>
        {hasRooms && (
          <div className="room-count">
            {dynamicRooms.length} room{dynamicRooms.length !== 1 ? 's' : ''} · {Object.keys(agents).length} agent{Object.keys(agents).length !== 1 ? 's' : ''}
          </div>
        )}
      </header>

      <main className="office-floor">
        {hasRooms ? (
          <div className="rooms-grid">
            {dynamicRooms.map(roomId => (
              <Room
                key={roomId}
                roomId={roomId}
                agents={getRoomAgents(roomId)}
                onAgentClick={onAgentClick}
              />
            ))}
          </div>
        ) : (
          <div className="floor-empty">
            <p className="floor-hint">The office is empty — talk to your meta-agent to get started</p>
          </div>
        )}

        {/* Meta-agent hub */}
        <div className={`hub-row ${!hasRooms ? 'hub-row--centered' : ''}`}>
          {metaAgent ? (
            <div
              className={`agent-slot meta-agent ${metaAgent.status === 'active' ? 'agent-active' : metaAgent.status === 'waiting' ? 'agent-waiting' : ''}`}
              onClick={() => onAgentClick(metaAgent)}
            >
              {metaAgent.lastAction && (
                <div className="task-card">
                  <span className={`task-dot ${metaAgent.status}`} />
                  {metaAgent.lastAction.slice(0, 60)}
                </div>
              )}
              <Creature type="hub" status={metaAgent.status} size={hasRooms ? 62 : 80} />
              <div className="agent-badge">
                <span>{metaAgent.name || 'Meta'}</span>
                <span className="agent-role">· Orchestrator</span>
              </div>
            </div>
          ) : (
            <div className="agent-slot meta-agent">
              <Creature type="hub" status="idle" size={hasRooms ? 62 : 80} />
              <div className="agent-badge">
                <span>Meta</span>
                <span className="agent-role">· Orchestrator</span>
              </div>
            </div>
          )}

          <div className="hub-footer">
            Click any agent for details · the meta-agent coordinates your office
          </div>
        </div>
      </main>
    </div>
  )
}
