'use client';
import { Button } from 'antd'
import { DownOutlined, QuestionCircleOutlined, MessageOutlined } from '@ant-design/icons'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation';
import { WebShell } from '@/components/layout/WebShell'
import { PageHeader } from '@/components/layout/PageHeader'

import { getDynamicFaqs, FaqItem } from '@/data/websiteContent'

export default function FaqPage() {
  const router = useRouter()
  const [faqs, setFaqs] = useState<FaqItem[]>([])
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const [showAll, setShowAll] = useState(false)

  useEffect(() => {
    setFaqs(getDynamicFaqs())
  }, [])

  const visibleFaqs = showAll ? faqs : faqs.slice(0, 6)

  return (
    <WebShell>
      <PageHeader title="Frequently Asked Questions" subtitle="Everything you need to know about Gift Box" />

      <div className="max-w-4xl mx-auto mt-8">
        {/* FAQ Accordion */}
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
      </div>
    </WebShell>
  )
}
