'use client'

interface PageHeaderProps {
  title: string
  subtitle?: string
}

export function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <div className="w-full text-center border-b border-white/5 pb-6 mb-8">
      <h1 className="m-0 text-white text-2xl md:text-3xl font-black tracking-tight leading-tight whitespace-nowrap">
        {title}
      </h1>
      {subtitle && (
        <p className="m-0 mt-1.5 text-white/40 text-sm font-medium">{subtitle}</p>
      )}
    </div>
  )
}
