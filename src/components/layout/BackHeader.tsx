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
    <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4 border-b border-white/5 pb-6 mb-8 w-full">
      {/* Left Column: Back button */}
      <div className="flex justify-start items-center">
        <button
          type="button"
          onClick={handleBack}
          className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white/80 hover:text-white hover:bg-white/10 transition-all cursor-pointer text-sm font-semibold h-10 shrink-0"
        >
          <ArrowLeftOutlined style={{ fontSize: 13 }} />
          <span>Back</span>
        </button>
      </div>

      {/* Center Column: Centered Title & Subtitle */}
      <div className="text-center flex flex-col items-center justify-center">
        <h1 className="m-0 text-white text-2xl md:text-3xl font-black tracking-tight leading-tight">{title}</h1>
        {subtitle && <span className="text-white/40 text-xs md:text-sm mt-1.5 font-medium max-w-xs md:max-w-md">{subtitle}</span>}
      </div>

      {/* Right Column: Custom Slot */}
      <div className="flex justify-end items-center">
        {rightSlot ? (
          <div className="flex items-center gap-3 shrink-0">
            {rightSlot}
          </div>
        ) : (
          /* Desktop invisible spacer to guarantee absolute centering of middle column */
          <div className="hidden md:block w-[78px] h-10" />
        )}
      </div>
    </div>
  )
}
