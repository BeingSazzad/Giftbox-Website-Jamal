'use client'

import { Button, DatePicker, Form, Input, message } from 'antd'
import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import dayjs, { type Dayjs } from 'dayjs'

import { WebShell } from '@/components/layout/WebShell'
import { BackHeader } from '@/components/layout/BackHeader'

import { useProfile } from '@/hooks/useProfile'
import { updateProfileAction } from '@/actions/profile'
import { getImageUrl } from '@/utils/helpers'

interface EditProfileValues {
  fullName: string
  email: string
  phone: string
  dob?: Dayjs
  city: string
}

export default function EditProfilePage() {
  const user = useProfile()

  const [form] = Form.useForm<EditProfileValues>()

  const [avatar, setAvatar] = useState<string>(
    getImageUrl(user?.profileImage) || '/default.png'
  )

  const inputRef = useRef<HTMLInputElement>(null)
  const fileRef = useRef<File | null>(null)
  const blobRef = useRef<string | null>(null)

  useEffect(() => {
    return () => {
      if (blobRef.current) URL.revokeObjectURL(blobRef.current)
    }
  }, [])

  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        fullName: user.name,
        email: user.email,
        phone: user.phone,
        city: user.city,
        dob: user.dateOfBirth ? dayjs(user.dateOfBirth) : undefined,
      })

      setAvatar(getImageUrl(user.profileImage))
    }
  }, [user, form])

  const handleAvatarPick = () => inputRef.current?.click()

  const handleAvatarChange = (file: File | null) => {
    if (!file) return

    if (!file.type.startsWith('image/')) {
      message.error('Please choose an image file')
      return
    }

    fileRef.current = file

    if (blobRef.current) URL.revokeObjectURL(blobRef.current)

    const url = URL.createObjectURL(file)
    blobRef.current = url
    setAvatar(url)
  }

  const onFinish = async (values: EditProfileValues) => {
    try {
      const formData = new FormData()

      const dataObj: any = {
        name: values.fullName,
        phone: values.phone,
        city: values.city,
      }

      if (values.dob) {
        dataObj.dateOfBirth = values.dob.toISOString()
      }

      formData.append('data', JSON.stringify(dataObj))

      if (fileRef.current) {
        formData.append('profileimage', fileRef.current)
      }

      await updateProfileAction(formData)
      
      message.success('Profile updated')
      window.location.reload()
    } catch (err: any) {
      message.error(err?.message || 'Update failed')
    }
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
          onChange={(e) =>
            handleAvatarChange(e.target.files?.[0] ?? null)
          }
        />
      </div>

      <Form<EditProfileValues>
        form={form}
        layout="vertical"
        requiredMark={false}
        onFinish={onFinish}
      >
        <Form.Item
          name="fullName"
          label={<span className={labelClass}>Full Name</span>}
          rules={[{ required: true }]}
        >
          <Input size="large" />
        </Form.Item>

        <Form.Item
          name="email"
          label={<span className={labelClass}>Email</span>}
        >
          <Input size="large" readOnly disabled className="opacity-60 cursor-not-allowed" />
        </Form.Item>

        <Form.Item
          name="phone"
          label={<span className={labelClass}>Phone Number</span>}
          rules={[{ required: true }]}
        >
          <Input size="large" />
        </Form.Item>

        <Form.Item
          name="dob"
          label={<span className={labelClass}>Date of Birth</span>}
        >
          <DatePicker
            size="large"
            className="w-full"
            format="MM/DD/YYYY"
            disabledDate={(d) => d && d.isAfter(dayjs())}
          />
        </Form.Item>

        <Form.Item
          name="city"
          label={<span className={labelClass}>City</span>}
          rules={[{ required: true }]}
        >
          <Input size="large" />
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