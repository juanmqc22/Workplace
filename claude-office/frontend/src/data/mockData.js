export const mockState = {
  agents: {
    'meta-001': {
      sessionId: 'meta-001',
      name: 'meta',
      type: 'meta',
      room: 'hub',
      status: 'idle',
      lastAction: 'Waiting for your first objective...',
      logs: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  },
  rooms: {
    hub: { floor: 0, agents: ['meta-001'] }
  },
  objectives: []
}
