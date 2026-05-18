'use client'
import { Button, Form, Input, message } from 'antd'
import { LockOutlined, MailOutlined, PhoneOutlined, UserOutlined } from '@ant-design/icons'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { AuthCard } from '@/components/auth/AuthCard'

interface RegisterFormValues {
  fullName: string
  email: string
  phone: string
  password: string
  confirmPassword: string
}

export default function RegisterPage() {
  const router = useRouter()
  const [form] = Form.useForm<RegisterFormValues>()

  const onFinish = (values: RegisterFormValues) => {
    console.log('Register:', values)
    message.success('Account created. Verify your email to continue.')
    router.push('/verify-otp')
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
      <Form form={form} layout="vertical" onFinish={onFinish} requiredMark={false}>
        <Form.Item
          name="fullName"
          label={<span className="text-body">Full Name</span>}
          rules={[{ required: true, message: 'Please enter your full name' }]}
        >
          <Input
            size="large"
            prefix={<UserOutlined className="text-white/50" />}
            placeholder="John Doe"
          />
        </Form.Item>

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

        <Form.Item
          name="phone"
          label={<span className="text-body">Phone</span>}
          rules={[{ required: true, message: 'Please enter your phone number' }]}
        >
          <Input
            size="large"
            prefix={<PhoneOutlined className="text-white/50" />}
            placeholder="+880 1XXXXXXXXX"
          />
        </Form.Item>

        <Form.Item
          name="password"
          label={<span className="text-body">Password</span>}
          rules={[
            { required: true, message: 'Please enter a password' },
            { min: 8, message: 'At least 8 characters' },
          ]}
        >
          <Input.Password
            size="large"
            prefix={<LockOutlined className="text-white/50" />}
            placeholder="Create a strong password"
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
            placeholder="Re-enter your password"
          />
        </Form.Item>

        <Form.Item className="mt-2 mb-0">
          <Button type="primary" htmlType="submit" size="large" block>
            Create Account
          </Button>
        </Form.Item>
      </Form>
    </AuthCard>
  )
}
