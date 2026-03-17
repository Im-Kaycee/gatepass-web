import axios from 'axios'
import { getToken, setToken, removeToken } from './tokens'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

api.interceptors.request.use((config) => {
  const token = getToken('access_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config

    if (error.response?.status === 401 && !original._retry) {
      original._retry = true

      try {
        const refresh = getToken('refresh_token')
        if (!refresh) throw new Error('No refresh token')

        const { data } = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/accounts/token/refresh/`,
          { refresh }
        )

        setToken('access_token', data.access)
        original.headers.Authorization = `Bearer ${data.access}`
        return api(original)
      } catch {
        removeToken('access_token')
        removeToken('refresh_token')
        window.location.href = '/login'
      }
    }

    return Promise.reject(error)
  }
)

export default api