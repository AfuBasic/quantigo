import { useMemo, useState, useEffect, type PropsWithChildren } from 'react'
import * as authService from '@/services/authService'
import type { LoginCredentials, RegisterPayload, User } from '@/types/auth'
import { AuthContext } from '@/features/auth/authContext'

export type AuthContextValue = {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (credentials: LoginCredentials) => Promise<void>
  register: (payload: RegisterPayload) => Promise<void>
  logout: () => Promise<void>
  submitKyb: (payload: any) => Promise<void>
}

const tokenKey = 'quantigo.auth_token'
const userKey = 'quantigo.auth_user'

export function AuthProvider({ children }: PropsWithChildren) {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem(tokenKey))
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem(userKey)
    return storedUser ? (JSON.parse(storedUser) as User) : null
  })
  const [isLoading, setIsLoading] = useState(() => Boolean(localStorage.getItem(tokenKey)))

  useEffect(() => {
    async function initAuth() {
      const storedToken = localStorage.getItem(tokenKey)
      if (storedToken) {
        try {
          const currentUser = await authService.fetchCurrentUser()
          setUser(currentUser)
          localStorage.setItem(userKey, JSON.stringify(currentUser))
        } catch (err) {
          // If token verification fails (e.g. 401), clear the auth state
          localStorage.removeItem(tokenKey)
          localStorage.removeItem(userKey)
          setToken(null)
          setUser(null)
        }
      }
      setIsLoading(false)
    }

    initAuth()
  }, [])

  const value = useMemo<AuthContextValue>(() => ({
    user,
    token,
    isAuthenticated: Boolean(token),
    isLoading,
    async login(credentials) {
      const response = await authService.login(credentials)
      localStorage.setItem(tokenKey, response.token)
      localStorage.setItem(userKey, JSON.stringify(response.user))
      setToken(response.token)
      setUser(response.user)
    },
    async register(payload) {
      const response = await authService.register(payload)
      localStorage.setItem(tokenKey, response.token)
      localStorage.setItem(userKey, JSON.stringify(response.user))
      setToken(response.token)
      setUser(response.user)
    },
    async logout() {
      try {
        await authService.logout()
      } catch (err) {
        // Continue clearing local storage even if backend fails
      }
      localStorage.removeItem(tokenKey)
      localStorage.removeItem(userKey)
      setToken(null)
      setUser(null)
    },
    async submitKyb(payload) {
      const response = await authService.submitKyb(payload)
      localStorage.setItem(userKey, JSON.stringify(response.user))
      setUser(response.user)
    },
  }), [token, user, isLoading])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
