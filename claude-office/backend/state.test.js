import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  _resetForTest, createRoom, assignAgent, deleteRoom, upsertAgent, getState
} from './state.js'

test('createRoom: creates a new room', () => {
  _resetForTest()
  createRoom('research')
  const s = getState()
  assert.ok(s.rooms.research)
  assert.deepEqual(s.rooms.research.agents, [])
})

test('createRoom: no-op if room exists', () => {
  _resetForTest()
  createRoom('research')
  createRoom('research')
  assert.deepEqual(Object.keys(getState().rooms).filter(k => k === 'research'), ['research'])
})

test('assignAgent: moves agent from unassigned to target room', () => {
  _resetForTest()
  upsertAgent({ sessionId: 'abc', name: 'abc', type: 'agent', room: 'unassigned', status: 'idle', lastAction: null })
  assignAgent('abc', 'research')
  const s = getState()
  assert.ok(s.rooms.research.agents.includes('abc'))
  assert.ok(!s.rooms.unassigned.agents.includes('abc'))
  assert.equal(s.agents.abc.room, 'research')
})

test('assignAgent: creates room if it does not exist', () => {
  _resetForTest()
  upsertAgent({ sessionId: 'xyz', name: 'xyz', type: 'agent', room: 'unassigned', status: 'idle', lastAction: null })
  assignAgent('xyz', 'brandnew')
  const s = getState()
  assert.ok(s.rooms.brandnew)
  assert.ok(s.rooms.brandnew.agents.includes('xyz'))
})

test('deleteRoom: moves agents to unassigned, removes room', () => {
  _resetForTest()
  upsertAgent({ sessionId: 'p1', name: 'p1', type: 'agent', room: 'unassigned', status: 'idle', lastAction: null })
  assignAgent('p1', 'temp')
  deleteRoom('temp')
  const s = getState()
  assert.ok(!s.rooms.temp)
  assert.ok(s.rooms.unassigned.agents.includes('p1'))
  assert.equal(s.agents.p1.room, 'unassigned')
})

test('deleteRoom: rejects hub and unassigned', () => {
  _resetForTest()
  assert.throws(() => deleteRoom('hub'), /cannot delete/)
  assert.throws(() => deleteRoom('unassigned'), /cannot delete/)
})

test('upsertAgent: does not overwrite manual room assignment', () => {
  _resetForTest()
  upsertAgent({ sessionId: 'q1', name: 'q1', type: 'agent', room: 'unassigned', status: 'idle', lastAction: null })
  assignAgent('q1', 'research')
  upsertAgent({ sessionId: 'q1', name: 'q1', type: 'agent', room: 'unassigned', status: 'active', lastAction: 'working' })
  const s = getState()
  assert.equal(s.agents.q1.room, 'research')
  assert.equal(s.agents.q1.status, 'active')
  assert.equal(s.agents.q1.lastAction, 'working')
})
