import React, { useState } from 'react'
import Office from './components/Office.jsx'
import SidePanel from './components/SidePanel.jsx'
import CommandInput from './components/CommandInput.jsx'
import { useWebSocket } from './hooks/useWebSocket.js'

export default function App() {
  const { state, isConnected, sendMessage } = useWebSocket('ws://localhost:3001/ws')
  const [selectedAgent, setSelectedAgent] = useState(null)
  return (
    <>
      <div className="conn-status">
        <div className={`conn-dot ${isConnected ? 'connected' : 'disconnected'}`} />
        <span style={{ fontSize: '10px', color: isConnected ? 'var(--color-active)' : '#ff4444' }}>
          {isConnected ? 'LIVE' : 'MOCK'}
        </span>
      </div>
      <Office state={state} onAgentClick={setSelectedAgent} />
      {selectedAgent && <SidePanel agent={selectedAgent} onClose={() => setSelectedAgent(null)} />}
      <CommandInput onSubmit={(cmd) => sendMessage({ type: 'command', command: cmd })} />
    </>
  )
}
