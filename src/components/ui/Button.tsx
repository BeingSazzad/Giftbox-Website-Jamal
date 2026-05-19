'use client'
import React from 'react'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  block?: boolean
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'primary', size = 'md', loading = false, block = false, children, disabled, ...props }, ref) => {
    const baseStyle = 'inline-flex items-center justify-center font-bold transition-all duration-300 rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0514] disabled:opacity-50 disabled:pointer-events-none cursor-pointer'
    
    const variants = {
      primary: 'bg-gradient-to-tr from-primary to-[#ff8c00] hover:from-[#ff9e1b] hover:to-[#ffa024] text-[#1a0f0a] shadow-lg shadow-primary/20 hover:shadow-primary/30 active:scale-[0.98]',
      secondary: 'bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-primary/50 active:bg-white/12',
      ghost: 'bg-transparent hover:bg-white/5 text-white/80 hover:text-white',
    }

    const sizes = {
      sm: 'px-4 py-2 text-xs h-9',
      md: 'px-5 py-2.5 text-sm h-11',
      lg: 'px-7 py-3 text-base h-[48px]',
    }

    const blockStyle = block ? 'w-full flex' : ''

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={[baseStyle, variants[variant], sizes[size], blockStyle, className].join(' ')}
        {...props}
      >
        {loading && (
          <svg className="animate-spin -ml-1 mr-2.5 h-4.5 w-4.5 text-current" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        )}
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'
