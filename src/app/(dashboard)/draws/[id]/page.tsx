'use client';
import { message } from 'antd'
import {
  SafetyOutlined,
  ExclamationCircleFilled,
  CreditCardOutlined,
  CopyOutlined,
  CloudUploadOutlined,
  CheckOutlined,
  SendOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons'
import type { ReactNode } from 'react'
import { useEffect, useRef, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { WebShell } from '@/components/layout/WebShell'
import { SuccessModal } from '@/components/common/SuccessModal'
import { currentDraw, paymentNumbers } from '@/data/draws'

import { BackHeader } from '@/components/layout/BackHeader'

const MAX_FILE_SIZE = 10 * 1024 * 1024

const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
  const rect = e.currentTarget.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top
  e.currentTarget.style.setProperty('--mouse-x', `${x}px`)
  e.currentTarget.style.setProperty('--mouse-y', `${y}px`)
}

function useCountdown(targetIso: string) {
  const calc = useCallback(() => {
    const diff = Math.max(0, new Date(targetIso).getTime() - Date.now())
    const d = Math.floor(diff / 86400000)
    const h = Math.floor((diff % 86400000) / 3600000)
    const m = Math.floor((diff % 3600000) / 60000)
    const s = Math.floor((diff % 60000) / 1000)
    return { d, h, m, s, expired: diff === 0 }
  }, [targetIso])

  const [time, setTime] = useState(calc)
  useEffect(() => {
    const id = setInterval(() => setTime(calc()), 1000)
    return () => clearInterval(id)
  }, [calc])
  return time
}

export default function DrawDetailsPage() {
  const router = useRouter()
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [dragOver, setDragOver] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const blobUrlRef = useRef<string | null>(null)
  const countdown = useCountdown(currentDraw.endsAt)

  useEffect(() => () => { if (blobUrlRef.current) URL.revokeObjectURL(blobUrlRef.current) }, [])

  const handlePick = () => inputRef.current?.click()

  const handleFile = (f: File | null) => {
    if (!f) return
    if (!['image/png', 'image/jpeg'].includes(f.type)) {
      message.error('Only PNG or JPG is allowed')
      return
    }
    if (f.size > MAX_FILE_SIZE) {
      message.error('File must be 10MB or less')
      return
    }
    if (blobUrlRef.current) URL.revokeObjectURL(blobUrlRef.current)
    const url = URL.createObjectURL(f)
    blobUrlRef.current = url
    setFile(f)
    setPreview(url)
  }

  const handleCopy = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text)
      message.success(`${label} copied`)
    } catch {
      message.error('Could not copy')
    }
  }

  const handleSubmit = () => {
    if (!file) {
      message.error('Please upload a screenshot first')
      return
    }
    setSubmitting(true)
    setTimeout(() => {
      setSubmitting(false)
      setShowSuccess(true)
    }, 900)
  }

  const timerSlot = (
    <div className="flex items-center gap-2 bg-surface/70 backdrop-blur border border-white/10 rounded-2xl px-4 py-2 shadow-lg">
      {countdown.expired ? (
        <span className="text-danger text-xs font-bold uppercase tracking-wider">Draw Ended</span>
      ) : (
        <>
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse shrink-0" />
          <ClockCircleOutlined className="text-primary text-sm" />
          <div className="flex items-center gap-1 font-mono text-sm font-bold">
            <span className="text-white">{String(countdown.d).padStart(2,'0')}</span>
            <span className="text-white/30">d</span>
            <span className="text-white/30">:</span>
            <span className="text-white">{String(countdown.h).padStart(2,'0')}</span>
            <span className="text-white/30">h</span>
            <span className="text-white/30">:</span>
            <span className="text-white">{String(countdown.m).padStart(2,'0')}</span>
            <span className="text-white/30">m</span>
            <span className="text-white/30">:</span>
            <span className="text-primary">{String(countdown.s).padStart(2,'0')}</span>
            <span className="text-primary/60">s</span>
          </div>
        </>
      )}
    </div>
  )

  return (
    <WebShell maxWidth={1200}>
      <BackHeader
        title="How to Participate"
        subtitle="Follow the steps below to enter the draw"
        rightSlot={timerSlot}
      />

      <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-6 md:gap-8 items-start">

        {/* ── LEFT COLUMN ─────────────────────────────── */}
        <div className="flex flex-col gap-5">

          {/* Prize Card */}
          <div 
            onMouseMove={handleMouseMove}
            className="bg-surface/60 border border-primary/30 rounded-2xl p-4 md:p-5 flex flex-col sm:flex-row gap-4 md:gap-5 spell-glow-card"
          >
            <div className="w-full sm:w-44 sm:min-w-44 h-40 sm:h-32 rounded-xl overflow-hidden bg-night shrink-0">
              <img
                src={currentDraw.image}
                alt={currentDraw.title}
                className="w-full h-full object-cover spell-float-image"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-white text-base md:text-lg font-bold mb-2">{currentDraw.title}</div>
              <div className="text-white/65 text-[13px] leading-relaxed mb-3.5">{currentDraw.description}</div>
              <div className="text-primary text-base font-bold flex items-center gap-2">
                🎟️ {currentDraw.ticketPrice.toLocaleString()} {currentDraw.currency}
              </div>
            </div>
          </div>

          {/* Participation Instructions */}
          <InfoCard icon={<SafetyOutlined className="text-primary text-xl" />} title="Participation Instructions">
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

          {/* Important */}
          <InfoCard icon={<ExclamationCircleFilled className="text-primary text-xl" />} title="Important:">
            <ul className="instr-list">
              <li>Any false or fraudulent proof of payment will result in the permanent suspension of the account.</li>
              <li>The draw takes place after one or two weeks, depending on the reward offered.</li>
              <li>
                Rewards are handed over in person or delivered free of charge within a maximum of 5 days after the announcement. The winner must respond within 3 days, otherwise the reward will be awarded to another participant.
              </li>
            </ul>
          </InfoCard>

          {/* Payment Numbers */}
          <div 
            onMouseMove={handleMouseMove}
            className="bg-surface/55 border border-white/6 rounded-2xl p-5 spell-glow-card"
          >
            <h3 className="m-0 mb-4 text-white text-[17px] font-bold">Payment Numbers</h3>
            <div className="flex flex-col gap-3">
              {paymentNumbers.map((pn) => (
                <div
                  key={pn.id}
                  className="bg-deep/60 border border-white/6 rounded-xl px-4 py-3.5 flex items-center gap-3.5"
                >
                  <div className="w-11 h-11 rounded-[10px] gradient-brand flex items-center justify-center text-[#1a0f0a] shrink-0">
                    <CreditCardOutlined style={{ fontSize: 20 }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-white/60 text-xs">{pn.provider}</div>
                    <div className="text-white text-[15px] font-semibold">{pn.number}</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy(pn.number, pn.provider)}
                    className="bg-deep/60 border border-white/10 rounded-lg px-3.5 py-2 text-white/85 text-[13px] cursor-pointer flex items-center gap-1.5 hover:bg-white/10 transition-colors"
                  >
                    <CopyOutlined />
                    Copy
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── RIGHT COLUMN ─────────────────────────────── */}
        <div className="lg:sticky lg:top-24 flex flex-col gap-5">

          {/* Upload Card */}
          <div 
            onMouseMove={handleMouseMove}
            className="bg-surface/50 backdrop-blur-md border border-white/10 rounded-3xl p-5 md:p-6 shadow-xl flex flex-col gap-5 spell-glow-card"
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              <h3 className="m-0 text-white text-base font-bold">Payment Proof</h3>
              <div className="bg-primary/10 border border-primary/20 text-primary text-sm font-black px-3 py-1 rounded-xl">
                {currentDraw.ticketPrice.toLocaleString()} {currentDraw.currency}
              </div>
            </div>

            <p className="m-0 text-white/55 text-sm leading-relaxed -mt-2">
              Take a photo or screenshot of the transaction proof, then upload it in the designated area.
            </p>

            {/* Upload Zone */}
            <button
              type="button"
              onClick={handlePick}
              onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
              onDragLeave={() => setDragOver(false)}
              onDrop={(e) => {
                e.preventDefault()
                setDragOver(false)
                handleFile(e.dataTransfer.files?.[0] ?? null)
              }}
              className={[
                'rounded-2xl py-10 px-6 flex flex-col items-center gap-4 cursor-pointer min-h-60 justify-center transition-all duration-300 relative overflow-hidden group w-full border-0',
                dragOver
                  ? 'bg-primary/10 border-[1.5px] border-dashed border-primary shadow-[0_0_20px_rgba(255,105,0,0.1)]'
                  : 'bg-deep/40 border-[1.5px] border-dashed border-white/10 hover:border-primary/50 hover:bg-deep/60',
              ].join(' ')}
            >
              {preview ? (
                <div className="relative w-full h-full flex items-center justify-center">
                  <img
                    src={preview}
                    alt="Payment proof"
                    className="max-w-full max-h-52 rounded-xl object-contain shadow-lg"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity rounded-xl">
                    <div className="text-white text-sm font-bold flex items-center gap-2">
                      <CloudUploadOutlined className="text-lg" />
                      Replace Image
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                    <CloudUploadOutlined />
                  </div>
                  <div className="text-center">
                    <div className="text-white text-sm font-bold">Tap to upload Screenshot</div>
                    <div className="text-white/40 text-[11px] mt-3 font-semibold uppercase tracking-wider">PNG, JPG up to 10MB</div>
                  </div>
                </>
              )}
            </button>

            {/* Submission checklist */}
            <div className="flex flex-col gap-2">
              {[
                'Ensure the Transaction ID and amount are clearly visible',
                'Do not reuse proofs from previous draws',
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-2.5 text-white/55 text-xs leading-relaxed">
                  <CheckOutlined className="text-success mt-0.5 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            {/* File name */}
            {file && (
              <div className="bg-deep/40 border border-white/5 rounded-xl px-4 py-2.5 flex items-center justify-between text-xs text-white/70">
                <span className="truncate max-w-[200px]">{file.name}</span>
                <span className="font-semibold shrink-0 text-white/50">{(file.size / 1024).toFixed(0)} KB</span>
              </div>
            )}

            <input
              ref={inputRef}
              type="file"
              accept="image/png,image/jpeg"
              className="hidden"
              onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
            />

            {/* Submit Button */}
            <button
              type="button"
              disabled={submitting}
              onClick={handleSubmit}
              className="w-full h-12 bg-gradient-to-br from-[#FFB900] to-[#FF6900] hover:from-[#FFC933] hover:to-[#FF7E1A] disabled:opacity-60 disabled:cursor-not-allowed text-[#1a0f0a] rounded-xl font-bold text-sm cursor-pointer flex items-center justify-center gap-2.5 transition-all shadow-[0_4px_20px_rgba(255,105,0,0.3)] hover:shadow-[0_6px_28px_rgba(255,105,0,0.45)] hover:-translate-y-px hover:scale-[1.02] active:scale-[0.99] border-0 spell-btn-glow"
            >
              {submitting ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Submitting…
                </span>
              ) : (
                <>
                  <SendOutlined />
                  Submit Proof
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <SuccessModal
        open={showSuccess}
        onViewParticipations={() => {
          setShowSuccess(false)
          router.push('/my-draws')
        }}
        onBackHome={() => {
          setShowSuccess(false)
          router.push('/')
        }}
      />

      <style>{`
        .instr-list { margin: 0; padding: 0; list-style: none; display: flex; flex-direction: column; gap: 10px; }
        .instr-list li { position: relative; padding-left: 16px; font-size: 13.5px; color: rgba(229, 231, 235, 0.70); line-height: 1.65; }
        .instr-list li::before { content: '•'; position: absolute; left: 0; color: rgba(254,147,1,0.7); }
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
    <div 
      onMouseMove={handleMouseMove}
      className="bg-surface/55 border border-white/6 rounded-2xl p-5 spell-glow-card"
    >
      <div className="flex items-center gap-2.5 mb-3.5 relative z-10">
        {icon}
        <h3 className="m-0 text-white text-[17px] font-bold">{title}</h3>
      </div>
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}
