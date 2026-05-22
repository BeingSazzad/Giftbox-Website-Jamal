import axios from 'axios'
import { API_BASE_URL } from '@/config/env'
import { API_TIMEOUT } from '@/utils/constants'
import { getToken } from '@/lib/auth'

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
  (err) => Promise.reject(err)
)

export default api
