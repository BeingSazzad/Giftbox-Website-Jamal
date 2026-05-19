import gamingLaptopImg from '@/assets/images/gaming_laptop.png'

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
  title: 'Gaming Laptop RTX 4060',
  description:
    "The RTX 4060 gaming laptop offers a powerful balance of high-end performance and efficiency, featuring NVIDIA's Ada Lovelace architecture.",
  image: gamingLaptopImg.src,
  ticketPrice: 2500,
  currency: 'CDF',
  endsAt: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000 + 18 * 60 * 60 * 1000).toISOString(),
}

export const paymentNumbers: PaymentNumber[] = [
  { id: 'pn-1', provider: 'M-Pesa', number: '+243 812 345 678' },
  { id: 'pn-2', provider: 'Orange Money', number: '+243 998 765 432' },
]
