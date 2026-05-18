import macbookImg from '@/assets/images/macbook_m3.png'
import galaxyImg from '@/assets/images/galaxy_s24.png'
import ipadImg from '@/assets/images/ipad_pro.png'

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
  "The MacBook Pro M3 delivers groundbreaking performance with Apple's revolutionary M3 chip, featuring advanced GPU architecture and enhanced CPU capabilities."

const ipadDescription =
  'The iPad Pro 12.9" offers an expansive Liquid Retina XDR display with ProMotion technology, powered by the M2 chip for desktop-class performance.'

const samsungDescription =
  'The Samsung Galaxy S24 Ultra brings flagship power with a 200MP camera, Snapdragon 8 Gen 3, and a vibrant Dynamic AMOLED 2X display.'

export const participations: Participation[] = [
  {
    id: 'p-001',
    prizeTitle: 'MacBook Pro M3',
    prizeImage: macbookImg.src,
    prizeDescription: macbookDescription,
    ticketNumber: 'TKT-2026-000101',
    ticketPrice: 2000,
    currency: 'CDF',
    submittedOn: '2026-04-17',
    status: 'pending',
  },
  {
    id: 'p-002',
    prizeTitle: 'Samsung Galaxy S24 Ultra',
    prizeImage: galaxyImg.src,
    prizeDescription: samsungDescription,
    ticketNumber: 'TKT-2026-000102',
    ticketPrice: 2000,
    currency: 'CDF',
    submittedOn: '2026-02-10',
    status: 'approved',
    scheduledDrawAt: '2026-04-20T09:13:00',
  },
  {
    id: 'p-003',
    prizeTitle: 'Samsung Galaxy S24 Ultra',
    prizeImage: galaxyImg.src,
    prizeDescription: samsungDescription,
    ticketNumber: 'TKT-2026-000103',
    ticketPrice: 2000,
    currency: 'CDF',
    submittedOn: '2026-02-10',
    status: 'completed',
    winners: [
      {
        id: 'w-1',
        name: 'Sazzad Chowdhury',
        ticketNumber: 'TKT-2026-000103',
        photo: 'https://i.pravatar.cc/200?img=12',
      },
    ],
    userWonTicketNumber: 'TKT-2026-000103',
  },
  {
    id: 'p-004',
    prizeTitle: 'iPad Pro 12.9"',
    prizeImage: ipadImg.src,
    prizeDescription: ipadDescription,
    ticketNumber: 'TKT-2026-000104',
    ticketPrice: 2000,
    currency: 'CDF',
    submittedOn: '2026-04-12',
    status: 'rejected',
    rejectionReason:
      'We were unable to verify your payment. Please contact support for more information.',
  },
  {
    id: 'p-005',
    prizeTitle: 'iPad Pro 12.9"',
    prizeImage: ipadImg.src,
    prizeDescription: ipadDescription,
    ticketNumber: 'TKT-2026-000105',
    ticketPrice: 2000,
    currency: 'CDF',
    submittedOn: '2026-03-22',
    status: 'completed',
    winners: [
      {
        id: 'w-1',
        name: 'Sazzad Chowdhury',
        ticketNumber: 'TKT-2026-000105',
        photo: 'https://i.pravatar.cc/200?img=12',
      },
      {
        id: 'w-2',
        name: 'Ronald Richards',
        ticketNumber: 'TKT-2026-000106',
        photo: 'https://i.pravatar.cc/200?img=33',
      },
      {
        id: 'w-3',
        name: 'Annette Black',
        ticketNumber: 'TKT-2026-000107',
        photo: 'https://i.pravatar.cc/200?img=68',
      },
    ],
  },
]

export function getParticipation(id: string): Participation | undefined {
  return participations.find((p) => p.id === id)
}
