'use client'

import {
  UserOutlined,
  LockOutlined,
  QuestionCircleOutlined,
  CameraOutlined,
} from '@ant-design/icons'
import { Form, Input, Button, DatePicker, Select, message } from 'antd'
import { useState, useRef, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { changePasswordAction, updateProfileAction } from '@/actions/profile'
import { submitSupportAction } from '@/actions/support'
import { getImageUrl } from '@/utils/helpers'
import dayjs from 'dayjs'
import { WebShell } from '@/components/layout/WebShell'
import { useProfile } from '@/hooks/useProfile'

type SettingsTab = 'profile' | 'password' | 'support'

function SettingsHubContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const user = useProfile()

  const [activeTab, setActiveTab] = useState<SettingsTab>('profile')
  const [avatar, setAvatar] = useState<string>('/default.png')

  const fileInputRef = useRef<HTMLInputElement>(null)

  const [supportPhoto, setSupportPhoto] = useState<File | null>(null)
  const [supportPhotoPreview, setSupportPhotoPreview] = useState<string | null>(null)
  const [supportSubmitting, setSupportSubmitting] = useState(false)
  const supportInputRef = useRef<HTMLInputElement>(null)
  const supportPhotoBlobRef = useRef<string | null>(null)

  const [profileForm] = Form.useForm()
  const [passwordForm] = Form.useForm()
  const [supportForm] = Form.useForm()

  // ---------------- INIT USER ----------------
  useEffect(() => {
    if (user) {
      setAvatar(user.profileImage ? getImageUrl(user.profileImage) : '/default.png')

      profileForm.setFieldsValue({
        fullName: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        city: user.city || 'Kinshasa',
        dob: user.dateOfBirth ? dayjs(user.dateOfBirth) : null,
      })
    }
  }, [user])

  // ---------------- TAB ----------------
  useEffect(() => {
    const tab = searchParams.get('tab') as SettingsTab
    if (tab) setActiveTab(tab)
  }, [searchParams])

  const handleTabChange = (tab: SettingsTab) => {
    setActiveTab(tab)
    router.push(`/profile?tab=${tab}`)
  }

  const handleAvatarChange = async (file: File | null) => {
    if (!file) return

    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }

    if (!file.type.startsWith('image/')) {
      message.error('Invalid image file')
      return
    }

    const preview = URL.createObjectURL(file)
    setAvatar(preview)

    try {
      const formData = new FormData()
      formData.append('profileImage', file)

      const res = await updateProfileAction(formData)

      if (res?.success) {
        message.success('Profile image updated')
        window.location.reload()
      } else {
        message.error(res?.message || 'Upload failed')
      }

    } catch {
      message.error('Upload failed')
    }
  }

  // ---------------- PROFILE SAVE ----------------
  const handleProfileSave = async (values: any) => {
    try {
      const formData = new FormData()

      formData.append(
        'data',
        JSON.stringify({
          name: values.fullName,
          phone: values.phone,
          city: values.city,
          dateOfBirth: values.dob ? values.dob.toISOString() : null,
        })
      )

      const res = await updateProfileAction(formData)

      if (res?.success) {
        message.success('Profile updated successfully')
      } else {
        message.error(res?.message || 'Failed')
      }
    } catch {
      message.error('Failed to update profile')
    }
  }

  // ---------------- PASSWORD ----------------
  const handlePasswordSave = async (values: any) => {
    try {
      const res = await changePasswordAction(values)
      if (res?.success) {
        message.success('Password updated')
        passwordForm.resetFields()
      } else {
        message.error(res?.message || 'Failed to update password')
      }
    } catch (e: any) {
      message.error(e?.message || 'Failed')
    }
  }

  const handleSupportSubmit = async (values: any) => {
    try {
      setSupportSubmitting(true)
      const formData = new FormData()

      const payload: any = {
        subject: values.subject,
        message: values.message,
      }

      formData.append('data', JSON.stringify(payload))
      if (supportPhoto) {
        formData.append('attachment', supportPhoto)
      }

      const res: any = await submitSupportAction(formData)

      if (res?.success) {
        message.success('Support ticket submitted! We will respond shortly.')
        supportForm.resetFields()
        setSupportPhoto(null)
        if (supportPhotoBlobRef.current) {
          URL.revokeObjectURL(supportPhotoBlobRef.current)
          supportPhotoBlobRef.current = null
        }
        setSupportPhotoPreview(null)
      } else {
        message.error(res?.message || 'Failed to submit support ticket')
      }
    } catch (err) {
      console.error(err)
      message.error('An error occurred. Please try again.')
    } finally {
      setSupportSubmitting(false)
    }
  }

  const handleSupportFile = (file: File | null) => {
    if (!file) return
    if (!['image/png', 'image/jpeg'].includes(file.type)) {
      message.error('Only PNG or JPG is allowed')
      return
    }
    if (file.size > 5 * 1024 * 1024) {
      message.error('File must be 5MB or less')
      return
    }
    if (supportPhotoBlobRef.current) URL.revokeObjectURL(supportPhotoBlobRef.current)
    const url = URL.createObjectURL(file)
    supportPhotoBlobRef.current = url
    setSupportPhoto(file)
    setSupportPhotoPreview(url)
  }

  const tabs: SettingsTab[] = ['profile', 'password', 'support']

  // ---------------- UI (UNCHANGED STRUCTURE) ----------------
  return (
    <div className="py-4 md:py-6 animate-fade-in">

      {/* TITLE */}
      <div className="mb-6 md:mb-8">
        <h1 className="m-0 text-white text-2xl md:text-3xl font-bold">Profile</h1>
        <p className="mt-1 text-white/50 text-sm">
          Manage your profile, account security, and preferences
        </p>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6 md:gap-8 items-start">

        {/* LEFT SIDEBAR (UNCHANGED DESIGN) */}
        <div className="flex flex-col gap-5">

          {/* USER CARD */}
          <div className="bg-surface/50 backdrop-blur-md border border-white/10 rounded-2xl p-5 text-center flex flex-col items-center">

            {/* AVATAR (YOUR EXACT STYLE) */}
            <div className="relative group w-20 h-20 mb-3 shrink-0">
              <div className="w-full h-full rounded-full border-2 border-primary overflow-hidden shadow-lg bg-surface">
                <img src={avatar} className="w-full h-full object-cover" />
              </div>

              <button
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-0 right-0 w-7 h-7 bg-primary rounded-full flex items-center justify-center"
              >
                <CameraOutlined className="text-xs" />
              </button>

              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) {
                    handleAvatarChange(file)
                  }
                }}
              />
            </div>

            <h3 className="text-white text-base font-bold">
              {user?.name || 'User'}
            </h3>
            <p className="text-white/50 text-xs">{user?.email}</p>
          </div>

          {/* TABS (UNCHANGED STYLE) */}
          <div className="bg-surface/40 border border-white/5 rounded-2xl p-1.5 flex flex-row lg:flex-col gap-1 overflow-x-auto">

            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => handleTabChange(tab)}
                className={`px-4 py-3 rounded-xl text-sm flex gap-3 items-center ${activeTab === tab
                  ? 'bg-primary/10 text-primary'
                  : 'text-white/60 hover:text-white'
                  }`}
              >
                {tab === 'profile' && <UserOutlined />}
                {tab === 'password' && <LockOutlined />}
                {tab === 'support' && <QuestionCircleOutlined />}
                {tab === 'profile'
                  ? 'Edit Profile'
                  : tab === 'password'
                    ? 'Security'
                    : 'Support'}
              </button>
            ))}

          </div>
        </div>

        {/* RIGHT PANEL (UNCHANGED STYLE) */}
        <div className="bg-surface/50 backdrop-blur-md border border-white/10 rounded-3xl p-5 md:p-6">

          {/* PROFILE */}
          {activeTab === 'profile' && (
            <Form form={profileForm} layout="vertical" onFinish={handleProfileSave}>

              <Form.Item name="fullName" label="Full Name">
                <Input className='h-11.5 border border-white/10' />
              </Form.Item>

              <Form.Item name="email" label="Email">
                <Input disabled className='h-11.5 border border-white/10' />
              </Form.Item>

              <div className="grid grid-cols-2 gap-2">
                <Form.Item name="phone" label="Phone">
                  <Input className='h-11.5 border border-white/10' />
                </Form.Item>
                <Form.Item name="city" label="City">
                  <Select
                    options={[
                      { value: 'Kinshasa', label: 'Kinshasa' },
                      { value: 'Matadi', label: 'Matadi' },
                      { value: 'Boma', label: 'Boma' },
                      { value: 'Moanda', label: 'Moanda' },
                      { value: 'Kimpese', label: 'Kimpese' },
                      { value: 'Kisantu', label: 'Kisantu' },
                      { value: 'Mbanza-Ngungu', label: 'Mbanza-Ngungu' },
                    ]}
                    className='h-11.5 border border-white/10'
                  />
                </Form.Item>

              </div>


              <Form.Item name="dob" label="Date of Birth">
                <DatePicker className="w-full h-11.5 border border-white/10" />
              </Form.Item>

              <Button type="primary" htmlType="submit">
                Save Profile
              </Button>
            </Form>
          )}

          {/* PASSWORD */}
          {activeTab === 'password' && (
            <Form form={passwordForm} onFinish={handlePasswordSave}>
              <Form.Item name="currentPassword">
                <Input.Password placeholder="Current Password" className='h-11.5 border border-white/10' />
              </Form.Item>

              <Form.Item name="newPassword">
                <Input.Password placeholder="New Password" className='h-11.5 border border-white/10' />
              </Form.Item>

              <Form.Item name="confirmPassword">
                <Input.Password placeholder="Confirm Password" className='h-11.5 border border-white/10' />
              </Form.Item>

              <Button type="primary" htmlType="submit">
                Update Password
              </Button>
            </Form>
          )}

          {activeTab === 'support' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-white text-lg font-bold mb-1 flex items-center gap-2">
                  <QuestionCircleOutlined className="text-primary" /> Contact Support
                </h2>
                <p className="text-white/50 text-xs mb-5 leading-relaxed">
                  Have a question or need assistance? Reach out to our support team, and we’ll get back to you as soon as possible.
                </p>
                <Form
                  form={supportForm}
                  layout="vertical"
                  requiredMark={false}
                  onFinish={handleSupportSubmit}
                >
                  <Form.Item
                    name="subject"
                    label={<span className="text-white/70 font-semibold text-xs">Subject</span>}
                    rules={[{ required: true, message: 'Please enter a subject' }]}
                  >
                    <Input size="large" placeholder="What can we help you with?" />
                  </Form.Item>

                  <Form.Item
                    name="message"
                    label={<span className="text-white/70 font-semibold text-xs">Message</span>}
                    rules={[{ required: true, message: 'Please enter your message' }]}
                  >
                    <Input.TextArea size="large" rows={4} placeholder="Describe your issue..." className="resize-y" />
                  </Form.Item>

                  <div className="pt-1 mb-5">
                    <span className="text-white/70 font-semibold text-xs block mb-2">
                      Attach Photo (Optional)
                    </span>

                    <button
                      type="button"
                      onClick={() => supportInputRef.current?.click()}
                      className="w-full bg-[#090414]/65 border-[1.5px] border-dashed border-white/10 hover:border-primary/40 hover:bg-[#0c061c]/80 transition-all rounded-2xl px-5 py-6 flex flex-col items-center gap-3 cursor-pointer group"
                    >
                      {supportPhotoPreview ? (
                        <img
                          src={supportPhotoPreview}
                          alt="Attachment"
                          className="max-w-full max-h-40 rounded-xl object-contain shadow-2xl border border-white/10"
                        />
                      ) : (
                        <>
                          <div className="w-10 h-10 rounded-xl bg-white/5 group-hover:bg-primary/10 text-white/50 group-hover:text-primary flex items-center justify-center text-lg transition-colors duration-250">
                            <CameraOutlined />
                          </div>
                          <div className="text-center">
                            <div className="text-white text-xs font-bold group-hover:text-primary transition-colors">
                              Upload Photo
                            </div>
                            <div className="text-white/40 text-[10px] mt-1">
                              JPG, PNG up to 5MB
                            </div>
                          </div>
                        </>
                      )}
                    </button>
                    {supportPhoto && (
                      <div className="mt-2 text-xs text-white/40 text-center font-medium bg-white/5 py-1 px-3 rounded-lg inline-block">
                        {supportPhoto.name} · {(supportPhoto.size / 1024).toFixed(0)} KB
                      </div>
                    )}
                    <input
                      ref={supportInputRef}
                      type="file"
                      accept="image/png,image/jpeg"
                      className="hidden"
                      onChange={(e) => handleSupportFile(e.target.files?.[0] ?? null)}
                    />
                  </div>

                  <Form.Item className="mb-0">
                    <Button type="primary" htmlType="submit" size="large" block loading={supportSubmitting} className="h-12 font-bold">
                      Send Message
                    </Button>
                  </Form.Item>
                </Form>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  )
}

export default function ProfilePage() {
  return (
    <WebShell>
      <Suspense fallback={<div className="text-white">Loading...</div>}>
        <SettingsHubContent />
      </Suspense>
    </WebShell>
  )
}