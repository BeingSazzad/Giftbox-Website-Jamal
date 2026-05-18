'use client'
import { Button, Form, Input, message } from 'antd'
import { LockOutlined, MailOutlined } from '@ant-design/icons'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { AuthCard } from '@/components/auth/AuthCard'

type Step = 'request' | 'reset'

interface RequestValues {
  email: string
}

interface ResetValues {
  password: string
  confirmPassword: string
}

export default function ForgotPasswordPage() {
  const router = useRouter()
  const [step, setStep] = useState<Step>('request')
  const [email, setEmail] = useState('')

  const handleRequest = (values: RequestValues) => {
    setEmail(values.email)
    message.success(`Reset link sent to ${values.email}`)
    setStep('reset')
  }

  const handleReset = (values: ResetValues) => {
    message.success('Password updated. Please sign in.')
    router.push('/login')
  }

  if (step === 'request') {
    return (
      <AuthCard
        title="Forgot Password?"
        subtitle="Enter your email and we'll send you a reset link"
        footer={
          <>
            Remembered it?{' '}
            <Link href="/login" className="text-primary font-semibold">
              Back to sign in
            </Link>
          </>
        }
      >
        <Form layout="vertical" onFinish={handleRequest} requiredMark={false}>
          <Form.Item
            name="email"
            label={<span className="text-body">Email</span>}
            rules={[
              { required: true, message: 'Please enter your email' },
              { type: 'email', message: 'Enter a valid email' },
            ]}
          >
            <Input
              size="large"
              prefix={<MailOutlined className="text-white/50" />}
              placeholder="you@example.com"
            />
          </Form.Item>
          <Form.Item className="mb-0">
            <Button type="primary" htmlType="submit" size="large" block>
              Send Reset Link
            </Button>
          </Form.Item>
        </Form>
      </AuthCard>
    )
  }

  return (
    <AuthCard
      title="Set New Password"
      subtitle={`Create a new password for ${email}`}
      footer={
        <button
          type="button"
          onClick={() => setStep('request')}
          className="bg-transparent border-0 text-primary font-semibold cursor-pointer p-0 text-sm"
        >
          Use a different email
        </button>
      }
    >
      <Form layout="vertical" onFinish={handleReset} requiredMark={false}>
        <Form.Item
          name="password"
          label={<span className="text-body">New Password</span>}
          rules={[
            { required: true, message: 'Please enter a password' },
            { min: 8, message: 'At least 8 characters' },
          ]}
        >
          <Input.Password
            size="large"
            prefix={<LockOutlined className="text-white/50" />}
            placeholder="Enter new password"
          />
        </Form.Item>

        <Form.Item
          name="confirmPassword"
          label={<span className="text-body">Confirm Password</span>}
          dependencies={['password']}
          rules={[
            { required: true, message: 'Please confirm your password' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve()
                }
                return Promise.reject(new Error('Passwords do not match'))
              },
            }),
          ]}
        >
          <Input.Password
            size="large"
            prefix={<LockOutlined className="text-white/50" />}
            placeholder="Re-enter new password"
          />
        </Form.Item>

        <Form.Item className="mb-0">
          <Button type="primary" htmlType="submit" size="large" block>
            Update Password
          </Button>
        </Form.Item>
      </Form>
    </AuthCard>
  )
}
