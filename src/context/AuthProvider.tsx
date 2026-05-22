'use client'
import { createContext, useEffect, useState, type ReactNode } from 'react'
import { clearToken, getToken, setToken as saveToken, getUser, setUser as saveUser } from '@/lib/auth'
import { User } from '@/types'

interface AuthContextValue {
  user: User | null
  token: string | null
  login: (user: User, token: string) => void
  logout: () => void
}

export const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    const savedToken = getToken()
    if (savedToken) setToken(savedToken)
    const savedUser = getUser()
    if (savedUser) setUser(savedUser)
  }, [])

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
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
