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
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() =>
    calculateTimeLeft(endsAt),
  )

  useEffect(() => {
    const t = setInterval(() => setTimeLeft(calculateTimeLeft(endsAt)), 1000)
    return () => clearInterval(t)
  }, [endsAt])

  const cells: { value: number; label: string }[] = [
    { value: timeLeft.days, label: 'Day' },
    { value: timeLeft.hours, label: 'Hours' },
    { value: timeLeft.minutes, label: 'Mins' },
    { value: timeLeft.seconds, label: 'Secs' },
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
