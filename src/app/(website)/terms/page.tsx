'use client'
import { WebShell } from '@/components/layout/WebShell'
import { BackHeader } from '@/components/layout/BackHeader'
import { FileTextOutlined } from '@ant-design/icons'
import { useState, useEffect } from 'react'

import { getDynamicTerms, TermsSection } from '@/data/websiteContent'

export default function TermsPage() {
  const [activeSection, setActiveSection] = useState('intro')
  const [sections, setSections] = useState<TermsSection[]>([])

  useEffect(() => {
    setSections(getDynamicTerms())
  }, [])

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 96
      window.scrollTo({ top, behavior: 'smooth' })
      setActiveSection(id)
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 130
      for (const section of sections) {
        const el = document.getElementById(section.id)
        if (el) {
          const top = el.offsetTop
          const height = el.offsetHeight
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section.id)
            break
          }
        }
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <WebShell maxWidth={1200}>
      <div className="relative py-4">
        {/* Ambient glows */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-primary/3 blur-[130px] pointer-events-none" />
        <div className="absolute bottom-20 left-0 w-[350px] h-[350px] rounded-full bg-primary/2 blur-[100px] pointer-events-none" />

        <BackHeader 
          title="Terms &amp; Conditions" 
          subtitle="Last updated: April 10, 2024" 
        />

        {/* Intro banner */}
        <div className="mt-10 mb-14 max-w-5xl flex items-start gap-5">
          <div className="w-11 h-11 rounded-2xl bg-primary/10 text-primary flex items-center justify-center text-lg shrink-0">
            <FileTextOutlined />
          </div>
          <div>
            <h2 className="text-white text-xl font-bold m-0 mb-2 tracking-tight">Gift Box Legal Agreement</h2>
            <p className="text-white/60 text-base leading-relaxed m-0">
              Please read these Terms and Conditions carefully before using the Gift Box platform. By accessing or using our services, you agree to be bound by these terms. If you disagree with any part of these terms, you may not use the services.
            </p>
          </div>
        </div>

        {/* Document content — continuous, no boxes */}
        <div className="max-w-5xl space-y-10">
          {sections.map((s) => (
            <section
              key={s.id}
              id={s.id}
              className="scroll-mt-28"
            >
              <h2 className="flex items-center gap-3 text-white text-lg font-bold m-0 mb-4 tracking-tight">
                <span className="text-primary/70 text-base font-black tabular-nums">{s.number}.</span>
                {s.title}
              </h2>

              {s.paragraphs?.map((p, i) => (
                <p key={i} className="m-0 mb-4 last:mb-0 text-white/60 text-base leading-[1.8]">
                  {p}
                </p>
              ))}

              {s.bullets && (
                <ul className="m-0 pl-0 list-none space-y-3">
                  {s.bullets.map((b, i) => (
                    <li key={i} className="flex items-start gap-3 text-white/60 text-base leading-[1.8]">
                      <span className="text-primary/60 mt-2 shrink-0 text-[8px]">●</span>
                      {b}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>
      </div>
    </WebShell>
  )
}
