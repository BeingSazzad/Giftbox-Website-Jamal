export interface User {
  id: string
  name: string
  email: string
  phone: string
  avatar?: string
  createdAt: string
}

export interface Draw {
  id: string
  title: string
  description: string
  image: string
  ticketPrice: number
  currency: string
  endsAt: string
  status: 'active' | 'completed' | 'cancelled'
}

export interface Winner {
  id: string
  name: string
  ticketNumber: string
  photo: string
}

export interface PaymentNumber {
  id: string
  provider: 'M-Pesa' | 'Orange Money'
  number: string
}

export interface Participation {
  id: string
  drawId?: string
  userId?: string
  prizeTitle: string
  prizeImage: string
  prizeDescription: string
  ticketNumber: string
  ticketPrice: number
  currency: string
  submittedOn: string
  status: 'pending' | 'approved' | 'rejected' | 'completed'
  scheduledDrawAt?: string
  rejectionReason?: string
  winners?: Winner[]
  userWonTicketNumber?: string
  createdAt?: string
}

export interface ApiResponse<T> {
  data: T
  message: string
  success: boolean
}

export interface LoginPayload {
  email: string
  password: string
}

export interface RegisterPayload {
  fullName: string
  email: string
  phone: string
  password: string
}

export interface AuthResponse {
  user: { id: string; name: string; email: string }
  token: string
}
