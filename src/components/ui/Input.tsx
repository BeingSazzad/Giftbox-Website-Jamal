'use client'
import React from 'react'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  prefixIcon?: React.ReactNode
  suffixIcon?: React.ReactNode
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', label, error, prefixIcon, suffixIcon, disabled, ...props }, ref) => {
    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label className="text-white/70 font-semibold text-xs uppercase tracking-wider">
            {label}
          </label>
        )}
        <div className="relative flex items-center w-full">
          {prefixIcon && (
            <div className="absolute left-4 text-white/30 pointer-events-none flex items-center justify-center">
              {prefixIcon}
            </div>
          )}
          <input
            ref={ref}
            disabled={disabled}
            className={[
              'w-full bg-[#0c061a] text-white text-sm font-medium rounded-xl border transition-all duration-300 outline-none h-11',
              prefixIcon ? 'pl-11' : 'pl-4',
              suffixIcon ? 'pr-11' : 'pr-4',
              error
                ? 'border-danger focus:border-danger focus:ring-1 focus:ring-danger'
                : 'border-white/8 hover:border-white/20 focus:border-primary focus:ring-1 focus:ring-primary',
              'placeholder:text-white/45 disabled:opacity-50 disabled:pointer-events-none',
              className,
            ].join(' ')}
            {...props}
          />
          {suffixIcon && (
            <div className="absolute right-4 text-white/30 pointer-events-none flex items-center justify-center">
              {suffixIcon}
            </div>
          )}
        </div>
        {error && (
          <span className="text-danger text-xs font-medium tracking-wide mt-0.5">
            {error}
          </span>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'
