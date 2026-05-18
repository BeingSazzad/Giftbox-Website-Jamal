'use client';
import {
  UserOutlined,
  LockOutlined,
  GlobalOutlined,
  QuestionCircleOutlined,
  LogoutOutlined,
  CameraOutlined,
  SafetyCertificateOutlined,
  BellOutlined,
  MailOutlined,
  PhoneOutlined,
  CalendarOutlined
} from '@ant-design/icons'
import { Modal, Form, Input, Button, DatePicker, Select, Switch, message } from 'antd'
import { useState, useRef, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation';
import dayjs from 'dayjs'
import { WebShell } from '@/components/layout/WebShell'

type SettingsTab = 'profile' | 'password' | 'preferences' | 'support'

function SettingsHubContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [activeTab, setActiveTab] = useState<SettingsTab>('profile')
  const [logoutOpen, setLogoutOpen] = useState(false)
  const [avatar, setAvatar] = useState('https://i.pravatar.cc/200?img=12')
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  // Forms
  const [profileForm] = Form.useForm()
  const [passwordForm] = Form.useForm()
  const [supportForm] = Form.useForm()

  useEffect(() => {
    const tabParam = searchParams.get('tab') as SettingsTab
    if (tabParam && ['profile', 'password', 'preferences', 'support'].includes(tabParam)) {
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
    setAvatar(URL.createObjectURL(file))
    message.success('Avatar updated successfully')
  }

  const handleProfileSave = (values: any) => {
    message.success('Profile updated successfully!')
  }

  const handlePasswordSave = (values: any) => {
    message.success('Password changed successfully!')
    passwordForm.resetFields()
  }

  const handleSupportSubmit = (values: any) => {
    message.success('Support ticket submitted! We will respond shortly.')
    supportForm.resetFields()
  }

  const tabs: { value: SettingsTab; label: string; icon: any }[] = [
    { value: 'profile', label: 'Edit Profile', icon: <UserOutlined /> },
    { value: 'password', label: 'Security & Password', icon: <LockOutlined /> },
    { value: 'preferences', label: 'Preferences', icon: <GlobalOutlined /> },
    { value: 'support', label: 'Help & Support', icon: <QuestionCircleOutlined /> },
  ]

  return (
    <div className="py-4 md:py-6 animate-fade-in">
      {/* Title */}
      <div className="mb-6 md:mb-8">
        <h1 className="m-0 text-white text-2xl md:text-3xl font-bold">Settings Hub</h1>
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
            <h3 className="m-0 text-white text-base font-bold leading-snug">Sazzad Chowdhury</h3>
            <p className="m-0 text-white/50 text-xs mt-0.5">Joined March 2024</p>
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

          {/* Sign Out Button */}
          <button
            type="button"
            onClick={() => setLogoutOpen(true)}
            className="w-full h-11 bg-danger/10 hover:bg-danger/25 border border-danger/25 text-danger hover:text-white rounded-xl font-bold text-xs cursor-pointer flex items-center justify-center gap-2 transition-all"
          >
            <LogoutOutlined />
            Sign Out
          </button>
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
                  fullName: 'Sazzad Chowdhury',
                  email: 'user@example.com',
                  phone: '9876543210',
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
                    <Input size="large" addonBefore="+243" placeholder="9876543210" prefix={<PhoneOutlined className="text-white/20 mr-1" />} />
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
                  <Select size="large" placeholder="Select your city">
                    <Select.Option value="Kinshasa">Kinshasa</Select.Option>
                    <Select.Option value="Matadi">Matadi</Select.Option>
                    <Select.Option value="Boma">Boma</Select.Option>
                    <Select.Option value="Moanda">Moanda</Select.Option>
                    <Select.Option value="Kimpese">Kimpese</Select.Option>
                    <Select.Option value="Kisantu">Kisantu</Select.Option>
                    <Select.Option value="Mbanza-Ngungu">Mbanza-Ngungu</Select.Option>
                  </Select>
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

          {/* 3. Preferences Panel */}
          {activeTab === 'preferences' && (
            <div className="flex flex-col gap-6">
              <div>
                <h2 className="text-white text-lg font-bold mb-4 flex items-center gap-2">
                  <GlobalOutlined className="text-primary" /> Preferences & Localization
                </h2>
                <div className="bg-deep/40 border border-white/5 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h4 className="text-white text-sm font-bold m-0 mb-1">Language Preference</h4>
                    <p className="text-white/50 text-xs m-0">Choose the language used for announcements and emails</p>
                  </div>
                  <Select defaultValue="en" size="large" className="w-full sm:w-44" onChange={() => message.success('Language updated!')}>
                    <Select.Option value="en">English</Select.Option>
                    <Select.Option value="fr">Français (French)</Select.Option>
                  </Select>
                </div>
              </div>

              <div>
                <h2 className="text-white text-lg font-bold mb-4 flex items-center gap-2">
                  <BellOutlined className="text-primary" /> Push Notifications
                </h2>
                <div className="bg-deep/40 border border-white/5 rounded-2xl p-5 flex items-center justify-between gap-4">
                  <div>
                    <h4 className="text-white text-sm font-bold m-0 mb-1">Draw Winner Alerts</h4>
                    <p className="text-white/50 text-xs m-0">Receive instant push notification notifications if you win</p>
                  </div>
                  <Switch defaultChecked onChange={(checked) => message.success(`Notifications ${checked ? 'enabled' : 'disabled'}`)} />
                </div>
              </div>
            </div>
          )}

          {/* 4. Help & Support Accordion & Form */}
          {activeTab === 'support' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-white text-lg font-bold mb-4 flex items-center gap-2">
                  <QuestionCircleOutlined className="text-primary" /> Help & Support Form
                </h2>
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
                    <Input size="large" placeholder="E.g. Payment proof issue, profile details edit error" />
                  </Form.Item>

                  <Form.Item
                    name="message"
                    label={<span className="text-white/70 font-semibold text-xs">Description of Issue</span>}
                    rules={[{ required: true, message: 'Please enter your message' }]}
                  >
                    <Input.TextArea size="large" rows={4} placeholder="Describe your inquiry or problem in detail..." />
                  </Form.Item>

                  <Form.Item className="mb-0">
                    <Button type="primary" htmlType="submit" size="large" block className="h-12 font-bold">
                      Submit Ticket Request
                    </Button>
                  </Form.Item>
                </Form>
              </div>

              <div className="h-px bg-white/5" />

              <div>
                <h3 className="text-white text-base font-bold mb-4">Frequently Asked Questions</h3>
                <div className="space-y-3">
                  <div className="bg-deep/40 border border-white/5 rounded-xl p-4">
                    <h4 className="text-white text-sm font-bold m-0 mb-1.5">How long does payment review take?</h4>
                    <p className="text-white/60 text-xs m-0 leading-relaxed">
                      Verification normally takes 12-24 hours. The administrator manually cross-references the transaction with our bank statements.
                    </p>
                  </div>
                  <div className="bg-deep/40 border border-white/5 rounded-xl p-4">
                    <h4 className="text-white text-sm font-bold m-0 mb-1.5">When are weekly draw results posted?</h4>
                    <p className="text-white/60 text-xs m-0 leading-relaxed">
                      Draw timings vary by reward scale but are typically published on Sundays at 18:00 Kinshasa time.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>

      <Modal
        open={logoutOpen}
        onCancel={() => setLogoutOpen(false)}
        onOk={() => {
          setLogoutOpen(false)
          router.push('/login')
        }}
        okText="Sign Out"
        cancelText="Cancel"
        title={<span className="text-danger flex items-center gap-2"><LogoutOutlined /> Confirm Sign Out</span>}
        centered
        okButtonProps={{ 
          danger: true, 
          className: 'bg-danger text-white rounded-xl h-10 px-6 font-semibold border-none' 
        }}
        cancelButtonProps={{
          className: 'rounded-xl h-10 px-6 font-semibold border-white/20 bg-transparent text-white/80 hover:text-white hover:border-white/40'
        }}
        styles={{
          body: { backgroundColor: '#1f1545' },
          mask: { backdropFilter: 'blur(8px)' }
        }}
      >
        <p className="text-white/70 text-base m-0 leading-relaxed">
          Are you sure you want to securely sign out of your Gift Box account? You will need to log in again to participate in draws.
        </p>
      </Modal>
    </div>
  )
}

export default function ProfilePage() {
  return (
    <WebShell maxWidth={1200}>
      <Suspense fallback={<div className="text-center text-white/50 py-12">Loading settings...</div>}>
        <SettingsHubContent />
      </Suspense>
    </WebShell>
  )
}
