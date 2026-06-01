import chokidar from 'chokidar'
import { homedir } from 'os'
import { join } from 'path'
import { parseLogFile, extractAgentInfo } from './logParser.js'
import { upsertAgent, addLog } from './state.js'

const CLAUDE_DIR = join(homedir(), '.claude', 'projects')
const debounceMap = new Map()

function debounce(key, fn, delay) {
  if (debounceMap.has(key)) clearTimeout(debounceMap.get(key))
  debounceMap.set(key, setTimeout(() => { debounceMap.delete(key); fn() }, delay))
}

export function startWatcher(onEvent) {
  const watcher = chokidar.watch(CLAUDE_DIR, {
    persistent: true,
    ignoreInitial: false,
    awaitWriteFinish: { stabilityThreshold: 200, pollInterval: 100 }
  })

  function processFile(filePath) {
    if (!filePath.endsWith('.jsonl')) return
    debounce(filePath, () => {
      const events = parseLogFile(filePath)
      if (!events.length) return
      const agentInfo = extractAgentInfo(events, filePath)
      upsertAgent(agentInfo)
      for (const e of events.slice(-5)) {
        if (e.type === 'user' || e.type === 'assistant') {
          let text = ''
          if (e.message?.content) {
            for (const c of e.message.content) {
              if (c.type === 'text' && c.text && !c.text.startsWith('<')) { text = c.text.slice(0, 120); break }
            }
          }
          if (text) addLog(agentInfo.sessionId, { timestamp: e.timestamp, type: e.type, text })
        }
      }
      onEvent({ type: 'agent-update', agent: agentInfo })
    }, 300)
  }

  watcher.on('add', processFile)
  watcher.on('change', processFile)
  watcher.on('error', (err) => console.error('Watcher error:', err))
  console.log(`Watching ${CLAUDE_DIR}`)
  return watcher
}
