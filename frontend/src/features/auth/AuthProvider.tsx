import { useMemo, useState, type PropsWithChildren } from 'react'
import * as authService from '../../services/authService'
import type { LoginCredentials, RegisterPayload, User } from '../../types/auth'
import { AuthContext } from './authContext'

export type AuthContextValue = {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  login: (credentials: LoginCredentials) => Promise<void>
  register: (payload: RegisterPayload) => Promise<void>
  logout: () => Promise<void>
}

const tokenKey = 'quantigo.auth_token'
const userKey = 'quantigo.auth_user'

export function AuthProvider({ children }: PropsWithChildren) {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem(tokenKey))
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem(userKey)
    return storedUser ? (JSON.parse(storedUser) as User) : null
  })

  const value = useMemo<AuthContextValue>(() => ({
    user,
    token,
    isAuthenticated: Boolean(token),
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
      await authService.logout()
      localStorage.removeItem(tokenKey)
      localStorage.removeItem(userKey)
      setToken(null)
      setUser(null)
    },
  }), [token, user])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
