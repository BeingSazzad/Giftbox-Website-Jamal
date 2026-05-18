'use client'
import { Button, Dropdown, MenuProps } from 'antd'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { DownOutlined, UserOutlined } from '@ant-design/icons'
import logoImg from '@/assets/logo.png'
import { useAuth } from '@/hooks/useAuth'

const mainLinks = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'How it Works', href: '/#how-it-works' },
]

const dropdownLinks = [
  { label: 'Contact', href: '/contact' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Terms & Conditions', href: '/terms' },
  { label: 'Privacy Policy', href: '/privacy' },
]

export function LandingHeader() {
  const router = useRouter()
  const [scrolled, setScrolled] = useState(false)
  const [moreOpen, setMoreOpen] = useState(false)
  const { token, logout } = useAuth()
  const isAuthenticated = !!token

  const userName = 'Sazzad'
  const avatar = 'https://i.pravatar.cc/200?img=12'

  const userMenuItems: MenuProps['items'] = [
    {
      key: 'dashboard',
      label: <Link href="/dashboard" className="text-white/80 hover:text-white font-medium">Dashboard</Link>,
    },
    {
      key: 'edit',
      label: <Link href="/profile?tab=profile" className="text-white/80 hover:text-white font-medium">Edit Profile</Link>,
    },
    {
      key: 'password',
      label: <Link href="/profile?tab=password" className="text-white/80 hover:text-white font-medium">Change Password</Link>,
    },
    {
      type: 'divider',
      className: 'bg-white/10'
    },
    {
      key: 'language',
      label: <Link href="/profile?tab=preferences" className="text-white/80 hover:text-white font-medium">Preferences</Link>,
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

  const linkClass =
    'px-3.5 py-2 rounded-[10px] text-white/70 text-sm font-medium no-underline transition-all duration-200 hover:text-white hover:bg-white/5 inline-flex items-center justify-center h-[38px]'

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
            <Link key={l.label} href={l.href} className={linkClass}>
              {l.label}
            </Link>
          ))}

          {/* More Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => setMoreOpen(true)}
            onMouseLeave={() => setMoreOpen(false)}
          >
            <button 
              className="px-3.5 py-2 rounded-[10px] text-white/70 text-sm font-medium transition-all duration-200 hover:text-white hover:bg-white/5 flex items-center justify-center gap-1.5 cursor-pointer bg-transparent border-none outline-none h-[38px]"
              onClick={() => setMoreOpen(!moreOpen)}
            >
              More <DownOutlined className={`text-[10px] transition-transform duration-300 ${moreOpen ? 'rotate-180 text-primary' : 'text-white/40'}`} />
            </button>

            {/* Dropdown Menu */}
            <div 
              className={`absolute left-0 top-[110%] w-56 rounded-2xl bg-[#110b24]/95 backdrop-blur-2xl border border-white/10 p-2 shadow-2xl transition-all duration-300 origin-top ${
                moreOpen 
                  ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto' 
                  : 'opacity-0 -translate-y-2 scale-95 pointer-events-none'
              }`}
            >
              {dropdownLinks.map((l) => (
                <Link 
                  key={l.label} 
                  href={l.href} 
                  className="block px-4 py-2.5 rounded-xl text-white/60 text-sm font-medium no-underline hover:text-white hover:bg-white/5 transition-all duration-200"
                  onClick={() => setMoreOpen(false)}
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        </nav>

        <div className="z-10 flex items-center gap-4">
          {isAuthenticated ? (
              <Dropdown 
                menu={{ items: userMenuItems }} 
                trigger={['click']} 
                placement="bottomRight"
                overlayClassName="custom-dropdown-dark"
              >
                <div className="flex items-center gap-3 cursor-pointer hover:opacity-90 transition-all group">
                  <div className="text-right">
                    <div className="text-white text-[13px] font-bold leading-tight group-hover:text-primary transition-colors">{userName}</div>
                    <div className="text-white/40 text-[10px] font-medium mt-0.5">Welcome back</div>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-[#ff8c00] p-0.5 shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform duration-300">
                    <img
                      src={avatar}
                      alt={userName}
                      className="w-full h-full rounded-full object-cover border-2 border-[#0a0514]"
                    />
                  </div>
                </div>
              </Dropdown>
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
