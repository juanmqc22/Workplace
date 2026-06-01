import React, { useState } from 'react'
import Creature from './Creature.jsx'

const STATUS_COLORS = { active: '#3ba99a', waiting: '#e5a830', idle: '#aaa' }
const PROTECTED = new Set(['hub', 'unassigned'])

export default function SidePanel({ agent, rooms, onClose, onMove, onCreateRoom }) {
  const [newRoomName, setNewRoomName] = useState('')
  const [creating, setCreating] = useState(false)
  const [moving, setMoving] = useState(false)

  if (!agent) return null

  const statusColor = STATUS_COLORS[agent.status] || STATUS_COLORS.idle
  const currentRoom = agent.room || 'unassigned'
  const availableRooms = Object.keys(rooms || {}).filter(r => r !== currentRoom)

  async function handleMove(roomId) {
    setMoving(true)
    await onMove(agent.sessionId, roomId)
    setMoving(false)
  }

  async function handleCreate(e) {
    e.preventDefault()
    const name = newRoomName.trim()
    if (!name) return
    setCreating(true)
    const result = await onCreateRoom(name)
    if (result.ok) {
      await onMove(agent.sessionId, result.room)
      setNewRoomName('')
    }
    setCreating(false)
  }

  return (
    <div className="side-panel">
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{ fontSize: 15, fontWeight: 700, color: '#2c1e08' }}>
            {agent.name || agent.sessionId?.slice(0, 8) || '???'}
          </div>
          <div style={{ fontSize: 10, color: '#aaa', marginTop: 2 }}>
            {agent.sessionId}
          </div>
        </div>
        <button className="close-btn" onClick={onClose}>✕</button>
      </div>

      {/* Creature */}
      <div style={{ display: 'flex', justifyContent: 'center', padding: '12px 0' }}>
        <Creature
          type={agent.type}
          status={agent.status}
          size={96}
          sessionId={agent.sessionId}
        />
      </div>

      {/* Status row */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', fontSize: 11, color: '#7a5c2a' }}>
        <span style={{
          background: '#f5f0e8', borderRadius: 6, padding: '3px 8px',
          color: statusColor, fontWeight: 700, textTransform: 'uppercase', fontSize: 10
        }}>
          ● {agent.status}
        </span>
        <span style={{ background: '#f5f0e8', borderRadius: 6, padding: '3px 8px' }}>
          📁 {currentRoom}
        </span>
        {agent.gitBranch && (
          <span style={{ background: '#f5f0e8', borderRadius: 6, padding: '3px 8px' }}>
            ⎇ {agent.gitBranch}
          </span>
        )}
      </div>

      {/* Last action */}
      {agent.lastAction && (
        <div style={{ background: '#f5f0e8', borderRadius: 8, padding: '8px 10px', fontSize: 11, color: '#5a4a2a', lineHeight: 1.45 }}>
          {agent.lastAction}
        </div>
      )}

      {/* CWD */}
      {agent.cwd && (
        <div style={{ fontSize: 10, color: '#bbb', wordBreak: 'break-all' }}>{agent.cwd}</div>
      )}

      {/* ── Move to room ── */}
      <div style={{ borderTop: '1px solid #f0e8d8', paddingTop: 14 }}>
        <div style={{ fontSize: 10, color: '#aaa', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: 10 }}>
          Move to room
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {/* Hub is always available */}
          {currentRoom !== 'hub' && (
            <button
              className="room-btn room-btn--hub"
              onClick={() => handleMove('hub')}
              disabled={moving}
            >
              ◆ hub
            </button>
          )}
          {/* Unassigned */}
          {currentRoom !== 'unassigned' && (
            <button
              className="room-btn"
              onClick={() => handleMove('unassigned')}
              disabled={moving}
            >
              unassigned
            </button>
          )}
          {/* Other rooms */}
          {availableRooms.filter(r => !PROTECTED.has(r)).map(r => (
            <button
              key={r}
              className="room-btn"
              onClick={() => handleMove(r)}
              disabled={moving}
            >
              {r}
            </button>
          ))}
        </div>

        {/* Create new room + move */}
        <form onSubmit={handleCreate} style={{ marginTop: 10, display: 'flex', gap: 6 }}>
          <input
            type="text"
            value={newRoomName}
            onChange={e => setNewRoomName(e.target.value)}
            placeholder="new room name…"
            style={{
              flex: 1, fontSize: 12, padding: '5px 10px',
              border: '1px solid rgba(0,0,0,0.13)', borderRadius: 7,
              outline: 'none', background: '#fefaf0', color: '#2c1e08'
            }}
          />
          <button
            type="submit"
            disabled={!newRoomName.trim() || creating}
            style={{
              background: '#231b35', color: '#fff', border: 'none',
              borderRadius: 7, padding: '5px 12px', fontSize: 11,
              fontWeight: 600, cursor: 'pointer', opacity: newRoomName.trim() ? 1 : 0.4
            }}
          >
            {creating ? '…' : '+ create'}
          </button>
        </form>
      </div>

      {/* Recent activity */}
      <div style={{ borderTop: '1px solid #f0e8d8', paddingTop: 14 }}>
        <div style={{ fontSize: 10, color: '#aaa', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: 8 }}>
          Recent activity
        </div>
        <div style={{ display: 'grid', gap: 6 }}>
          {(agent.logs || []).slice(-5).reverse().map((log, i) => (
            <div key={i} className={`log-entry ${log.type}`}>
              <div style={{ fontSize: 9, color: '#bbb', marginBottom: 2 }}>
                {new Date(log.timestamp).toLocaleTimeString()} · {log.type}
              </div>
              <div style={{ fontSize: 10, color: '#5a4a2a' }}>{log.text}</div>
            </div>
          ))}
          {(!agent.logs || agent.logs.length === 0) && (
            <div style={{ fontSize: 10, color: '#ccc' }}>No activity yet.</div>
          )}
        </div>
      </div>
    </div>
  )
}
