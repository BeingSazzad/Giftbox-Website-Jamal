import type { ReactNode } from 'react'
import logoImg from '@/assets/logo.png'
import { GiftFilled, CheckCircleOutlined, SafetyOutlined, TrophyOutlined } from '@ant-design/icons'

interface AuthCardProps {
  title: string
  subtitle?: string
  children: ReactNode
  footer?: ReactNode
}

export function AuthCard({ title, subtitle, children, footer }: AuthCardProps) {
  return (
    <div className="min-h-screen w-full grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] bg-[#060214] overflow-hidden">
      
      {/* Left Branding/Marketing Side (Desktop Only) */}
      <div className="hidden lg:flex flex-col justify-between p-12 lg:p-16 relative overflow-hidden border-r border-white/5 bg-[#09031c]">
        {/* Glow Effects */}
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-[-100px] right-[-100px] w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[100px] pointer-events-none"></div>

        {/* Header Logo */}
        <div className="flex items-center gap-3 relative z-10">
          <img src={logoImg.src} alt="Logo" className="w-10 h-10 object-contain" />
          <span className="text-white font-black text-2xl tracking-tight">Gift Box</span>
        </div>

        {/* Middle Content */}
        <div className="my-auto max-w-xl relative z-10">
          <h2 className="text-white text-4xl lg:text-5xl font-black leading-tight tracking-tight mb-8">
            Your Gateway to <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-orange-400 to-[#E65E00]">
              Weekly Wins & Prizes
            </span>
          </h2>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-lg shrink-0">
                <TrophyOutlined />
              </div>
              <div>
                <h4 className="text-white font-bold text-base m-0 mb-1">Select Active Draw</h4>
                <p className="text-white/60 text-sm m-0 leading-relaxed">
                  Browse list of available draws including premium tech products, gadgets, and luxury goods.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-orange-500/10 text-orange-400 flex items-center justify-center text-lg shrink-0">
                <CheckCircleOutlined />
              </div>
              <div>
                <h4 className="text-white font-bold text-base m-0 mb-1">Submit Ticket Proof</h4>
                <p className="text-white/60 text-sm m-0 leading-relaxed">
                  Join in seconds by uploading a simple screenshot of your participation ticket or transaction.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center text-lg shrink-0">
                <SafetyOutlined />
              </div>
              <div>
                <h4 className="text-white font-bold text-base m-0 mb-1">100% Fair & Transparent</h4>
                <p className="text-white/60 text-sm m-0 leading-relaxed">
                  Winners are drawn randomly and manually verified by administrators to ensure absolute fairness.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="text-white/40 text-xs relative z-10">
          © {new Date().getFullYear()} Gift Box. All rights reserved. Non-financial prize lottery platform.
        </div>
      </div>

      {/* Right Form Side (All Screens) */}
      <div className="flex items-center justify-center p-6 md:p-12 relative">
        {/* Glow behind container on mobile */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-primary/10 rounded-full blur-[80px] pointer-events-none lg:hidden"></div>

        <div className="w-full max-w-[440px] bg-surface/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl relative z-10">
          <div className="mb-8">
            <h1 className="m-0 text-white text-2xl md:text-3xl font-extrabold tracking-tight mb-2">
              {title}
            </h1>
            {subtitle && (
              <p className="m-0 text-white/60 text-sm">{subtitle}</p>
            )}
          </div>

          {children}

          {footer && (
            <div className="mt-8 text-center text-white/60 text-sm pt-2">
              {footer}
            </div>
          )}
        </div>
      </div>

    </div>
  )
}
