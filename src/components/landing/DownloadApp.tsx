'use client';

import { Section } from './Section'

export default function DownloadApp() {
  return (
    <Section id="app">
      <div className="relative rounded-[2.5rem] overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.6)]">
        {/* BG layers */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1e1040] via-[#120a2a] to-[#07030f]" />
        {/* Right warm glow */}
        <div className="absolute right-0 top-0 w-[55%] h-full bg-[radial-gradient(ellipse_80%_100%_at_100%_50%,rgba(255,90,0,0.18),transparent)]" />
        {/* Left cool glow */}
        <div className="absolute left-0 top-0 w-[40%] h-full bg-[radial-gradient(ellipse_80%_100%_at_0%_50%,rgba(100,50,200,0.12),transparent)]" />
        {/* Top highlight streak */}
        <div className="absolute top-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/30 to-transparent" />
        {/* Subtle noise/grid texture */}
        <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: 'linear-gradient(white 1px,transparent 1px),linear-gradient(90deg,white 1px,transparent 1px)', backgroundSize: '48px 48px' }} />
        {/* Border */}
        <div className="absolute inset-0 rounded-[2.5rem] border border-white/[0.08] pointer-events-none" />

        <div className="relative z-10 px-8 py-12 md:px-14 md:py-16 flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Left: Text */}
          <div className="max-w-md text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Mobile App
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white leading-[1.1] mb-5 tracking-tight">
              Take Gift Box <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff6900] via-[#ffbb00] to-[#ff6900]">everywhere you go.</span>
            </h2>
            <p className="text-white/50 text-base leading-relaxed mb-8 max-w-sm">
              Never miss a draw. Upload payment proofs in one tap, track your entries, and get instant notifications when you win.
            </p>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
              <button className="h-12 flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/12 hover:border-white/25 text-white px-5 rounded-2xl transition-all hover:scale-105 cursor-pointer backdrop-blur-md">
                <AppleLogo />
                <div className="text-left">
                  <div className="text-[9px] text-white/40 font-semibold uppercase tracking-wider leading-none mb-1">Download on the</div>
                  <div className="text-sm font-bold leading-none">App Store</div>
                </div>
              </button>
              <button className="h-12 flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/12 hover:border-white/25 text-white px-5 rounded-2xl transition-all hover:scale-105 cursor-pointer backdrop-blur-md">
                <PlayLogo />
                <div className="text-left">
                  <div className="text-[9px] text-white/40 font-semibold uppercase tracking-wider leading-none mb-1">GET IT ON</div>
                  <div className="text-sm font-bold leading-none">Google Play</div>
                </div>
              </button>
            </div>
          </div>

          {/* Right: Phone Mockup */}
          <div className="relative w-full max-w-[380px] md:w-[500px] lg:w-[540px] shrink-0 select-none transform hover:scale-[1.02] transition-transform duration-700">
            {/* Outer glow */}
            <div className="absolute inset-0 bg-primary/20 blur-[80px] rounded-full scale-90 pointer-events-none" />

            {/* App Preview Image */}
            <img 
              src="/app_preview.png" 
              alt="Gift Box App Preview" 
              className="relative z-10 w-full h-auto object-contain drop-shadow-[0_32px_80px_rgba(0,0,0,0.7)]"
              draggable="false"
            />
          </div>
        </div>
      </div>
    </Section>
  )
}

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
