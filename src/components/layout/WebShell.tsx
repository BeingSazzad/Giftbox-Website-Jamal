import type { ReactNode } from 'react'
import { TopNav } from './TopNav'
import { BottomNav } from './BottomNav'

interface WebShellProps {
  children: ReactNode
  showNav?: boolean
  maxWidth?: number
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
      {showNav && <TopNav />}
      {mobileHeader}
      <main
        className="flex-1 w-full mx-auto px-4 py-5 md:px-8 md:py-8 box-border pb-[calc(80px+env(safe-area-inset-bottom))] md:pb-8"
        style={{ maxWidth }}
      >
        {children}
      </main>
      {showNav && <BottomNav />}
    </div>
  )
}
