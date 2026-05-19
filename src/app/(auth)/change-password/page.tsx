'use client'
import { Button, Form, Input, message } from 'antd'
import { LockOutlined } from '@ant-design/icons'
import { useRouter } from 'next/navigation'
import { WebShell } from '@/components/layout/WebShell'
import { BackHeader } from '@/components/layout/BackHeader'

interface ChangePasswordValues {
  current: string
  next: string
  confirm: string
}

export default function ChangePasswordPage() {
  const router = useRouter()
  const [form] = Form.useForm<ChangePasswordValues>()

  const onFinish = (values: ChangePasswordValues) => {
    message.success('Password updated successfully!')
    router.push('/profile')
  }

  const labelClass = 'text-white/70 font-semibold text-xs'

  return (
    <WebShell maxWidth={1120}>
      <BackHeader title="Change Password" subtitle="Update your account credentials to keep your profile secure" />

      <div className="max-w-[480px] mx-auto mt-8 bg-surface/50 backdrop-blur-md border border-white/10 rounded-3xl p-6 md:p-8 shadow-xl">
        <Form<ChangePasswordValues>
          form={form}
          layout="vertical"
          requiredMark={false}
          onFinish={onFinish}
          className="space-y-4"
        >
          <Form.Item
            name="current"
            label={<span className={labelClass}>Current Password</span>}
            rules={[{ required: true, message: 'Please enter your current password' }]}
          >
            <Input.Password 
              size="large" 
              prefix={<LockOutlined className="text-white/30 mr-1" />}
              placeholder="Enter your current password" 
            />
          </Form.Item>

          <Form.Item
            name="next"
            label={<span className={labelClass}>New Password</span>}
            rules={[
              { required: true, message: 'Please enter a new password' },
              { min: 8, message: 'At least 8 characters' },
            ]}
          >
            <Input.Password 
              size="large" 
              prefix={<LockOutlined className="text-white/30 mr-1" />}
              placeholder="Enter new password (min. 8 chars)" 
            />
          </Form.Item>

          <Form.Item
            name="confirm"
            label={<span className={labelClass}>Confirm Password</span>}
            dependencies={['next']}
            rules={[
              { required: true, message: 'Please confirm your password' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('next') === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject(new Error('Passwords do not match'))
                },
              }),
            ]}
          >
            <Input.Password 
              size="large" 
              prefix={<LockOutlined className="text-white/30 mr-1" />}
              placeholder="Confirm your new password" 
            />
          </Form.Item>

          <Form.Item className="mb-0 pt-3">
            <Button type="primary" htmlType="submit" size="large" block className="h-12 font-bold">
              Save Changes & Lock Account
            </Button>
          </Form.Item>
        </Form>
      </div>
    </WebShell>
  )
}

