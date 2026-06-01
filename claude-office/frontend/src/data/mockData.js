export const mockState = {
  agents: {
    'meta-001': { sessionId: 'meta-001', name: 'oracle', type: 'meta', room: 'hub', status: 'active', lastAction: 'Analyzing incoming objective from user...', cwd: '/home/user/Workplace', gitBranch: 'main', logs: [{ timestamp: '2026-06-01T10:00:00Z', type: 'user', text: 'Build a visual workspace for agents' }, { timestamp: '2026-06-01T10:00:05Z', type: 'assistant', text: 'Analyzing request. Proposing: Planning x2, Prototype x1, Dev x2' }], createdAt: '2026-06-01T09:00:00Z', updatedAt: '2026-06-01T10:01:00Z' },
    'plan-001': { sessionId: 'plan-001', name: 'moss', type: 'planning', room: 'planning', status: 'active', lastAction: 'Drafting architecture document...', cwd: '/home/user/Workplace/docs', gitBranch: 'feature/planning', logs: [{ timestamp: '2026-06-01T10:05:00Z', type: 'assistant', text: 'Drafting component hierarchy...' }], createdAt: '2026-06-01T10:05:00Z', updatedAt: '2026-06-01T10:06:00Z' },
    'plan-002': { sessionId: 'plan-002', name: 'fernwood', type: 'planning', room: 'planning', status: 'idle', lastAction: 'Waiting for architecture review...', cwd: '/home/user/Workplace/docs', gitBranch: 'feature/planning', logs: [{ timestamp: '2026-06-01T10:03:00Z', type: 'assistant', text: 'Completed task breakdown into 12 subtasks' }], createdAt: '2026-06-01T10:03:00Z', updatedAt: '2026-06-01T10:03:00Z' },
    'proto-001': { sessionId: 'proto-001', name: 'volt', type: 'prototype', room: 'prototype', status: 'active', lastAction: 'Building React component tree...', cwd: '/home/user/Workplace/frontend/src', gitBranch: 'feature/prototype', logs: [{ timestamp: '2026-06-01T10:10:00Z', type: 'assistant', text: 'Created Office.jsx with room grid' }], createdAt: '2026-06-01T10:10:00Z', updatedAt: '2026-06-01T10:11:00Z' },
    'dev-001': { sessionId: 'dev-001', name: 'ember', type: 'dev', room: 'dev', status: 'waiting', lastAction: 'Waiting for prototype approval...', cwd: '/home/user/Workplace/backend', gitBranch: 'feature/backend', logs: [{ timestamp: '2026-06-01T10:08:00Z', type: 'assistant', text: 'Backend scaffold complete' }], createdAt: '2026-06-01T10:08:00Z', updatedAt: '2026-06-01T10:09:00Z' }
  },
  rooms: {
    hub: { floor: 0, agents: ['meta-001'] },
    planning: { floor: 0, agents: ['plan-001', 'plan-002'] },
    prototype: { floor: 0, agents: ['proto-001'] },
    dev: { floor: 0, agents: ['dev-001'] }
  },
  objectives: []
}
