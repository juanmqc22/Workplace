import React from 'react'

function MetaCreature() {
  return (
    <g>
      <circle cx="24" cy="24" r="22" fill="#4466ff" opacity="0.15" />
      <rect x="17" y="36" width="5" height="8" rx="1" fill="#2244cc" />
      <rect x="26" y="36" width="5" height="8" rx="1" fill="#2244cc" />
      <rect x="14" y="22" width="20" height="16" rx="3" fill="#3355ee" />
      <rect x="8" y="24" width="6" height="4" rx="1" fill="#2244cc" />
      <rect x="34" y="24" width="6" height="4" rx="1" fill="#2244cc" />
      <rect x="20" y="18" width="8" height="5" fill="#3355ee" />
      <circle cx="24" cy="14" r="9" fill="#4466ff" />
      <circle cx="20" cy="13" r="3" fill="white" />
      <circle cx="28" cy="13" r="3" fill="white" />
      <circle cx="21" cy="13" r="1.5" fill="#0011aa" />
      <circle cx="29" cy="13" r="1.5" fill="#0011aa" />
      <circle cx="21.5" cy="12.5" r="0.5" fill="white" />
      <circle cx="29.5" cy="12.5" r="0.5" fill="white" />
      <polygon points="20,5 22,2 24,5" fill="#88aaff" opacity="0.9" />
      <polygon points="24,4 26,1 28,4" fill="#aaccff" opacity="0.9" />
      <polygon points="28,5 30,2 32,5" fill="#88aaff" opacity="0.9" />
    </g>
  )
}

function PlanningCreature() {
  return (
    <g>
      <rect x="18" y="37" width="5" height="6" rx="1" fill="#5a3a1a" />
      <rect x="25" y="37" width="5" height="6" rx="1" fill="#5a3a1a" />
      <rect x="12" y="22" width="24" height="17" rx="4" fill="#7a5a2a" />
      <rect x="6" y="25" width="6" height="5" rx="2" fill="#6a4a1a" />
      <rect x="36" y="25" width="6" height="5" rx="2" fill="#6a4a1a" />
      <rect x="19" y="18" width="10" height="5" fill="#7a5a2a" />
      <rect x="14" y="7" width="20" height="18" rx="2" fill="#8a6a3a" />
      <rect x="17" y="13" width="4" height="3" rx="1" fill="#2a1a0a" />
      <rect x="27" y="13" width="4" height="3" rx="1" fill="#2a1a0a" />
      <line x1="24" y1="7" x2="24" y2="2" stroke="#4a7a2a" strokeWidth="1.5" />
      <ellipse cx="24" cy="1" rx="3" ry="2" fill="#5a8a2a" />
      <ellipse cx="24" cy="29" rx="6" ry="4" fill="#9a7a4a" opacity="0.6" />
    </g>
  )
}

function PrototypeCreature() {
  return (
    <g>
      <polyline points="32,38 36,34 32,30 36,26" fill="none" stroke="#00ccff" strokeWidth="1.5" />
      <rect x="17" y="36" width="4" height="7" rx="1" fill="#0a2233" />
      <rect x="25" y="36" width="4" height="7" rx="1" fill="#0a2233" />
      <rect x="13" y="21" width="20" height="17" rx="2" fill="#0d2233" stroke="#00ccff" strokeWidth="1" />
      <rect x="7" y="24" width="6" height="4" rx="1" fill="#0a1a2a" stroke="#00ccff" strokeWidth="0.5" />
      <rect x="35" y="24" width="6" height="4" rx="1" fill="#0a1a2a" stroke="#00ccff" strokeWidth="0.5" />
      <rect x="20" y="17" width="8" height="5" fill="#0d2233" />
      <polygon points="14,16 18,7 30,7 34,16 28,21 20,21" fill="#112233" stroke="#00ccff" strokeWidth="1" />
      <rect x="17" y="11" width="5" height="3" fill="#00ffff" opacity="0.9" />
      <rect x="26" y="11" width="5" height="3" fill="#00ffff" opacity="0.9" />
      <polygon points="18,7 20,2 22,7" fill="#00aaff" />
      <polygon points="22,7 24,1 26,7" fill="#00ccff" />
      <polygon points="26,7 28,2 30,7" fill="#00aaff" />
    </g>
  )
}

function DevCreature() {
  return (
    <g>
      <polygon points="16,43 14,47 18,47" fill="#cc2200" />
      <polygon points="20,43 18,47 22,47" fill="#cc2200" />
      <polygon points="26,43 24,47 28,47" fill="#cc2200" />
      <polygon points="30,43 28,47 32,47" fill="#cc2200" />
      <rect x="17" y="35" width="5" height="9" rx="1" fill="#3a1010" />
      <rect x="26" y="35" width="5" height="9" rx="1" fill="#3a1010" />
      <rect x="13" y="20" width="22" height="17" rx="2" fill="#4a1515" />
      <rect x="7" y="23" width="6" height="5" rx="1" fill="#3a1010" />
      <rect x="35" y="23" width="6" height="5" rx="1" fill="#3a1010" />
      <rect x="20" y="16" width="8" height="5" fill="#4a1515" />
      <circle cx="24" cy="11" r="10" fill="#5a2020" />
      <rect x="18" y="9" width="5" height="4" rx="1" fill="#ffcc00" />
      <rect x="25" y="9" width="5" height="4" rx="1" fill="#ffcc00" />
      <rect x="19" y="10" width="3" height="2" rx="0.5" fill="#ff8800" />
      <rect x="26" y="10" width="3" height="2" rx="0.5" fill="#ff8800" />
      <polygon points="20,1 18,6 22,4" fill="#ff6600" opacity="0.9" />
      <polygon points="24,0 22,5 26,3" fill="#ff8800" opacity="0.9" />
      <polygon points="28,1 26,6 30,4" fill="#ff4400" opacity="0.9" />
      <ellipse cx="24" cy="27" rx="6" ry="5" fill="#6a2525" opacity="0.7" />
    </g>
  )
}

export default function Creature({ type, status, size = 48 }) {
  const animClass = status === 'active' ? 'creature-active' : status === 'waiting' ? 'creature-waiting' : 'creature-idle'
  const Map = { meta: MetaCreature, planning: PlanningCreature, prototype: PrototypeCreature, dev: DevCreature }
  const C = Map[type] || DevCreature
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" className={animClass} style={{ display: 'block' }}>
      <C />
    </svg>
  )
}
