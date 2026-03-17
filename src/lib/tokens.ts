export const getToken = (key: string): string | null => {
  if (typeof window === 'undefined') return null
  const raw = localStorage.getItem(key)
  if (!raw) return null
  try {
    return atob(raw)
  } catch {
    return null
  }
}

export const setToken = (key: string, value: string) => {
  if (typeof window === 'undefined') return
  localStorage.setItem(key, btoa(value))
}

export const removeToken = (key: string) => {
  if (typeof window === 'undefined') return
  localStorage.removeItem(key)
}