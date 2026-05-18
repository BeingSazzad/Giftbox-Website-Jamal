'use client'
import { WebShell } from '@/components/layout/WebShell'
import { BackHeader } from '@/components/layout/BackHeader'
import { PrinterOutlined, FileTextOutlined, ArrowRightOutlined } from '@ant-design/icons'
import { useState, useEffect } from 'react'

interface Section {
  id: string
  number: string
  title: string
  paragraphs?: string[]
  bullets?: string[]
}

const sections: Section[] = [
  {
    id: 'intro',
    number: '1.',
    title: 'Introduction',
    paragraphs: [
      'The Gift Box application allows users to participate in prize draws for a chance to win prizes.',
      'Each entry requires the purchase of a ticket costing 2,500 CDF or more, depending on the prize.',
    ],
  },
  {
    id: 'reg',
    number: '2.',
    title: 'Registration',
    paragraphs: [
      'To use the application, users must be 18 years of age or older, provide accurate information during registration, and reside in one of the eligible cities.',
    ],
  },
  {
    id: 'areas',
    number: '3.',
    title: 'Eligible Areas',
    paragraphs: [
      'The draws are valid only in the following cities: Kinshasa, Matadi, Goma, Moanda, Kimpese, Kikwit, and Mbanza-Ngungu.',
      'Users residing outside these cities are not eligible to receive a prize.',
    ],
  },
  {
    id: 'participation',
    number: '4.',
    title: 'Participation in Draws',
    paragraphs: [
      'Each user may purchase only one ticket per draw, participate in a draw after payment confirmation, and use a ticket valid for only one draw. Tickets are non-refundable, even in case of error or non-winning.',
    ],
  },
  {
    id: 'payment',
    number: '5.',
    title: 'Payment',
    paragraphs: [
      'Payments are made manually to the numbers displayed in the application. Proof of payment must be uploaded to validate participation.',
    ],
  },
  {
    id: 'winner',
    number: '6.',
    title: 'Winner Selection',
    bullets: [
      'Winners are selected randomly.',
      'The number of winners depends on the prize offered.',
      'There will always be at least one winner per draw.',
      'Winners will be contacted via WhatsApp or by phone call using their registered number.',
    ],
  },
  {
    id: 'delivery',
    number: '7.',
    title: 'Prize Delivery',
    bullets: [
      'Prizes are delivered in person or free of charge to the winner.',
      'The delivery period is a maximum of 5 days.',
      'No claims will be accepted after the prize has been delivered.',
      'If a winner does not respond within 3 days, the prize will be awarded to another randomly selected participant.',
    ],
  },
  {
    id: 'fraud',
    number: '8.',
    title: 'Prohibition of Fraud',
    bullets: [
      'Any attempts at fraud will result in the permanent suspension of the account and the immediate cancellation of participation.',
      'This includes, in particular, sending false proof of payment, sharing images, and using false information.',
      'A suspected user can contact customer service to request a verification.',
    ],
  },
  {
    id: 'rewards',
    number: '9.',
    title: 'Nature of Rewards',
    paragraphs: [
      'Rewards are only physical items; no cash prizes, vouchers, trips, or other financial value will be offered.',
    ],
  },
  {
    id: 'liability',
    number: '10.',
    title: 'Nature of Rewards', // Typo kept as requested, labeled premiumly or unified
    paragraphs: [
      'Gift Box will not be held liable for payment errors made by the user, issues related to misuse of the application, or incorrect information provided by the user.',
    ],
  },
  {
    id: 'suspension',
    number: '11.',
    title: 'Account Suspension or Deletion',
    paragraphs: [
      'Gift Box reserves the right to suspend or delete an account and refuse participation in the event of non-compliance with these terms and conditions.',
    ],
  },
  {
    id: 'contact',
    number: '12.',
    title: 'Contact',
    paragraphs: [
      'For any questions or assistance, please contact us at our email address: support@coffretcadeau.cd or message us on WhatsApp: +243 xxx xxx xxx',
      'Gift Box reserves the right to modify these terms and conditions at any time.',
    ],
  },
]

