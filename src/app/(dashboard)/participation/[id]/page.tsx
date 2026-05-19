'use client';
import { Button } from 'antd'
import {
  ArrowLeftOutlined,
  CheckCircleFilled,
  ClockCircleFilled,
  CustomerServiceOutlined,
  ExclamationCircleFilled,
  TrophyOutlined,
} from '@ant-design/icons'
import { useRouter, useParams } from 'next/navigation';
import type { ReactNode } from 'react'
import { WebShell } from '@/components/layout/WebShell'
import { BackHeader } from '@/components/layout/BackHeader'
import { StatusBadge } from '@/components/common/StatusBadge'
import { getParticipation } from '@/data/participations'
import type { Participation } from '@/data/participations'

function formatLongDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  })
}

function formatWeekdayDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default function ParticipationDetailsPage() {
  const router = useRouter()
  const { id } = useParams<{ id: string }>()
  const participation = id ? getParticipation(id) : undefined

  if (!participation) {
    return (
      <WebShell maxWidth={760}>
        <div className="text-center py-15">
          <h2 className="text-white mb-3">Participation not found</h2>
          <Button type="primary" onClick={() => router.push('/my-draws')}>
            Back to My Draws
          </Button>
        </div>
      </WebShell>
    )
  }

  return (
    <WebShell maxWidth={1200}>
      {/* Header */}
      <BackHeader 
        title="Participation Details" 
        subtitle="View status and details of your draw ticket"
      />

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-6 md:gap-8 items-start">
        
        {/* Left Column: Image, Description, & Timeline */}
        <div className="flex flex-col gap-6">
          {/* Main Info Card */}
          <div className="bg-surface/50 backdrop-blur-md border border-white/10 rounded-3xl p-5 md:p-6 shadow-xl">
            <div className="rounded-2xl overflow-hidden bg-night aspect-video mb-6 relative">
              <img
                src={participation.prizeImage}
                alt={participation.prizeTitle}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4 z-10">
                <StatusBadge status={participation.status} />
              </div>
            </div>

            <h2 className="m-0 text-white text-2xl font-black mb-3">
              {participation.prizeTitle}
            </h2>
            <p className="m-0 text-white/70 text-sm leading-relaxed mb-4">
              {participation.prizeDescription}
            </p>
          </div>


        </div>

        {/* Right Column: Ticket Info & Action Status */}
        <div className="flex flex-col gap-6 lg:sticky lg:top-24">
          
          {/* Ticket Information Card */}
          <div className="bg-surface/50 backdrop-blur-md border border-white/10 rounded-3xl p-5 md:p-6 shadow-xl">
            <div className="flex items-center gap-2.5 mb-4">
              <span className="text-primary text-lg">🎟️</span>
              <h3 className="m-0 text-white text-base font-bold">Ticket Details</h3>
            </div>
            
            <div className="space-y-3.5">
              <div className="bg-deep/50 border border-white/5 rounded-xl px-4 py-3">
                <div className="text-white/50 text-[10px] font-bold uppercase tracking-wider mb-1">Ticket Number</div>
                <div className="text-white text-lg font-mono font-bold tracking-wider">{participation.ticketNumber}</div>
              </div>

              <div className="bg-deep/50 border border-white/5 rounded-xl px-4 py-3 flex items-center justify-between">
                <div>
                  <div className="text-white/50 text-[10px] font-bold uppercase tracking-wider mb-0.5">Ticket Price</div>
                  <div className="text-primary text-base font-bold">{participation.ticketPrice.toLocaleString()} {participation.currency}</div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-lg px-2.5 py-1 text-white/50 text-[11px] font-bold">
                  Paid
                </div>
              </div>
            </div>
          </div>

          {/* Action / Status Block */}
          <StatusBlock participation={participation} />

        </div>

      </div>
    </WebShell>
  )
}

interface CardProps {
  children: ReactNode
  borderColor?: string
}

function Card({ children, borderColor = 'border-white/6' }: CardProps) {
  return (
    <div className={`bg-surface/40 backdrop-blur-md rounded-2xl p-5 border ${borderColor}`}>
      {children}
    </div>
  )
}

interface StatusBlockProps {
  participation: Participation
}

