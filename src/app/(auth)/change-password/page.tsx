'use client'
import { Button, Form, Input, message } from 'antd'
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
    console.log('Change password:', values)
    message.success('Password updated')
    router.push('/profile')
  }

  const labelClass = 'text-body font-semibold'

  return (
    <WebShell maxWidth={640}>
      <BackHeader title="Change Password" />

      <Form<ChangePasswordValues>
        form={form}
        layout="vertical"
        requiredMark={false}
        onFinish={onFinish}
      >
        <Form.Item
          name="current"
          label={<span className={labelClass}>Current Password</span>}
          rules={[{ required: true, message: 'Please enter your current password' }]}
        >
          <Input.Password size="large" placeholder="Enter your current password" />
        </Form.Item>

        <Form.Item
          name="next"
          label={<span className={labelClass}>New Password</span>}
          rules={[
            { required: true, message: 'Please enter a new password' },
            { min: 8, message: 'At least 8 characters' },
          ]}
        >
          <Input.Password size="large" placeholder="Enter your password" />
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
          <Input.Password size="large" placeholder="Re-enter password" />
        </Form.Item>

        <Form.Item className="mt-7 mb-0">
          <Button type="primary" htmlType="submit" block>
            Save Changes
          </Button>
        </Form.Item>
      </Form>
    </WebShell>
  )
}
