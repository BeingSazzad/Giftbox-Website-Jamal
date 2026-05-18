'use client'
import { WebShell } from '@/components/layout/WebShell'
import { BackHeader } from '@/components/layout/BackHeader'
import { TrophyFilled, SafetyCertificateFilled, GlobalOutlined } from '@ant-design/icons'

export default function AboutUsPage() {
  return (
    <WebShell maxWidth={1120}>
      <BackHeader title="About Gift Box" subtitle="Your trusted platform for weekly wins" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 mt-10 items-center">
        {/* Left Side: Illustration */}
        <div className="relative w-full aspect-square md:aspect-auto md:h-full min-h-[300px] flex justify-center items-center">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-purple-500/20 rounded-[40px] blur-3xl transform rotate-12 scale-90"></div>
          <div className="relative w-full max-w-[400px] aspect-square bg-surface/50 backdrop-blur-2xl border border-white/10 rounded-[40px] p-8 shadow-2xl flex flex-col items-center justify-center text-9xl">
            🎁
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
