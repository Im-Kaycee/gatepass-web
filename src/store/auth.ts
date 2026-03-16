import { create } from 'zustand'
import { User } from '@/types'
import api from '@/lib/axios'

interface AuthState {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
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
      localStorage.setItem('access_token', data.access)
      localStorage.setItem('refresh_token', data.refresh)
      set({ isAuthenticated: true })
      
      // Fetch user profile after login
      const { data: user } = await api.get('/accounts/me/')
      set({ user, isLoading: false })
    } catch (error) {
      set({ isLoading: false })
      throw error
    }
  },

  logout: () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    set({ user: null, isAuthenticated: false })
    window.location.href = '/login'
  },

  fetchUser: async () => {
  const token = localStorage.getItem('access_token')
  if (!token) {
    set({ isLoading: false })  // ← must set false even when no token
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