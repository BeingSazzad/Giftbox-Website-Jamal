'use client'
import { WebShell } from '@/components/layout/WebShell'
import { PageHeader } from '@/components/layout/PageHeader'
import { TrophyFilled, SafetyCertificateFilled, GlobalOutlined } from '@ant-design/icons'
import luxuryAboutGiftboxImg from '@/assets/images/luxury_about_giftbox.png'

export default function AboutUsPage() {
  return (
    <WebShell>
      <PageHeader title="About Gift Box" subtitle="Your trusted platform for weekly wins" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 mt-10 items-center">
        {/* Left Side: Illustration */}
        <div className="relative w-full aspect-square md:aspect-auto md:h-full min-h-[320px] flex justify-center items-center">
          {/* Ambient Outer Glow */}
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 via-purple-500/20 to-transparent rounded-[40px] blur-3xl transform -rotate-6 scale-105 pointer-events-none animate-pulse duration-[8000ms]" />

          {/* Premium Glassmorphic Card Container */}
          <div className="relative w-full max-w-[420px] aspect-square bg-gradient-to-b from-white/10 to-white/2 border border-white/12 rounded-[3rem] p-6 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.6)] flex items-center justify-center backdrop-blur-2xl overflow-hidden group hover:scale-[1.02] transition-all duration-500">
            {/* Holographic internal reflection outline */}
            <div className="absolute inset-0 border border-transparent bg-gradient-to-b from-white/20 to-transparent rounded-[3rem] pointer-events-none opacity-40 group-hover:opacity-60 transition-opacity" />

            {/* Glowing Space Orbits */}
            <div className="absolute w-[140%] h-[140%] border border-dashed border-white/5 rounded-full animate-[spin_120s_linear_infinite]" />
            <div className="absolute w-[110%] h-[110%] border border-dashed border-primary/10 rounded-full animate-[spin_80s_linear_infinite_reverse]" />

            {/* High fidelity image asset */}
            <img
              src={luxuryAboutGiftboxImg.src}
              alt="Premium Gift Box"
              className="w-full h-full object-contain relative z-10 spell-float-image scale-[1.05] rounded-[2rem]"
            />
          </div>
        </div>

        {/* Right Side: Content */}
        <div>
          <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-bold uppercase tracking-widest mb-6">
            Our Story
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight tracking-tight">
            Making Premium Prizes Accessible.
          </h2>
          
          <p className="text-white/70 text-lg leading-relaxed mb-6">
            Gift Box is the most trusted prize-winning platform, offering daily draws for premium gadgets, electronics, and lifestyle products. We believe that a small participation shouldn't mean a small chance.
          </p>

          <p className="text-white/70 text-lg leading-relaxed mb-10">
            Since 2024, we've distributed over ₹50 Lakhs worth of prizes to thousands of happy winners across the country, building a community founded on trust and transparency.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-surface/40 border border-white/5 p-5 rounded-2xl flex items-start gap-4">
              <div className="w-10 h-10 min-w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xl">
                <SafetyCertificateFilled />
              </div>
              <div>
                <h4 className="text-white font-bold mb-1">100% Secure</h4>
                <p className="text-white/50 text-sm leading-relaxed m-0">Verified transactions and transparent draws.</p>
              </div>
            </div>
            
            <div className="bg-surface/40 border border-white/5 p-5 rounded-2xl flex items-start gap-4">
              <div className="w-10 h-10 min-w-10 rounded-full bg-success/10 flex items-center justify-center text-success text-xl">
                <TrophyFilled />
              </div>
              <div>
                <h4 className="text-white font-bold mb-1">Guaranteed Winners</h4>
                <p className="text-white/50 text-sm leading-relaxed m-0">Every draw has a certified random winner.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </WebShell>
  )
}
