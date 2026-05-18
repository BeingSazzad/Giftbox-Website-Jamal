'use client'
import { Button, Form, Input, Select, message } from 'antd'
import { 
  CloudUploadOutlined, 
  MailOutlined, 
  MessageOutlined, 
  EnvironmentOutlined,
  CopyOutlined,
  SendOutlined
} from '@ant-design/icons'
import { useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { WebShell } from '@/components/layout/WebShell'
import { BackHeader } from '@/components/layout/BackHeader'

interface ContactFormValues {
  name: string
  email: string
  subject: string
  message: string
}

const MAX_FILE_SIZE = 5 * 1024 * 1024

export default function ContactPage() {
  const router = useRouter()
  const [form] = Form.useForm<ContactFormValues>()
  const [photo, setPhoto] = useState<File | null>(null)
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const handlePick = () => inputRef.current?.click()

  const handleFile = (f: File | null) => {
    if (!f) return
    if (!['image/png', 'image/jpeg'].includes(f.type)) {
      message.error('Only PNG or JPG is allowed')
      return
    }
    if (f.size > MAX_FILE_SIZE) {
      message.error('File must be 5MB or less')
      return
    }
    setPhoto(f)
    setPhotoPreview(URL.createObjectURL(f))
  }

  const copyEmail = () => {
    navigator.clipboard.writeText('support@giftbox.com')
    message.success('Email address copied to clipboard!')
  }

  const onFinish = (values: ContactFormValues) => {
    message.success('Message sent! Our support team will get back to you shortly.')
    form.resetFields()
    setPhoto(null)
    setPhotoPreview(null)
  }

  const labelClass = 'text-white/80 font-bold text-sm'

  return (
    <WebShell maxWidth={1120}>
      <div className="relative py-4">
        {/* Ambient background decorative glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-primary/4 blur-[120px] pointer-events-none" />

        <BackHeader 
          title="Contact & Support" 
          subtitle="Get in touch with our help center. We're here to help you 24/7." 
        />

        <div className="max-w-3xl mx-auto mt-8 flex flex-col gap-8 relative z-10">
          
          {/* Main Card Container */}
          <div className="bg-gradient-to-b from-[#170e30]/90 to-[#0c061a]/95 border border-white/8 rounded-[32px] p-6 md:p-10 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] backdrop-blur-2xl">
            
            {/* Header section with enhanced visual hierarchy */}
            <div className="mb-8">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/25 text-primary text-[10px] font-black uppercase tracking-widest mb-3.5 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                Support Hub
              </span>
              
              <h2 className="text-white text-2xl md:text-3xl font-black m-0 tracking-tight flex items-center gap-2.5">
                Send Us a Message
              </h2>
              <p className="text-white/50 text-sm mt-2 mb-0 leading-relaxed max-w-xl">
                Have a question about a ticket, draw verification, or payment? Write to us and our support team will reply within 24 hours.
              </p>
            </div>

            <Form<ContactFormValues>
              form={form}
              layout="vertical"
              requiredMark={false}
              onFinish={onFinish}
              className="space-y-5"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <Form.Item
                  name="name"
                  label={
                    <span className="text-white/80 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-primary" /> Full Name
                    </span>
                  }
                  rules={[{ required: true, message: 'Please enter your name' }]}
                >
                  <Input size="large" placeholder="Your name" className="h-12" />
                </Form.Item>

                <Form.Item
                  name="email"
                  label={
                    <span className="text-white/80 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-primary" /> Email Address
                    </span>
                  }
                  rules={[
                    { required: true, message: 'Please enter your email' },
                    { type: 'email', message: 'Please enter a valid email address' }
                  ]}
                >
                  <Input size="large" placeholder="your@email.com" className="h-12" />
                </Form.Item>
              </div>

              <Form.Item
                name="subject"
                label={
                  <span className="text-white/80 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-primary" /> Inquiry Topic
                  </span>
                }
                rules={[{ required: true, message: 'Please select a topic' }]}
              >
                <Select size="large" placeholder="Select what you need help with" className="h-12">
                  <Select.Option value="general">General Inquiry</Select.Option>
                  <Select.Option value="draws">Ticket & Draw Support</Select.Option>
                  <Select.Option value="billing">Payments & Proof Verification</Select.Option>
                  <Select.Option value="technical">Technical Account Issue</Select.Option>
                  <Select.Option value="partnerships">Business & Partnerships</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item
                name="message"
                label={
                  <span className="text-white/80 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-primary" /> Message Details
                  </span>
                }
                rules={[{ required: true, message: 'Please enter your message' }]}
              >
                <Input.TextArea
                  rows={5}
                  placeholder="Describe your request in detail..."
                  className="resize-y p-3.5"
                />
              </Form.Item>

              <div className="pt-2">
                <span className="text-white/80 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 mb-2.5">
                  <span className="w-1 h-1 rounded-full bg-primary" /> Attachment (Optional)
                </span>
                
                <button
                  type="button"
                  onClick={handlePick}
                  className="w-full bg-[#090414]/65 border-[1.5px] border-dashed border-white/10 hover:border-primary/40 hover:bg-[#0c061c]/80 transition-all rounded-2xl px-5 py-8 flex flex-col items-center gap-3 cursor-pointer group"
                >
                  {photoPreview ? (
                    <img
                      src={photoPreview}
                      alt="Attachment"
                      className="max-w-full max-h-48 rounded-xl object-contain shadow-2xl border border-white/10"
                    />
                  ) : (
                    <>
                      <div className="w-12 h-12 rounded-2xl bg-white/5 group-hover:bg-primary/10 text-white/50 group-hover:text-primary flex items-center justify-center text-xl transition-colors duration-250">
                        <CloudUploadOutlined />
                      </div>
                      <div className="text-center">
                        <div className="text-white text-sm font-bold group-hover:text-primary transition-colors">Upload Proof or Screenshot</div>
                        <div className="text-white/40 text-[11px] mt-1">JPG or PNG format up to 5MB</div>
                      </div>
                    </>
                  )}
                </button>
                {photo && (
                  <div className="mt-2.5 text-xs text-white/40 text-center font-medium bg-white/3 py-1 px-3 rounded-lg inline-block mx-auto">
                    {photo.name} · {(photo.size / 1024).toFixed(0)} KB
                  </div>
                )}
                <input
                  ref={inputRef}
                  type="file"
                  accept="image/png,image/jpeg"
                  className="hidden"
                  onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
                />
              </div>

              <Form.Item className="mb-0 pt-4">
                <Button 
                  type="primary" 
                  htmlType="submit" 
                  size="large" 
                  block 
                  className="h-13 text-sm font-black flex items-center justify-center gap-2 shadow-[0_4px_25px_rgba(254,147,1,0.2)] hover:shadow-[0_4px_30px_rgba(254,147,1,0.3)] transition-all"
                >
                  <SendOutlined style={{ fontSize: 13 }} /> Send Message Inquiry
                </Button>
              </Form.Item>
            </Form>
          </div>

          {/* Integrated Visual Callout for FAQs */}
          <div className="bg-[#170e30]/40 border border-white/5 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 backdrop-blur-xl">
            <div className="flex items-center gap-4.5 text-left">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center text-xl shrink-0">
                <MessageOutlined />
              </div>
              <div>
                <h4 className="text-white text-base font-bold m-0">Looking for instant answers?</h4>
                <p className="text-white/50 text-xs m-0 mt-1 leading-relaxed max-w-md">
                  Most support requests regarding tickets, draws, verification timelines, and prizes are answered in our Help Center.
                </p>
              </div>
            </div>
            <button
              onClick={() => router.push('/faq')}
              className="px-5 py-3 bg-white/5 hover:bg-white/10 hover:border-primary/40 border border-white/10 text-white rounded-xl font-bold text-xs tracking-wider uppercase transition-all shrink-0 cursor-pointer"
            >
              Browse FAQs
            </button>
          </div>

        </div>
      </div>
    </WebShell>
  )
}
