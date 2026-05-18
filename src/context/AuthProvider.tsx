'use client'
import { createContext, useEffect, useState, type ReactNode } from 'react'
import { clearToken, getToken } from '@/lib/auth'

interface User {
  id: string
  name: string
  email: string
}

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
    const saved = getToken()
    if (saved) setToken(saved)
  }, [])

  function login(user: User, token: string) {
    setUser(user)
    setToken(token)
    localStorage.setItem('token', token)
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
