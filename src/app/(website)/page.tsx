'use client';
import { Button } from 'antd'
import {
  CheckCircleFilled,
  ClockCircleFilled,
  DownOutlined,
  SafetyCertificateFilled,
  TrophyFilled,
  WhatsAppOutlined,
  ArrowRightOutlined,
  StarFilled,
  ThunderboltFilled,
  GiftFilled,
  MobileOutlined,
  LeftOutlined,
  RightOutlined,
  SmileFilled,
  CalendarFilled,
  CrownFilled
} from '@ant-design/icons'
import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation';
import { LandingHeader } from '@/components/landing/LandingHeader'
import { LandingFooter } from '@/components/landing/LandingFooter'
import { Countdown } from '@/components/common/Countdown'
import { currentDraw } from '@/data/draws'
import { participations } from '@/data/participations'
import splashImg from '@/assets/splash.png'
import giftBoxImg from '@/assets/images/luxury_gift_box.png'
import premiumPrizesImg from '@/assets/images/luxury_premium_prizes.png'
import { useAuth } from '@/hooks/useAuth'

const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
  const rect = e.currentTarget.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top
  e.currentTarget.style.setProperty('--mouse-x', `${x}px`)
  e.currentTarget.style.setProperty('--mouse-y', `${y}px`)
}

export default function LandingPage() {
  return (
    <div className="bg-[#0a0514] min-h-screen font-sans selection:bg-primary/30 selection:text-white">
      <LandingHeader />
      <Hero />
      <StatsBar />
      <AboutUsShort />
      <HowItWorks />
      <FeaturedPrize />
      <WhyUs />
      <Winners />
      <DownloadApp />
      <FaqPreview />
      <CtaSection />
      <LandingFooter />
    </div>
  )
}

function Section({ id, children, className = '' }: { id?: string; children: React.ReactNode; className?: string }) {
  return (
    <section id={id} className={`max-w-7xl mx-auto px-6 md:px-12 py-14 md:py-16 ${className}`}>
      {children}
    </section>
  )
}

function SectionTitle({ eyebrow, title, subtitle, align = 'center' }: { eyebrow: string; title: string; subtitle?: string; align?: 'center' | 'left' }) {
  const isLeft = align === 'left'
  return (
    <div className={`${isLeft ? 'text-left' : 'text-center'} mb-10 relative`}>
      <div className={`inline-flex items-center ${isLeft ? 'justify-start' : 'justify-center'} px-4 py-1.5 rounded-full spell-shimmer-badge text-primary text-xs font-bold uppercase tracking-wider mb-4`}>
        {eyebrow}
      </div>
      <h2 className="m-0 text-white text-3xl md:text-4xl font-black leading-tight mb-2 tracking-tight spell-text-glow">{title}</h2>
      {subtitle && (
        <p className={`mt-2 mb-0 ${isLeft ? 'mr-auto' : 'mx-auto'} max-w-2xl text-white/60 text-base leading-relaxed`}>
          {subtitle}
        </p>
      )}
    </div>
  )
}

