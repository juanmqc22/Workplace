import React from 'react'
import Creature from './Creature.jsx'

const STATUS_COLORS = { active: '#3ba99a', waiting: '#e5a830', idle: '#aaa' }

export default function SidePanel({ agent, onClose }) {
  if (!agent) return null
  const statusColor = STATUS_COLORS[agent.status] || STATUS_COLORS.idle
  return (
    <div className="side-panel">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>{(agent.name || agent.sessionId?.slice(0, 8) || '???').toUpperCase()}</h2>
        <button className="close-btn" onClick={onClose}>✕ Close</button>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', padding: '12px 0' }}>
        <Creature type={agent.type || agent.room} status={agent.status} size={96} />
      </div>
      <div style={{ fontSize: '11px', display: 'grid', gap: '6px', color: '#5a4a2a' }}>
        <div><span style={{ opacity: 0.6 }}>Type: </span><span style={{ textTransform: 'uppercase' }}>{agent.type || '—'}</span></div>
        <div>
          <span style={{ opacity: 0.6 }}>Status: </span>
          <span style={{ color: statusColor, fontWeight: 600, textTransform: 'uppercase' }}>{agent.status}</span>
        </div>
        {agent.cwd && <div style={{ wordBreak: 'break-all' }}><span style={{ opacity: 0.6 }}>CWD: </span><span style={{ fontSize: '10px' }}>{agent.cwd}</span></div>}
        {agent.gitBranch && <div><span style={{ opacity: 0.6 }}>Branch: </span><span>{agent.gitBranch}</span></div>}
        {agent.lastAction && <div style={{ background: '#f5f0e8', borderRadius: 6, padding: '6px 8px', fontSize: '10px', lineHeight: 1.4 }}>{agent.lastAction}</div>}
      </div>
      <div>
        <div style={{ fontSize: '9px', color: '#aaa', marginBottom: 8, letterSpacing: '1.5px', textTransform: 'uppercase' }}>Recent Activity</div>
        <div style={{ display: 'grid', gap: '6px' }}>
          {(agent.logs || []).slice(-5).reverse().map((log, i) => (
            <div key={i} className={`log-entry ${log.type}`}>
              <div style={{ fontSize: '9px', color: '#aaa', marginBottom: 2 }}>
                {new Date(log.timestamp).toLocaleTimeString()} · {log.type}
              </div>
              <div style={{ fontSize: '10px', color: '#5a4a2a' }}>{log.text}</div>
            </div>
          ))}
          {(!agent.logs || agent.logs.length === 0) && <div style={{ fontSize: '10px', color: '#bbb' }}>No activity yet.</div>}
        </div>
      </div>
    </div>
  )
}