function StatusBlock({ participation }: StatusBlockProps) {
  const router = useRouter()

  if (participation.status === 'pending') {
    return (
      <Card borderColor="border-primary/35">
        <div className="flex items-center gap-2.5 mb-2">
          <ClockCircleFilled className="text-primary text-lg" />
          <h3 className="m-0 text-white text-base font-bold">Under Review</h3>
        </div>
        <p className="m-0 text-white/60 text-sm leading-relaxed mb-4">
          Your payment screenshot is currently in queue for manual administrator verification. This usually takes 12-24 hours.
        </p>
        <div className="h-px bg-white/5 my-4" />
        <div className="text-white/40 text-[11px] font-semibold uppercase tracking-wider flex items-center gap-1.5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          Awaiting Review
        </div>
      </Card>
    )
  }

  if (participation.status === 'rejected') {
    return (
      <div className="flex flex-col gap-4">
        <Card borderColor="border-danger/35">
          <div className="flex items-center gap-2.5 mb-2">
            <ExclamationCircleFilled className="text-danger text-lg" />
            <h3 className="m-0 text-white text-base font-bold">Verification Failed</h3>
          </div>
          <p className="m-0 text-white/60 text-sm leading-relaxed">
            {participation.rejectionReason ??
              'We were unable to verify your payment screenshot. The image may be cropped, unreadable, or details do not match our bank statements.'}
          </p>
        </Card>

        <button
          type="button"
          onClick={() => router.push('/support')}
          className="w-full h-12 bg-danger/10 hover:bg-danger/20 border border-danger/40 text-danger rounded-xl font-bold text-sm cursor-pointer flex items-center justify-center gap-2 transition-all"
        >
          <CustomerServiceOutlined />
          Contact Help Desk
        </button>
      </div>
    )
  }

  if (participation.status === 'completed') {
    const userWon = participation.winners?.some(w => w.ticketNumber === participation.userWonTicketNumber)
    
    return (
      <div className="flex flex-col gap-5">
        <Card borderColor="border-primary/35">
          <div className="flex items-center gap-2.5 mb-2">
            <TrophyOutlined style={{ fontSize: 20, color: '#FE9301' }} />
            <h3 className="m-0 text-white text-base font-bold">Draw Winners Announced!</h3>
          </div>
          <p className="m-0 text-white/60 text-sm leading-relaxed mb-5">
            The draw has been successfully conducted. Below are the officially verified lucky winners for this draw:
          </p>

          <div className="space-y-3">
            {participation.winners?.map((w) => {
              const isCurrentUserWinner = w.ticketNumber === participation.userWonTicketNumber
              return (
                <div 
                  key={w.id} 
                  className={[
                    'p-3.5 rounded-xl border flex items-center justify-between gap-3 transition-all',
                    isCurrentUserWinner 
                      ? 'border-primary/40 bg-primary/8 shadow-[0_0_15px_rgba(254,147,1,0.05)]' 
                      : 'border-white/5 bg-deep/40'
                  ].join(' ')}
                >
                  <div className="flex items-center gap-3">
                    <img 
                      src={w.photo} 
                      alt={w.name} 
                      className="w-10 h-10 rounded-full object-cover border border-white/10" 
                    />
                    <div>
                      <div className="text-white text-xs font-bold">{w.name}</div>
                      <div className="text-white/40 text-[10px] mt-0.5">Ticket: <span className="font-mono">{w.ticketNumber}</span></div>
                    </div>
                  </div>
                  {isCurrentUserWinner ? (
                    <span className="bg-primary text-[#1a0f0a] px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-wider shadow-md">
                      You Won! 🎉
                    </span>
                  ) : (
                    <span className="text-white/40 text-[9px] font-bold uppercase tracking-wider bg-white/5 px-2 py-0.5 rounded">
                      Winner
                    </span>
                  )}
                </div>
              )
            })}
          </div>

          {userWon ? (
            <div className="mt-5 bg-primary/10 border border-primary/20 rounded-2xl p-4 text-center">
              <div className="text-primary text-sm font-black animate-pulse">🎉 Congratulations! You Won!</div>
              <p className="m-0 text-white/70 text-xs mt-1.5 leading-relaxed">
                Our support agents will contact you via your registered WhatsApp/phone number within 24 hours to arrange your prize delivery!
              </p>
            </div>
          ) : (
            <div className="mt-5 bg-white/5 border border-white/5 rounded-2xl p-4 text-center text-white/50 text-xs font-medium leading-relaxed">
              Better luck next time! Keep participating in other active draws to increase your chances.
            </div>
          )}
        </Card>

        <button
          type="button"
          onClick={() => router.push('/my-draws')}
          className="w-full h-12 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl font-bold text-sm cursor-pointer flex items-center justify-center gap-2 transition-all"
        >
          Back to My Draws
        </button>
      </div>
    )
  }

  return (
    <Card borderColor="border-success/35">
      <div className="flex items-center gap-2.5 mb-2">
        <CheckCircleFilled className="text-success text-lg" />
        <h3 className="m-0 text-white text-base font-bold">Entry Confirmed</h3>
      </div>
      <p className="m-0 mb-4 text-white/60 text-sm leading-relaxed">
        Your screenshot was verified! You are officially entered into the prize draw. Good luck!
      </p>

      {participation.scheduledDrawAt && (
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 mb-4">
          <div className="text-white/50 text-[10px] font-bold uppercase tracking-wider mb-1">Draw Date & Time</div>
          <div className="text-primary text-base font-bold mb-0.5">
            {formatWeekdayDate(participation.scheduledDrawAt)}
          </div>
          <div className="text-white text-xs">
            At {formatTime(participation.scheduledDrawAt)}
          </div>
        </div>
      )}

      <div className="flex gap-2 items-start text-white/40 text-xs leading-relaxed">
        <ExclamationCircleFilled className="text-primary/70 mt-0.5 shrink-0" />
        <span>
          The announcement will be published here live at the scheduled time. You will get notified if you win.
        </span>
      </div>
    </Card>
  )
}
