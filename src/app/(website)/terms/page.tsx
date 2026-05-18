'use client'
import { WebShell } from '@/components/layout/WebShell'
import { BackHeader } from '@/components/layout/BackHeader'
import { PrinterOutlined, FileTextOutlined } from '@ant-design/icons'
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
    number: '1',
    title: 'Introduction',
    paragraphs: [
      'The Gift Box application allows users to participate in prize draws for a chance to win prizes.',
      'Each entry requires the purchase of a ticket costing 2,500 CDF or more, depending on the prize.',
    ],
  },
  {
    id: 'reg',
    number: '2',
    title: 'Registration',
    paragraphs: [
      'To use the application, users must be 18 years of age or older, provide accurate information during registration, and reside in one of the eligible cities.',
    ],
  },
  {
    id: 'areas',
    number: '3',
    title: 'Eligible Areas',
    paragraphs: [
      'The draws are valid only in the following cities: Kinshasa, Matadi, Goma, Moanda, Kimpese, Kikwit, and Mbanza-Ngungu.',
      'Users residing outside these cities are not eligible to receive a prize.',
    ],
  },
  {
    id: 'participation',
    number: '4',
    title: 'Participation in Draws',
    paragraphs: [
      'Each user may purchase only one ticket per draw, participate in a draw after payment confirmation, and use a ticket valid for only one draw. Tickets are non-refundable, even in case of error or non-winning.',
    ],
  },
  {
    id: 'payment',
    number: '5',
    title: 'Payment',
    paragraphs: [
      'Payments are made manually to the numbers displayed in the application. Proof of payment must be uploaded to validate participation.',
    ],
  },
  {
    id: 'winner',
    number: '6',
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
    number: '7',
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
    number: '8',
    title: 'Prohibition of Fraud',
    bullets: [
      'Any attempts at fraud will result in the permanent suspension of the account and the immediate cancellation of participation.',
      'This includes, in particular, sending false proof of payment, sharing images, and using false information.',
      'A suspected user can contact customer service to request a verification.',
    ],
  },
  {
    id: 'rewards',
    number: '9',
    title: 'Nature of Rewards',
    paragraphs: [
      'Rewards are only physical items; no cash prizes, vouchers, trips, or other financial value will be offered.',
    ],
  },
  {
    id: 'liability',
    number: '10',
    title: 'Limitation of Liability',
    paragraphs: [
      'Gift Box will not be held liable for payment errors made by the user, issues related to misuse of the application, or incorrect information provided by the user.',
    ],
  },
  {
    id: 'suspension',
    number: '11',
    title: 'Account Suspension or Deletion',
    paragraphs: [
      'Gift Box reserves the right to suspend or delete an account and refuse participation in the event of non-compliance with these terms and conditions.',
    ],
  },
  {
    id: 'contact',
    number: '12',
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

        {/* Top bar */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-white/5 pb-6">
          <BackHeader title="Terms &amp; Conditions" subtitle="Last updated: April 10, 2024" />
          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/8 hover:border-white/15 text-white/70 hover:text-white rounded-xl text-xs font-bold transition-all cursor-pointer mt-2 md:mt-0 shrink-0"
          >
            <PrinterOutlined style={{ fontSize: 12 }} /> Print Document
          </button>
        </div>

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
