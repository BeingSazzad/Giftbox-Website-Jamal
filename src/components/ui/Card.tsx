'use client'
import React from 'react'

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean
  variant?: 'glass' | 'deep' | 'primary'
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className = '', hoverEffect = false, variant = 'glass', children, ...props }, ref) => {
    const baseStyle = 'rounded-3xl p-5 md:p-6 border backdrop-blur-md transition-all duration-300'
    
    const variants = {
      glass: 'bg-surface/50 border-white/10 shadow-xl',
      deep: 'bg-[#0c061a]/60 border-white/5 shadow-2xl',
      primary: 'bg-primary/2 border-primary/30 shadow-[0_0_20px_rgba(254,147,1,0.04)]',
    }

    const hoverStyle = hoverEffect
      ? 'hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_15px_30px_rgba(254,147,1,0.06)]'
      : ''

    return (
      <div
        ref={ref}
        className={[baseStyle, variants[variant], hoverStyle, className].join(' ')}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Card.displayName = 'Card'
