import { useState, useEffect, useRef, useCallback } from 'react'
import { mockState } from '../data/mockData.js'

export function useWebSocket(url) {
  const [state, setState] = useState(mockState)
  const [isConnected, setIsConnected] = useState(false)
  const wsRef = useRef(null)
  const reconnectTimeoutRef = useRef(null)
  const reconnectDelay = useRef(1000)

  const connect = useCallback(() => {
    try {
      const ws = new WebSocket(url)
      wsRef.current = ws
      ws.onopen = () => { setIsConnected(true); reconnectDelay.current = 1000 }
      ws.onmessage = (e) => {
        try { const msg = JSON.parse(e.data); if (msg.type === 'state-update') setState(msg.state) } catch {}
      }
      ws.onclose = () => {
        setIsConnected(false)
        reconnectTimeoutRef.current = setTimeout(() => {
          reconnectDelay.current = Math.min(reconnectDelay.current * 2, 5000)
          connect()
        }, reconnectDelay.current)
      }
      ws.onerror = () => ws.close()
    } catch { setIsConnected(false) }
  }, [url])

  useEffect(() => {
    connect()
    return () => { clearTimeout(reconnectTimeoutRef.current); wsRef.current?.close() }
  }, [connect])

  const sendMessage = useCallback((msg) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) wsRef.current.send(JSON.stringify(msg))
  }, [])

  return { state, isConnected, sendMessage }
}
