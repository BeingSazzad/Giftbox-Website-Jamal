'use client';
import { ExclamationCircleOutlined, SearchOutlined, InboxOutlined, CompassOutlined } from '@ant-design/icons'
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { WebShell } from '@/components/layout/WebShell'
import { StatusBadge } from '@/components/common/StatusBadge'
import { participations } from '@/data/participations'

type FilterStatus = 'all' | 'pending' | 'approved' | 'completed' | 'rejected'

function formatShortDate(iso: string) {
  const d = new Date(iso)
  const dd = String(d.getDate()).padStart(2, '0')
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const yyyy = d.getFullYear()
  return `${dd}/${mm}/${yyyy}`
}

export default function MyDrawsPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<FilterStatus>('all')

  const filteredParticipations = participations.filter((p) => {
    if (activeTab === 'all') return true
    return p.status === activeTab
  })

  const tabs: { value: FilterStatus; label: string }[] = [
    { value: 'all', label: 'All Entries' },
    { value: 'pending', label: 'Pending Review' },
    { value: 'approved', label: 'Confirmed' },
    { value: 'completed', label: 'Completed' },
    { value: 'rejected', label: 'Rejected' },
  ]

  return (
    <WebShell>
      {/* Title Header */}
      <div className="mb-6 md:mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="m-0 text-white text-2xl md:text-3xl font-bold">My Draws</h1>
          <p className="mt-1.5 mb-0 text-white/50 text-sm">
            Track your entry history and check draw results instantly
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex border-b border-white/10 mb-6 overflow-x-auto scrollbar-none gap-2 md:gap-4">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.value
          const count = tab.value === 'all' 
            ? participations.length 
            : participations.filter((p) => p.status === tab.value).length

          return (
            <button
              key={tab.value}
              type="button"
              onClick={() => setActiveTab(tab.value)}
              className={[
                'px-4 py-3 text-sm font-semibold transition-all border-b-2 relative shrink-0 whitespace-nowrap flex items-center gap-2 cursor-pointer',
                isActive
                  ? 'border-primary text-primary'
                  : 'border-transparent text-white/50 hover:text-white/80',
              ].join(' ')}
            >
              {tab.label}
              <span className={[
                'text-[10px] font-bold px-2 py-0.5 rounded-full',
                isActive ? 'bg-primary/10 text-primary' : 'bg-white/5 text-white/40'
              ].join(' ')}>
                {count}
              </span>
            </button>
          )
        })}
      </div>

      {/* Grid Container */}
      {filteredParticipations.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredParticipations.map((p) => {
            const isRejected = p.status === 'rejected'
            const isCompleted = p.status === 'completed'
            const userWon = isCompleted && p.winners?.some(w => w.ticketNumber === p.userWonTicketNumber)

            return (
              <button
                key={p.id}
                type="button"
                onClick={() => router.push(`/participation/${p.id}`)}
                className={[
                  'w-full bg-surface/40 hover:bg-surface/50 backdrop-blur-md rounded-2xl p-5 flex flex-col justify-between cursor-pointer text-left transition-all duration-300 relative overflow-hidden group',
                  'border',
                  isRejected
                    ? 'border-danger/20 hover:border-danger/45 shadow-[0_0_15px_rgba(255,77,79,0.02)]'
                    : userWon
                      ? 'border-primary/40 hover:border-primary shadow-[0_0_20px_rgba(254,147,1,0.08)] bg-primary/2'
                      : 'border-white/5 hover:border-primary/30 hover:shadow-[0_0_20px_rgba(255,105,0,0.05)]',
                  'hover:-translate-y-1',
                ].join(' ')}
              >
                <div>
                  {/* Card Image */}
                  <div className="w-full h-40 rounded-xl overflow-hidden bg-night mb-4 relative">
                    <img
                      src={p.prizeImage}
                      alt={p.prizeTitle}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3 z-10">
                      <StatusBadge status={p.status} />
                    </div>
                    {userWon && (
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent pointer-events-none" />
                    )}
                  </div>

                  {/* Title & Info */}
                  <div className="text-white text-base font-bold mb-2 line-clamp-1 group-hover:text-primary transition-colors flex items-center justify-between gap-2">
                    <span className="truncate">{p.prizeTitle}</span>
                    {isCompleted && (
                      userWon ? (
                        <span className="shrink-0 bg-primary/20 text-primary border border-primary/30 px-2 py-0.5 rounded-lg text-[9px] font-black uppercase tracking-wider animate-pulse">
                          Won! 🎉
                        </span>
                      ) : (
                        <span className="shrink-0 bg-white/5 text-white/40 border border-white/5 px-2 py-0.5 rounded-lg text-[9px] font-bold uppercase tracking-wider">
                          Ended
                        </span>
                      )
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-white/50 mb-4">
                    <span>Ticket: <strong className="text-white/80 font-mono">{p.ticketNumber}</strong></span>
                    <span>Price: <strong className="text-primary">{p.ticketPrice} {p.currency}</strong></span>
                  </div>
                </div>

                {/* Footer Section */}
                <div className="pt-3 border-t border-white/5 flex flex-col gap-2.5 w-full">
                  <div className="text-white/40 text-[11px] font-semibold flex items-center justify-between">
                    <span>SUBMISSION DATE</span>
                    <span className="text-white/60">{formatShortDate(p.submittedOn)}</span>
                  </div>

                  {isRejected && p.rejectionReason && (
                    <div className="flex gap-2 items-start text-danger text-[11px] pt-1.5 border-t border-white/5 italic">
                      <ExclamationCircleOutlined className="mt-0.5 shrink-0" />
                      <span className="line-clamp-2">
                        Verification rejected: Check details & re-submit.
                      </span>
                    </div>
                  )}
                </div>
              </button>
            )
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-surface/30 border border-white/5 rounded-3xl p-12 text-center flex flex-col items-center justify-center max-w-lg mx-auto mt-8">
          <div className="w-16 h-16 rounded-2xl bg-white/5 text-white/30 flex items-center justify-center text-2xl mb-4">
            <InboxOutlined />
          </div>
          <h3 className="text-white font-bold text-lg m-0 mb-1.5">No entries found</h3>
          <p className="text-white/50 text-sm m-0 mb-6 leading-relaxed">
            You don't have any draw entries matching the "{tabs.find((t) => t.value === activeTab)?.label}" status.
          </p>
          <button
            type="button"
            onClick={() => router.push('/')}
            className="bg-primary hover:bg-primary-hover text-[#1a0f0a] font-bold text-sm px-5 py-2.5 rounded-xl transition-all cursor-pointer flex items-center gap-2"
          >
            <CompassOutlined />
            Browse Active Draws
          </button>
        </div>
      )}
    </WebShell>
  )
}
