'use client'
import { Button, Checkbox, Form, Input, message } from 'antd'
import { LockOutlined, MailOutlined } from '@ant-design/icons'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense, useState } from 'react'
import { AuthCard } from '@/components/auth/AuthCard'
import { useAuth } from '@/hooks/useAuth'
import { loginAction } from '@/actions/auth'

interface LoginFormValues {
  email: string
  password: string
  remember: boolean
}

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirect = searchParams?.get('redirect') || '/'
  const { login } = useAuth()
  const [form] = Form.useForm<LoginFormValues>()

  const [loading, setLoading] = useState(false)

  const onFinish = async (values: LoginFormValues) => {
    setLoading(true)
    try {
      const res = await loginAction({
        identifier: values.email,
        password: values.password,
      });
      console.log('Login Response: ', res)

      if (res.success) {
        message.success(res.message || 'Signed in successfully!')
        router.push(redirect)
      } else {
        message.error(res.message || res.error || 'Failed to sign in')
      }
    } catch (error: any) {
      message.error(error.message || 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmitAny = () => {
    const values = form.getFieldsValue()
    onFinish(values as LoginFormValues)
  }

  return (
    <AuthCard
      title="Welcome Back"
      subtitle="Sign in to continue to Gift Box"
      footer={
        <>
          Don&apos;t have an account?{' '}
          <Link href={redirect ? `/register?redirect=${encodeURIComponent(redirect)}` : '/register'} className="text-primary font-semibold">
            Create one
          </Link>
        </>
      }
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{ remember: true }}
        requiredMark={false}
        autoComplete="off"
      >
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
          name="password"
          label={<span className="text-body">Password</span>}
          style={{ marginBottom: '16px' }}
        >
          <Input.Password
            size="large"
            prefix={<LockOutlined className="text-white/50" />}
            placeholder="Enter your password"
            autoComplete="current-password"
          />
        </Form.Item>

        <div className="flex justify-between items-center mb-5">
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox className="text-body">Remember me</Checkbox>
          </Form.Item>
          <Link href="/forgot-password" className="text-primary text-sm font-medium">
            Forgot password?
          </Link>
        </div>

        <Form.Item className="mb-0" style={{ marginBottom: 0 }}>
          <Button type="primary" size="large" block onClick={handleSubmitAny} loading={loading}>
            Sign In
          </Button>
        </Form.Item>
      </Form>
    </AuthCard>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="text-white text-center py-8">Loading...</div>}>
      <LoginForm />
    </Suspense>
  )
}
