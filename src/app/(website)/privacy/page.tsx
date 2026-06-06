'use client'
import { WebShell } from '@/components/layout/WebShell'
import { PageHeader } from '@/components/layout/PageHeader'
import { useState, useEffect } from 'react'
import { LockFilled } from '@ant-design/icons'
import { getPrivacyAction } from '@/actions/rules'

export default function PrivacyPolicyPage() {
  const [content, setContent] = useState<string>('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getPrivacyAction()
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
      <div className="relative py-4">
        {/* Ambient glows */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-primary/3 blur-[130px] pointer-events-none" />
        <div className="absolute bottom-20 left-0 w-[350px] h-[350px] rounded-full bg-primary/2 blur-[100px] pointer-events-none" />

        <PageHeader
          title="Privacy Policy"
          subtitle="Last updated: April 10, 2024"
        />

        {/* Intro banner */}
        <div className="mt-10 mb-14 max-w-5xl flex items-start gap-5">
          <div className="w-11 h-11 rounded-2xl bg-primary/10 text-primary flex items-center justify-center text-lg shrink-0">
            <LockFilled />
          </div>
          <div>
            <h2 className="text-white text-xl font-bold m-0 mb-2 tracking-tight">Our Privacy Commitment</h2>
            <p className="text-white/60 text-base leading-relaxed m-0">
              At Gift Box, we are committed to protecting your personal information and being fully transparent about what data we collect and how it is used. This policy outlines our core privacy practices to ensure your trust and safety on our platform.
            </p>
          </div>
        </div>

        {/* Document content */}
        {loading ? (
          <div className="flex items-center justify-center min-h-[300px]">
            <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
          </div>
        ) : (
          <div className="max-w-5xl space-y-6 text-white/60 leading-relaxed text-base [&>p]:mb-4 [&>h1]:text-white [&>h1]:font-bold [&>h1]:text-xl [&>h1]:mb-4 [&>h2]:text-white [&>h2]:font-bold [&>h2]:text-lg [&>h2]:mb-3 [&>ul]:list-disc [&>ul]:ml-5 [&>ul]:mb-4">
            <div dangerouslySetInnerHTML={{ __html: content }} />
          </div>
        )}
      </div>
    </WebShell>
  )
}
