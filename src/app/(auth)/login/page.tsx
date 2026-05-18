'use client'
import { Button, Checkbox, Form, Input, message } from 'antd'
import { LockOutlined, MailOutlined } from '@ant-design/icons'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { AuthCard } from '@/components/auth/AuthCard'

interface LoginFormValues {
  email: string
  password: string
  remember: boolean
}

export default function LoginPage() {
  const router = useRouter()
  const [form] = Form.useForm<LoginFormValues>()

  const onFinish = (values: LoginFormValues) => {
    console.log('Login:', values)
    message.success('Logged in successfully')
    router.push('/dashboard')
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
      >
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
          name="password"
          label={<span className="text-body">Password</span>}
          rules={[{ required: true, message: 'Please enter your password' }]}
        >
          <Input.Password
            size="large"
            prefix={<LockOutlined className="text-white/50" />}
            placeholder="Enter your password"
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

        <Form.Item className="mb-0">
          <Button type="primary" htmlType="submit" size="large" block>
            Sign In
          </Button>
        </Form.Item>
      </Form>
    </AuthCard>
  )
}
