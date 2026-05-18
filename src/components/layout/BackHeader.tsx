'use client'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { useRouter } from 'next/navigation'

interface BackHeaderProps {
  title: string
  subtitle?: string
  onBack?: () => void
}

export function BackHeader({ title, subtitle, onBack }: BackHeaderProps) {
  const router = useRouter()
  const handleBack = onBack ?? (() => router.back())

  return (
    <div className="relative flex items-center justify-center min-h-[44px] mb-6">
      <div className="absolute left-0 top-1/2 -translate-y-1/2">
        <button type="button" onClick={handleBack} className="icon-btn-round">
          <ArrowLeftOutlined style={{ fontSize: 15 }} />
        </button>
      </div>
      <div className="text-center px-14">
        <h1 className="m-0 text-white text-2xl font-bold leading-tight">{title}</h1>
        {subtitle && <div className="text-white/50 text-sm mt-1">{subtitle}</div>}
      </div>
    </div>
  )
}
