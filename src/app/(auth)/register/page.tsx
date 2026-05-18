'use client'
import { Button, Form, Input, message } from 'antd'
import { LockOutlined, MailOutlined, PhoneOutlined, UserOutlined } from '@ant-design/icons'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { AuthCard } from '@/components/auth/AuthCard'
import { useAuth } from '@/hooks/useAuth'

interface RegisterFormValues {
  fullName: string
  email: string
  phone: string
  password: string
  confirmPassword: string
}

export default function RegisterPage() {
  const router = useRouter()
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
    router.push('/my-draws')
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
          <Link href="/login" className="text-primary font-semibold">
            Sign in
          </Link>
        </>
      }
    >
      <Form form={form} layout="vertical" onFinish={onFinish} requiredMark={false} autoComplete="off">
        <Form.Item
          name="fullName"
          label={<span className="text-body">Full Name</span>}
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
        >
          <Input
            size="large"
            prefix={<PhoneOutlined className="text-white/50" />}
            placeholder="+880 1XXXXXXXXX"
            autoComplete="off"
          />
        </Form.Item>

        <Form.Item
          name="password"
          label={<span className="text-body">Password</span>}
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
        >
          <Input.Password
            size="large"
            prefix={<LockOutlined className="text-white/50" />}
            placeholder="Re-enter your password"
            autoComplete="new-password"
          />
        </Form.Item>

        <Form.Item className="mt-2 mb-0">
          <Button type="primary" size="large" block onClick={handleSubmitAny}>
            Create Account
          </Button>
        </Form.Item>
      </Form>
    </AuthCard>
  )
}
