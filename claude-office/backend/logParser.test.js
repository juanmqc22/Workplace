import { test } from 'node:test'
import assert from 'node:assert/strict'
import { extractAgentInfo, getLastAction } from './logParser.js'

test('extractAgentInfo: always returns unassigned room', () => {
  const events = [{ sessionId: 'abc-123', cwd: '/home/user/planning', timestamp: new Date().toISOString() }]
  const result = extractAgentInfo(events, '/home/user/.claude/projects/abc/planning-agent.jsonl')
  assert.equal(result.room, 'unassigned')
  assert.equal(result.type, 'agent')
  assert.equal(result.sessionId, 'abc-123')
})

test('extractAgentInfo: meta path still goes to unassigned (no auto-detect)', () => {
  const events = [{ sessionId: 'meta-999', cwd: '/home/user/meta', timestamp: new Date().toISOString() }]
  const result = extractAgentInfo(events, '/home/user/.claude/projects/abc/meta-hub.jsonl')
  assert.equal(result.room, 'unassigned')
})

test('extractAgentInfo: active if last event < 5 min ago', () => {
  const events = [{ sessionId: 's1', timestamp: new Date().toISOString() }]
  const result = extractAgentInfo(events, '/tmp/s1.jsonl')
  assert.equal(result.status, 'active')
})

test('extractAgentInfo: idle if last event > 5 min ago', () => {
  const old = new Date(Date.now() - 10 * 60 * 1000).toISOString()
  const events = [{ sessionId: 's2', timestamp: old }]
  const result = extractAgentInfo(events, '/tmp/s2.jsonl')
  assert.equal(result.status, 'idle')
})

test('getLastAction: returns last assistant text', () => {
  const events = [
    { type: 'assistant', message: { content: [{ type: 'text', text: 'Hello world' }] } },
    { type: 'assistant', message: { content: [{ type: 'text', text: 'Done.' }] } }
  ]
  assert.equal(getLastAction(events), 'Done.')
})

test('getLastAction: skips xml-looking user messages', () => {
  const events = [
    { type: 'user', message: { content: [{ type: 'text', text: '<result>data</result>' }] } },
    { type: 'assistant', message: { content: [{ type: 'text', text: 'Processed.' }] } }
  ]
  assert.equal(getLastAction(events), 'Processed.')
})
