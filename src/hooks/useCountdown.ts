import { useCallback, useEffect, useState } from 'react'

export interface CountdownTime {
  d: number
  h: number
  m: number
  s: number
  expired: boolean
}

/**
 * A hook to calculate the countdown remaining until a target ISO date string.
 * @param targetIso Target date string in ISO format.
 * @returns An object containing days, hours, minutes, seconds, and expired status.
 */
export function useCountdown(targetIso: string): CountdownTime {
  const calc = useCallback((): CountdownTime => {
    const diff = Math.max(0, new Date(targetIso).getTime() - Date.now())
    const d = Math.floor(diff / 86400000)
    const h = Math.floor((diff % 86400000) / 3600000)
    const m = Math.floor((diff % 3600000) / 60000)
    const s = Math.floor((diff % 60000) / 1000)
    return { d, h, m, s, expired: diff === 0 }
  }, [targetIso])

  const [time, setTime] = useState<CountdownTime>(calc)

  useEffect(() => {
    // Initial sync
    setTime(calc())
    
    const id = setInterval(() => {
      setTime(calc())
    }, 1000)

    return () => clearInterval(id)
  }, [calc])

  return time
}
