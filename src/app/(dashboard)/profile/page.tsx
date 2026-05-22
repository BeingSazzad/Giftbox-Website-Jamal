'use client'
import {
  UserOutlined,
  LockOutlined,
  QuestionCircleOutlined,
  CameraOutlined,
  MailOutlined,
  PhoneOutlined,
  CalendarOutlined
} from '@ant-design/icons'
import { Form, Input, Button, DatePicker, Select, message } from 'antd'
import { useState, useRef, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import dayjs from 'dayjs'
import { WebShell } from '@/components/layout/WebShell'

type SettingsTab = 'profile' | 'password' | 'support'

function SettingsHubContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState<SettingsTab>('profile')
  const [avatar, setAvatar] = useState('https://i.pravatar.cc/200?img=12')
  const fileInputRef = useRef<HTMLInputElement>(null)
  const avatarBlobRef = useRef<string | null>(null)

  const [supportPhoto, setSupportPhoto] = useState<File | null>(null)
  const [supportPhotoPreview, setSupportPhotoPreview] = useState<string | null>(null)
  const supportInputRef = useRef<HTMLInputElement>(null)
  const supportPhotoBlobRef = useRef<string | null>(null)

  useEffect(() => () => {
    if (avatarBlobRef.current) URL.revokeObjectURL(avatarBlobRef.current)
    if (supportPhotoBlobRef.current) URL.revokeObjectURL(supportPhotoBlobRef.current)
  }, [])
  
  // Forms
  const [profileForm] = Form.useForm()
  const [passwordForm] = Form.useForm()
  const [supportForm] = Form.useForm()

  useEffect(() => {
    const tabParam = searchParams.get('tab') as SettingsTab
    if (tabParam && ['profile', 'password', 'support'].includes(tabParam)) {
      setActiveTab(tabParam)
    }
  }, [searchParams])

  const handleTabChange = (tab: SettingsTab) => {
    setActiveTab(tab)
    router.push(`/profile?tab=${tab}`)
  }

  const handleAvatarChange = (file: File | null) => {
    if (!file) return
    if (!file.type.startsWith('image/')) {
      message.error('Please choose a valid image file')
      return
    }
    if (avatarBlobRef.current) URL.revokeObjectURL(avatarBlobRef.current)
    const url = URL.createObjectURL(file)
    avatarBlobRef.current = url
    setAvatar(url)
    message.success('Avatar updated successfully')
  }

  const handleProfileSave = (_values: any) => {
    message.success('Profile updated successfully!')
  }

  const handlePasswordSave = (_values: any) => {
    message.success('Password changed successfully!')
    passwordForm.resetFields()
  }

  const handleSupportSubmit = (_values: any) => {
    message.success('Support ticket submitted! We will respond shortly.')
    supportForm.resetFields()
    setSupportPhoto(null)
    if (supportPhotoBlobRef.current) {
      URL.revokeObjectURL(supportPhotoBlobRef.current)
      supportPhotoBlobRef.current = null
    }
    setSupportPhotoPreview(null)
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

  const tabs: { value: SettingsTab; label: string; icon: any }[] = [
    { value: 'profile', label: 'Edit Profile', icon: <UserOutlined /> },
    { value: 'password', label: 'Security & Password', icon: <LockOutlined /> },
    { value: 'support', label: 'Help & Support', icon: <QuestionCircleOutlined /> },
  ]

  return (
    <div className="py-4 md:py-6 animate-fade-in">
      {/* Title */}
      <div className="mb-6 md:mb-8">
        <h1 className="m-0 text-white text-2xl md:text-3xl font-bold">Profile</h1>
        <p className="mt-1 text-white/50 text-sm">Manage your profile, account security, and preferences</p>
      </div>

      {/* Grid Container */}
      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6 md:gap-8 items-start">
        
        {/* Left Side: Profile Summary & Vertical Navigation Tabs */}
        <div className="flex flex-col gap-5">
          {/* User Card */}
          <div className="bg-surface/50 backdrop-blur-md border border-white/10 rounded-2xl p-5 text-center flex flex-col items-center">
            <div className="relative group w-20 h-20 mb-3 shrink-0">
              <div className="w-full h-full rounded-full border-2 border-primary overflow-hidden shadow-lg bg-surface relative z-10">
                <img src={avatar} alt="User Avatar" className="w-full h-full object-cover" />
              </div>
              <button 
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-0 right-0 z-20 w-7 h-7 bg-primary hover:bg-primary-hover text-[#1a0f0a] rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110 cursor-pointer border border-[#1f1545]"
              >
                <CameraOutlined className="text-xs" />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleAvatarChange(e.target.files?.[0] ?? null)}
              />
            </div>
            <h3 className="m-0 text-white text-base font-bold leading-snug">{user?.name || 'User'}</h3>
            <p className="m-0 text-white/50 text-xs mt-0.5">{user?.email || ''}</p>
          </div>

          {/* Tab Navigation Menu */}
          <div className="bg-surface/40 border border-white/5 rounded-2xl overflow-hidden flex flex-row lg:flex-col p-1.5 gap-1 overflow-x-auto scrollbar-none">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.value
              return (
                <button
                  key={tab.value}
                  type="button"
                  onClick={() => handleTabChange(tab.value)}
                  className={[
                    'px-4 py-3 text-xs md:text-sm font-semibold rounded-xl text-left transition-all cursor-pointer flex items-center gap-3 shrink-0',
                    isActive 
                      ? 'bg-primary/10 text-primary' 
                      : 'text-white/60 hover:text-white hover:bg-white/5',
                  ].join(' ')}
                >
                  <span className="text-base">{tab.icon}</span>
                  {tab.label}
                </button>
              )
            })}
          </div>

        </div>

        {/* Right Side: Tab Form Panel */}
        <div className="bg-surface/50 backdrop-blur-md border border-white/10 rounded-3xl p-5 md:p-6 shadow-xl min-h-[450px]">
          
          {/* 1. Edit Profile Form */}
          {activeTab === 'profile' && (
            <div>
              <h2 className="text-white text-lg font-bold mb-5 flex items-center gap-2">
                <UserOutlined className="text-primary" /> Profile Settings
              </h2>
              <Form
                form={profileForm}
                layout="vertical"
                requiredMark={false}
                initialValues={{
                  fullName: user?.name || '',
                  email: user?.email || '',
                  phone: user?.phone || '',
                  city: 'Kinshasa',
                  dob: dayjs('1998-05-12'),
                }}
                onFinish={handleProfileSave}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Form.Item
                    name="fullName"
                    label={<span className="text-white/70 font-semibold text-xs">Full Name</span>}
                    rules={[{ required: true, message: 'Please enter your name' }]}
                  >
                    <Input size="large" placeholder="Sazzad Chowdhury" />
                  </Form.Item>
                  <Form.Item
                    name="email"
                    label={<span className="text-white/70 font-semibold text-xs">Email Address</span>}
                    rules={[
                      { required: true, message: 'Please enter your email' },
                      { type: 'email', message: 'Enter a valid email' }
                    ]}
                  >
                    <Input size="large" placeholder="user@example.com" prefix={<MailOutlined className="text-white/20 mr-1" />} />
                  </Form.Item>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Form.Item
                    name="phone"
                    label={<span className="text-white/70 font-semibold text-xs">Phone Number</span>}
                    rules={[{ required: true, message: 'Please enter your phone number' }]}
                  >
                    <Input 
                      size="large" 
                      placeholder="9876543210" 
                      prefix={
                        <div className="flex items-center gap-2 text-white/50 text-xs font-semibold select-none mr-1.5">
                          <PhoneOutlined className="text-white/25" />
                          <span className="border-r border-white/10 pr-2">+243</span>
                        </div>
                      } 
                    />
                  </Form.Item>
                  <Form.Item
                    name="dob"
                    label={<span className="text-white/70 font-semibold text-xs">Date of Birth</span>}
                  >
                    <DatePicker size="large" className="w-full" format="MM/DD/YYYY" prefix={<CalendarOutlined className="text-white/20 mr-1" />} />
                  </Form.Item>
                </div>

                <Form.Item
                  name="city"
                  label={<span className="text-white/70 font-semibold text-xs">City of Residence</span>}
                  rules={[{ required: true, message: 'Please select your city' }]}
                >
                  <Select
                    size="large"
                    placeholder="Select your city"
                    options={[
                      { value: 'Kinshasa', label: 'Kinshasa' },
                      { value: 'Matadi', label: 'Matadi' },
                      { value: 'Boma', label: 'Boma' },
                      { value: 'Moanda', label: 'Moanda' },
                      { value: 'Kimpese', label: 'Kimpese' },
                      { value: 'Kisantu', label: 'Kisantu' },
                      { value: 'Mbanza-Ngungu', label: 'Mbanza-Ngungu' },
                    ]}
                  />
                </Form.Item>

                <Form.Item className="mt-6 mb-0">
                  <Button type="primary" htmlType="submit" size="large" block className="h-12 font-bold">
                    Save Profile Changes
                  </Button>
                </Form.Item>
              </Form>
            </div>
          )}

          {/* 2. Security & Password Form */}
          {activeTab === 'password' && (
            <div>
              <h2 className="text-white text-lg font-bold mb-5 flex items-center gap-2">
                <LockOutlined className="text-primary" /> Security & Password
              </h2>
              <Form
                form={passwordForm}
                layout="vertical"
                requiredMark={false}
                onFinish={handlePasswordSave}
              >
                <Form.Item
                  name="currentPassword"
                  label={<span className="text-white/70 font-semibold text-xs">Current Password</span>}
                  rules={[{ required: true, message: 'Please enter your current password' }]}
                >
                  <Input.Password size="large" placeholder="Enter current password" />
                </Form.Item>

                <Form.Item
                  name="newPassword"
                  label={<span className="text-white/70 font-semibold text-xs">New Password</span>}
                  rules={[
                    { required: true, message: 'Please enter a new password' },
                    { min: 6, message: 'Password must be at least 6 characters' }
                  ]}
                >
                  <Input.Password size="large" placeholder="Enter new password" />
                </Form.Item>

                <Form.Item
                  name="confirmPassword"
                  label={<span className="text-white/70 font-semibold text-xs">Confirm New Password</span>}
                  dependencies={['newPassword']}
                  rules={[
                    { required: true, message: 'Please confirm your password' },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('newPassword') === value) {
                          return Promise.resolve()
                        }
                        return Promise.reject(new Error('Passwords do not match'))
                      },
                    }),
                  ]}
                >
                  <Input.Password size="large" placeholder="Confirm new password" />
                </Form.Item>

                <Form.Item className="mt-6 mb-0">
                  <Button type="primary" htmlType="submit" size="large" block className="h-12 font-bold">
                    Update Account Password
                  </Button>
                </Form.Item>
              </Form>
            </div>
          )}


          {/* 4. Help & Support Accordion & Form */}
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
                    <Button type="primary" htmlType="submit" size="large" block className="h-12 font-bold">
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
      <Suspense fallback={<div className="text-center text-white/50 py-12">Loading settings...</div>}>
        <SettingsHubContent />
      </Suspense>
    </WebShell>
  )
}
