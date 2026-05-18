'use client'
import { WebShell } from '@/components/layout/WebShell'
import { BackHeader } from '@/components/layout/BackHeader'
import { LockFilled, SafetyCertificateFilled, EyeFilled, SettingFilled, ProfileFilled, PrinterOutlined } from '@ant-design/icons'
import React from 'react'

interface PolicySection {
  title: string
  body: string
  icon: React.ReactNode
  badge: string
}

const sections: PolicySection[] = [
  {
    title: 'Information We Collect',
    body: 'We collect personal information including name, email, phone number, and payment details necessary for draw participation and prize distribution.',
    icon: <ProfileFilled />,
    badge: 'Collection'
  },
  {
    title: 'How We Use Your Data',
    body: 'Your information is used to process entries, verify payments, communicate results, and improve our services. We never sell your data to third parties.',
    icon: <EyeFilled />,
    badge: 'Usage'
  },
  {
    title: 'Data Security',
    body: 'We implement industry-standard security measures to protect your personal information from unauthorized access, alteration, or destruction.',
    icon: <SafetyCertificateFilled />,
    badge: 'Protection'
  },
  {
    title: 'Your Rights',
    body: 'You have the right to access, modify, or delete your personal data. Contact support to exercise those rights.',
    icon: <LockFilled />,
    badge: 'Control'
  },
  {
    title: 'Cookies & Tracking',
    body: 'We use cookies to enhance user experience and analyze app usage. You can manage cookie preferences in your device settings.',
    icon: <SettingFilled />,
    badge: 'Preferences'
  },
]

export default function PrivacyPolicyPage() {
  return (
    <WebShell maxWidth={1200}>
      <div className="relative py-4">
        {/* Decorative ambient neon glows */}
        <div className="absolute top-10 left-10 w-[350px] h-[350px] rounded-full bg-primary/2 blur-[100px] pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-[350px] h-[350px] rounded-full bg-primary/3 blur-[120px] pointer-events-none" />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-white/5 pb-6">
          <BackHeader title="Privacy Policy" subtitle="Last updated: April 10, 2024" />
          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 px-4.5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/8 hover:border-white/15 text-white/80 hover:text-white rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer mt-2 md:mt-0 shrink-0"
          >
            <PrinterOutlined style={{ fontSize: 13 }} /> Print Document
          </button>
        </div>

        {/* Introduction Panel */}
        <div className="bg-gradient-to-r from-[#190f36]/80 to-[#10072b]/80 border border-white/8 rounded-3xl p-6 md:p-8 mt-8 backdrop-blur-2xl flex flex-col md:flex-row items-start gap-6 shadow-xl">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center text-xl shrink-0 shadow-inner">
            <LockFilled />
          </div>
          <div>
            <h2 className="text-white text-lg font-black m-0 mb-2 tracking-tight">Our Privacy Commitment</h2>
            <p className="text-white/60 text-sm leading-relaxed m-0 max-w-4xl">
              At Gift Box, we take your privacy seriously. We are committed to protecting your personal information and being transparent about what data we collect and how it is used. This policy outlines our core practices to ensure your trust and safety on our platform.
            </p>
          </div>
        </div>

        {/* Suitable grid layout for web */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {sections.map((s, index) => {
            // Give the first item a larger card/banner style (Bento grid concept)
            const isFullWidth = index === 0;
            return (
              <section
                key={s.title}
                className={`bg-gradient-to-b from-[#140b2d]/75 to-[#0b041c]/75 rounded-3xl p-6 md:p-8 border border-white/5 hover:border-primary/20 hover:shadow-[0_8px_30px_rgba(254,147,1,0.04)] transition-all duration-300 flex flex-col justify-between ${
                  isFullWidth ? 'md:col-span-2 lg:col-span-3 lg:flex-row lg:items-center lg:gap-8' : ''
                }`}
              >
                <div className={`${isFullWidth ? 'lg:flex-1' : ''}`}>
                  <div className="flex items-center gap-3.5 mb-4">
                    <div className="w-11 h-11 rounded-2xl bg-primary/10 text-primary flex items-center justify-center text-xl shrink-0 shadow-inner border border-primary/10">
                      {s.icon}
                    </div>
                    <div>
                      <span className="text-[9px] font-black uppercase tracking-widest text-primary/75 bg-primary/10 px-2 py-0.5 rounded-md">
                        {s.badge}
                      </span>
                      <h3 className="m-0 mt-1 text-white text-base font-black tracking-tight">{s.title}</h3>
                    </div>
                  </div>
                  
                  <p className="m-0 text-white/60 text-sm leading-relaxed font-medium">
                    {s.body}
                  </p>
                </div>

                {isFullWidth && (
                  <div className="hidden lg:block w-36 h-36 shrink-0 bg-primary/5 rounded-3xl border border-dashed border-primary/10 flex items-center justify-center">
                    <div className="text-primary/30 text-5xl">
                      {s.icon}
                    </div>
                  </div>
                )}
              </section>
            );
          })}
        </div>
      </div>
    </WebShell>
  )
}
