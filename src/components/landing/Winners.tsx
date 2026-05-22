'use client';

import { useRef } from 'react'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import { participations } from '@/data/participations'
import { Section } from './Section'

export default function Winners() {
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
    <Section id="winners" className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_100%,rgba(255,105,0,0.07),transparent)] pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />

      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 relative z-10">
        <div className="text-left">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-5">
            🏆 Hall of Fame
          </div>
          <h2 className="m-0 text-white text-4xl md:text-5xl font-black leading-tight tracking-tight mb-3">Latest Winners</h2>
          <p className="text-white/50 text-base leading-relaxed m-0 max-w-lg">
            Meet our verified weekly draw winners who walked away with premium luxury prizes.
          </p>
        </div>

        {/* Carousel Navigation Buttons */}
        <div className="flex items-center gap-2 mt-6 md:mt-0">
          <button
            onClick={() => handleScroll('left')}
            className="w-12 h-12 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white/70 hover:text-white flex items-center justify-center transition-all cursor-pointer hover:scale-105 active:scale-95"
            aria-label="Previous slide"
          >
            <LeftOutlined className="text-sm" />
          </button>
          <button
            onClick={() => handleScroll('right')}
            className="w-12 h-12 rounded-xl bg-primary hover:bg-primary-dark text-white flex items-center justify-center transition-all cursor-pointer hover:scale-105 active:scale-95 shadow-[0_4px_16px_rgba(255,105,0,0.4)]"
            aria-label="Next slide"
          >
            <RightOutlined className="text-sm" />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth relative z-10 scrollbar-none"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {winners.map((w, i) => (
          <div
            key={i}
            className="w-full md:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)] shrink-0 snap-start relative group"
          >
            {/* Card */}
            <div className="relative bg-gradient-to-b from-[#18103a] to-[#0e0922] border border-white/[0.07] hover:border-primary/25 transition-all duration-400 rounded-3xl p-7 text-center overflow-hidden h-full">
              {/* Top glow streak */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

              {/* Hover inner glow */}
              <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 rounded-3xl pointer-events-none" />

              {/* Verified badge */}
              <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-[#0d0720] border border-primary/20 px-2.5 py-1 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                <span className="text-primary text-[9px] font-black uppercase tracking-wider">Verified</span>
              </div>

              {/* Avatar with glowing ring */}
              <div className="relative w-20 h-20 mx-auto mb-5 mt-2">
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary to-[#ffaa00] p-[2.5px] group-hover:shadow-[0_0_20px_rgba(255,105,0,0.4)] transition-shadow duration-400">
                  <div className="w-full h-full rounded-full overflow-hidden bg-surface">
                    <img src={w.photo} alt={w.name} className="w-full h-full object-cover" />
                  </div>
                </div>
                {/* Trophy badge */}
                <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-primary flex items-center justify-center text-[11px] shadow-lg border-2 border-[#0e0922]">
                  🏆
                </div>
              </div>

              <h4 className="relative z-10 text-white text-lg font-black mb-1 tracking-tight">{w.name}</h4>
              <p className="relative z-10 text-white/35 text-[11px] font-semibold uppercase tracking-wider mb-5">Ticket #{w.ticketNumber}</p>

              {/* Prize box */}
              <div className="relative z-10 bg-[#0d0720] border border-primary/15 rounded-2xl py-3.5 px-4">
                <span className="text-white/30 text-[9px] font-bold uppercase tracking-widest block mb-1.5">Won Prize</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff6900] to-[#ffaa00] text-base font-black tracking-tight">{w.prize}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}
