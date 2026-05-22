'use client';
import { Button, DatePicker, Form, Input, message } from 'antd'
import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import dayjs, { type Dayjs } from 'dayjs'
import { WebShell } from '@/components/layout/WebShell'
import { BackHeader } from '@/components/layout/BackHeader'

interface EditProfileValues {
  fullName: string
  email: string
  phone: string
  dob?: Dayjs
  city: string
}

export default function EditProfilePage() {
  const router = useRouter()
  const { user } = useAuth()
  const [form] = Form.useForm<EditProfileValues>()
  const [avatar, setAvatar] = useState<string>(user?.avatar || 'https://i.pravatar.cc/200?img=12')
  const inputRef = useRef<HTMLInputElement>(null)
  const avatarBlobRef = useRef<string | null>(null)

  useEffect(() => () => { if (avatarBlobRef.current) URL.revokeObjectURL(avatarBlobRef.current) }, [])

  const handleAvatarPick = () => inputRef.current?.click()

  const handleAvatarChange = (f: File | null) => {
    if (!f) return
    if (!f.type.startsWith('image/')) {
      message.error('Please choose an image file')
      return
    }
    if (avatarBlobRef.current) URL.revokeObjectURL(avatarBlobRef.current)
    const url = URL.createObjectURL(f)
    avatarBlobRef.current = url
    setAvatar(url)
  }

  const onFinish = (values: EditProfileValues) => {
    message.success('Profile updated')
    router.push('/profile')
  }

  const labelClass = 'text-body font-semibold'

  return (
    <WebShell maxWidth={640}>
      <BackHeader title="Edit Profile" />

      <div className="text-center mb-7">
        <div className="inline-block relative">
          <div className="w-28 h-28 rounded-full p-1 gradient-brand">
            <img
              src={avatar}
              alt="Avatar"
              className="w-full h-full rounded-full object-cover"
            />
          </div>
        </div>
        <div className="mt-2.5">
          <button
            type="button"
            onClick={handleAvatarPick}
            className="bg-transparent border-0 text-primary font-bold text-sm cursor-pointer p-0"
          >
            Change Photo
          </button>
        </div>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => handleAvatarChange(e.target.files?.[0] ?? null)}
        />
      </div>

      <Form<EditProfileValues>
        form={form}
        layout="vertical"
        requiredMark={false}
        initialValues={{
          fullName: user?.name || '',
          email: user?.email || '',
          phone: user?.phone || '',
          city: '',
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="fullName"
          label={<span className={labelClass}>Full Name</span>}
          rules={[{ required: true, message: 'Please enter your full name' }]}
        >
          <Input size="large" placeholder="Your name" />
        </Form.Item>

        <Form.Item
          name="email"
          label={<span className={labelClass}>Email</span>}
          rules={[
            { required: true, message: 'Please enter your email' },
            { type: 'email', message: 'Enter a valid email' },
          ]}
        >
          <Input size="large" placeholder="Enter your email address" />
        </Form.Item>

        <Form.Item
          name="phone"
          label={<span className={labelClass}>Phone Number</span>}
          rules={[{ required: true, message: 'Please enter your phone number' }]}
        >
          <Input 
            size="large" 
            placeholder="9876543210" 
            prefix={
              <span className="text-white/50 text-xs font-semibold select-none border-r border-white/10 pr-2 mr-1">+243</span>
            } 
          />
        </Form.Item>

        <Form.Item name="dob" label={<span className={labelClass}>Date of Birth</span>}>
          <DatePicker
            size="large"
            className="w-full"
            format="MM/DD/YYYY"
            placeholder="mm/dd/yyyy"
            disabledDate={(d) => d && d.isAfter(dayjs())}
          />
        </Form.Item>

        <Form.Item
          name="city"
          label={<span className={labelClass}>City</span>}
          rules={[{ required: true, message: 'Please enter your city' }]}
        >
          <Input size="large" placeholder="Your city" />
        </Form.Item>

        <Form.Item className="mt-6 mb-0">
          <Button type="primary" htmlType="submit" block>
            Save Changes
          </Button>
        </Form.Item>
      </Form>
    </WebShell>
  )
}
