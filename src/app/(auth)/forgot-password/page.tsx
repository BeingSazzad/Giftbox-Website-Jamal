'use client'
import { Button, Form, Input, message } from 'antd'
import type { InputRef } from 'antd'
import { LockOutlined, PhoneOutlined } from '@ant-design/icons'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { AuthCard } from '@/components/auth/AuthCard'

type Step = 'phone' | 'otp' | 'reset'

const OTP_LENGTH = 6
const RESEND_SECONDS = 60

export default function ForgotPasswordPage() {
  const router = useRouter()
  const [step, setStep] = useState<Step>('phone')
  const [phone, setPhone] = useState('')
  const [digits, setDigits] = useState<string[]>(Array(OTP_LENGTH).fill(''))
  const [countdown, setCountdown] = useState(0)
  const [submitting, setSubmitting] = useState(false)
  const inputs = useRef<(InputRef | null)[]>([])

  useEffect(() => {
    if (step === 'otp') inputs.current[0]?.focus()
  }, [step])

  useEffect(() => {
    if (countdown <= 0) return
    const t = setInterval(() => setCountdown((c) => c - 1), 1000)
    return () => clearInterval(t)
  }, [countdown])

  const handleSendOtp = (values: { phone: string }) => {
    setPhone(values.phone)
    message.success(`OTP sent to +243 ${values.phone}`)
    setCountdown(RESEND_SECONDS)
    setStep('otp')
  }

  const handleChange = (index: number, raw: string) => {
    const value = raw.replace(/\D/g, '').slice(-1)
    const next = [...digits]
    next[index] = value
    setDigits(next)
    if (value && index < OTP_LENGTH - 1) inputs.current[index + 1]?.focus()
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !digits[index] && index > 0) inputs.current[index - 1]?.focus()
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

  const handleVerifyOtp = () => {
    if (digits.join('').length < OTP_LENGTH) {
      message.error(`Please enter the ${OTP_LENGTH}-digit code`)
      return
    }
    setSubmitting(true)
    setTimeout(() => {
      setSubmitting(false)
      setStep('reset')
    }, 600)
  }

  const handleResend = () => {
    if (countdown > 0) return
    message.success('A new OTP has been sent')
    setCountdown(RESEND_SECONDS)
    setDigits(Array(OTP_LENGTH).fill(''))
    inputs.current[0]?.focus()
  }

  const handleReset = (_values: { password: string; confirmPassword: string }) => {
    message.success('Password reset successfully. Please sign in.')
    router.push('/login')
  }

  // ── Step 1: Phone ─────────────────────────────────────────────
  if (step === 'phone') {
    return (
      <AuthCard
        title="Forgot Password?"
        subtitle="Enter your phone number to receive an OTP"
        footer={
          <>
            Remembered it?{' '}
            <Link href="/login" className="text-primary font-semibold">
              Back to sign in
            </Link>
          </>
        }
      >
        <Form layout="vertical" onFinish={handleSendOtp} requiredMark={false}>
          <Form.Item
            name="phone"
            label={<span className="text-white/70 font-semibold text-xs">Phone Number</span>}
            rules={[{ required: true, message: 'Please enter your phone number' }]}
          >
            <Input
              size="large"
              prefix={
                <div className="flex items-center gap-2 text-white/50 text-xs font-semibold select-none mr-1">
                  <PhoneOutlined className="text-white/30" />
                  <span className="border-r border-white/10 pr-2">+243</span>
                </div>
              }
              placeholder="Enter your phone number"
              inputMode="tel"
            />
          </Form.Item>
          <Form.Item className="mb-0">
            <Button type="primary" htmlType="submit" size="large" block className="h-12 font-bold">
              Send OTP
            </Button>
          </Form.Item>
        </Form>
      </AuthCard>
    )
  }

  // ── Step 2: OTP ───────────────────────────────────────────────
  if (step === 'otp') {
    return (
      <AuthCard
        title="Verify OTP"
        subtitle={`Enter the ${OTP_LENGTH}-digit code sent to +243 ${phone}`}
        footer={
          <div className="text-sm text-white/60">
            Didn&apos;t receive the code?{' '}
            {countdown > 0 ? (
              <span className="text-white/40">Resend OTP in {countdown}s</span>
            ) : (
              <button
                type="button"
                onClick={handleResend}
                className="bg-transparent border-0 text-primary font-semibold cursor-pointer p-0 text-sm"
              >
                Resend OTP
              </button>
            )}
          </div>
        }
      >
        <div className="flex justify-between gap-2 mb-6">
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
              className="text-center text-xl font-bold"
              style={{ width: 48, height: 52 }}
            />
          ))}
        </div>

        <Button
          type="primary"
          size="large"
          block
          loading={submitting}
          onClick={handleVerifyOtp}
          className="h-12 font-bold"
        >
          Verify OTP
        </Button>

        <button
          type="button"
          onClick={() => setStep('phone')}
          className="mt-4 w-full bg-transparent border-0 text-white/40 hover:text-white/70 text-sm cursor-pointer transition-colors"
        >
          ← Change phone number
        </button>
      </AuthCard>
    )
  }

  // ── Step 3: Reset Password ────────────────────────────────────
  return (
    <AuthCard
      title="Reset Password"
      subtitle="Create a new secure password"
      footer={
        <button
          type="button"
          onClick={() => setStep('otp')}
          className="bg-transparent border-0 text-white/40 hover:text-white/70 text-sm cursor-pointer transition-colors"
        >
          ← Back to OTP
        </button>
      }
    >
      <Form layout="vertical" onFinish={handleReset} requiredMark={false}>
        <Form.Item
          name="password"
          label={<span className="text-white/70 font-semibold text-xs">New Password</span>}
          rules={[
            { required: true, message: 'Please enter a password' },
            { min: 8, message: 'At least 8 characters' },
          ]}
        >
          <Input.Password
            size="large"
            prefix={<LockOutlined className="text-white/30 mr-1" />}
            placeholder="Enter your password"
          />
        </Form.Item>

        <Form.Item
          name="confirmPassword"
          label={<span className="text-white/70 font-semibold text-xs">Confirm Password</span>}
          dependencies={['password']}
          rules={[
            { required: true, message: 'Please confirm your password' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) return Promise.resolve()
                return Promise.reject(new Error('Passwords do not match'))
              },
            }),
          ]}
        >
          <Input.Password
            size="large"
            prefix={<LockOutlined className="text-white/30 mr-1" />}
            placeholder="Re-enter password"
          />
        </Form.Item>

        <Form.Item className="mb-0">
          <Button type="primary" htmlType="submit" size="large" block className="h-12 font-bold">
            Reset Password
          </Button>
        </Form.Item>
      </Form>
    </AuthCard>
  )
}
