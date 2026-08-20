import { createContext, useContext, useState, useCallback } from 'react'
import { authApi } from '../services/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('rag_token') || null)
  const [user,  setUser]  = useState(() => {
    try { return JSON.parse(localStorage.getItem('rag_user')) } catch { return null }
  })

  const persist = (data) => {
    localStorage.setItem('rag_token', data.token)
    localStorage.setItem('rag_user',  JSON.stringify(data.user))
    setToken(data.token)
    setUser(data.user)
  }

  const login = useCallback(async (email, password) => {
    const res = await authApi.login(email, password)
    persist(res.data)
    return res.data
  }, [])

  const register = useCallback(async (name, email, password) => {
    const res = await authApi.register(name, email, password)
    persist(res.data)
    return res.data
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem('rag_token')
    localStorage.removeItem('rag_user')
    setToken(null)
    setUser(null)
  }, [])

  return (
    <AuthContext.Provider value={{ token, user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
