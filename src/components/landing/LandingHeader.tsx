'use client'
import { Button } from 'antd'
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
  const { token } = useAuth()
  const isAuthenticated = !!token

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
            <Button type="primary" onClick={() => router.push('/dashboard')} icon={<UserOutlined />}>
              Dashboard
            </Button>
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
