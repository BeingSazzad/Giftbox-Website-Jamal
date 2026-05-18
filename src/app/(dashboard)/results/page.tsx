'use client';
import { ArrowLeftOutlined, TrophyOutlined, RightOutlined, CalendarOutlined, UserOutlined } from '@ant-design/icons'
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from 'antd'
import { useState, Suspense } from 'react'
import { WebShell } from '@/components/layout/WebShell'
import { participations, getParticipation } from '@/data/participations'
import type { Winner, Participation } from '@/data/participations'

function ResultsContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const id = searchParams.get('id')
  
  // Find completed draws
  const completedDraws = participations.filter(p => p.status === 'completed')

  // If a specific draw id is in query params, show that draw's winners
  const participation = id ? getParticipation(id) : undefined

  if (id) {
    if (!participation || !participation.winners || participation.winners.length === 0) {
      return (
        <div className="text-center py-16 animate-fade-in">
          <div className="w-16 h-16 rounded-full bg-white/5 inline-flex items-center justify-center mb-4 text-white/30 text-2xl">
            🎁
          </div>
          <h2 className="text-white text-xl font-bold mb-2">Results Not Available</h2>
          <p className="text-white/50 text-sm mb-6 max-w-sm mx-auto">This draw might not be completed yet or the winners have not been finalized.</p>
          <Button type="primary" onClick={() => router.push('/results')} className="h-10 px-6 font-semibold">
            View All Draw Results
          </Button>
        </div>
      )
    }

    const isMultiple = participation.winners.length > 1

    return (
      <div className="animate-fade-in">
        {/* Back and Title */}
        <div className="flex items-center gap-3.5 mb-6">
          <button type="button" onClick={() => router.push('/results')} className="icon-btn-round">
            <ArrowLeftOutlined style={{ fontSize: 14 }} />
          </button>
          <div>
            <h1 className="m-0 text-white text-xl font-bold leading-tight">
              {participation.prizeTitle} Draw Results
            </h1>
            <p className="m-0 text-white/50 text-xs mt-0.5">Draw completed successfully</p>
          </div>
        </div>

        {/* Hero Banner Card */}
        <div className="relative bg-surface/40 backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden p-6 md:p-8 mb-8 text-center shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-transparent pointer-events-none" />
          
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-primary/10 border border-primary/20 inline-flex items-center justify-center mb-4 animate-bounce">
            <TrophyOutlined style={{ fontSize: 32, color: '#FE9301' }} />
          </div>
          <h2 className="m-0 mb-2 text-white text-2xl md:text-3xl font-extrabold tracking-tight">Draw Congratulations!</h2>
          <p className="m-0 text-white/60 text-sm md:text-base max-w-md mx-auto">
            The {isMultiple ? 'winners have' : 'winner has'} been drawn and officially verified. Check the lucky ticket details below.
          </p>
        </div>

        {/* Winner Grid */}
        <div
          className={[
            'grid gap-6 justify-center',
            isMultiple
              ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3'
              : 'grid-cols-1 max-w-md mx-auto',
          ].join(' ')}
        >
          {participation.winners.map((w) => (
            <WinnerCard
              key={w.id}
              winner={w}
              isCurrentUser={w.ticketNumber === participation.userWonTicketNumber}
            />
          ))}
        </div>
      </div>
    )
  }

  // Show all completed draws
  return (
    <div className="animate-fade-in">
      {/* Title */}
      <div className="mb-6 md:mb-8">
        <h1 className="m-0 text-white text-2xl md:text-3xl font-bold">Draw Winners Hub</h1>
        <p className="mt-1 text-white/50 text-sm">Browse winners and completed tickets of weekly gift box activities</p>
      </div>

      {completedDraws.length === 0 ? (
        <div className="text-center py-16 bg-surface/30 rounded-3xl border border-white/5">
          <div className="text-4xl mb-3">🏆</div>
          <h3 className="text-white font-bold text-lg m-0">No Completed Draws Yet</h3>
          <p className="text-white/50 text-xs mt-1">Keep an eye on active draws for incoming winners!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {completedDraws.map((draw) => {
            const dateStr = draw.submittedOn ? new Date(draw.submittedOn).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            }) : 'Recent'

            return (
              <div 
                key={draw.id} 
                className="group relative bg-surface/40 backdrop-blur-md border border-white/5 hover:border-white/12 rounded-2xl overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1 shadow-lg"
              >
                {/* Prize Image Header */}
                <div className="h-44 w-full bg-deep relative overflow-hidden">
                  <img 
                    src={draw.prizeImage} 
                    alt={draw.prizeTitle} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-deep via-deep/20 to-transparent" />
                  <span className="absolute bottom-3 left-4 bg-primary/20 backdrop-blur-md border border-primary/30 text-primary text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                    Completed
                  </span>
                </div>

                {/* Details */}
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="text-white text-base font-bold m-0 group-hover:text-primary transition-colors">
                    {draw.prizeTitle}
                  </h3>
                  <p className="text-white/55 text-xs mt-1.5 line-clamp-2 leading-relaxed flex-1">
                    {draw.prizeDescription}
                  </p>

                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/5">
                    <span className="text-white/40 text-[11px] flex items-center gap-1.5">
                      <CalendarOutlined /> {dateStr}
                    </span>
                    <span className="text-white/40 text-[11px] flex items-center gap-1.5">
                      <UserOutlined /> {draw.winners?.length || 0} {draw.winners?.length === 1 ? 'Winner' : 'Winners'}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => router.push(`/results?id=${draw.id}`)}
                    className="mt-4 w-full h-10 bg-white/6 hover:bg-primary hover:text-[#1a0f0a] text-white border border-white/10 hover:border-transparent rounded-xl font-bold text-xs cursor-pointer flex items-center justify-center gap-2 transition-all"
                  >
                    View Lucky Winners <RightOutlined style={{ fontSize: 10 }} />
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

interface WinnerCardProps {
  winner: Winner
  isCurrentUser?: boolean
}

function WinnerCard({ winner, isCurrentUser }: WinnerCardProps) {
  return (
    <div className="relative pt-4">
      <span className="absolute top-0 left-1/2 -translate-x-1/2 bg-primary text-[#1a0f0a] px-4.5 py-1 rounded-full font-extrabold text-[11px] uppercase tracking-wider shadow-lg z-10">
        Draw Winner
      </span>

      <div
        className={[
          'bg-surface/50 backdrop-blur-md rounded-2xl pt-7 px-5 pb-5 text-center border transition-all',
          isCurrentUser ? 'border-primary/50 bg-primary/5' : 'border-white/5',
        ].join(' ')}
      >
        <div className="w-18 h-18 rounded-full overflow-hidden mx-auto mb-3 border-2 border-white/10 bg-deep shadow-md">
          <img src={winner.photo} alt={winner.name} className="w-full h-full object-cover" />
        </div>
        <h3 className="text-white text-base font-bold m-0 leading-tight">{winner.name}</h3>
        <p className="text-white/55 text-xs m-0 mt-1">Ticket: <span className="font-semibold text-white/80">{winner.ticketNumber}</span></p>
        
        {isCurrentUser && (
          <div className="mt-3 text-primary font-bold text-[11px] bg-primary/10 border border-primary/20 px-3 py-1 rounded-full inline-block">
            That's you! 🎉
          </div>
        )}
      </div>
    </div>
  )
}

export default function DrawResultsPage() {
  return (
    <WebShell maxWidth={1200}>
      <Suspense fallback={<div className="text-center text-white/50 py-12">Loading results...</div>}>
        <ResultsContent />
      </Suspense>
    </WebShell>
  )
}
