'use client'
import { Button, Form, Input, message } from 'antd'
import type { InputRef } from 'antd'
import { LockOutlined, MailOutlined } from '@ant-design/icons'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { AuthCard } from '@/components/auth/AuthCard'
import { forgetPasswordAction, verifyAccountAction, resendOtpAction, resetPasswordAction } from '@/actions/auth'

type Step = 'email' | 'otp' | 'reset'

const OTP_LENGTH = 6
const RESEND_SECONDS = 60

export default function ForgotPasswordPage() {
  const router = useRouter()
  const [step, setStep] = useState<Step>('email')
  const [email, setEmail] = useState('')
  const [resetToken, setResetToken] = useState('')
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

  const handleSendOtp = async (values: { email: string }) => {
    setSubmitting(true);
    try {
      const res = await forgetPasswordAction({ identifier: values.email });
      if (res.success) {
        setEmail(values.email)
        message.success(res.message || `OTP sent to ${values.email}`)
        setCountdown(RESEND_SECONDS)
        setStep('otp')
      } else {
        message.error(res.message || res.error || 'Failed to send OTP')
      }
    } catch (e: any) {
      message.error(e.message || 'An error occurred')
    } finally {
      setSubmitting(false);
    }
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

  const handleVerifyOtp = async () => {
    const code = digits.join('')
    if (code.length < OTP_LENGTH) {
      message.error(`Please enter the ${OTP_LENGTH}-digit code`)
      return
    }
    setSubmitting(true)
    try {
      const res = await verifyAccountAction({ identifier: email, code })
      if (res.success) {
        setResetToken(res.data?.resetToken || '')
        setStep('reset')
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
    const res = await resendOtpAction({ identifier: email });
    if (res.success) {
      message.success(res.message || 'A new OTP has been sent')
      setCountdown(RESEND_SECONDS)
      setDigits(Array(OTP_LENGTH).fill(''))
      inputs.current[0]?.focus()
    } else {
      message.error(res.message || res.error || 'Failed to resend OTP')
    }
  }

  const handleReset = async (values: { password: string; confirmPassword: string }) => {
    setSubmitting(true)
    try {
      const res = await resetPasswordAction({
        newPassword: values.password,
        confirmPassword: values.confirmPassword,
        resetToken,
      })
      if (res.success) {
        message.success(res.message || 'Password reset successfully. Please sign in.')
        router.push('/login')
      } else {
        message.error(res.message || res.error || 'Failed to reset password')
      }
    } catch (e: any) {
      message.error(e.message || 'An error occurred')
    } finally {
      setSubmitting(false)
    }
  }

  // ── Step 1: Email ────────────────────────────────────────────
  if (step === 'email') {
    return (
      <AuthCard
        title="Forgot Password?"
        subtitle="Enter your email to receive an OTP"
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
            name="email"
            label={<span className="text-white/70 font-semibold text-xs">Email Address</span>}
            rules={[
              { required: true, message: 'Please enter your email' },
              { type: 'email', message: 'Please enter a valid email' },
            ]}
          >
            <Input
              size="large"
              prefix={<MailOutlined className="text-white/30 mr-1" />}
              placeholder="Enter your email"
              type="email"
            />
          </Form.Item>
          <Form.Item className="mb-0">
            <Button type="primary" htmlType="submit" size="large" block loading={submitting} className="h-12 font-bold">
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
        subtitle={`Enter the ${OTP_LENGTH}-digit code sent to ${email}`}
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
          onClick={() => setStep('email')}
          className="mt-4 w-full bg-transparent border-0 text-white/40 hover:text-white/70 text-sm cursor-pointer transition-colors"
        >
          ← Change email
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
          <Button type="primary" htmlType="submit" size="large" block loading={submitting} className="h-12 font-bold">
            Reset Password
          </Button>
        </Form.Item>
      </Form>
    </AuthCard>
  )
}
