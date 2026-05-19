import macbookM3Img from '@/assets/images/macbook_m3.png'

export interface Draw {
  id: string
  title: string
  description: string
  image: string
  ticketPrice: number
  currency: string
  endsAt: string
}

export interface PaymentNumber {
  id: string
  provider: 'M-Pesa' | 'Orange Money'
  number: string
}

export const currentDraw: Draw = {
  id: 'draw-001',
  title: 'MacBook Pro M3 Max',
  description:
    "Experience pure power with the Apple M3 Max chip, featuring a stunning Liquid Retina XDR display, 36GB unified memory, and elite performance for creators.",
  image: macbookM3Img.src,
  ticketPrice: 2500,
  currency: 'CDF',
  endsAt: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000 + 18 * 60 * 60 * 1000).toISOString(),
}

export const paymentNumbers: PaymentNumber[] = [
  { id: 'pn-1', provider: 'M-Pesa', number: '+243 812 345 678' },
  { id: 'pn-2', provider: 'Orange Money', number: '+243 998 765 432' },
]
