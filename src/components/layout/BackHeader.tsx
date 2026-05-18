'use client'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { useRouter } from 'next/navigation'
import type { ReactNode } from 'react'

interface BackHeaderProps {
  title: string
  subtitle?: string
  onBack?: () => void
  rightSlot?: ReactNode
}

export function BackHeader({ title, subtitle, onBack, rightSlot }: BackHeaderProps) {
  const router = useRouter()
  const handleBack = onBack ?? (() => router.back())

  return (
    <div className="relative flex items-center justify-center min-h-[44px] mb-6">
      <div className="absolute left-0 top-1/2 -translate-y-1/2">
        <button
          type="button"
          onClick={handleBack}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/6 border border-white/8 text-white hover:bg-white/10 transition-all cursor-pointer text-sm font-semibold"
        >
          <ArrowLeftOutlined style={{ fontSize: 13 }} />
          <span>Back</span>
        </button>
      </div>
      <div className="text-center px-14">
        <h1 className="m-0 text-white text-2xl font-bold leading-tight">{title}</h1>
        {subtitle && <div className="text-white/50 text-sm mt-1">{subtitle}</div>}
      </div>
      {rightSlot && (
        <div className="absolute right-0 top-1/2 -translate-y-1/2">
          {rightSlot}
        </div>
      )}
    </div>
  )
}
