'use client'
import { Button, Input, message } from 'antd'
import type { InputRef } from 'antd'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { AuthCard } from '@/components/auth/AuthCard'
import { useAuth } from '@/hooks/useAuth'
import { verifyAccountAction, resendOtpAction } from '@/actions/auth'

const OTP_LENGTH = 6
const RESEND_SECONDS = 60

export default function OtpVerifyPage() {
  const router = useRouter()
  const { user } = useAuth()
  const identifier = user?.email || user?.phone || ''

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

  const handleVerify = async () => {
    const code = digits.join('')
    if (code.length < OTP_LENGTH) {
      message.error(`Please enter the ${OTP_LENGTH}-digit code`)
      return
    }
    if (!identifier) {
      message.error('No identifier found. Please login again.')
      return
    }
    setSubmitting(true)
    try {
      const res = await verifyAccountAction({ identifier, code })
      if (res.success) {
        message.success(res.message || 'Verified successfully')
        router.push('/')
      } else {
        message.error(res.message || res.error || 'Invalid OTP')
      }
    } catch (e: any) {
      message.error(e.message || 'An error occurred')
    } finally {
      setSubmitting(false)
    }
  }

  const handleResend = async () => {
    if (countdown > 0) return
    if (!identifier) {
      message.error('No identifier found. Please login again.')
      return
    }
    try {
      const res = await resendOtpAction({ identifier });
      if (res.success) {
        message.success(res.message || 'A new code has been sent')
        setCountdown(RESEND_SECONDS)
        setDigits(Array(OTP_LENGTH).fill(''))
        inputs.current[0]?.focus()
      } else {
        message.error(res.message || res.error || 'Failed to resend code')
      }
    } catch (e: any) {
      message.error(e.message || 'An error occurred')
    }
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
            className="bg-transparent border-0  font-semibold p-0 text-sm cursor-pointer text-primary  hover:underline"
          >
            Resend code
          </button>
        )}
      </div>
    </AuthCard>
  )
}
