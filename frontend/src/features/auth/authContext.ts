import { createContext } from 'react'
import type { AuthContextValue } from '@/features/auth/AuthProvider'

export const AuthContext = createContext<AuthContextValue | null>(null)