function Hero() {
  const router = useRouter()
  const { token } = useAuth()
  const isAuthenticated = !!token

  return (
    <section className="relative w-full max-w-7xl mx-auto px-6 md:px-12 pt-20 pb-12 md:pt-36 md:pb-24 overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/20 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute top-40 right-0 w-[400px] h-[400px] bg-purple-600/20 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
        <div className="text-left">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/80 text-sm font-medium mb-8 backdrop-blur-md">
            <span className="w-2.5 h-2.5 rounded-full bg-success animate-pulse" />
            Live Now: Weekly Mega Draw
          </div>

          <h1 className="text-5xl md:text-7xl font-black text-white leading-[1.1] tracking-tight mb-6">
            Win premium <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFB900] via-[#FF6900] to-[#E65E00]">
              luxury & prizes.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-white/70 leading-relaxed mb-10 max-w-xl">
            Turn a small entry into life-changing rewards. Grab your ticket, upload payment proof, and stand a chance to win premium gadgets, luxury gifts, and exclusive prizes — delivered straight to your door.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => {
                if (isAuthenticated) {
                  router.push(`/draws/${currentDraw.id}`)
                } else {
                  router.push('/login')
                }
              }}
              className="px-8 py-4 bg-primary hover:bg-primary-dark text-white rounded-xl font-bold text-lg transition-all hover:scale-105 shadow-[0_0_40px_rgba(255,105,0,0.3)] flex items-center gap-2 cursor-pointer border-none outline-none spell-btn-glow"
            >
              Participate Now <ArrowRightOutlined />
            </button>
            <button
              onClick={() => { document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' }) }}
              className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-xl font-bold text-lg transition-all backdrop-blur-sm cursor-pointer"
            >
              How it Works
            </button>
          </div>

          <div className="flex items-center gap-6 mt-12 text-white/50 text-sm font-medium">
            <span className="flex items-center gap-2"><SafetyCertificateFilled className="text-primary text-lg" /> Verified Platform</span>
            <span className="flex items-center gap-2"><TrophyFilled className="text-primary text-lg" /> 100% Random Draw</span>
          </div>
        </div>

        <div className="relative w-full aspect-square flex justify-center items-center select-none">
          {/* Pulsing Neon Backdrop Glow */}
          <div className="absolute w-[360px] h-[360px] bg-gradient-to-tr from-primary/20 to-purple-500/25 rounded-full blur-[90px]" style={{ animation: 'glow-pulse 4s ease-in-out infinite' }} />

          {/* Large Outer dashed Orbit Ring */}
          <div className="absolute w-[440px] h-[440px] rounded-full border border-white/5 border-dashed" style={{ animation: 'orbit-rotate 48s linear infinite' }} />

          {/* Inner double styling Orbit Ring */}
          <div className="absolute w-[350px] h-[350px] rounded-full border border-primary/10 border-double" style={{ animation: 'orbit-rotate 28s linear infinite reverse' }} />

          {/* Rotating Glowing Core Ring */}
          <div className="absolute w-[280px] h-[280px] rounded-full border border-white/10" style={{ animation: 'orbit-rotate 60s linear infinite' }}>
            {/* Ambient small neon dot floating on core ring */}
            <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-primary shadow-[0_0_15px_#ff6900] animate-pulse" />
          </div>

          {/* Floating Arched Winner Portrait Canvas with Custom Glow */}
          <div 
            className="relative z-10 w-full max-w-[340px] aspect-[3/4] bg-gradient-to-tr from-[#160d30] via-surface/40 to-primary/10 rounded-[3rem] border border-white/10 p-[1.5px] shadow-[0_30px_70px_rgba(0,0,0,0.6)] cursor-pointer"
            style={{ animation: 'float-box 6s ease-in-out infinite' }}
          >
            {/* Arched Photo container */}
            <div className="relative w-full h-full rounded-[2.9rem] overflow-hidden group">
              <img 
                src="/images/winner_celebration.png" 
                alt="Ecstatic Winner Celebrating Success" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
              />
              {/* Warm dark bottom gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c051a]/95 via-transparent to-transparent" />
            </div>

            {/* Left Floating Star Badge (Aspirational Social Proof) */}
            <div 
              className="absolute top-1/4 -left-10 z-20 flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#160d30]/80 border border-white/15 text-white text-[10px] font-black uppercase tracking-widest backdrop-blur-md shadow-2xl transition-transform hover:scale-105"
              style={{ animation: 'float-box 5.5s ease-in-out infinite alternate' }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#00FF66] animate-pulse" />
              🏆 Verified Success
            </div>

            {/* Right Floating Reward Badge (Cash/Success Glow) */}
            <div 
              className="absolute bottom-1/3 -right-8 z-20 flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-primary to-primary-dark text-white text-[10px] font-black uppercase tracking-widest shadow-[0_10px_25px_rgba(255,105,0,0.3)] hover:scale-105 transition-transform"
              style={{ animation: 'float-box 7s ease-in-out infinite alternate-reverse' }}
            >
              🎉 Mega Prize Claimed
            </div>

            {/* Ambient Confetti / Star Particles floating around card */}
            {/* Gold Star Particle */}
            <svg 
              className="absolute -top-6 -right-6 z-20 w-8 h-8 text-yellow-400 animate-pulse select-none pointer-events-none drop-shadow-[0_0_10px_#EAB308]"
              viewBox="0 0 24 24" 
              fill="currentColor"
            >
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>

            {/* Orange Neon Particle */}
            <div 
              className="absolute bottom-10 -left-6 z-20 w-3 h-3 rounded-full bg-primary shadow-[0_0_12px_#ff6900] animate-ping"
              style={{ animationDuration: '3s' }}
            />

            {/* Purple Confetti pill */}
            <div 
              className="absolute top-1/2 -right-8 z-20 w-2.5 h-6 rounded-full bg-purple-500/60 rotate-45 animate-pulse"
              style={{ animationDuration: '4s' }}
            />

            {/* Green Success Confetti pill */}
            <div 
              className="absolute bottom-1/4 -left-8 z-20 w-6 h-2 rounded-full bg-[#00FF66]/50 -rotate-12 animate-pulse"
              style={{ animationDuration: '5s' }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

function StatsBar() {
  const stats = [
    {
      value: '5M+',
      label: 'Prizes Distributed',
      icon: <CrownFilled className="text-xl md:text-2xl text-[#FFB900] group-hover:text-[#FF6900] transition-colors duration-300 animate-pulse" />,
      glowColor: 'rgba(254, 147, 1, 0.15)',
      gradient: 'from-[#FFB900] via-[#FF6900] to-[#E65E00]',
      iconBg: 'bg-gradient-to-br from-[#FFB900]/25 to-[#FFB900]/5 border-[#FFB900]/35 group-hover:border-[#FFB900]/65 shadow-[0_0_15px_rgba(254,147,1,0.05)]',
      bgGlow: 'bg-[#FFB900]/5',
      borderColor: 'border-[#FFB900]/15 hover:border-[#FFB900]/45 shadow-[0_0_15px_rgba(254,147,1,0.02)]'
    },
    {
      value: '1,200+',
      label: 'Happy Winners',
      icon: <TrophyFilled className="text-xl md:text-2xl text-[#10b981] group-hover:text-[#059669] transition-colors duration-300" />,
      glowColor: 'rgba(16, 185, 129, 0.15)',
      gradient: 'from-[#10b981] via-[#059669] to-[#047857]',
      iconBg: 'bg-gradient-to-br from-[#10b981]/25 to-[#10b981]/5 border-[#10b981]/35 group-hover:border-[#10b981]/65 shadow-[0_0_15px_rgba(16,185,129,0.05)]',
      bgGlow: 'bg-[#10b981]/5',
      borderColor: 'border-[#10b981]/15 hover:border-[#10b981]/45 shadow-[0_0_15px_rgba(16,185,129,0.02)]'
    },
    {
      value: '52',
      label: 'Draws per Year',
      icon: <ThunderboltFilled className="text-xl md:text-2xl text-[#3b82f6] group-hover:text-[#2563eb] transition-colors duration-300" />,
      glowColor: 'rgba(59, 130, 246, 0.15)',
      gradient: 'from-[#3b82f6] via-[#2563eb] to-[#1d4ed8]',
      iconBg: 'bg-gradient-to-br from-[#3b82f6]/25 to-[#3b82f6]/5 border-[#3b82f6]/35 group-hover:border-[#3b82f6]/65 shadow-[0_0_15px_rgba(59,130,246,0.05)]',
      bgGlow: 'bg-[#3b82f6]/5',
      borderColor: 'border-[#3b82f6]/15 hover:border-[#3b82f6]/45 shadow-[0_0_15px_rgba(59,130,246,0.02)]'
    },
    {
      value: '100%',
      label: 'Transparency',
      icon: <SafetyCertificateFilled className="text-xl md:text-2xl text-[#a855f7] group-hover:text-[#7c3aed] transition-colors duration-300" />,
      glowColor: 'rgba(168, 85, 247, 0.15)',
      gradient: 'from-[#a855f7] via-[#7c3aed] to-[#6d28d9]',
      iconBg: 'bg-gradient-to-br from-[#a855f7]/25 to-[#a855f7]/5 border-[#a855f7]/35 group-hover:border-[#a855f7]/65 shadow-[0_0_15px_rgba(168,85,247,0.05)]',
      bgGlow: 'bg-[#a855f7]/5',
      borderColor: 'border-[#a855f7]/15 hover:border-[#a855f7]/45 shadow-[0_0_15px_rgba(168,85,247,0.02)]'
    },
  ]

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-20 -mt-10">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s) => (
          <div
            key={s.label}
            className={`relative overflow-hidden bg-[#0c071a]/50 backdrop-blur-2xl border ${s.borderColor} rounded-[2rem] p-6 md:p-8 flex flex-col items-center text-center group transition-all duration-500 hover:-translate-y-2 select-none`}
            style={{
              boxShadow: `0 20px 40px -15px rgba(0, 0, 0, 0.5), 0 0 30px 0 var(--hover-glow, transparent)`
            }}
            onMouseEnter={(e) => e.currentTarget.style.setProperty('--hover-glow', s.glowColor)}
            onMouseLeave={(e) => e.currentTarget.style.setProperty('--hover-glow', 'transparent')}
          >
            {/* Glow Decorative Blob */}
            <div className={`absolute -top-12 -right-12 w-24 h-24 rounded-full blur-2xl opacity-10 transition-opacity duration-500 group-hover:opacity-20 ${s.bgGlow}`} />

            {/* Custom Icon Circle */}
            <div className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl ${s.iconBg} border flex items-center justify-center mb-5 md:mb-6 group-hover:scale-110 transition-transform duration-500`}>
              {s.icon}
            </div>

            {/* Gradient Number */}
            <div className={`text-3xl md:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r ${s.gradient} mb-2 tracking-tight group-hover:scale-105 transition-transform duration-300`}>
              {s.value}
            </div>

            {/* Label */}
            <div className="text-white/60 text-[10px] md:text-xs font-black uppercase tracking-widest mt-1">
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function AboutUsShort() {
  return (
    <Section id="about" className="mt-6 md:mt-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center">
        <div className="relative w-full aspect-square md:aspect-[4/3] flex items-center justify-center">
          {/* Glowing colorful backdrop blur blob */}
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-purple-600/20 rounded-[3rem] blur-3xl transform rotate-3 scale-95 pointer-events-none"></div>

          {/* Glass Card frame */}
          <div className="relative w-full h-full bg-[#0c071a]/40 backdrop-blur-2xl border border-white/10 rounded-[3rem] overflow-hidden group shadow-2xl">
            <img
              src={giftBoxImg.src}
              alt="Luxury Golden Gift Box"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 select-none"
            />
          </div>
        </div>

        <div>
          <SectionTitle eyebrow="About Us" title="Your trusted platform for weekly wins." align="left" />
          <p className="text-white/70 text-lg leading-relaxed mb-8 -mt-10">
            Unlike traditional lotteries, Gift Box operates with 100% transparency. Every draw is conducted live, every winner is verified, and every prize is guaranteed to be brand new and authentic. We handle the logistics so all you have to do is enjoy your win.
          </p>
          <ul className="space-y-4">
            {['No hidden fees or subscriptions', 'Guaranteed weekly prize fulfillment', 'Secure payment verification'].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-white/80 font-medium text-lg">
                <CheckCircleFilled className="text-success text-xl" /> {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  )
}

function HowItWorks() {
  const steps = [
    { n: '01', title: 'Browse Active Draws', desc: "See this week's premium prize, ticket price, and time remaining.", icon: <StarFilled /> },
    { n: '02', title: 'Upload Proof', desc: 'Pay via secure external methods and upload your screenshot to enter.', icon: <SafetyCertificateFilled /> },
    { n: '03', title: 'Win Big', desc: 'Winners are drawn randomly and notified immediately for prize delivery.', icon: <TrophyFilled /> },
  ]
  return (
    <Section id="how-it-works" className="bg-surface/30 border-y border-white/5 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
      <SectionTitle eyebrow="How it works" title="Three simple steps." subtitle="No complicated rules. Grab a ticket, upload your proof, and wait for the draw." />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {steps.map((s) => (
          <div
            key={s.n}
            onMouseMove={handleMouseMove}
            className="bg-surface/50 border border-white/10 hover:border-primary/50 transition-all duration-500 rounded-[2rem] p-10 relative overflow-hidden group spell-glow-card"
          >
            <div className="absolute -right-10 -top-10 text-9xl font-black text-white/[0.03] group-hover:text-primary/10 transition-all duration-500 transform group-hover:scale-110">{s.n}</div>
            <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center text-3xl mb-8 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
              {s.icon}
            </div>
            <h3 className="text-2xl font-bold text-white mb-4 relative z-10">{s.title}</h3>
            <p className="text-white/60 text-base leading-relaxed relative z-10">{s.desc}</p>
          </div>
        ))}
      </div>
    </Section>
  )
}

function FeaturedPrize() {
  const router = useRouter()
  const { token } = useAuth()
  const isAuthenticated = !!token
  return (
    <Section id="prizes">
      <SectionTitle eyebrow="Featured" title="The prize on the line" subtitle="Brand new, sealed, and ready to ship to the winner free of charge." />

      <div className="relative bg-gradient-to-br from-[#1a0f3d] to-[#0d0722] border border-primary/20 rounded-[2rem] p-4 md:p-10 overflow-hidden shadow-2xl shadow-primary/10">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 blur-[100px] rounded-full"></div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-stretch relative z-10">
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 shadow-2xl aspect-square lg:aspect-auto lg:h-[380px] bg-night/20 backdrop-blur-sm">
            <img
              src={currentDraw.image}
              alt={currentDraw.title}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 select-none"
            />
          </div>

          <div className="flex flex-col justify-center">
            <div className="inline-block bg-danger/20 text-danger border border-danger/30 rounded-full px-3 py-1 text-xs font-bold w-max mb-4">
              Ends very soon
            </div>
            <h3 className="text-3xl md:text-4xl font-black text-white mb-4 leading-tight">{currentDraw.title}</h3>
            <p className="text-white/70 text-base leading-relaxed mb-6">
              {currentDraw.description}
            </p>

            {/* Clean, Premium Info Bar */}
            <div className="flex flex-wrap items-center gap-x-8 gap-y-6 mb-8 py-5 border-y border-white/10">
              <div className="shrink-0">
                <span className="text-white/40 text-xs font-bold uppercase tracking-wider block mb-2">Ticket Price</span>
                <span className="text-primary text-2xl lg:text-3xl font-black block leading-none select-none">
                  {currentDraw.ticketPrice.toLocaleString()} {currentDraw.currency}
                </span>
              </div>

              {/* Vertical divider line on desktop */}
              <div className="hidden sm:block w-px h-12 bg-white/10 shrink-0 self-center" />

              <div className="min-w-[280px] flex-grow">
                <span className="text-white/40 text-xs font-bold uppercase tracking-wider block mb-2">Countdown</span>
                <Countdown endsAt={currentDraw.endsAt} />
              </div>
            </div>

            <button
              onClick={() => {
                if (isAuthenticated) {
                  router.push(`/draws/${currentDraw.id}`)
                } else {
                  router.push('/login')
                }
              }}
              className="w-full py-4 bg-gradient-to-r from-primary to-primary-dark text-white rounded-xl font-bold text-lg shadow-[0_10px_30px_rgba(255,105,0,0.2)] hover:scale-[1.02] transition-all cursor-pointer flex justify-center items-center gap-2 spell-btn-glow"
            >
              {isAuthenticated ? 'Participate Now' : 'Sign In to Participate'} <ArrowRightOutlined />
            </button>
          </div>
        </div>
      </div>
    </Section>
  )
}

function WhyUs() {
  const cards = [
    { icon: <SafetyCertificateFilled className="text-2xl transition-colors duration-300 text-primary group-hover:text-white" />, title: 'Secure transactions', desc: 'Pay safely via trusted mobile platforms (M-Pesa, Orange Money). We only verify the transaction receipt, keeping your bank details 100% private.' },
    { icon: <CheckCircleFilled className="text-2xl transition-colors duration-300 text-primary group-hover:text-white" />, title: 'Transparent draw system', desc: 'Every entry is recorded, every ticket number is verifiable, and all draws are live-announced. No hidden shortcuts, no preferences.' },
    { icon: <TrophyFilled className="text-2xl transition-colors duration-300 text-primary group-hover:text-white" />, title: 'Fast reward delivery', desc: 'Verified winners are processed instantly. Your brand-new, sealed prize is delivered completely free of charge to your door.' },
  ]
  return (
    <Section id="why-us">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center">
        {/* Left Side: Stunning Editorial Image */}
        <div className="relative group">
          {/* Multi-layered gradient neon glowing blobs */}
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-purple-600/20 rounded-[3.5rem] blur-3xl transform rotate-3 scale-95 pointer-events-none"></div>

          <div className="relative overflow-hidden rounded-[3.5rem] border border-white/10 shadow-2xl aspect-[4/3] flex items-center justify-center bg-[#0c071a]/40 backdrop-blur-md">
            <img
              src={premiumPrizesImg.src}
              alt="Premium Gift Quality"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 select-none"
            />
          </div>
        </div>

        {/* Right Side: Editorial Feature List */}
        <div>
          <div className="text-left mb-10">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-black uppercase tracking-wider mb-6 select-none backdrop-blur-md">
              🛡️ Why Choose Us
            </div>
            <h2 className="m-0 text-white text-3xl md:text-4xl lg:text-5xl font-black leading-[1.1] tracking-tighter mb-4 lg:whitespace-nowrap">Built on trust, not just luck.</h2>
            <p className="mt-4 mb-0 text-white/60 text-base leading-relaxed">
              Gift Box operates with 100% transparency. We document every draw, name every winner, and manage all logistics for a premium experience.
            </p>
          </div>

          <div className="space-y-4">
            {cards.map((c, i) => (
              <div
                key={i}
                className="group flex gap-5 items-start p-5 rounded-[2rem] bg-[#0c071a]/30 hover:bg-[#0c071a]/60 border border-white/5 hover:border-primary/25 transition-all duration-300 hover:-translate-y-1 shadow-lg"
              >
                <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 group-hover:bg-primary group-hover:border-primary transition-all duration-300 flex items-center justify-center shrink-0">
                  {c.icon}
                </div>
                <div>
                  <h3 className="text-white text-lg font-bold mb-1.5 group-hover:text-primary transition-colors duration-300">{c.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed m-0">{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}

function Winners() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const winners = participations
    .filter((p) => p.status === 'completed' && p.winners && p.winners.length > 0)
    .flatMap((p) => (p.winners ?? []).map((w) => ({ ...w, prize: p.prizeTitle })))

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current
      const cardWidth = clientWidth / 3
      const offset = direction === 'left' ? -cardWidth * 3 : cardWidth * 3
      scrollRef.current.scrollTo({ left: scrollLeft + offset, behavior: 'smooth' })
    }
  }

  return (
    <Section id="winners" className="bg-surface/30 border-y border-white/5 relative overflow-hidden">
      {/* Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-primary/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 relative z-10">
        <div className="text-left">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-bold uppercase tracking-widest mb-6">
            Hall of Fame
          </div>
          <h2 className="m-0 text-white text-4xl md:text-5xl font-black leading-tight tracking-tight mb-4">Latest Winners</h2>
          <p className="text-white/60 text-lg leading-relaxed m-0 max-w-xl">
            Meet our verified weekly draw winners who walked away with their premium new luxury prizes.
          </p>
        </div>

        {/* Carousel Navigation Buttons */}
        <div className="flex items-center gap-3 mt-6 md:mt-0">
          <button
            onClick={() => handleScroll('left')}
            className="w-12 h-12 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white flex items-center justify-center transition-all cursor-pointer hover:scale-105 active:scale-95"
            aria-label="Previous slide"
          >
            <LeftOutlined className="text-base" />
          </button>
          <button
            onClick={() => handleScroll('right')}
            className="w-12 h-12 rounded-xl bg-primary hover:bg-primary-dark text-white flex items-center justify-center transition-all cursor-pointer hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,105,0,0.3)]"
            aria-label="Next slide"
          >
            <RightOutlined className="text-base" />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scroll-smooth relative z-10 scrollbar-none"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {winners.map((w, i) => (
          <div
            key={i}
            onMouseMove={handleMouseMove}
            className="w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] shrink-0 snap-start bg-surface/40 hover:bg-surface/60 backdrop-blur-xl border border-white/5 hover:border-primary/30 transition-all duration-500 rounded-[2.5rem] p-8 text-center relative overflow-hidden group spell-glow-card"
          >
            {/* Inner ambient glow on hover */}
            <div className="absolute -inset-px bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2.5rem]" />

            <div className="absolute top-6 right-6 bg-primary/10 text-primary border border-primary/20 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">
              Draw Verified
            </div>

            <div className="relative z-10 w-24 h-24 rounded-full overflow-hidden mx-auto mb-6 border-4 border-surface shadow-2xl group-hover:scale-105 transition-transform duration-500">
              <img src={w.photo} alt={w.name} className="w-full h-full object-cover" />
            </div>

            <h4 className="relative z-10 text-white text-xl font-bold mb-1 tracking-tight">{w.name}</h4>
            <p className="relative z-10 text-white/50 text-xs font-semibold uppercase tracking-wider mb-6">Ticket: #{w.ticketNumber}</p>

            <div className="relative z-10 bg-white/5 border border-white/5 rounded-2xl py-3.5 px-5 flex flex-col items-center">
              <span className="text-white/40 text-[10px] font-bold uppercase tracking-wider mb-1">Won Prize</span>
              <span className="text-primary text-base font-black tracking-tight">{w.prize}</span>
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}

function DownloadApp() {
  return (
    <Section id="app">
      <div className="bg-gradient-to-r from-[#1a0f3d] to-[#0d0722] border border-white/10 rounded-[2.5rem] px-5 py-10 md:p-14 flex flex-col md:flex-row items-center justify-between overflow-hidden relative shadow-2xl">
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(255,105,0,0.2)_0%,transparent_60%)] z-0" />

        <div className="relative z-10 max-w-xl mb-8 md:mb-0 text-center md:text-left">
          <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-white/10 text-white text-xs font-bold uppercase tracking-widest mb-4 md:mb-6 backdrop-blur-md">
            Mobile App
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white leading-tight mb-4 md:mb-6">
            Take Gift Box <br /><span className="text-primary">everywhere you go.</span>
          </h2>
          <p className="text-white/70 text-base leading-relaxed mb-6 md:mb-10">
            Never miss a draw. Upload your payment proofs in one tap, track your entries, and get instant notifications when you win. Available now on iOS and Android.
          </p>

          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
            <button className="flex items-center gap-3 bg-black border border-white/20 hover:border-white/40 text-white px-5 py-2.5 rounded-2xl transition-all hover:scale-105 cursor-pointer">
              <AppleLogo />
              <div className="text-left">
                <div className="text-[9px] text-white/60 font-semibold uppercase tracking-wider leading-none mb-1">Available for</div>
                <div className="text-base font-bold leading-none">Apple iOS</div>
              </div>
            </button>
            <button className="flex items-center gap-3 bg-black border border-white/20 hover:border-white/40 text-white px-5 py-2.5 rounded-2xl transition-all hover:scale-105 cursor-pointer">
              <PlayLogo />
              <div className="text-left">
                <div className="text-[9px] text-white/60 font-semibold uppercase tracking-wider leading-none mb-1">Available for</div>
                <div className="text-base font-bold leading-none">Android</div>
              </div>
            </button>
          </div>
        </div>

        <div className="relative z-10 w-full max-w-[320px] flex justify-center">
          {/* Phone Frame Mockup */}
          <div className="relative w-full aspect-[1/2.05] rounded-[3.2rem] border-[10px] border-[#1e1635] bg-[#080414] shadow-2xl overflow-hidden transform rotate-[-5deg] hover:rotate-0 transition-transform duration-700 select-none">
            {/* Dynamic Island / Speaker Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-5 bg-black rounded-b-xl z-40 flex items-center justify-center">
              <div className="w-10 h-0.5 bg-white/10 rounded-full mb-1"></div>
            </div>

            {/* Dashboard Screenshot Preview */}
            <img src="/app_preview.png" alt="App Preview" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </Section>
  )
}

function FaqPreview() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const [showAll, setShowAll] = useState(false)
  const faqs = [
    { q: 'How do I participate in a draw?', a: "Create an account, pick a draw, pay the ticket via M-Pesa or Orange Money, and upload your payment proof. Once verified, you're in." },
    { q: 'How long does payment verification take?', a: "Usually 24–48 hours. You'll be notified the moment your entry is approved or if anything is off with the proof." },
    { q: 'How are winners chosen?', a: 'Through a certified random draw on the scheduled date. Each verified ticket has an equal chance — no preferences, no shortcuts.' },
    { q: 'What happens if I win?', a: 'We contact you via WhatsApp or phone using your registered number, then deliver the prize free of charge within 5 days.' },
    { q: 'Is there a limit to how many tickets I can purchase?', a: 'No, you can purchase as many tickets as you like to increase your chances of winning the featured prize.' },
    { q: 'What payment methods are supported?', a: 'We support secure payments via popular mobile payment methods (M-Pesa, Orange Money, Wave) and standard bank transfers. Simply upload a clear screenshot of the transaction.' },
    { q: 'Can I participate from outside the country?', a: 'Yes, Gift Box is a global platform. As long as you can make payments via our verified channels and receive deliveries, you are welcome to join.' },
    { q: 'How can I verify the draw is genuine?', a: 'Every single draw is conducted live using a certified, completely random draw system. We publish the full draw recordings and verified winner lists on our results page.' },
    { q: 'Are my personal details secure?', a: 'Absolutely. We only use your registration details for delivery and identification. We never sell your personal information or store financial banking credentials.' },
    { q: 'What if I upload the wrong payment proof?', a: 'Don\'t worry! Our support team will decline the proof and add a note explaining why. You will be able to upload the correct transaction proof immediately.' }
  ]

  const visibleFaqs = showAll ? faqs : faqs.slice(0, 6)

  return (
    <Section id="faq" className="max-w-4xl">
      <SectionTitle
        eyebrow="Help & Support"
        title="Answers to your questions."
        subtitle="Find quick, transparent answers to everything about tickets, payments, draws, and prize delivery."
      />

      <div className="space-y-4">
        {visibleFaqs.map((f, i) => {
          const isOpen = openIndex === i
          return (
            <div key={i} className={`bg-surface/40 backdrop-blur-md border rounded-2xl overflow-hidden transition-all duration-300 ${isOpen ? 'border-primary/50 bg-surface/80' : 'border-white/10 hover:border-white/20'}`}>
              <button
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="w-full px-6 py-5 flex items-center justify-between text-left cursor-pointer bg-transparent border-none outline-none"
              >
                <span className="text-lg font-bold text-white">{f.q}</span>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-primary text-white rotate-180' : 'bg-white/5 text-white/50'}`}>
                  <DownOutlined className="text-sm" />
                </div>
              </button>
              <div className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-40 pb-5 opacity-100' : 'max-h-0 pb-0 opacity-0'}`}>
                <p className="text-white/60 text-base leading-relaxed m-0">{f.a}</p>
              </div>
            </div>
          )
        })}
      </div>

      <div className="text-center mt-10">
        <button
          onClick={() => setShowAll(!showAll)}
          className="px-8 py-4 bg-white/5 hover:bg-white/10 hover:border-primary/50 text-white border border-white/10 rounded-xl font-bold text-base transition-all cursor-pointer inline-flex items-center gap-2"
        >
          {showAll ? 'Show Less' : 'See More FAQs'}
          <DownOutlined className={`text-xs transition-transform duration-300 ${showAll ? 'rotate-180' : ''}`} />
        </button>
      </div>
    </Section>
  )
}

