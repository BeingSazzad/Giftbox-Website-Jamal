'use client';

import { useState } from 'react'
import { DownOutlined } from '@ant-design/icons'
import { Section, SectionTitle } from './Section'

export default function FaqPreview() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const [showAll, setShowAll] = useState(false)
  const faqs = [
    { q: 'How do I participate in a draw?', a: "Create an account, pick a draw, pay the ticket via M-Pesa or Orange Money, and upload your payment proof. Once verified, you're in." },
    { q: 'How long does payment verification take?', a: "Usually 24–48 hours. You'll be notified the moment your entry is approved or if anything is off with the proof." },
    { q: 'How are winners chosen?', a: 'Through a certified random draw on the scheduled date. Each verified ticket has an equal chance — no preferences, no shortcuts.' },
    { q: 'What happens if I win?', a: 'We contact you via WhatsApp or phone using your registered number, then deliver the prize free of charge within 5 days.' },
    { q: 'Is there a limit to how many tickets I can purchase?', a: 'No, you can purchase as many tickets as you like to increase your chances of winning the featured prize.' },
    { q: 'What payment methods are supported?', a: 'We support secure payments via popular mobile payment methods (M-Pesa, Orange Money, Wave) and standard bank transfers. Simply upload a clear screenshot of the transaction.' },
    { q: 'Can I participate from outside the country?', a: 'Yes, Gift Box is a global platform. As long as you can make payments via our verified channels and receive deliveries, you are welcome to join.' },
    { q: 'How can I verify the draw is genuine?', a: 'Every single draw is conducted live using a certified, completely random draw system. We publish the full draw recordings and verified winner lists on our results page.' },
    { q: 'Are my personal details secure?', a: 'Absolutely. We only use your registration details for delivery and identification. We never sell your personal information or store financial banking credentials.' },
    { q: 'What if I upload the wrong payment proof?', a: 'Don\'t worry! Our support team will decline the proof and add a note explaining why. You will be able to upload the correct transaction proof immediately.' }
  ]

  const visibleFaqs = showAll ? faqs : faqs.slice(0, 6)

  return (
    <Section id="faq">
      <div className="max-w-3xl mx-auto">
        <SectionTitle
          eyebrow="FAQ"
          title="Answers to your questions."
          subtitle="Find quick, transparent answers to everything about tickets, payments, draws, and prize delivery."
        />

        <div className="space-y-4">
          {visibleFaqs.map((f, i) => {
            const isOpen = openIndex === i
            return (
              <div key={i} className={`bg-surface/40 backdrop-blur-md border rounded-2xl overflow-hidden transition-all duration-300 ${isOpen ? 'border-primary/50 bg-surface/80' : 'border-white/10 hover:border-white/20'}`}>
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full px-5 py-4 sm:px-6 sm:py-4 flex items-center justify-between text-left cursor-pointer bg-transparent border-none outline-none"
                >
                  <span className="text-base sm:text-lg font-bold text-white">{f.q}</span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-primary text-white rotate-180' : 'bg-white/5 text-white/50'}`}>
                    <DownOutlined className="text-sm" />
                  </div>
                </button>
                <div className={`px-5 sm:px-6 overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-40 pb-4 sm:pb-4.5 opacity-100' : 'max-h-0 pb-0 opacity-0'}`}>
                  <p className="text-white/60 text-sm sm:text-base leading-relaxed m-0">{f.a}</p>
                </div>
              </div>
            )
          })}
        </div>

        <div className="text-center mt-10">
          <button
            onClick={() => setShowAll(!showAll)}
            className="h-12 px-8 bg-white/5 hover:bg-white/10 hover:border-primary/50 text-white border border-white/10 rounded-xl font-bold text-base transition-all cursor-pointer inline-flex items-center justify-center gap-2"
          >
            {showAll ? 'Show Less' : 'See More FAQs'}
            <DownOutlined className={`text-xs transition-transform duration-300 ${showAll ? 'rotate-180' : ''}`} />
          </button>
        </div>
      </div>
    </Section>
  )
}
