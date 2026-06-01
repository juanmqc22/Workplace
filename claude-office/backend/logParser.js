import { readFileSync } from 'fs'
import { basename } from 'path'

export function parseLogLine(line) {
  try { return JSON.parse(line.trim()) } catch { return null }
}

export function parseLogFile(filePath) {
  try {
    const content = readFileSync(filePath, 'utf8')
    return content.split('\n').filter(Boolean).map(parseLogLine).filter(Boolean)
  } catch { return [] }
}

export function getLastAction(events) {
  for (let i = events.length - 1; i >= 0; i--) {
    const e = events[i]
    if (e.type === 'assistant' && e.message?.content) {
      for (const c of e.message.content)
        if (c.type === 'text' && c.text?.trim()) return c.text.trim().slice(0, 80)
    }
    if (e.type === 'user' && e.message?.content) {
      for (const c of e.message.content)
        if (c.type === 'text' && c.text?.trim() && !c.text.startsWith('<'))
          return c.text.trim().slice(0, 80)
    }
  }
  return null
}

export function extractAgentInfo(events, filePath) {
  let cwd = null, gitBranch = null, sessionId = null
  for (const e of events) {
    if (e.sessionId && !sessionId) sessionId = e.sessionId
    if (e.cwd && !cwd) cwd = e.cwd
    if (e.gitBranch && !gitBranch) gitBranch = e.gitBranch
  }
  const lastEvent = events[events.length - 1]
  const isRecent = lastEvent?.timestamp &&
    (Date.now() - new Date(lastEvent.timestamp).getTime()) < 5 * 60 * 1000
  return {
    sessionId: sessionId || basename(filePath, '.jsonl'),
    name: basename(filePath, '.jsonl').slice(0, 8),
    type: 'agent',
    room: 'unassigned',
    status: isRecent ? 'active' : 'idle',
    lastAction: getLastAction(events),
    cwd,
    gitBranch
  }
}
