'use client'
import { Button, Dropdown, MenuProps, message } from 'antd'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { DownOutlined, UserOutlined, BellOutlined } from '@ant-design/icons'
import logoImg from '@/assets/logo.png'
import { useAuth } from '@/hooks/useAuth'

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

export function LandingHeader() {
  const pathname = usePathname()
  const router = useRouter()
  const [scrolled, setScrolled] = useState(false)
  const { token, logout } = useAuth()
  const isAuthenticated = !!token

  const userName = 'Sazzad'
  const avatar = 'https://i.pravatar.cc/200?img=12'

  const [lang, setLang] = useState('en')
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

  const langMenuItems: MenuProps['items'] = [
    {
      key: 'en',
      label: <span className="text-white/80 hover:text-white font-medium flex items-center gap-2">🇺🇸 English</span>,
      onClick: () => handleLangChange('en')
    },
    {
      key: 'fr',
      label: <span className="text-white/80 hover:text-white font-medium flex items-center gap-2">🇫🇷 Français</span>,
      onClick: () => handleLangChange('fr')
    }
  ]

  const moreMenuItems: MenuProps['items'] = dropdownLinks.map((l) => ({
    key: l.label,
    label: <Link href={l.href} className="text-white/80 hover:text-white font-medium">{l.label}</Link>,
  }))

  const userMenuItems: MenuProps['items'] = [
    {
      key: 'edit',
      label: <Link href="/profile?tab=profile" className="text-white/80 hover:text-white font-medium">Edit Profile</Link>,
    },
    {
      key: 'password',
      label: <Link href="/profile?tab=password" className="text-white/80 hover:text-white font-medium">Change Password</Link>,
    },
    {
      key: 'support',
      label: <Link href="/profile?tab=support" className="text-white/80 hover:text-white font-medium">Help & Support</Link>,
    },
    {
      type: 'divider',
      className: 'bg-white/10'
    },
    {
      key: 'logout',
      danger: true,
      label: <div onClick={() => { logout(); router.push('/login'); }} className="font-bold text-danger">Sign Out</div>,
    },
  ]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const mainLinks = isAuthenticated ? authLinks : publicLinks

  const linkClass = (href: string) => {
    const isActive = pathname === href
    return [
      'px-3.5 py-2 rounded-[10px] text-sm font-medium no-underline transition-all duration-200 inline-flex items-center justify-center h-[38px]',
      isActive
        ? 'text-primary bg-primary/10 font-semibold'
        : 'text-white/70 hover:text-white hover:bg-white/5'
    ].join(' ')
  }

  return (
    <header
      className={[
        'sticky top-0 z-50 transition-all duration-200',
        scrolled
          ? 'bg-deep/85 backdrop-blur-xl border-b border-white/6'
          : 'bg-transparent border-b border-transparent',
      ].join(' ')}
    >
      <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between relative">
        <Link href="/" className="flex items-center gap-2.5 no-underline z-10">
          <img src={logoImg.src} alt="Logo" className="w-10 h-10 object-contain" />
          <span className="text-white font-bold text-xl font-display tracking-tight">Gift Box</span>
        </Link>

        <nav className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center gap-1.5 z-10">
          {mainLinks.map((l) => (
            <Link key={l.label} href={l.href} className={linkClass(l.href)}>
              {l.label}
            </Link>
          ))}

          {/* More Dropdown */}
          <Dropdown
            menu={{ items: moreMenuItems }}
            trigger={['hover', 'click']}
            placement="bottomLeft"
            classNames={{ root: "custom-dropdown-dark" }}
          >
            <button
              className="px-3.5 py-2 rounded-[10px] text-white/70 text-sm font-medium transition-all duration-200 hover:text-white hover:bg-white/5 flex items-center justify-center gap-1.5 cursor-pointer bg-transparent border-none outline-none h-[38px] group"
            >
              More <DownOutlined className="text-[10px] text-white/40 group-hover:text-primary transition-colors duration-200" />
            </button>
          </Dropdown>
        </nav>

        <div className="z-10 flex items-center gap-4 md:gap-6">
          {/* Language Switcher */}
          <Dropdown
            menu={{ items: langMenuItems }}
            trigger={['click']}
            placement="bottomRight"
            classNames={{ root: "custom-dropdown-dark" }}
          >
            <button
              type="button"
              className="px-2.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white flex items-center gap-1.5 cursor-pointer transition-all duration-200 outline-none hover:border-primary/30 h-10 select-none font-semibold text-xs"
            >
              <span className="text-sm leading-none select-none">{lang === 'en' ? '🇺🇸' : '🇫🇷'}</span>
              <span className="text-white/70 uppercase">{lang}</span>
              <DownOutlined className="text-[9px] text-white/30" />
            </button>
          </Dropdown>

          {isAuthenticated ? (
            <>
              {/* Notifications Dropdown */}
              <Dropdown
                trigger={['click']}
                placement="bottomRight"
                popupRender={() => (
                  <div className="bg-surface border border-white/10 rounded-2xl w-80 shadow-2xl overflow-hidden mt-2 animate-in fade-in zoom-in duration-200">
                    <div className="px-4 py-3 border-b border-white/10 bg-white/[0.02]">
                      <span className="text-white font-bold text-sm">Notifications</span>
                    </div>
                    <div className="p-8 text-center text-white/40 flex flex-col items-center justify-center gap-3">
                      <BellOutlined className="text-3xl opacity-20" />
                      <p className="text-xs m-0">You have no new notifications.</p>
                    </div>
                  </div>
                )}
              >
                <button
                  type="button"
                  className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white flex items-center justify-center cursor-pointer relative transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0514]"
                >
                  <BellOutlined style={{ fontSize: 16 }} />
                </button>
              </Dropdown>

              {/* User Dropdown */}
              <Dropdown
                menu={{ items: userMenuItems }}
                trigger={['click']}
                placement="bottomRight"
                classNames={{ root: "custom-dropdown-dark" }}
              >
                <div className="flex items-center gap-3 cursor-pointer hover:opacity-90 transition-all group">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-[#ff8c00] p-0.5 shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform duration-300">
                    <img
                      src={avatar}
                      alt={userName}
                      className="w-full h-full rounded-full object-cover border-2 border-[#0a0514]"
                    />
                  </div>
                </div>
              </Dropdown>
            </>
          ) : (
            <Button type="primary" onClick={() => router.push('/login')}>
              Get Started
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}
