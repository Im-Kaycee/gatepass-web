import { create } from 'zustand'
import { User } from '@/types'
import api from '@/lib/axios'
import { getToken, setToken, removeToken } from '@/lib/tokens'

interface AuthState {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (username: string, password: string) => Promise<void>
  logout: () => void
  fetchUser: () => Promise<void>
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: true,
  isAuthenticated: false,

  login: async (username: string, password: string) => {
    set({ isLoading: true })
    try {
      const { data } = await api.post('/accounts/login/', { username, password })
      setToken('access_token', data.access)
      setToken('refresh_token', data.refresh)
      set({ isAuthenticated: true })

      const { data: user } = await api.get('/accounts/me/')
      set({ user, isLoading: false })
    } catch (error) {
      set({ isLoading: false })
      throw error
    }
  },

  logout: () => {
    removeToken('access_token')
    removeToken('refresh_token')
    set({ user: null, isAuthenticated: false, isLoading: false })
    window.location.href = '/login'
  },

  fetchUser: async () => {
    const token = getToken('access_token')
    if (!token) {
      set({ isLoading: false })
      return
    }

    set({ isLoading: true })
    try {
      const { data } = await api.get('/accounts/me/')
      set({ user: data, isAuthenticated: true, isLoading: false })
    } catch {
      set({ isLoading: false })
    }
  },
}))