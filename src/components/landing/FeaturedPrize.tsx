'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowRightOutlined, ArrowLeftOutlined } from '@ant-design/icons'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Section, SectionTitle } from '@/components/landing/Section'
import { getActiveLotteriesAction } from '@/actions/lottery'
import { getImageUrl } from '@/utils/helpers'
import { Countdown } from '@/components/common/Countdown'
import { useProfile } from '@/hooks/useProfile'


export function FeaturedPrize() {
  const router = useRouter()
  const user = useProfile()
  const isAuthenticated = !!user?._id
  const [lotteries, setLotteries] = useState<any[]>([])

  useEffect(() => {
    getActiveLotteriesAction()
      .then((res: any) => {
        if (res && res.data) {
          setLotteries(res.data)
        }
      })
      .catch(console.error)
  }, [])

  if (lotteries.length === 0) {
    return null; // Don't show the section if there are no active lotteries
  }

  return (
    <Section id="prizes">
      <SectionTitle eyebrow="Featured" title="The prize on the line" subtitle="Brand new, sealed, and ready to ship to the winner free of charge." />

      <div className="relative group">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          navigation={{
            nextEl: '.swiper-button-next-custom',
            prevEl: '.swiper-button-prev-custom',
          }}
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          className="pb-12"
        >
          {lotteries.map((draw) => (
            <SwiperSlide key={draw._id}>
              <div className="relative bg-linear-to-br from-purple-deep to-[#0d0722] border border-primary/20 rounded-4xl p-4 md:p-10 overflow-hidden shadow-2xl shadow-primary/10">
                <div className="absolute top-0 right-0 w-125 h-125 bg-primary/10 blur-[100px] rounded-full"></div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-stretch relative z-10">
                  <div className="relative overflow-hidden rounded-4xl border border-white/10 shadow-2xl aspect-square lg:aspect-auto lg:h-95 bg-night/20 backdrop-blur-sm">
                    <img
                      src={getImageUrl(draw.banner)}
                      alt={draw.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 select-none"
                    />
                  </div>

                  <div className="flex flex-col justify-center">
                    <h3 className="text-3xl md:text-4xl font-black text-white mb-4 leading-tight">{draw.title}</h3>
                    <p className="text-white/70 text-base leading-relaxed mb-6">
                      {draw.description}
                    </p>

                    {/* Participants Badge */}
                    <div className="flex items-center gap-3 mb-6 bg-white/5 border border-white/10 w-max px-3 py-1.5 rounded-full backdrop-blur-sm">
                      <div className="flex -space-x-2">
                        <div className="w-7 h-7 rounded-full bg-primary/20 border-2 border-[#1a0f3d] flex items-center justify-center text-xs shadow-sm">🎁</div>
                        <div className="w-7 h-7 rounded-full bg-primary/20 border-2 border-[#1a0f3d] flex items-center justify-center text-xs shadow-sm">🎁</div>
                        <div className="w-7 h-7 rounded-full bg-primary/20 border-2 border-[#1a0f3d] flex items-center justify-center text-xs shadow-sm">🎁</div>
                      </div>
                      <span className="text-white/80 text-sm font-bold pr-2 tracking-wide">
                        +{draw.manualParticipants > 0 ? draw.manualParticipants : 10} Participated
                      </span>
                    </div>

                    {/* Clean, Premium Info Bar */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-x-8 gap-y-6 mb-8 py-5 border-y border-white/10">
                      <div className="shrink-0">
                        <span className="text-white/40 text-xs font-bold uppercase tracking-wider block mb-2">Ticket Price</span>
                        <span className="text-primary text-2xl lg:text-3xl font-black block leading-none select-none">
                          {draw.ticketPrice.toLocaleString()} {draw.currency}
                        </span>
                      </div>

                      {/* Vertical divider line on desktop */}
                      <div className="hidden sm:block w-px h-12 bg-white/10 shrink-0 self-center" />

                      <div className="min-w-0 flex-grow">
                        <span className="text-white/40 text-xs font-bold uppercase tracking-wider block mb-2">Countdown</span>
                        <Countdown endsAt={draw.endAt} />
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        if (isAuthenticated) {
                          router.push(`/draws/${draw._id}`)
                        } else {
                          router.push(`/login?redirect=/draws/${draw._id}`)
                        }
                      }}
                      className="h-12 w-full bg-linear-to-br from-[#FFB900] to-[#FF6900] hover:from-[#FFC933] hover:to-[#FF7E1A] text-[#1a0f0a] rounded-xl font-bold text-lg shadow-[0_4px_20px_rgba(255,105,0,0.3)] hover:shadow-[0_8px_28px_rgba(255,105,0,0.45)] hover:-translate-y-px hover:scale-[1.02] transition-all cursor-pointer flex justify-center items-center gap-2 spell-btn-glow"
                    >
                      {isAuthenticated ? 'Participate Now' : 'Sign In to Participate'} <ArrowRightOutlined />
                    </button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation */}
        <div className="swiper-button-prev-custom absolute left-2 md:-left-5 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center rounded-full bg-[#1a0f3d]/80 backdrop-blur-md border border-primary/40 text-primary hover:bg-primary hover:text-black transition-all cursor-pointer shadow-xl shadow-primary/20 md:opacity-0 md:group-hover:opacity-100">
          <ArrowLeftOutlined className="text-xl" />
        </div>
        <div className="swiper-button-next-custom absolute right-2 md:-right-5 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center rounded-full bg-[#1a0f3d]/80 backdrop-blur-md border border-primary/40 text-primary hover:bg-primary hover:text-black transition-all cursor-pointer shadow-xl shadow-primary/20 md:opacity-0 md:group-hover:opacity-100">
          <ArrowRightOutlined className="text-xl" />
        </div>
      </div>
    </Section>
  )
}
