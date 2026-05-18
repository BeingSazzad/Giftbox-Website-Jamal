import heroImg from '@/assets/hero.png'

export type ParticipationStatus = 'pending' | 'approved' | 'rejected' | 'completed'

export interface Winner {
  id: string
  name: string
  ticketNumber: string
  photo: string
}

export interface Participation {
  id: string
  prizeTitle: string
  prizeImage: string
  prizeDescription: string
  ticketNumber: string
  ticketPrice: number
  currency: string
  submittedOn: string
  status: ParticipationStatus
  scheduledDrawAt?: string
  rejectionReason?: string
  winners?: Winner[]
  userWonTicketNumber?: string
}

const macbookDescription =
  "The MacBook Pro M3 delivers groundbreaking performance with Apple's revolutionary M3 chip, featuring advanced GPU architecture and enhanced CPU capabilities. Perfect for professionals and creatives who demand the best in portable computing power."

const ipadDescription =
  'The iPad Pro 12.9" offers an expansive Liquid Retina XDR display with ProMotion technology, powered by the M2 chip for desktop-class performance. Ideal for creative professionals, students, and anyone seeking the ultimate tablet experience.'

const samsungDescription =
  'The Samsung Galaxy S24 Ultra brings flagship power with a 200MP camera, Snapdragon 8 Gen 3, and a vibrant Dynamic AMOLED 2X display — built for creators and power users.'

const macbookImg = 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80'
const samsungImg = 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=600&q=80'
const ipadImg = 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=600&q=80'

export const participations: Participation[] = [
  {
    id: 'p-001',
    prizeTitle: 'MacBook Pro M3',
    prizeImage: macbookImg,
    prizeDescription: macbookDescription,
    ticketNumber: 'TKT-2024-001234',
    ticketPrice: 2000,
    currency: 'CDF',
    submittedOn: '2026-04-17',
    status: 'pending',
  },
  {
    id: 'p-002',
    prizeTitle: 'Samsung Galaxy S24 Ultra',
    prizeImage: samsungImg,
    prizeDescription: samsungDescription,
    ticketNumber: 'TKT-2024-001234',
    ticketPrice: 2000,
    currency: 'CDF',
    submittedOn: '2026-02-10',
    status: 'approved',
    scheduledDrawAt: '2026-04-20T09:13:00',
  },
  {
    id: 'p-003',
    prizeTitle: 'Samsung Galaxy S24 Ultra',
    prizeImage: samsungImg,
    prizeDescription: samsungDescription,
    ticketNumber: 'TKT-2024-001234',
    ticketPrice: 2000,
    currency: 'CDF',
    submittedOn: '2026-02-10',
    status: 'completed',
    winners: [
      {
        id: 'w-1',
        name: 'Sazzad Chowdhury',
        ticketNumber: '2024-001234',
        photo: 'https://i.pravatar.cc/200?img=12',
      },
    ],
    userWonTicketNumber: '2024-001234',
  },
  {
    id: 'p-004',
    prizeTitle: 'iPad Pro 12.9"',
    prizeImage: ipadImg,
    prizeDescription: ipadDescription,
    ticketNumber: 'TKT-2024-001234',
    ticketPrice: 2000,
    currency: 'CDF',
    submittedOn: '2026-04-12',
    status: 'rejected',
    rejectionReason:
      'We were unable to verify your payment. Please contact support for more information and to resolve this issue.',
  },
  {
    id: 'p-005',
    prizeTitle: 'iPad Pro 12.9"',
    prizeImage: ipadImg,
    prizeDescription: ipadDescription,
    ticketNumber: 'TKT-2024-001234',
    ticketPrice: 2000,
    currency: 'CDF',
    submittedOn: '2026-03-22',
    status: 'completed',
    winners: [
      {
        id: 'w-1',
        name: 'Sazzad Chowdhury',
        ticketNumber: '2024-001234',
        photo: 'https://i.pravatar.cc/200?img=12',
      },
      {
        id: 'w-2',
        name: 'Ronald Richards',
        ticketNumber: '2024-001234',
        photo: 'https://i.pravatar.cc/200?img=33',
      },
      {
        id: 'w-3',
        name: 'Annette Black',
        ticketNumber: '2024-001234',
        photo: 'https://i.pravatar.cc/200?img=68',
      },
    ],
  },
]

export function getParticipation(id: string): Participation | undefined {
  return participations.find((p) => p.id === id)
}
