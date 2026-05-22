'use client';

import { useRouter } from 'next/navigation'
import { Section } from './Section'

export default function CtaSection() {
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
            className="h-12 px-12 bg-gradient-to-br from-[#FFB900] to-[#FF6900] hover:from-[#FFC933] hover:to-[#FF7E1A] text-[#1a0f0a] rounded-2xl font-black text-lg transition-all hover:-translate-y-px hover:scale-[1.04] shadow-[0_6px_28px_rgba(255,105,0,0.4)] hover:shadow-[0_14px_44px_rgba(255,105,0,0.55)] cursor-pointer inline-flex items-center justify-center mb-7"
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
