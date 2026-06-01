import React from 'react'

/* ── Pokémon-inspired species ────────────────────────────────────────────── */

function Mossy() {
  // Grass-type: round green body, leaf bulb on back, sleepy big eyes
  return (
    <g>
      {/* Bulb on back */}
      <ellipse cx="30" cy="14" rx="7" ry="9" fill="#4a9e3f" />
      <ellipse cx="30" cy="12" rx="5" ry="6" fill="#68cc5a" />
      <line x1="30" y1="6" x2="28" y2="2" stroke="#4a9e3f" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="30" y1="6" x2="33" y2="1" stroke="#4a9e3f" strokeWidth="1.5" strokeLinecap="round"/>
      {/* Body */}
      <ellipse cx="22" cy="30" rx="16" ry="14" fill="#88cc66" stroke="#5a9944" strokeWidth="1.2"/>
      {/* Tummy */}
      <ellipse cx="22" cy="33" rx="9" ry="8" fill="#aade88" />
      {/* Eyes */}
      <ellipse cx="16" cy="25" rx="5" ry="6" fill="white" stroke="#5a9944" strokeWidth="0.8"/>
      <ellipse cx="28" cy="25" rx="5" ry="6" fill="white" stroke="#5a9944" strokeWidth="0.8"/>
      <circle cx="17" cy="26" r="3.2" fill="#1a2a00"/>
      <circle cx="29" cy="26" r="3.2" fill="#1a2a00"/>
      <circle cx="15.8" cy="24.5" r="1.2" fill="white"/>
      <circle cx="27.8" cy="24.5" r="1.2" fill="white"/>
      {/* Cheeks */}
      <ellipse cx="10" cy="30" rx="3.5" ry="2" fill="#88ee66" opacity="0.7"/>
      <ellipse cx="34" cy="30" rx="3.5" ry="2" fill="#88ee66" opacity="0.7"/>
      {/* Legs */}
      <ellipse cx="16" cy="43" rx="5" ry="4" fill="#88cc66" stroke="#5a9944" strokeWidth="1"/>
      <ellipse cx="28" cy="43" rx="5" ry="4" fill="#88cc66" stroke="#5a9944" strokeWidth="1"/>
      {/* Feet */}
      <ellipse cx="16" cy="46" rx="4.5" ry="2.5" fill="#5a9944"/>
      <ellipse cx="28" cy="46" rx="4.5" ry="2.5" fill="#5a9944"/>
    </g>
  )
}

function Sparkit() {
  // Electric-type: yellow with spiky ears, red cheeks, lightning tail
  return (
    <g>
      {/* Lightning tail */}
      <polyline points="36,38 42,32 38,28 44,20" fill="none" stroke="#ffcc00" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      {/* Ears */}
      <polygon points="10,18 8,4 18,14" fill="#ffcc00" stroke="#cc9900" strokeWidth="1"/>
      <polygon points="11,16 10,7 17,14" fill="#cc9900"/>
      <polygon points="28,18 30,4 38,14" fill="#ffcc00" stroke="#cc9900" strokeWidth="1"/>
      <polygon points="30,16 31,7 36,14" fill="#cc9900"/>
      {/* Body */}
      <ellipse cx="24" cy="32" rx="16" ry="14" fill="#ffdd44" stroke="#cc9900" strokeWidth="1.2"/>
      {/* Tummy */}
      <ellipse cx="24" cy="35" rx="9" ry="8" fill="#ffeeaa"/>
      {/* Eyes */}
      <ellipse cx="18" cy="27" rx="5" ry="5.5" fill="white" stroke="#cc9900" strokeWidth="0.8"/>
      <ellipse cx="30" cy="27" rx="5" ry="5.5" fill="white" stroke="#cc9900" strokeWidth="0.8"/>
      <circle cx="19" cy="28" r="3" fill="#1a1000"/>
      <circle cx="31" cy="28" r="3" fill="#1a1000"/>
      <circle cx="17.8" cy="26.8" r="1.1" fill="white"/>
      <circle cx="29.8" cy="26.8" r="1.1" fill="white"/>
      {/* Red cheeks */}
      <ellipse cx="11" cy="31" rx="4" ry="3" fill="#ee4444" opacity="0.85"/>
      <ellipse cx="37" cy="31" rx="4" ry="3" fill="#ee4444" opacity="0.85"/>
      {/* Legs */}
      <ellipse cx="18" cy="44" rx="5" ry="4" fill="#ffdd44" stroke="#cc9900" strokeWidth="1"/>
      <ellipse cx="30" cy="44" rx="5" ry="4" fill="#ffdd44" stroke="#cc9900" strokeWidth="1"/>
      <ellipse cx="18" cy="47" rx="4" ry="2.2" fill="#cc9900"/>
      <ellipse cx="30" cy="47" rx="4" ry="2.2" fill="#cc9900"/>
    </g>
  )
}

