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

export interface Participation {
  id: string
  drawId: string
  userId: string
  status: 'pending' | 'approved' | 'rejected' | 'completed'
  createdAt: string
}

export interface ApiResponse<T> {
  data: T
  message: string
  success: boolean
}
