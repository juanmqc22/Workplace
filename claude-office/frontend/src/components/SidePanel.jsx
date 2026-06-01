import React from 'react'
import Creature from './Creature.jsx'

export default function SidePanel({ agent, onClose }) {
  if (!agent) return null
  return (
    <div className="side-panel">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>{agent.name.toUpperCase()}</h2>
        <button className="close-btn" onClick={onClose}>x CLOSE</button>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', padding: '12px 0' }}>
        <Creature type={agent.type} status={agent.status} size={96} />
      </div>
      <div style={{ fontSize: '10px', display: 'grid', gap: '6px' }}>
        <div><span style={{ color: 'var(--color-text-dim)' }}>TYPE: </span><span style={{ textTransform: 'uppercase' }}>{agent.type}</span></div>
        <div>
          <span style={{ color: 'var(--color-text-dim)' }}>STATUS: </span>
          <span style={{ color: agent.status === 'active' ? 'var(--color-active)' : agent.status === 'waiting' ? 'var(--color-waiting)' : 'var(--color-idle)', textTransform: 'uppercase' }}>{agent.status}</span>
        </div>
        {agent.cwd && <div style={{ wordBreak: 'break-all' }}><span style={{ color: 'var(--color-text-dim)' }}>CWD: </span><span style={{ fontSize: '9px' }}>{agent.cwd}</span></div>}
        {agent.gitBranch && <div><span style={{ color: 'var(--color-text-dim)' }}>BRANCH: </span><span>{agent.gitBranch}</span></div>}
      </div>
      <div style={{ marginTop: '8px' }}>
        <div style={{ fontSize: '9px', color: 'var(--color-text-dim)', marginBottom: '6px', letterSpacing: '2px' }}>RECENT ACTIVITY</div>
        <div style={{ display: 'grid', gap: '6px' }}>
          {(agent.logs || []).slice(-5).reverse().map((log, i) => (
            <div key={i} className={`log-entry ${log.type}`}>
              <div style={{ fontSize: '9px', color: 'var(--color-text-dim)', marginBottom: '2px' }}>{new Date(log.timestamp).toLocaleTimeString()} · {log.type.toUpperCase()}</div>
              <div style={{ fontSize: '10px' }}>{log.text}</div>
            </div>
          ))}
          {(!agent.logs || agent.logs.length === 0) && <div style={{ fontSize: '10px', color: 'var(--color-text-dim)' }}>No activity yet.</div>}
        </div>
      </div>
    </div>
  )
}