function Aquali() {
  // Water-type: blue, round shell bump, curled tail, teardrop head feature
  return (
    <g>
      {/* Shell on back */}
      <ellipse cx="33" cy="20" rx="8" ry="6" fill="#3388cc" stroke="#1a5588" strokeWidth="1"/>
      <line x1="33" y1="14" x2="33" y2="26" stroke="#1a5588" strokeWidth="0.8"/>
      <line x1="25" y1="20" x2="41" y2="20" stroke="#1a5588" strokeWidth="0.8"/>
      {/* Tail curl */}
      <path d="M 36,38 Q 46,36 44,28 Q 42,20 38,22" fill="none" stroke="#5599dd" strokeWidth="3" strokeLinecap="round"/>
      {/* Body */}
      <ellipse cx="21" cy="31" rx="16" ry="15" fill="#5599dd" stroke="#3366aa" strokeWidth="1.2"/>
      {/* Tummy */}
      <ellipse cx="21" cy="34" rx="9" ry="8" fill="#88bbee"/>
      {/* Eyes */}
      <ellipse cx="15" cy="26" rx="5" ry="5.5" fill="white" stroke="#3366aa" strokeWidth="0.8"/>
      <ellipse cx="27" cy="26" rx="5" ry="5.5" fill="white" stroke="#3366aa" strokeWidth="0.8"/>
      <circle cx="16" cy="27" r="3" fill="#001a33"/>
      <circle cx="28" cy="27" r="3" fill="#001a33"/>
      <circle cx="14.8" cy="25.8" r="1.1" fill="white"/>
      <circle cx="26.8" cy="25.8" r="1.1" fill="white"/>
      {/* Cheeks */}
      <ellipse cx="9" cy="30" rx="3.5" ry="2.5" fill="#88bbee" opacity="0.7"/>
      <ellipse cx="33" cy="30" rx="3.5" ry="2.5" fill="#88bbee" opacity="0.7"/>
      {/* Legs */}
      <ellipse cx="15" cy="44" rx="5" ry="4" fill="#5599dd" stroke="#3366aa" strokeWidth="1"/>
      <ellipse cx="27" cy="44" rx="5" ry="4" fill="#5599dd" stroke="#3366aa" strokeWidth="1"/>
      <ellipse cx="15" cy="47" rx="4" ry="2.2" fill="#3366aa"/>
      <ellipse cx="27" cy="47" rx="4" ry="2.2" fill="#3366aa"/>
    </g>
  )
}

function Flami() {
  // Fire-type: orange-red, flame crown, bright tail
  return (
    <g>
      {/* Flame tail */}
      <ellipse cx="37" cy="38" rx="4" ry="6" fill="#ff8800" opacity="0.7"/>
      <ellipse cx="37" cy="35" rx="3" ry="5" fill="#ffaa00"/>
      <ellipse cx="37" cy="33" rx="2" ry="3" fill="#ffdd44"/>
      {/* Flame crown */}
      <polygon points="18,13 20,5 22,13" fill="#ff8800"/>
      <polygon points="22,12 24,3 26,12" fill="#ffcc00"/>
      <polygon points="26,13 28,5 30,13" fill="#ff8800"/>
      {/* Body */}
      <ellipse cx="24" cy="32" rx="16" ry="14" fill="#ff7744" stroke="#cc4400" strokeWidth="1.2"/>
      {/* Tummy */}
      <ellipse cx="24" cy="35" rx="9" ry="8" fill="#ffaa88"/>
      {/* Eyes */}
      <ellipse cx="18" cy="27" rx="5" ry="5.5" fill="white" stroke="#cc4400" strokeWidth="0.8"/>
      <ellipse cx="30" cy="27" rx="5" ry="5.5" fill="white" stroke="#cc4400" strokeWidth="0.8"/>
      <circle cx="19" cy="28" r="3" fill="#1a0500"/>
      <circle cx="31" cy="28" r="3" fill="#1a0500"/>
      <circle cx="17.8" cy="26.8" r="1.1" fill="white"/>
      <circle cx="29.8" cy="26.8" r="1.1" fill="white"/>
      {/* Cheeks */}
      <ellipse cx="11" cy="31" rx="3.5" ry="2.5" fill="#ffaa44" opacity="0.8"/>
      <ellipse cx="37" cy="31" rx="3.5" ry="2.5" fill="#ffaa44" opacity="0.8"/>
      {/* Legs */}
      <ellipse cx="18" cy="44" rx="5" ry="4" fill="#ff7744" stroke="#cc4400" strokeWidth="1"/>
      <ellipse cx="30" cy="44" rx="5" ry="4" fill="#ff7744" stroke="#cc4400" strokeWidth="1"/>
      <ellipse cx="18" cy="47" rx="4" ry="2.2" fill="#cc4400"/>
      <ellipse cx="30" cy="47" rx="4" ry="2.2" fill="#cc4400"/>
    </g>
  )
}

