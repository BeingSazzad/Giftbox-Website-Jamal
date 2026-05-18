'use client'
import { Button, Input, message } from 'antd'
import type { InputRef } from 'antd'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { AuthCard } from '@/components/auth/AuthCard'

const OTP_LENGTH = 6
const RESEND_SECONDS = 60

export default function OtpVerifyPage() {
  const router = useRouter()

  const [digits, setDigits] = useState<string[]>(Array(OTP_LENGTH).fill(''))
  const [countdown, setCountdown] = useState(RESEND_SECONDS)
  const [submitting, setSubmitting] = useState(false)
  const inputs = useRef<(InputRef | null)[]>([])

  useEffect(() => {
    inputs.current[0]?.focus()
  }, [])

  useEffect(() => {
    if (countdown <= 0) return
    const t = setInterval(() => setCountdown((c) => c - 1), 1000)
    return () => clearInterval(t)
  }, [countdown])

  const handleChange = (index: number, raw: string) => {
    const value = raw.replace(/\D/g, '').slice(-1)
    const next = [...digits]
    next[index] = value
    setDigits(next)
    if (value && index < OTP_LENGTH - 1) {
      inputs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      inputs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, OTP_LENGTH)
    if (!pasted) return
    e.preventDefault()
    const next = Array(OTP_LENGTH).fill('')
    for (let i = 0; i < pasted.length; i++) next[i] = pasted[i]
    setDigits(next)
    inputs.current[Math.min(pasted.length, OTP_LENGTH - 1)]?.focus()
  }

  const handleVerify = () => {
    const code = digits.join('')
    if (code.length < OTP_LENGTH) {
      message.error(`Please enter the ${OTP_LENGTH}-digit code`)
      return
    }
    setSubmitting(true)
    setTimeout(() => {
      message.success('Verified successfully')
      setSubmitting(false)
      router.push('/dashboard')
    }, 600)
  }

  const handleResend = () => {
    if (countdown > 0) return
    message.success('A new code has been sent')
    setCountdown(RESEND_SECONDS)
    setDigits(Array(OTP_LENGTH).fill(''))
    inputs.current[0]?.focus()
  }

  return (
    <AuthCard
      title="Verify Your Email"
      subtitle={`We sent a ${OTP_LENGTH}-digit code to your email`}
      footer={
        <>
          Wrong email?{' '}
          <Link href="/register" className="text-primary font-semibold">
            Go back
          </Link>
        </>
      }
    >
      <div className="flex justify-between gap-2.5 mb-6">
        {digits.map((d, i) => (
          <Input
            key={i}
            ref={(el) => { inputs.current[i] = el }}
            value={d}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            onPaste={handlePaste}
            maxLength={1}
            inputMode="numeric"
            className="text-center text-[22px] font-semibold"
            style={{ width: 48, height: 56 }}
          />
        ))}
      </div>

      <Button type="primary" size="large" block loading={submitting} onClick={handleVerify}>
        Verify
      </Button>

      <div className="mt-4 text-center text-sm text-white/70">
        Didn&apos;t receive the code?{' '}
        {countdown > 0 ? (
          <span className="text-white/50">Resend in {countdown}s</span>
        ) : (
          <button
            type="button"
            onClick={handleResend}
            className="bg-transparent border-0 text-primary font-semibold cursor-pointer p-0 text-sm"
          >
            Resend code
          </button>
        )}
      </div>
    </AuthCard>
  )
}
