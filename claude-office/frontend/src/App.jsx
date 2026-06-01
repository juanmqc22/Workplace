import React, { useState, useEffect, useCallback } from 'react'
import Office from './components/Office.jsx'
import SidePanel from './components/SidePanel.jsx'
import CommandInput from './components/CommandInput.jsx'
import { useWebSocket } from './hooks/useWebSocket.js'

function useClock() {
  const [clock, setClock] = useState(() => new Date().toLocaleTimeString())
  useEffect(() => {
    const id = setInterval(() => setClock(new Date().toLocaleTimeString()), 1000)
    return () => clearInterval(id)
  }, [])
  return clock
}

export default function App() {
  const { state, isConnected, sendMessage } = useWebSocket('ws://localhost:3001/ws')
  const [selectedAgent, setSelectedAgent] = useState(null)
  const clock = useClock()

  const handleMove = useCallback(async (sessionId, targetRoom) => {
    await fetch(`http://localhost:3001/api/agents/${sessionId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ room: targetRoom })
    })
    // state updates via WebSocket broadcast — no local state needed
  }, [])

  const handleCreateRoom = useCallback(async (name) => {
    const res = await fetch('http://localhost:3001/api/rooms', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name })
    })
    return res.json()
  }, [])

  // Keep selectedAgent in sync with live state updates
  const liveAgent = selectedAgent
    ? state.agents[selectedAgent.sessionId] ?? selectedAgent
    : null

  return (
    <>
      <div className="conn-status">
        <div className={`conn-dot ${isConnected ? 'connected' : 'disconnected'}`} />
        <span>{isConnected ? 'LIVE' : 'MOCK'}</span>
      </div>
      <Office state={state} onAgentClick={setSelectedAgent} clock={clock} />
      {liveAgent && (
        <SidePanel
          agent={liveAgent}
          rooms={state.rooms}
          onClose={() => setSelectedAgent(null)}
          onMove={handleMove}
          onCreateRoom={handleCreateRoom}
        />
      )}
      <CommandInput onSubmit={(cmd) => sendMessage({ type: 'command', command: cmd })} />
    </>
  )
}