function Drifly() {
  // Ghost/psychic-type: purple, wide grin, floaty wispy bottom
  return (
    <g>
      {/* Wispy bottom */}
      <path d="M 10,42 Q 16,50 22,42 Q 28,50 34,42 Q 37,48 38,42" fill="#9966cc" stroke="#6633aa" strokeWidth="1"/>
      {/* Body */}
      <ellipse cx="24" cy="28" rx="16" ry="17" fill="#aa77dd" stroke="#7744bb" strokeWidth="1.2"/>
      {/* Eyes — wide, expressive */}
      <ellipse cx="17" cy="23" rx="5.5" ry="6" fill="white" stroke="#7744bb" strokeWidth="0.8"/>
      <ellipse cx="31" cy="23" rx="5.5" ry="6" fill="white" stroke="#7744bb" strokeWidth="0.8"/>
      <circle cx="18" cy="24" r="3.5" fill="#1a0033"/>
      <circle cx="32" cy="24" r="3.5" fill="#1a0033"/>
      <circle cx="16.5" cy="22.5" r="1.3" fill="white"/>
      <circle cx="30.5" cy="22.5" r="1.3" fill="white"/>
      {/* Wide grin */}
      <path d="M 14,33 Q 24,40 34,33" stroke="#4a2288" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <path d="M 16,34 Q 24,39 32,34 Q 24,38 16,34" fill="#6633aa" opacity="0.4"/>
      {/* Cheeks */}
      <ellipse cx="10" cy="28" rx="3.5" ry="2.5" fill="#cc88ff" opacity="0.7"/>
      <ellipse cx="38" cy="28" rx="3.5" ry="2.5" fill="#cc88ff" opacity="0.7"/>
      {/* Small nubs on top */}
      <ellipse cx="16" cy="12" rx="4" ry="5" fill="#aa77dd" stroke="#7744bb" strokeWidth="1"/>
      <ellipse cx="32" cy="12" rx="4" ry="5" fill="#aa77dd" stroke="#7744bb" strokeWidth="1"/>
    </g>
  )
}

/* ── Meta-agent (Cobalt) ─────────────────────────────────────────────────── */

function CobaltCreature() {
  const c = '#4272d6', d = '#2a50b0', f = '#6898f0'
  return (
    <g>
      {/* Ears */}
      <polygon points="11,17 14,4 21,17" fill={d}/>
      <polygon points="27,17 34,4 37,17" fill={d}/>
      <polygon points="13,17 15,9 20,17" fill={f}/>
      <polygon points="28,17 33,9 35,17" fill={f}/>
      {/* Head */}
      <ellipse cx="24" cy="26" rx="15" ry="14" fill={c} stroke={d} strokeWidth="1.2"/>
      {/* Snout */}
      <ellipse cx="24" cy="30" rx="8" ry="6" fill={f}/>
      <ellipse cx="24" cy="28.5" rx="3.5" ry="2.5" fill="#1a0a30"/>
      {/* Eyes */}
      <ellipse cx="17" cy="23" rx="5" ry="5.5" fill="white" stroke={d} strokeWidth="0.8"/>
      <ellipse cx="31" cy="23" rx="5" ry="5.5" fill="white" stroke={d} strokeWidth="0.8"/>
      <circle cx="18" cy="24" r="3" fill="#0a0520"/>
      <circle cx="32" cy="24" r="3" fill="#0a0520"/>
      <circle cx="16.8" cy="22.8" r="1.1" fill="white"/>
      <circle cx="30.8" cy="22.8" r="1.1" fill="white"/>
      {/* Body */}
      <ellipse cx="24" cy="40" rx="14" ry="10" fill={c} stroke={d} strokeWidth="1.2"/>
      <ellipse cx="24" cy="41" rx="8" ry="7" fill={f} opacity="0.5"/>
      {/* Badge */}
      <rect x="19" y="34" width="10" height="5" rx="2.5" fill="#ffd700" stroke="#ccaa00" strokeWidth="0.8"/>
      <circle cx="24" cy="36.5" r="1.5" fill="#ccaa00"/>
      {/* Legs */}
      <ellipse cx="17" cy="48" rx="5.5" ry="3.5" fill={c} stroke={d} strokeWidth="1"/>
      <ellipse cx="31" cy="48" rx="5.5" ry="3.5" fill={c} stroke={d} strokeWidth="1"/>
    </g>
  )
}

