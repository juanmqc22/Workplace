import React, { useState } from 'react'
export default function CommandInput({ onSubmit }) {
  const [value, setValue] = useState('')
  const isMeta = value.startsWith('/meta') || value.startsWith('/spawn') || value.startsWith('/mission')
  function handleSubmit(e) {
    e.preventDefault()
    if (!value.trim()) return
    onSubmit(value.trim())
    setValue('')
  }
  return (
    <div className="command-bar">
      <span style={{ fontSize: '10px', color: 'var(--color-text-dim)' }}>{'>'}</span>
      <form onSubmit={handleSubmit} style={{ flex: 1, display: 'flex', gap: '8px' }}>
        <input type="text" value={value} onChange={e => setValue(e.target.value)} placeholder="Type a command or /meta to activate meta-agent..." />
        {isMeta && <span className="meta-tag">META</span>}
        <button type="submit">SEND</button>
      </form>
    </div>
  )
}