function CtaSection() {
  const router = useRouter()
  return (
    <Section>
      <div className="relative rounded-[2rem] overflow-hidden shadow-2xl">
        {/* Background layers */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a0d35] via-[#110828] to-[#06020f]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(255,105,0,0.13),transparent)]" />

        {/* Glows */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-primary/15 blur-[100px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[300px] bg-violet-600/10 blur-[100px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[300px] bg-primary/8 blur-[100px] rounded-full pointer-events-none" />

        {/* Border */}
        <div className="absolute inset-0 rounded-[2rem] border border-white/[0.07] pointer-events-none" />

        {/* Decorative grid lines */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(white 1px,transparent 1px),linear-gradient(90deg,white 1px,transparent 1px)', backgroundSize: '60px 60px' }} />

        {/* Sparkle dots */}
        <div className="absolute top-8 left-[15%] w-1.5 h-1.5 rounded-full bg-primary/60 shadow-[0_0_8px_2px_rgba(255,105,0,0.5)]" />
        <div className="absolute top-16 right-[18%] w-1 h-1 rounded-full bg-white/40 shadow-[0_0_6px_1px_rgba(255,255,255,0.3)]" />
        <div className="absolute bottom-12 left-[22%] w-1 h-1 rounded-full bg-violet-400/50 shadow-[0_0_6px_1px_rgba(167,139,250,0.4)]" />
        <div className="absolute bottom-8 right-[12%] w-1.5 h-1.5 rounded-full bg-primary/40 shadow-[0_0_8px_2px_rgba(255,105,0,0.3)]" />

        <div className="relative z-10 px-6 py-14 md:py-20 text-center max-w-3xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-7">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="text-primary text-xs font-bold uppercase tracking-widest">Weekly Mega Draw — Open Now</span>
          </div>

          <h2 className="text-4xl md:text-[3.25rem] font-black text-white leading-[1.1] mb-5 tracking-tight">
            Ready to win{' '}
            <span className="relative inline-block">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff6900] via-[#ffaa00] to-[#ff6900]">
                something amazing?
              </span>
              <span className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
            </span>
          </h2>

          <p className="text-white/50 text-base md:text-lg font-medium leading-relaxed mb-9 max-w-xl mx-auto">
            Create your account in under a minute and grab a ticket for this week's mega draw before time runs out.
          </p>

          <button
            onClick={() => router.push('/register')}
            className="px-12 py-4 bg-gradient-to-r from-[#ff6900] to-[#ff9500] hover:from-[#ff7a1a] hover:to-[#ffaa22] text-white rounded-2xl font-black text-lg transition-all hover:scale-[1.04] shadow-[0_8px_32px_rgba(255,105,0,0.4)] hover:shadow-[0_14px_44px_rgba(255,105,0,0.55)] cursor-pointer mb-7"
          >
            Join Now →
          </button>

          {/* Social proof row */}
          <div className="flex items-center justify-center gap-6 text-white/30 text-xs font-medium">
            <span className="flex items-center gap-1.5"><span className="text-primary">✓</span> Free to join</span>
            <span className="w-px h-3 bg-white/10" />
            <span className="flex items-center gap-1.5"><span className="text-primary">✓</span> No credit card needed</span>
            <span className="w-px h-3 bg-white/10" />
            <span className="flex items-center gap-1.5"><span className="text-primary">✓</span> 10,000+ winners</span>
          </div>
        </div>
      </div>
    </Section>
  )
}

// Keep the same SVG components
function AppleLogo() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="#ffffff">
      <path d="M17.05 12.04c-.03-2.9 2.37-4.3 2.48-4.36-1.36-1.98-3.46-2.25-4.21-2.28-1.79-.18-3.5 1.06-4.41 1.06-.93 0-2.32-1.04-3.82-1.01-1.96.03-3.78 1.14-4.79 2.9-2.06 3.57-.52 8.84 1.47 11.74.99 1.42 2.16 3.01 3.7 2.95 1.49-.06 2.05-.96 3.85-.96 1.8 0 2.31.96 3.88.93 1.61-.03 2.62-1.44 3.6-2.87 1.14-1.64 1.6-3.24 1.62-3.32-.04-.02-3.1-1.19-3.13-4.72zM14.7 4.34c.82-.99 1.36-2.36 1.21-3.74-1.17.05-2.6.78-3.45 1.77-.76.87-1.43 2.27-1.25 3.61 1.31.1 2.65-.66 3.49-1.64z" />
    </svg>
  )
}

function PlayLogo() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24">
      <path d="M3.6 1.8c-.3.3-.4.7-.4 1.2v18c0 .5.1.9.4 1.2L13.4 12 3.6 1.8z" fill="#FE9301" />
      <path d="M16.8 8.4 13.4 12l3.4 3.6 4.2-2.4c1.2-.7 1.2-2.4 0-3.1l-4.2-2.7z" fill="#FFB900" />
      <path d="M3.6 1.8 13.4 12l3.4-3.6L4.6 1.4c-.3-.2-.7-.1-1 .4z" fill="#34A853" />
      <path d="M13.4 12 3.6 22.2c.3.5.7.6 1 .4l12.2-7L13.4 12z" fill="#EA4335" />
    </svg>
  )
}
