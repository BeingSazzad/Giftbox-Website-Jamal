'use client'
import { Button, Form, Input, message } from 'antd'
import { LockOutlined, MailOutlined, PhoneOutlined, UserOutlined } from '@ant-design/icons'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import { AuthCard } from '@/components/auth/AuthCard'
import { useAuth } from '@/hooks/useAuth'

interface RegisterFormValues {
  fullName: string
  email: string
  phone: string
  password: string
  confirmPassword: string
}

function RegisterForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirect = searchParams?.get('redirect') || '/'
  const { login } = useAuth()
  const [form] = Form.useForm<RegisterFormValues>()

  const onFinish = (values: RegisterFormValues) => {
    const mockToken = 'mock-token-' + Date.now()
    const mockUser = {
      id: 'user-' + Date.now(),
      name: values.fullName || 'User',
      email: values.email || 'user@example.com',
    }
    login(mockUser, mockToken)
    message.success('Account created successfully!')
    router.push(redirect)
  }

  const handleSubmitAny = () => {
    const values = form.getFieldsValue()
    onFinish(values as RegisterFormValues)
  }

  return (
    <AuthCard
      title="Create Account"
      subtitle="Join Gift Box in less than a minute"
      footer={
        <>
          Already have an account?{' '}
          <Link href={redirect ? `/login?redirect=${encodeURIComponent(redirect)}` : '/login'} className="text-primary font-semibold">
            Sign in
          </Link>
        </>
      }
    >
      <Form form={form} layout="vertical" onFinish={onFinish} requiredMark={false} autoComplete="off">
        <Form.Item
          name="fullName"
          label={<span className="text-body">Full Name</span>}
          style={{ marginBottom: '12px' }}
        >
          <Input
            size="large"
            prefix={<UserOutlined className="text-white/50" />}
            placeholder="John Doe"
            autoComplete="off"
          />
        </Form.Item>

        <Form.Item
          name="email"
          label={<span className="text-body">Email</span>}
          style={{ marginBottom: '12px' }}
        >
          <Input
            size="large"
            prefix={<MailOutlined className="text-white/50" />}
            placeholder="you@example.com"
            autoComplete="off"
          />
        </Form.Item>

        <Form.Item
          name="phone"
          label={<span className="text-body">Phone</span>}
          style={{ marginBottom: '12px' }}
        >
          <Input
            size="large"
            prefix={<PhoneOutlined className="text-white/50" />}
            placeholder="+243 XXXXXXXXX"
            autoComplete="off"
          />
        </Form.Item>

        <Form.Item
          name="password"
          label={<span className="text-body">Password</span>}
          style={{ marginBottom: '12px' }}
        >
          <Input.Password
            size="large"
            prefix={<LockOutlined className="text-white/50" />}
            placeholder="Create a strong password"
            autoComplete="new-password"
          />
        </Form.Item>

        <Form.Item
          name="confirmPassword"
          label={<span className="text-body">Confirm Password</span>}
          style={{ marginBottom: '16px' }}
        >
          <Input.Password
            size="large"
            prefix={<LockOutlined className="text-white/50" />}
            placeholder="Re-enter your password"
            autoComplete="new-password"
          />
        </Form.Item>

        <Form.Item className="mt-2 mb-0" style={{ marginBottom: 0 }}>
          <Button type="primary" size="large" block onClick={handleSubmitAny}>
            Create Account
          </Button>
        </Form.Item>
      </Form>
    </AuthCard>
  )
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<div className="text-white text-center py-8">Loading...</div>}>
      <RegisterForm />
    </Suspense>
  )
}
