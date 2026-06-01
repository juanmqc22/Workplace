import React from 'react'
const colors = { active: 'var(--color-active)', idle: 'var(--color-idle)', waiting: 'var(--color-waiting)' }
export default function StatusBadge({ status }) {
  const color = colors[status] || colors.idle
  return (
    <g>
      <circle r="4" fill={color} opacity="0.9" />
      {status === 'active' && <circle r="7" fill={color} opacity="0.2" />}
    </g>
  )
}
