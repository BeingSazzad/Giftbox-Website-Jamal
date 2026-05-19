'use client'
import { WebShell } from '@/components/layout/WebShell'
import { BackHeader } from '@/components/layout/BackHeader'
import { PrinterOutlined, LockFilled } from '@ant-design/icons'

interface PolicySection {
  id: string
  number: string
  title: string
  paragraphs?: string[]
  bullets?: string[]
}

const sections: PolicySection[] = [
  {
    id: 'collect',
    number: '1',
    title: 'Information We Collect',
    paragraphs: [
      'We collect personal information including name, email address, phone number, and payment details necessary for draw participation and prize distribution.',
      'We may also collect device information such as IP address, browser type, and usage data to improve the platform experience.',
    ],
  },
  {
    id: 'usage',
    number: '2',
    title: 'How We Use Your Data',
    bullets: [
      'To process your draw entries and verify payments.',
      'To communicate draw results and prize delivery arrangements.',
      'To improve our services and personalise your experience on the platform.',
      'We never sell your personal data to third parties.',
    ],
  },
  {
    id: 'security',
    number: '3',
    title: 'Data Security',
    paragraphs: [
      'We implement industry-standard security measures including encryption and access controls to protect your personal information from unauthorized access, alteration, disclosure, or destruction.',
      'While we take all reasonable precautions, no method of transmission over the internet is 100% secure. We cannot guarantee absolute security.',
    ],
  },
  {
    id: 'rights',
    number: '4',
    title: 'Your Rights',
    bullets: [
      'You have the right to access the personal data we hold about you.',
      'You may request correction of inaccurate information at any time.',
      'You can request deletion of your account and associated personal data.',
      'To exercise any of these rights, please contact our support team.',
    ],
  },
  {
    id: 'cookies',
    number: '5',
    title: 'Cookies & Tracking',
    paragraphs: [
      'We use cookies and similar tracking technologies to enhance user experience, analyze platform usage, and remember your preferences.',
      'You can manage cookie preferences in your device or browser settings. Disabling cookies may affect some features of the platform.',
    ],
  },
  {
    id: 'sharing',
    number: '6',
    title: 'Data Sharing',
    paragraphs: [
      'We do not sell, trade, or otherwise transfer your personal information to outside parties except to trusted third parties who assist us in operating the platform, conducting our business, or serving users — provided that those parties agree to keep this information confidential.',
    ],
  },
  {
    id: 'retention',
    number: '7',
    title: 'Data Retention',
    paragraphs: [
      'We retain your personal data for as long as your account remains active or as needed to provide you services. You may request account deletion at any time by contacting support.',
    ],
  },
  {
    id: 'changes',
    number: '8',
    title: 'Changes to This Policy',
    paragraphs: [
      'Gift Box reserves the right to update this Privacy Policy at any time. We will notify you of significant changes via the platform or your registered contact details. Continued use of the platform after changes constitutes acceptance of the revised policy.',
    ],
  },
  {
    id: 'contact',
    number: '9',
    title: 'Contact',
    paragraphs: [
      'If you have any questions or concerns about this Privacy Policy or how your data is handled, please contact us at: support@coffretcadeau.cd or via WhatsApp: +243 xxx xxx xxx',
    ],
  },
]

export default function PrivacyPolicyPage() {
  return (
    <WebShell maxWidth={1200}>
      <div className="relative py-4">
        {/* Ambient glows */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-primary/3 blur-[130px] pointer-events-none" />
        <div className="absolute bottom-20 left-0 w-[350px] h-[350px] rounded-full bg-primary/2 blur-[100px] pointer-events-none" />

        <BackHeader 
          title="Privacy Policy" 
          subtitle="Last updated: April 10, 2024" 
          rightSlot={
            <button
              onClick={() => window.print()}
              className="flex items-center gap-2 px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/8 hover:border-white/15 text-white/70 hover:text-white rounded-xl text-xs font-bold transition-all cursor-pointer mt-0 shrink-0"
            >
              <PrinterOutlined style={{ fontSize: 12 }} /> Print Document
            </button>
          }
        />

        {/* Intro banner */}
        <div className="mt-10 mb-14 max-w-5xl flex items-start gap-5">
          <div className="w-11 h-11 rounded-2xl bg-primary/10 text-primary flex items-center justify-center text-lg shrink-0">
            <LockFilled />
          </div>
          <div>
            <h2 className="text-white text-xl font-bold m-0 mb-2 tracking-tight">Our Privacy Commitment</h2>
            <p className="text-white/60 text-base leading-relaxed m-0">
              At Gift Box, we are committed to protecting your personal information and being fully transparent about what data we collect and how it is used. This policy outlines our core privacy practices to ensure your trust and safety on our platform.
            </p>
          </div>
        </div>

        {/* Document — no boxes, continuous flowing text */}
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
