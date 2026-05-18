'use client';
import { Button } from 'antd'
import { DownOutlined, QuestionCircleOutlined, MessageOutlined } from '@ant-design/icons'
import { useState } from 'react'
import { useRouter } from 'next/navigation';
import { WebShell } from '@/components/layout/WebShell'
import { BackHeader } from '@/components/layout/BackHeader'

interface FaqItem {
  q: string
  a: string
}

const faqs: FaqItem[] = [
  {
    q: 'How do I participate in a draw?',
    a: 'Select a draw, complete the payment, upload payment proof, and wait for approval.',
  },
  {
    q: 'How long does verification take?',
    a: 'Payment verification usually takes 24-48 hours. You will be notified by app and email once complete.',
  },
  {
    q: 'How are winners selected?',
    a: 'Winners are chosen through a certified random draw on the scheduled date. Each ticket has an equal chance.',
  },
  {
    q: 'Can I get a refund?',
    a: 'Tickets are non-refundable, even in case of error or non-winning. Please double-check your details before submitting.',
  },
  {
    q: 'How do I claim my prize?',
    a: 'If you win, our team will reach out via WhatsApp or phone call within 24 hours to arrange delivery.',
  },
  {
    q: 'Is there a limit to how many tickets I can purchase?',
    a: 'No, you can purchase as many tickets as you like to increase your chances of winning the featured prize.',
  },
  {
    q: 'What payment methods are supported?',
    a: 'We support secure payments via popular mobile payment methods (M-Pesa, Orange Money, Wave) and bank transfers.',
  },
  {
    q: 'How can I verify the draw is genuine?',
    a: 'Every single draw is conducted live using a certified random draw system. We publish full draw recordings and verified winner lists.',
  },
  {
    q: 'Are my personal details secure?',
    a: 'Absolutely. We only use your registration details for delivery and identification. We never store financial credentials.',
  },
  {
    q: 'What if I upload the wrong payment proof?',
    a: 'Our support team will decline the proof and add a note explaining why. You will be able to upload the correct transaction proof immediately.',
  }
]

export default function FaqPage() {
  const router = useRouter()
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const [showAll, setShowAll] = useState(false)

  const visibleFaqs = showAll ? faqs : faqs.slice(0, 6)

  return (
    <WebShell maxWidth={1120}>
      <BackHeader title="Frequently Asked Questions" subtitle="Everything you need to know about Gift Box" />

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-10 mt-8">
        {/* Left Side: FAQ Accordion */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4">
            {visibleFaqs.map((f, i) => {
              const isOpen = openIndex === i
              return (
                <div
                  key={f.q}
                  className={[
                    'bg-surface/40 backdrop-blur-md border rounded-2xl overflow-hidden transition-all duration-300',
                    isOpen ? 'border-primary/50 bg-surface/80' : 'border-white/10 hover:border-white/20',
                  ].join(' ')}
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="w-full px-6 py-5 bg-transparent border-0 text-white text-left flex items-center justify-between gap-3 text-lg font-bold cursor-pointer outline-none"
                  >
                    <span>{f.q}</span>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${isOpen ? 'bg-primary text-white rotate-180' : 'bg-white/5 text-white/50'}`}>
                      <DownOutlined className="text-sm" />
                    </div>
                  </button>
                  <div className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-40 pb-5 opacity-100' : 'max-h-0 pb-0 opacity-0'}`}>
                    <p className="text-white/60 text-base leading-relaxed m-0">
                      {f.a}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="text-center mt-4">
            <button 
              onClick={() => setShowAll(!showAll)}
              className="px-6 py-3 bg-white/5 hover:bg-white/10 hover:border-primary/50 text-white border border-white/10 rounded-xl font-bold text-sm transition-all cursor-pointer inline-flex items-center gap-2"
            >
              {showAll ? 'Show Less FAQs' : 'See More FAQs'}
              <DownOutlined className={`text-xs transition-transform duration-300 ${showAll ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>

        {/* Right Side: Still need help? */}
        <div className="flex flex-col gap-6">
          <div className="bg-surface/50 border border-white/5 rounded-3xl p-8 text-center sticky top-24">
            <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center text-2xl mx-auto mb-6">
              <QuestionCircleOutlined />
            </div>
            <h3 className="m-0 mb-3 text-white text-xl font-bold">Still need help?</h3>
            <p className="m-0 mb-8 text-white/60 text-sm leading-relaxed">
              Cannot find the answer you're looking for? Our dedicated support team is available to assist you.
            </p>
            <Button 
              type="primary" 
              size="large" 
              block 
              className="h-12 font-bold"
              icon={<MessageOutlined />}
              onClick={() => router.push('/contact')}
            >
              Contact Support
            </Button>
          </div>
        </div>
      </div>
    </WebShell>
  )
}
