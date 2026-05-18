'use client';
import { Button, message } from 'antd'
import { ArrowLeftOutlined, CopyOutlined, CreditCardOutlined, ExclamationCircleFilled, SafetyOutlined } from '@ant-design/icons'
import type { ReactNode } from 'react'
import { useRouter, useParams } from 'next/navigation';
import { WebShell } from '@/components/layout/WebShell'
import { currentDraw, paymentNumbers } from '@/data/draws'

export default function DrawDetailsPage() {
  const router = useRouter()
  const { id } = useParams<{ id: string }>()
  const draw = currentDraw

  const handleCopy = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text)
      message.success(`${label} copied`)
    } catch {
      message.error('Could not copy')
    }
  }

  return (
    <WebShell>
      <div className="flex items-center gap-3.5 mb-5 md:mb-6">
        <button type="button" onClick={() => router.back()} className="icon-btn-round">
          <ArrowLeftOutlined style={{ fontSize: 15 }} />
        </button>
        <h1 className="m-0 text-white text-xl md:text-2xl font-bold">How to Participate</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] gap-5 md:gap-6 items-start">
        <div className="flex flex-col gap-4 md:gap-5">
          <div className="bg-surface/60 border border-primary/35 rounded-2xl p-4 md:p-5 flex flex-col sm:flex-row gap-4 md:gap-5">
            <div className="w-full sm:w-45 sm:min-w-45 h-44 sm:h-35 rounded-xl overflow-hidden bg-night">
              <img
                src={draw.image}
                alt={draw.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-white text-base md:text-lg font-bold mb-2">{draw.title}</div>
              <div className="text-white/65 text-[13px] leading-relaxed mb-3.5">
                {draw.description}
              </div>
              <div className="text-primary text-base md:text-lg font-bold flex items-center gap-2">
                <span>🎟️</span>
                {draw.ticketPrice.toLocaleString()} {draw.currency}
              </div>
            </div>
          </div>

          <InfoCard
            icon={<SafetyOutlined className="text-primary text-xl" />}
            title="Participation Instructions"
          >
            <p className="m-0 mb-3 text-sm text-white/75 leading-relaxed">
              To participate in the draw, please follow these steps:
            </p>
            <ul className="instr-list">
              <li>
                Be 18 years or older, provide accurate information during registration, and reside in one of the following cities: Kinshasa, Matadi, Boma, Moanda, Kimpese, Kisantu, and Mbanza-Ngungu.
              </li>
              <li>
                Make the payment for the ticket via Orange Money or M-Pesa, using one of the numbers displayed in the app.
              </li>
              <li>
                Take a clear screenshot or photo of the proof of payment, then upload it in the designated area and press CONFIRM.
              </li>
            </ul>
          </InfoCard>

          <InfoCard
            icon={<ExclamationCircleFilled className="text-primary text-xl" />}
            title="Important:"
          >
            <ul className="instr-list">
              <li>
                Any false or fraudulent proof of payment will result in the permanent suspension of the account.
              </li>
              <li>A ticket is valid for only one draw.</li>
              <li>
                The draw takes place after one or two weeks, depending on the reward offered.
              </li>
              <li>
                Rewards are handed over in person or delivered free of charge within a maximum of 5 days after the announcement. The winner must respond within 3 days, otherwise the reward will be awarded to another participant.
              </li>
            </ul>
          </InfoCard>
        </div>

        <div className="md:sticky md:top-24 flex flex-col gap-4 md:gap-5">
          <div className="bg-surface/55 border border-white/6 rounded-2xl p-4 md:p-5">
            <h3 className="m-0 mb-4 text-white text-[17px] font-bold">Payment Numbers</h3>
            <div className="flex flex-col gap-3">
              {paymentNumbers.map((pn) => (
                <div
                  key={pn.id}
                  className="bg-deep/60 border border-white/6 rounded-xl px-4 py-3.5 flex items-center gap-3.5"
                >
                  <div className="w-11 h-11 rounded-[10px] gradient-brand flex items-center justify-center text-[#1a0f0a]">
                    <CreditCardOutlined style={{ fontSize: 20 }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-white/60 text-xs">{pn.provider}</div>
                    <div className="text-white text-[15px] font-semibold">{pn.number}</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy(pn.number, pn.provider)}
                    className="bg-deep/60 border border-white/10 rounded-lg px-3.5 py-2 text-white/85 text-[13px] cursor-pointer flex items-center gap-1.5"
                  >
                    <CopyOutlined />
                    Copy
                  </button>
                </div>
              ))}
            </div>
          </div>

          <Button type="primary" block onClick={() => router.push(`/draw/${id}/payment-proof`)}>
            Send proof of payment
          </Button>
        </div>
      </div>

      <style>{`
        .instr-list { margin: 0; padding: 0; list-style: none; display: flex; flex-direction: column; gap: 10px; }
        .instr-list li { position: relative; padding-left: 16px; font-size: 14px; color: rgba(229, 231, 235, 0.75); line-height: 1.6; }
        .instr-list li::before { content: '•'; position: absolute; left: 0; color: rgba(229, 231, 235, 0.6); }
      `}</style>
    </WebShell>
  )
}

interface InfoCardProps {
  icon: ReactNode
  title: string
  children: ReactNode
}

function InfoCard({ icon, title, children }: InfoCardProps) {
  return (
    <div className="bg-surface/55 border border-white/6 rounded-2xl p-5">
      <div className="flex items-center gap-2.5 mb-3.5">
        {icon}
        <h3 className="m-0 text-white text-[17px] font-bold">{title}</h3>
      </div>
      {children}
    </div>
  )
}
