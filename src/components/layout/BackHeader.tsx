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
    <div className="flex items-center gap-3.5 mb-6">
      <button type="button" onClick={handleBack} className="icon-btn-round">
        <ArrowLeftOutlined style={{ fontSize: 15 }} />
      </button>
      <div>
        <h1 className="m-0 text-white text-2xl font-bold leading-tight">{title}</h1>
        {subtitle && <div className="text-white/50 text-xs mt-1">{subtitle}</div>}
      </div>
    </div>
  )
}