export default function TermsPage() {
  const [activeSection, setActiveSection] = useState('intro')

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      const offset = 90
      const bodyRect = document.body.getBoundingClientRect().top
      const elementRect = el.getBoundingClientRect().top
      const elementPosition = elementRect - bodyRect
      const offsetPosition = elementPosition - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      })
      setActiveSection(id)
    }
  }

  // Active section tracking on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 120
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
        {/* Glowing backdrop decorative accents */}
        <div className="absolute top-0 right-10 w-[400px] h-[400px] rounded-full bg-primary/3 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-20 left-10 w-[300px] h-[300px] rounded-full bg-primary/2 blur-[100px] pointer-events-none" />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-white/5 pb-6">
          <BackHeader title="Terms & Conditions" subtitle="Last updated: April 10, 2024" />
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
            <FileTextOutlined />
          </div>
          <div>
            <h2 className="text-white text-lg font-black m-0 mb-2 tracking-tight">Gift Box Legal Agreement</h2>
            <p className="text-white/60 text-sm leading-relaxed m-0 max-w-4xl">
              Please read these Terms and Conditions carefully before using the Gift Box platform. By accessing or using our services, you agree to be bound by these terms. If you disagree with any part of these terms, you may not use the services.
            </p>
          </div>
        </div>

        {/* Layout Split View */}
        <div className="grid grid-cols-12 gap-8 mt-10 relative">
          
          {/* Left Index - Sticky Sidebar (Web-first optimized) */}
          <div className="hidden lg:block lg:col-span-4">
            <div className="sticky top-26 bg-[#12082b]/60 border border-white/5 rounded-3xl p-5 backdrop-blur-xl shadow-lg">
              <h3 className="text-white/40 text-[10px] font-black uppercase tracking-widest mb-4 px-2">Document Directory</h3>
              <nav className="flex flex-col gap-1.5 max-h-[60vh] overflow-y-auto pr-1">
                {sections.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => handleScrollTo(s.id)}
                    className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-between cursor-pointer border ${
                      activeSection === s.id
                        ? 'bg-primary/10 border-primary/25 text-primary shadow-sm'
                        : 'bg-transparent border-transparent text-white/50 hover:text-white hover:bg-white/3'
                    }`}
                  >
                    <span className="truncate flex items-center gap-2">
                      <span className="opacity-60">{s.number}</span>
                      {s.title}
                    </span>
                    {activeSection === s.id && <ArrowRightOutlined style={{ fontSize: 9 }} />}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Right Content reading pane */}
          <div className="col-span-12 lg:col-span-8 space-y-6">
            {sections.map((s) => (
              <section
                key={s.id}
                id={s.id}
                className={`bg-gradient-to-b from-[#140b2d]/70 to-[#0b041c]/70 rounded-3xl p-6 md:p-8 border transition-all duration-300 ${
                  activeSection === s.id
                    ? 'border-primary/25 shadow-[0_8px_30px_rgba(254,147,1,0.06)]'
                    : 'border-white/5'
                }`}
              >
                <div className="flex items-center gap-4.5 mb-5">
                  <span className="w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center text-sm font-black shadow-inner border border-primary/10">
                    {s.number.replace('.', '')}
                  </span>
                  <h2 className="m-0 text-white text-lg font-black tracking-tight">{s.title}</h2>
                </div>
                
                <div className="pl-0 md:pl-14">
                  {s.paragraphs?.map((p, i) => (
                    <p key={i} className="m-0 mb-4 last:mb-0 text-white/60 text-sm leading-relaxed font-medium">
                      {p}
                    </p>
                  ))}
                  {s.bullets && (
                    <ul className="m-0 pl-5 text-white/60 text-sm leading-relaxed list-disc marker:text-primary/70 space-y-3 font-medium">
                      {s.bullets.map((b, i) => (
                        <li key={i} className="pl-1.5">{b}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </section>
            ))}
          </div>

        </div>
      </div>
    </WebShell>
  )
}
