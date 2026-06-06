'use client'
import { WebShell } from '@/components/layout/WebShell'
import { PageHeader } from '@/components/layout/PageHeader'
import { TrophyFilled, SafetyCertificateFilled, GlobalOutlined } from '@ant-design/icons'
import { useState, useEffect } from 'react'
import luxuryAboutGiftboxImg from '@/assets/images/luxury_about_giftbox.png'
import { getAboutAction } from '@/actions/rules'

export default function AboutUsPage() {
  const [content, setContent] = useState<string>('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getAboutAction()
      .then((res: any) => {
        if (res?.data?.content) {
          setContent(res.data.content)
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  return (
    <WebShell>
      <PageHeader title="About Gift Box" subtitle="Your trusted platform for weekly wins" />

      <div className=" mt-10 items-center">


        {/* Right Side: Content */}
        <div>
          <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-bold uppercase tracking-widest mb-6">
            Our Story
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight tracking-tight">
            Making Premium Prizes Accessible.
          </h2>
          <div className="text-white/70 text-lg leading-relaxed mb-10 [&>p]:mb-4 [&>h1]:text-white [&>h1]:font-bold [&>h1]:text-xl [&>h1]:mb-4 [&>h2]:text-white [&>h2]:font-bold [&>h2]:text-lg [&>h2]:mb-3 [&>ul]:list-disc [&>ul]:ml-5 [&>ul]:mb-4">
            {loading ? (
              <div className="flex items-center justify-center min-h-[100px]">
                <div className="w-6 h-6 rounded-full border-2 border-primary border-t-transparent animate-spin" />
              </div>
            ) : (
              <div dangerouslySetInnerHTML={{ __html: content }} />
            )}
          </div>

        </div>
      </div>
    </WebShell>
  )
}
