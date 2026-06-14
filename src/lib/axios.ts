import axios from 'axios'
import { API_BASE_URL } from '@/config/env'
import { API_TIMEOUT } from '@/utils/constants'
import { clearToken, getToken } from '@/lib/auth'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: API_TIMEOUT,
})

api.interceptors.request.use((config) => {
  const token = getToken()
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

api.interceptors.response.use(
  (res) => res,
  (err) => {
    // Extract server-provided error message or fallback
    let message = err.response?.data?.message || err.message || 'An unexpected error occurred'

    // Extract detailed validation message if available
    const errorMessages = err.response?.data?.errorMessages
    if (Array.isArray(errorMessages) && errorMessages.length > 0) {
      const cleaned = errorMessages
        .map((e: any) => (e?.message || '').replace(/^Path\s+/i, ''))
        .filter(Boolean)
      if (cleaned.length > 0) {
        message = cleaned.join(', ')
      }
    } else {
      message = message.replace(/^Path\s+/i, '')
    }
    
    // Create a normalized error object
    const normalizedError = new Error(message)
    Object.assign(normalizedError, {
      status: err.response?.status,
      data: err.response?.data,
      originalError: err,
    })

    // Handle token expiry / 401 unauthorized
    if (err.response?.status === 401) {
      clearToken()
      if (typeof window !== 'undefined' && !window.location.pathname.includes('/login')) {
        window.location.href = '/login'
      }
    }

    return Promise.reject(normalizedError)
  }
)

export default api
