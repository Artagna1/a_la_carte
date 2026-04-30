import { useState, useEffect } from 'react'

const MODES = {
  express: { min: 15 * 60, max: 45 * 60 },
  courte: { min: 24 * 60 * 60, max: 7 * 24 * 60 * 60 },
}

function pickDuration(mode) {
  const { min, max } = MODES[mode]
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function formatTime(seconds) {
  if (seconds <= 0) return null
  if (seconds >= 86400) {
    const days = Math.floor(seconds / 86400)
    const hours = Math.floor((seconds % 86400) / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    return `${days}j ${String(hours).padStart(2, '0')}h ${String(minutes).padStart(2, '0')}m`
  }
  const minutes = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
}

export function useTimer() {
  const [mode, setMode] = useState(null)
  const [remaining, setRemaining] = useState(null)
  const [totalSeconds, setTotalSeconds] = useState(null)
  const isRunning = remaining !== null && remaining > 0
  const isExpired = remaining === 0

  useEffect(() => {
    if (!isRunning) return
    const id = setInterval(() => setRemaining((r) => r - 1), 1000)
    return () => clearInterval(id)
  }, [isRunning])

  function start(selectedMode) {
    const duration = pickDuration(selectedMode)
    setMode(selectedMode)
    setTotalSeconds(duration)
    setRemaining(duration)
  }

  return {
    mode,
    totalSeconds,
    remaining,
    isRunning,
    isExpired,
    display: remaining !== null ? formatTime(remaining) : null,
    start,
  }
}
