'use client'
import { Button, Checkbox, Form, Input, message } from 'antd'
import { LockOutlined, MailOutlined } from '@ant-design/icons'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { AuthCard } from '@/components/auth/AuthCard'
import { useAuth } from '@/hooks/useAuth'

interface LoginFormValues {
  email: string
  password: string
  remember: boolean
}

export default function LoginPage() {
  const router = useRouter()
  const { login } = useAuth()
  const [form] = Form.useForm<LoginFormValues>()

  const onFinish = (values: LoginFormValues) => {
    // Mock auth — any input works, no validation
    const mockToken = 'mock-token-' + Date.now()
    const mockUser = {
      id: 'user-001',
      name: (values.email || 'User').split('@')[0] || 'User',
      email: values.email || 'user@example.com',
    }
    login(mockUser, mockToken)
    message.success('Signed in successfully!')
    router.push('/my-draws')
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
          <Link href="/register" className="text-primary font-semibold">
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
          <Button type="primary" size="large" block onClick={handleSubmitAny}>
            Sign In
          </Button>
        </Form.Item>
      </Form>
    </AuthCard>
  )
}
