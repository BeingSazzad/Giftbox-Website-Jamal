import type { ReactNode } from 'react'
import { TopNav } from './TopNav'
import { BottomNav } from './BottomNav'
import { MobileTopBar } from './MobileTopBar'

interface WebShellProps {
  children: ReactNode
  showNav?: boolean
  maxWidth?: number
  /** Override the default mobile top bar with a custom element (e.g. MobileHomeHeader or BackHeader) */
  mobileHeader?: ReactNode
}

export function WebShell({
  children,
  showNav = true,
  maxWidth = 1280,
  mobileHeader,
}: WebShellProps) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Desktop sticky nav — hidden on mobile */}
      {showNav && <TopNav />}

      {/* Mobile top bar: custom if provided, otherwise the default slim logo bar */}
      {showNav && (mobileHeader ?? <MobileTopBar />)}

      <main
        className="flex-1 w-full mx-auto px-4 py-4 md:px-8 md:py-8 box-border pb-[calc(80px+env(safe-area-inset-bottom))] md:pb-8"
        style={{ maxWidth }}
      >
        {children}
      </main>

      {showNav && <BottomNav />}
    </div>
  )
}
