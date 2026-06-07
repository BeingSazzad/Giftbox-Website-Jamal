'use client';
import { DownOutlined } from '@ant-design/icons'
import { useState, useEffect } from 'react'
import { WebShell } from '@/components/layout/WebShell'
import { PageHeader } from '@/components/layout/PageHeader'
import { getFaqsAction } from '@/actions/faq'

export default function FaqPage() {
  const [faqs, setFaqs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const [showAll, setShowAll] = useState(false)

  useEffect(() => {
    getFaqsAction().then((res) => {
      if (res?.data) {
        setFaqs(res.data)
      }
    }).catch(console.error).finally(() => setLoading(false))
  }, [])

  const visibleFaqs = showAll ? faqs : faqs.slice(0, 6)

  return (
    <WebShell>
      <PageHeader title="Frequently Asked Questions dfsfgsd" subtitle="Everything you need to know about Gift Box" />

      <div className="max-w-3xl mx-auto mt-8">
        {loading ? (
          <div className="flex items-center justify-center min-h-75">
            <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
          </div>
        ) : (
          /* FAQ Accordion */
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4">
              {visibleFaqs.map((f, i) => {
                const isOpen = openIndex === i
                return (
                  <div
                    key={f._id || f.question}
                    className={[
                      'bg-surface/40 backdrop-blur-md border rounded-2xl overflow-hidden transition-all duration-300',
                      isOpen ? 'border-primary/50 bg-surface/80' : 'border-white/10 hover:border-white/20',
                    ].join(' ')}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenIndex(isOpen ? null : i)}
                      className="w-full px-5 py-4 sm:px-6 sm:py-4 bg-transparent border-0 text-white text-left flex items-center justify-between gap-3 text-base sm:text-lg font-bold cursor-pointer outline-none"
                    >
                      <span>{f.question}</span>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${isOpen ? 'bg-primary text-white rotate-180' : 'bg-white/5 text-white/50'}`}>
                        <DownOutlined className="text-sm" />
                      </div>
                    </button>
                    <div className={`px-5 sm:px-6 overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-60 pb-4 sm:pb-4.5 opacity-100' : 'max-h-0 pb-0 opacity-0'}`}>
                      <p className="text-white/60 text-sm sm:text-base leading-relaxed m-0 whitespace-pre-wrap">
                        {f.answer}
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
        )}
      </div>
    </WebShell>
  )
}
