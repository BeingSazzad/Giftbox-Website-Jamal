'use client';
import { Button, message } from 'antd'
import { ArrowLeftOutlined, CloudUploadOutlined, ExclamationCircleFilled, CreditCardOutlined, CopyOutlined, CheckOutlined } from '@ant-design/icons'
import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation';
import { WebShell } from '@/components/layout/WebShell'
import { BackHeader } from '@/components/layout/BackHeader'
import { SuccessModal } from '@/components/common/SuccessModal'
import { paymentNumbers } from '@/data/draws'

const MAX_FILE_SIZE = 10 * 1024 * 1024

export default function PaymentProofPage() {
  const router = useRouter()
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [dragOver, setDragOver] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const blobUrlRef = useRef<string | null>(null)

  useEffect(() => () => { if (blobUrlRef.current) URL.revokeObjectURL(blobUrlRef.current) }, [])

  const handlePick = () => inputRef.current?.click()

  const handleFile = (f: File | null) => {
    if (!f) return
    if (!['image/png', 'image/jpeg'].includes(f.type)) {
      message.error('Only PNG or JPG is allowed')
      return
    }
    if (f.size > MAX_FILE_SIZE) {
      message.error('File must be 10MB or less')
      return
    }
    if (blobUrlRef.current) URL.revokeObjectURL(blobUrlRef.current)
    const url = URL.createObjectURL(f)
    blobUrlRef.current = url
    setFile(f)
    setPreview(url)
  }

  const handleCopy = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text)
      message.success(`${label} copied`)
    } catch {
      message.error('Could not copy')
    }
  }

  const handleSubmit = () => {
    if (!file) {
      message.error('Please upload a screenshot first')
      return
    }
    setSubmitting(true)
    setTimeout(() => {
      setSubmitting(false)
      setShowSuccess(true)
    }, 800)
  }

  return (
    <WebShell maxWidth={1200}>
      {/* Header */}
      <BackHeader 
        title="Submit Payment Proof" 
        subtitle="Submit your ticket payment screenshot to enter the draw"
      />

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-6 md:gap-8 items-start">
        
        {/* Left Side: Instructions & Payment Numbers */}
        <div className="flex flex-col gap-6">
          {/* Attention Banner */}
          <div className="bg-[rgba(255,105,0,0.1)] border border-primary/30 rounded-2xl px-5 py-4 flex gap-4 items-start">
            <ExclamationCircleFilled className="text-primary text-xl mt-0.5 shrink-0" />
            <div>
              <h4 className="text-white font-bold text-sm m-0 mb-1">Verify Your Submission</h4>
              <p className="text-white/80 text-sm m-0 leading-relaxed">
                Take a clear, uncropped photo or screenshot of the transaction details showing the transaction ID, date, and amount. False or double-submitted proofs will lead to account suspension.
              </p>
            </div>
          </div>

          {/* Guidelines Checklist */}
          <div className="bg-surface/40 border border-white/5 rounded-2xl p-5 md:p-6">
            <h3 className="m-0 text-white text-base font-bold mb-4">Submission Guidelines</h3>
            <ul className="m-0 p-0 list-none flex flex-col gap-3">
              <li className="flex items-start gap-3 text-white/70 text-sm leading-relaxed">
                <CheckOutlined className="text-success mt-1 shrink-0" />
                <span>Image format must be <strong>PNG or JPG</strong> up to <strong>10MB</strong>.</span>
              </li>
              <li className="flex items-start gap-3 text-white/70 text-sm leading-relaxed">
                <CheckOutlined className="text-success mt-1 shrink-0" />
                <span>Ensure the <strong>Transaction ID</strong> and <strong>Amount paid</strong> are clearly visible in the image.</span>
              </li>
              <li className="flex items-start gap-3 text-white/70 text-sm leading-relaxed">
                <CheckOutlined className="text-success mt-1 shrink-0" />
                <span>Each ticket is valid only for a single active draw. Do not reuse old proofs.</span>
              </li>
            </ul>
          </div>

          {/* Payment Numbers */}
          <div className="bg-surface/40 border border-white/5 rounded-2xl p-5 md:p-6">
            <h3 className="m-0 mb-4 text-white text-base font-bold">Payment Merchant Accounts</h3>
            <p className="text-white/60 text-sm mb-4 leading-relaxed">
              If you haven't paid yet, please send the ticket price to one of these official accounts first:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {paymentNumbers.map((pn) => (
                <div
                  key={pn.id}
                  className="bg-deep/50 border border-white/5 rounded-xl p-4 flex items-center justify-between gap-3 group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-lg shrink-0">
                      <CreditCardOutlined />
                    </div>
                    <div>
                      <div className="text-white/50 text-[10px] uppercase font-bold tracking-wider">{pn.provider}</div>
                      <div className="text-white text-sm font-semibold">{pn.number}</div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy(pn.number, pn.provider)}
                    className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg p-2 text-white/70 hover:text-white transition-colors cursor-pointer"
                    title="Copy Account Number"
                  >
                    <CopyOutlined />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Upload Card */}
        <div className="bg-surface/50 backdrop-blur-md border border-white/10 rounded-3xl p-5 md:p-6 shadow-xl flex flex-col gap-6">
          <h3 className="m-0 text-white text-base font-bold">Upload Area</h3>
          
          <button
            type="button"
            onClick={handlePick}
            onDragOver={(e) => {
              e.preventDefault()
              setDragOver(true)
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={(e) => {
              e.preventDefault()
              setDragOver(false)
              handleFile(e.dataTransfer.files?.[0] ?? null)
            }}
            className={[
              'rounded-2xl py-12 px-6 flex flex-col items-center gap-4 cursor-pointer min-h-72 justify-center transition-all duration-300 relative overflow-hidden group',
              dragOver
                ? 'bg-primary/10 border-[1.5px] border-dashed border-primary shadow-[0_0_20px_rgba(255,105,0,0.1)]'
                : 'bg-deep/40 border-[1.5px] border-dashed border-white/10 hover:border-primary/50 hover:bg-deep/60',
            ].join(' ')}
          >
            {preview ? (
              <div className="relative w-full h-full flex items-center justify-center">
                <img
                  src={preview}
                  alt="Payment proof"
                  className="max-w-full max-h-64 rounded-xl object-contain shadow-lg"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity rounded-xl">
                  <div className="text-white text-sm font-bold flex items-center gap-2">
                    <CloudUploadOutlined className="text-lg" />
                    Replace Image
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                  <CloudUploadOutlined />
                </div>
                <div className="text-center">
                  <div className="text-white text-base font-bold">
                    Drag and drop screenshot
                  </div>
                  <div className="text-white/50 text-xs mt-1.5">or click to browse local files</div>
                  <div className="text-white/30 text-[10px] mt-4 font-semibold uppercase tracking-wider">PNG, JPG up to 10MB</div>
                </div>
              </>
            )}
          </button>

          {file && (
            <div className="bg-deep/40 border border-white/5 rounded-xl px-4 py-3 flex items-center justify-between text-xs text-white/70">
              <span className="truncate max-w-[200px]">{file.name}</span>
              <span className="font-semibold shrink-0 text-white/50">{(file.size / 1024).toFixed(0)} KB</span>
            </div>
          )}

          <input
            ref={inputRef}
            type="file"
            accept="image/png,image/jpeg"
            className="hidden"
            onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
          />

          <Button 
            type="primary" 
            size="large" 
            block 
            loading={submitting} 
            onClick={handleSubmit}
            className="h-12 text-base font-bold shadow-[0_0_20px_rgba(255,105,0,0.15)]"
          >
            Submit Verification Proof
          </Button>
        </div>

      </div>

      <SuccessModal
        open={showSuccess}
        onViewParticipations={() => {
          setShowSuccess(false)
          router.push('/my-draws')
        }}
        onBackHome={() => {
          setShowSuccess(false)
          router.push('/')
        }}
      />
    </WebShell>
  )
}
