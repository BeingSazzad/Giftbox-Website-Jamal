'use client';

import React from 'react'
import {
  CheckCircleFilled,
  SafetyCertificateFilled,
  TrophyFilled,
  ArrowRightOutlined,
  StarFilled,
  ThunderboltFilled,
  CrownFilled
} from '@ant-design/icons'
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic'
import { LandingHeader } from '@/components/landing/LandingHeader'
import { LandingFooter } from '@/components/landing/LandingFooter'
import { Countdown } from '@/components/common/Countdown'
import { currentDraw } from '@/data/draws'
import giftBoxImg from '@/assets/images/luxury_gift_box.png'
import premiumPrizesImg from '@/assets/images/luxury_premium_prizes.png'
import { useAuth } from '@/hooks/useAuth'
import { Section, SectionTitle } from '@/components/landing/Section'

// Below-the-fold sections are lazy-loaded to improve initial bundle and page performance
const Winners = dynamic(() => import('@/components/landing/Winners'), {
  loading: () => <div className="min-h-[400px] flex items-center justify-center text-white/50">Loading Winners...</div>,
  ssr: false
})

const DownloadApp = dynamic(() => import('@/components/landing/DownloadApp'), {
  loading: () => <div className="min-h-[300px] flex items-center justify-center text-white/50">Loading Section...</div>,
  ssr: false
})

const FaqPreview = dynamic(() => import('@/components/landing/FaqPreview'), {
  loading: () => <div className="min-h-[400px] flex items-center justify-center text-white/50">Loading FAQ...</div>,
  ssr: false
})

const CtaSection = dynamic(() => import('@/components/landing/CtaSection'), {
  loading: () => <div className="min-h-[250px] flex items-center justify-center text-white/50">Loading...</div>,
  ssr: false
})

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

