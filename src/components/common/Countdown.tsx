'use client'
import { useEffect, useState } from 'react'

interface CountdownProps {
  endsAt: string
}

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

function calculateTimeLeft(endsAt: string): TimeLeft {
  const diff = Math.max(0, new Date(endsAt).getTime() - Date.now())
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}

export function Countdown({ endsAt }: CountdownProps) {
  const [mounted, setMounted] = useState(false)
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  useEffect(() => {
    setMounted(true)
    setTimeLeft(calculateTimeLeft(endsAt))
    const t = setInterval(() => setTimeLeft(calculateTimeLeft(endsAt)), 1000)
    return () => clearInterval(t)
  }, [endsAt])

  const cells: { value: number; label: string }[] = [
    { value: mounted ? timeLeft.days : 0, label: 'Day' },
    { value: mounted ? timeLeft.hours : 0, label: 'Hours' },
    { value: mounted ? timeLeft.minutes : 0, label: 'Mins' },
    { value: mounted ? timeLeft.seconds : 0, label: 'Secs' },
  ]

  return (
    <div className="grid grid-cols-4 gap-2.5">
      {cells.map((c) => (
        <div
          key={c.label}
          className="bg-deep/50 border border-white/6 rounded-[10px] py-3 px-1.5 text-center"
        >
          <div className="text-primary text-[22px] font-bold leading-[1.1]">
            {String(c.value).padStart(2, '0')}
          </div>
          <div className="text-white/55 text-xs mt-1">{c.label}</div>
        </div>
      ))}
    </div>
  )
}