/* ── You (human) ─────────────────────────────────────────────────────────── */

function YouCreature() {
  const skin = '#f4c48a', outfit = '#3a8a5a', crown = '#ffd700', hair = '#3a2010'
  return (
    <g>
      <rect x="15" y="7" width="18" height="5" rx="2" fill={crown} stroke="#ccaa00" strokeWidth="0.8"/>
      <polygon points="15,7 17.5,2 20,7" fill={crown}/>
      <polygon points="22,7 24,1.5 26,7" fill={crown}/>
      <polygon points="28,7 30.5,2 33,7" fill={crown}/>
      <ellipse cx="24" cy="8" rx="9" ry="5" fill={hair}/>
      <ellipse cx="24" cy="18" rx="10" ry="11" fill={skin} stroke="#d4a46a" strokeWidth="0.8"/>
      <ellipse cx="19.5" cy="16" rx="3" ry="3.5" fill="white" stroke="#d4a46a" strokeWidth="0.6"/>
      <ellipse cx="28.5" cy="16" rx="3" ry="3.5" fill="white" stroke="#d4a46a" strokeWidth="0.6"/>
      <circle cx="20.2" cy="17" r="2" fill="#2a1000"/>
      <circle cx="29.2" cy="17" r="2" fill="#2a1000"/>
      <circle cx="19.5" cy="16" r="0.8" fill="white"/>
      <circle cx="28.5" cy="16" r="0.8" fill="white"/>
      <path d="M 20,22 Q 24,25.5 28,22" stroke="#c47a40" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <rect x="16" y="29" width="16" height="17" rx="3" fill={outfit} stroke="#2a6a3a" strokeWidth="0.8"/>
      <polygon points="24,29 20,34 24,33" fill="#fff" opacity="0.6"/>
      <polygon points="24,29 28,34 24,33" fill="#fff" opacity="0.45"/>
      <rect x="10" y="29" width="6" height="13" rx="3" fill={outfit} stroke="#2a6a3a" strokeWidth="0.8"/>
      <rect x="32" y="29" width="6" height="13" rx="3" fill={outfit} stroke="#2a6a3a" strokeWidth="0.8"/>
      <ellipse cx="13" cy="44" rx="3.5" ry="3" fill={skin}/>
      <ellipse cx="35" cy="44" rx="3.5" ry="3" fill={skin}/>
      <rect x="17" y="46" width="5" height="5" rx="2.5" fill="#2a2050"/>
      <rect x="26" y="46" width="5" height="5" rx="2.5" fill="#2a2050"/>
    </g>
  )
}

/* ── Species selection ───────────────────────────────────────────────────── */

const SPECIES = [Mossy, Sparkit, Aquali, Flami, Drifly]

function hashSessionId(id) {
  if (!id) return 0
  let h = 0
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0
  return h
}

function pickSpecies(sessionId) {
  return SPECIES[hashSessionId(sessionId) % SPECIES.length]
}

/* ── Exports ─────────────────────────────────────────────────────────────── */

export default function Creature({ type, status, size = 52, sessionId }) {
  let C
  if (type === 'hub' || type === 'meta') C = CobaltCreature
  else if (type === 'you') C = YouCreature
  else C = pickSpecies(sessionId)

  const animClass = status === 'active' ? 'creature-active' : status === 'waiting' ? 'creature-waiting' : ''

  return (
    <svg
      width={size} height={size}
      viewBox="0 0 48 52"
      className={animClass}
      style={{ display: 'block' }}
    >
      <C />
    </svg>
  )
}