function Hero() {
  const router = useRouter()
  const { token } = useAuth()
  const isAuthenticated = !!token

  return (
    <section className="relative w-full pt-20 pb-12 md:pt-36 md:pb-24 overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/20 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute top-40 right-0 w-[400px] h-[400px] bg-purple-600/20 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/80 text-sm font-medium mb-8 backdrop-blur-md">
              <span className="w-2.5 h-2.5 rounded-full bg-success animate-pulse" />
              Live Now: Weekly Mega Draw
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-white leading-[1.1] tracking-tight mb-6">
              Win premium <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFB900] via-[#FF6900] to-[#E65E00]">
                luxury & prizes.
              </span>
            </h1>

            <p className="text-lg md:text-xl text-white/70 leading-relaxed mb-10 max-w-xl">
              Turn a small entry into life-changing rewards. Grab your ticket, upload payment proof, and stand a chance to win premium gadgets, luxury gifts, and exclusive prizes â€” delivered straight to your door.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => {
                  document.getElementById('prizes')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="h-12 px-8 bg-gradient-to-br from-[#FFB900] to-[#FF6900] hover:from-[#FFC933] hover:to-[#FF7E1A] text-[#1a0f0a] rounded-xl font-bold text-lg transition-all hover:-translate-y-px hover:scale-105 shadow-[0_4px_20px_rgba(255,105,0,0.35)] hover:shadow-[0_8px_32px_rgba(255,105,0,0.5)] flex items-center justify-center gap-2 cursor-pointer border-none outline-none spell-btn-glow"
              >
                Participate Now <ArrowRightOutlined />
              </button>
              <button
                onClick={() => { document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' }) }}
                className="h-12 px-8 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-xl font-bold text-lg transition-all backdrop-blur-sm cursor-pointer flex items-center justify-center"
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
                className="absolute top-1/4 left-2 md:-left-10 z-20 flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#160d30]/80 border border-white/15 text-white text-[10px] font-black uppercase tracking-widest backdrop-blur-md shadow-2xl transition-transform hover:scale-105"
                style={{ animation: 'float-box 5.5s ease-in-out infinite alternate' }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#00FF66] animate-pulse" />
                ðŸ† Verified Success
              </div>

              {/* Right Floating Reward Badge (Cash/Success Glow) */}
              <div 
                className="absolute bottom-1/3 right-2 md:-right-8 z-20 flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-primary to-primary-dark text-white text-[10px] font-black uppercase tracking-widest shadow-[0_10px_25px_rgba(255,105,0,0.3)] hover:scale-105 transition-transform"
                style={{ animation: 'float-box 7s ease-in-out infinite alternate-reverse' }}
              >
                ðŸŽ‰ Mega Prize Claimed
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
      </div>
    </section>
  )
}

function StatsBar() {
  const stats = [
    {
      value: '5M+',
      label: 'Prizes Distributed',
      icon: <CrownFilled className="text-sm sm:text-xl md:text-2xl text-[#FFB900] group-hover:text-[#FF6900] transition-colors duration-300 animate-pulse" />,
      glowColor: 'rgba(254, 147, 1, 0.15)',
      gradient: 'from-[#FFB900] via-[#FF6900] to-[#E65E00]',
      iconBg: 'bg-gradient-to-br from-[#FFB900]/25 to-[#FFB900]/5 border-[#FFB900]/35 group-hover:border-[#FFB900]/65 shadow-[0_0_15px_rgba(254,147,1,0.05)]',
      bgGlow: 'bg-[#FFB900]/5',
      borderColor: 'border-[#FFB900]/15 hover:border-[#FFB900]/45 shadow-[0_0_15px_rgba(254,147,1,0.02)]'
    },
    {
      value: '1,200+',
      label: 'Happy Winners',
      icon: <TrophyFilled className="text-sm sm:text-xl md:text-2xl text-[#10b981] group-hover:text-[#059669] transition-colors duration-300" />,
      glowColor: 'rgba(16, 185, 129, 0.15)',
      gradient: 'from-[#10b981] via-[#059669] to-[#047857]',
      iconBg: 'bg-gradient-to-br from-[#10b981]/25 to-[#10b981]/5 border-[#10b981]/35 group-hover:border-[#10b981]/65 shadow-[0_0_15px_rgba(16,185,129,0.05)]',
      bgGlow: 'bg-[#10b981]/5',
      borderColor: 'border-[#10b981]/15 hover:border-[#10b981]/45 shadow-[0_0_15px_rgba(16,185,129,0.02)]'
    },
    {
      value: '52',
      label: 'Draws per Year',
      icon: <ThunderboltFilled className="text-sm sm:text-xl md:text-2xl text-[#3b82f6] group-hover:text-[#2563eb] transition-colors duration-300" />,
      glowColor: 'rgba(59, 130, 246, 0.15)',
      gradient: 'from-[#3b82f6] via-[#2563eb] to-[#1d4ed8]',
      iconBg: 'bg-gradient-to-br from-[#3b82f6]/25 to-[#3b82f6]/5 border-[#3b82f6]/35 group-hover:border-[#3b82f6]/65 shadow-[0_0_15px_rgba(59,130,246,0.05)]',
      bgGlow: 'bg-[#3b82f6]/5',
      borderColor: 'border-[#3b82f6]/15 hover:border-[#3b82f6]/45 shadow-[0_0_15px_rgba(59,130,246,0.02)]'
    },
    {
      value: '100%',
      label: 'Transparency',
      icon: <SafetyCertificateFilled className="text-sm sm:text-xl md:text-2xl text-[#a855f7] group-hover:text-[#7c3aed] transition-colors duration-300" />,
      glowColor: 'rgba(168, 85, 247, 0.15)',
      gradient: 'from-[#a855f7] via-[#7c3aed] to-[#6d28d9]',
      iconBg: 'bg-gradient-to-br from-[#a855f7]/25 to-[#a855f7]/5 border-[#a855f7]/35 group-hover:border-[#a855f7]/65 shadow-[0_0_15px_rgba(168,85,247,0.05)]',
      bgGlow: 'bg-[#a855f7]/5',
      borderColor: 'border-[#a855f7]/15 hover:border-[#a855f7]/45 shadow-[0_0_15px_rgba(168,85,247,0.02)]'
    },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 relative z-20 mt-12 md:-mt-10">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
        {stats.map((s) => (
          <div
            key={s.label}
            className={`relative overflow-hidden bg-[#0c071a]/50 backdrop-blur-2xl border ${s.borderColor} rounded-2xl sm:rounded-[2rem] p-3.5 sm:p-6 md:p-8 flex flex-col items-center text-center group transition-all duration-500 hover:-translate-y-2 select-none`}
            style={{
              boxShadow: `0 20px 40px -15px rgba(0, 0, 0, 0.5), 0 0 30px 0 var(--hover-glow, transparent)`
            }}
            onMouseEnter={(e) => e.currentTarget.style.setProperty('--hover-glow', s.glowColor)}
            onMouseLeave={(e) => e.currentTarget.style.setProperty('--hover-glow', 'transparent')}
          >
            {/* Glow Decorative Blob */}
            <div className={`absolute -top-12 -right-12 w-24 h-24 rounded-full blur-2xl opacity-10 transition-opacity duration-500 group-hover:opacity-20 ${s.bgGlow}`} />

            {/* Custom Icon Circle */}
            <div className={`w-9 h-9 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-xl sm:rounded-2xl ${s.iconBg} border flex items-center justify-center mb-3 sm:mb-5 md:mb-6 group-hover:scale-110 transition-transform duration-500`}>
              {s.icon}
            </div>

            {/* Gradient Number */}
            <div className={`text-2xl sm:text-3xl md:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r ${s.gradient} mb-1 sm:mb-2 tracking-tight group-hover:scale-105 transition-transform duration-300`}>
              {s.value}
            </div>

            {/* Label */}
            <div className="text-white/60 text-[8px] sm:text-[10px] md:text-xs font-black uppercase tracking-widest mt-1 sm:mt-1.5">
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
            className="bg-surface/50 border border-white/10 hover:border-primary/50 transition-all duration-500 rounded-[2rem] p-6 sm:p-10 relative overflow-hidden group spell-glow-card"
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
            <h3 className="text-3xl md:text-4xl font-black text-white mb-4 leading-tight">{currentDraw.title}</h3>
            <p className="text-white/70 text-base leading-relaxed mb-6">
              {currentDraw.description}
            </p>

            {/* Clean, Premium Info Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-x-8 gap-y-6 mb-8 py-5 border-y border-white/10">
              <div className="shrink-0">
                <span className="text-white/40 text-xs font-bold uppercase tracking-wider block mb-2">Ticket Price</span>
                <span className="text-primary text-2xl lg:text-3xl font-black block leading-none select-none">
                  {currentDraw.ticketPrice.toLocaleString()} {currentDraw.currency}
                </span>
              </div>

              {/* Vertical divider line on desktop */}
              <div className="hidden sm:block w-px h-12 bg-white/10 shrink-0 self-center" />

              <div className="min-w-0 flex-grow">
                <span className="text-white/40 text-xs font-bold uppercase tracking-wider block mb-2">Countdown</span>
                <Countdown endsAt={currentDraw.endsAt} />
              </div>
            </div>

            <button
              onClick={() => {
                if (isAuthenticated) {
                  router.push(`/draws/${currentDraw.id}`)
                } else {
                  router.push(`/login?redirect=/draws/${currentDraw.id}`)
                }
              }}
              className="h-12 w-full bg-gradient-to-br from-[#FFB900] to-[#FF6900] hover:from-[#FFC933] hover:to-[#FF7E1A] text-[#1a0f0a] rounded-xl font-bold text-lg shadow-[0_4px_20px_rgba(255,105,0,0.3)] hover:shadow-[0_8px_28px_rgba(255,105,0,0.45)] hover:-translate-y-px hover:scale-[1.02] transition-all cursor-pointer flex justify-center items-center gap-2 spell-btn-glow"
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
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-purple-600/20 rounded-2xl blur-3xl transform rotate-3 scale-95 pointer-events-none"></div>

          <div className="relative overflow-hidden rounded-2xl border border-white/10 shadow-2xl aspect-[4/3] flex items-center justify-center bg-[#0c071a]/40 backdrop-blur-md">
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
              ðŸ›¡ï¸ Why Choose Us
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
                className="group flex flex-col sm:flex-row gap-4 sm:gap-5 items-start p-5 sm:p-6 rounded-[2rem] bg-[#0c071a]/30 hover:bg-[#0c071a]/60 border border-white/5 hover:border-primary/25 transition-all duration-300 hover:-translate-y-1 shadow-lg"
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
