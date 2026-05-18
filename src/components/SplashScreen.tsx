import { useEffect, useState } from 'react'
import splashImage from '@/assets/splash.png'

interface SplashScreenProps {
  duration?: number
  onFinish?: () => void
}

export function SplashScreen({ duration = 2000, onFinish }: SplashScreenProps) {
  const [fadingOut, setFadingOut] = useState(false)
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFadingOut(true), duration)
    const hideTimer = setTimeout(() => {
      setHidden(true)
      onFinish?.()
    }, duration + 500)

    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(hideTimer)
    }
  }, [duration, onFinish])

  if (hidden) return null

  return (
    <div
      className={[
        'fixed inset-0 z-9999 flex items-center justify-center transition-opacity duration-500 ease-out',
        'bg-[linear-gradient(135deg,#2a1854_0%,#1a0f3d_40%,#0d0820_100%)]',
        fadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100',
      ].join(' ')}
    >
      <img
        src={splashImage.src}
        alt="Splash"
        className="max-w-[20%] max-h-[10%] object-contain"
      />
    </div>
  )
}
