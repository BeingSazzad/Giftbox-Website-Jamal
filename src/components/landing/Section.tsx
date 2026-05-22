import React from 'react'

export function Section({ id, children, className = '' }: { id?: string; children: React.ReactNode; className?: string }) {
  return (
    <section id={id} className={`max-w-7xl mx-auto px-6 md:px-12 py-14 md:py-16 ${className}`}>
      {children}
    </section>
  )
}

export function SectionTitle({ eyebrow, title, subtitle, align = 'center' }: { eyebrow: string; title: string; subtitle?: string; align?: 'center' | 'left' }) {
  const isLeft = align === 'left'
  return (
    <div className={`${isLeft ? 'text-left' : 'text-center'} mb-10 relative`}>
      <div className={`inline-flex items-center ${isLeft ? 'justify-start' : 'justify-center'} px-4 py-1.5 rounded-full spell-shimmer-badge text-primary text-xs font-bold uppercase tracking-wider mb-4`}>
        {eyebrow}
      </div>
      <h2 className="m-0 text-white text-3xl md:text-4xl font-black leading-tight mb-2 tracking-tight spell-text-glow">{title}</h2>
      {subtitle && (
        <p className={`mt-2 mb-0 ${isLeft ? 'mr-auto' : 'mx-auto'} max-w-2xl text-white/60 text-base leading-relaxed`}>
          {subtitle}
        </p>
      )}
    </div>
  )
}
