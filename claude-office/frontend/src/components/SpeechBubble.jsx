import React from 'react'
export default function SpeechBubble({ text, x = 0, y = 0 }) {
  if (!text) return null
  const display = text.length > 55 ? text.slice(0, 52) + '...' : text
  const lines = []
  const words = display.split(' ')
  let line = ''
  for (const word of words) {
    if ((line + word).length > 22) { if (line) lines.push(line.trim()); line = word + ' ' }
    else line += word + ' '
  }
  if (line.trim()) lines.push(line.trim())
  const bw = 130, bh = lines.length * 13 + 10, bx = x - bw / 2, by = y - bh - 12
  return (
    <g>
      <rect x={bx} y={by} width={bw} height={bh} rx="4" fill="#111122" stroke="#334466" strokeWidth="1" opacity="0.95" />
      <polygon points={`${x-5},${by+bh} ${x+5},${by+bh} ${x},${by+bh+10}`} fill="#111122" stroke="#334466" strokeWidth="1" />
      {lines.map((l, i) => (
        <text key={i} x={x} y={by + 13 + i * 13} textAnchor="middle" fill="#aabbcc" fontSize="8" fontFamily="Courier New, monospace">{l}</text>
      ))}
    </g>
  )
}
