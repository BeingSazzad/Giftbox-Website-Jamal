'use client'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { BellOutlined, MenuOutlined, CloseOutlined, UserOutlined, SettingOutlined, QuestionCircleOutlined, LogoutOutlined, GlobalOutlined } from '@ant-design/icons'
import logoImg from '@/assets/logo.png'
import { useAuth } from '@/hooks/useAuth'
import { Button, message } from 'antd'

interface NavItem {
  href: string
  label: string
}

const publicLinks: NavItem[] = [
  { href: '/about', label: 'About Us' },
  { href: '/#how-it-works', label: 'How it Works' },
  { href: '/contact', label: 'Contact' },
]

const authLinks: NavItem[] = [
  { href: '/about', label: 'About Us' },
  { href: '/my-draws', label: 'My Draws' },
  { href: '/contact', label: 'Contact' },
]

const dropdownLinks = [
  { label: 'FAQ', href: '/faq' },
  { label: 'Terms & Conditions', href: '/terms' },
  { label: 'Privacy Policy', href: '/privacy' },
]

/**
 * Slim top bar shown only on mobile (md:hidden).
 * Used as the default mobileHeader inside WebShell so every inner page
 * has a logo + fully functional navigation menu on small screens.
 */
export function MobileTopBar() {
  const router = useRouter()
  const pathname = usePathname()
  const { token, logout, user } = useAuth()
  const isAuthenticated = !!token
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [lang, setLang] = useState('en')

  const userName = user?.name || 'Sazzad'
  const userEmail = user?.email || 'sazzad@example.com'
  const avatar = 'https://i.pravatar.cc/200?img=12'

  const mainLinks = isAuthenticated ? authLinks : publicLinks

  // Manage body overflow when drawer is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setLang(localStorage.getItem('gb_lang') || 'en')
    }
  }, [])

  const handleLangChange = (key: string) => {
    setLang(key)
    localStorage.setItem('gb_lang', key)
    message.success(key === 'en' ? 'Language updated to English' : 'Langue changée en Français')
  }

  const handleLinkClick = (href: string) => {
    setIsMobileMenuOpen(false)
    if (href.startsWith('/#')) {
      // Handle anchor links
      router.push('/')
      setTimeout(() => {
        const id = href.replace('/#', '')
        const el = document.getElementById(id)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' })
        }
      }, 100)
    } else {
      router.push(href)
    }
  }

  return (
    <>
      <header className="md:hidden sticky top-0 z-50 bg-[#0a0514]/90 backdrop-blur-xl border-b border-white/6 flex items-center justify-between px-4 h-14 select-none">
        {/* Logo */}
        <Link
          href="/"
          onClick={() => setIsMobileMenuOpen(false)}
          className="flex items-center gap-2 no-underline outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0514] rounded-lg"
        >
          <img src={logoImg.src} alt="Gift Box Logo" className="w-8 h-8 object-contain" />
          <span className="text-white font-bold text-base font-display tracking-tight">Gift Box</span>
        </Link>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          {isAuthenticated && (
            <button
              type="button"
              aria-label="Notifications"
              className="w-9 h-9 rounded-full bg-white/5 border border-white/10 text-white flex items-center justify-center cursor-pointer transition-all hover:bg-white/10 relative"
            >
              <BellOutlined style={{ fontSize: 16 }} />
            </button>
          )}

          {/* Menu Toggle button */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white flex items-center justify-center cursor-pointer transition-all duration-200 outline-none"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? (
              <CloseOutlined style={{ fontSize: 16 }} />
            ) : (
              <MenuOutlined style={{ fontSize: 16 }} />
            )}
          </button>
        </div>
      </header>

      {/* Slide-down Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-14 bottom-0 z-40 bg-[#0a0514]/95 backdrop-blur-2xl border-t border-white/6 flex flex-col justify-between p-6 animate-in slide-in-from-top duration-300 overflow-y-auto pb-[calc(80px+env(safe-area-inset-bottom))]">
          <div className="flex flex-col gap-2">
            {/* Logged in User Profile Card */}
            {isAuthenticated && (
              <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-4 mb-4 flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-primary to-[#ff8c00] p-0.5 shadow-lg shadow-primary/20">
                  <img
                    src={avatar}
                    alt={userName}
                    className="w-full h-full rounded-full object-cover border-2 border-[#0c071a]"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-white text-base font-bold leading-tight truncate">
                    {userName}
                  </div>
                  <div className="text-white/40 text-xs mt-0.5 truncate">{userEmail}</div>
                </div>
                <span className="bg-primary/10 text-primary border border-primary/20 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider shrink-0">
                  Member
                </span>
              </div>
            )}

            {/* Menu Links */}
            {mainLinks.map((l) => (
              <button
                key={l.label}
                type="button"
                onClick={() => handleLinkClick(l.href)}
                className={[
                  'w-full px-4 py-3 rounded-xl text-base font-semibold transition-all duration-200 flex items-center text-left border-none bg-transparent cursor-pointer',
                  pathname === l.href
                    ? 'text-primary bg-primary/10'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                ].join(' ')}
              >
                {l.label}
              </button>
            ))}

            <div className="h-px bg-white/10 my-2" />
            <span className="px-4 text-xs font-bold text-white/35 uppercase tracking-wider mb-2">More Information</span>
            {dropdownLinks.map((l) => (
              <button
                key={l.label}
                type="button"
                onClick={() => handleLinkClick(l.href)}
                className={[
                  'w-full px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 flex items-center text-left border-none bg-transparent cursor-pointer',
                  pathname === l.href
                    ? 'text-primary bg-primary/10'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                ].join(' ')}
              >
                {l.label}
              </button>
            ))}

            {/* Touch-Friendly Segmented Language Switcher */}
            <div className="flex flex-col gap-2 px-4 mt-4">
              <span className="text-xs font-bold text-white/35 uppercase tracking-wider flex items-center gap-1.5">
                <GlobalOutlined className="text-white/45" /> Language
              </span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => handleLangChange('en')}
                  className={[
                    'flex-1 py-2 px-3 rounded-xl border text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer outline-none',
                    lang === 'en'
                      ? 'bg-primary/10 border-primary/40 text-primary font-bold'
                      : 'bg-white/5 border-white/10 text-white/60 hover:text-white hover:bg-white/10'
                  ].join(' ')}
                >
                  <span className="text-base select-none">🇺🇸</span> English
                </button>
                <button
                  type="button"
                  onClick={() => handleLangChange('fr')}
                  className={[
                    'flex-1 py-2 px-3 rounded-xl border text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer outline-none',
                    lang === 'fr'
                      ? 'bg-primary/10 border-primary/40 text-primary font-bold'
                      : 'bg-white/5 border-white/10 text-white/60 hover:text-white hover:bg-white/10'
                  ].join(' ')}
                >
                  <span className="text-base select-none">🇫🇷</span> Français
                </button>
              </div>
            </div>

            {isAuthenticated && (
              <>
                <div className="h-px bg-white/10 my-2" />
                <span className="px-4 text-xs font-bold text-white/35 uppercase tracking-wider mb-2">Account Settings</span>
                
                <button
                  type="button"
                  onClick={() => handleLinkClick('/profile')}
                  className="w-full px-4 py-2.5 rounded-xl text-sm font-medium text-white/60 hover:text-white hover:bg-white/5 transition-all duration-200 flex items-center gap-2.5 text-left border-none bg-transparent cursor-pointer"
                >
                  <UserOutlined />
                  Profile Details
                </button>
                <button
                  type="button"
                  onClick={() => handleLinkClick('/profile?tab=password')}
                  className="w-full px-4 py-2.5 rounded-xl text-sm font-medium text-white/60 hover:text-white hover:bg-white/5 transition-all duration-200 flex items-center gap-2.5 text-left border-none bg-transparent cursor-pointer"
                >
                  <SettingOutlined />
                  Change Password
                </button>
                <button
                  type="button"
                  onClick={() => handleLinkClick('/profile?tab=support')}
                  className="w-full px-4 py-2.5 rounded-xl text-sm font-medium text-white/60 hover:text-white hover:bg-white/5 transition-all duration-200 flex items-center gap-2.5 text-left border-none bg-transparent cursor-pointer"
                >
                  <QuestionCircleOutlined />
                  Help & Support
                </button>
                
                <button
                  type="button"
                  onClick={() => {
                    setIsMobileMenuOpen(false)
                    logout()
                    router.push('/login')
                  }}
                  className="w-full px-4 py-2.5 rounded-xl text-sm font-bold text-danger hover:bg-white/5 transition-all duration-200 flex items-center gap-2.5 text-left border-none bg-transparent cursor-pointer"
                >
                  <LogoutOutlined />
                  Sign Out
                </button>
              </>
            )}
          </div>

          {!isAuthenticated && (
            <div className="pt-4 mt-6 border-t border-white/10">
              <Button
                type="primary"
                size="large"
                className="w-full h-12"
                onClick={() => {
                  setIsMobileMenuOpen(false)
                  router.push('/login')
                }}
              >
                Get Started
              </Button>
            </div>
          )}
        </div>
      )}
    </>
  )
}
