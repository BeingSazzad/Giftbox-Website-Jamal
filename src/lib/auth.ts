import { USER_STORAGE_KEY } from '@/utils/constants'
import { User } from '@/types'
import Cookies from 'js-cookie'

export function getToken(): string | null {
  if (typeof window === 'undefined') return null
  return Cookies.get('accessToken') || null
}

export function setToken(token: string): void {
  Cookies.set('accessToken', token, { path: '/', expires: 30 })
}

export function getUser(): User | null {
  if (typeof window === 'undefined') return null
  const stored = localStorage.getItem(USER_STORAGE_KEY)
  if (!stored) return null
  try {
    return JSON.parse(stored) as User
  } catch {
    return null
  }
}

export function setUser(user: User): void {
  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user))
}

export function clearUser(): void {
  localStorage.removeItem(USER_STORAGE_KEY)
}

export function clearToken(): void {
  Cookies.remove('accessToken', { path: '/' })
  clearUser()
}

export function isAuthenticated(): boolean {
  return Boolean(getToken())
}
