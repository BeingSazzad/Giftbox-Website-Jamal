'use client'
import { createContext, useEffect, useState, type ReactNode } from 'react'
import { clearToken, getToken, setToken as saveToken, getUser, setUser as saveUser } from '@/lib/auth'
import { getProfileAction } from '@/actions/auth'
import { User } from '@/types'

interface AuthContextValue {
  user: User | null
  token: string | null
  login: (user: User, token: string) => void
  logout: () => void
  refreshProfile: () => Promise<void>
}

export const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const savedToken = getToken()
    if (savedToken) setToken(savedToken)
    const savedUser = getUser()
    if (savedUser) setUser(savedUser)

    // Fetch fresh profile data if authenticated
    if (savedToken) {
      refreshProfileData()
    }
    setIsLoading(false)
  }, [])

  async function refreshProfileData() {
    try {
      const profileData = await getProfileAction()
      if (profileData) {
        const updatedUser = { ...user, ...profileData }
        setUser(updatedUser)
        saveUser(updatedUser)
      }
    } catch (error) {
      console.error('Failed to refresh profile:', error)
    }
  }

  function login(u: User, t: string) {
    setUser(u)
    setToken(t)
    saveToken(t)
    saveUser(u)
  }

  function logout() {
    setUser(null)
    setToken(null)
    clearToken()
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout, refreshProfile: refreshProfileData }}>
      {children}
    </AuthContext.Provider>
  )
}
