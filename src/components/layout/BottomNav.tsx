'use client'
import { GiftFilled, HomeFilled, UserOutlined, LoginOutlined } from '@ant-design/icons'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { ReactNode } from 'react'
import { useAuth } from '@/hooks/useAuth'

interface Tab {
  to: string
  label: string
  icon: ReactNode
}

const publicTabs: Tab[] = [
  { to: '/', label: 'Home', icon: <HomeFilled style={{ fontSize: 22 }} /> },
  { to: '/login', label: 'Sign In', icon: <LoginOutlined style={{ fontSize: 22 }} /> },
]

const authTabs: Tab[] = [
  { to: '/my-draws', label: 'My Draws', icon: <GiftFilled style={{ fontSize: 22 }} /> },
  { to: '/profile', label: 'Profile', icon: <UserOutlined style={{ fontSize: 22 }} /> },
]

export function BottomNav() {
  const pathname = usePathname()
  const { token } = useAuth()
  const isAuthenticated = !!token

  const tabs = isAuthenticated ? authTabs : publicTabs

  return (
    <nav
      className="md:hidden fixed bottom-0 inset-x-0 z-50 bg-[#0a0514]/95 backdrop-blur-xl border-t border-white/8"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="flex items-stretch px-2 pt-1.5 pb-1.5">
        {tabs.map((tab) => {
          const isActive = pathname.startsWith(tab.to) && tab.to !== '/'
          return (
            <Link
              key={tab.to}
              href={tab.to}
              className={[
                'flex-1 flex flex-col items-center justify-center gap-1 py-2 mx-1 rounded-xl no-underline transition-colors duration-200',
                isActive ? 'bg-primary/12 text-primary' : 'text-white/70 hover:text-white',
              ].join(' ')}
            >
              <span aria-hidden>{tab.icon}</span>
              <span className="text-[11px] font-semibold leading-none">{tab.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
