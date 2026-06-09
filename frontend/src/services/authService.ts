import { apiClient, sanctumClient } from '../api/client'
import type { AuthResponse, LoginCredentials, RegisterPayload, User } from '../types/auth'

export async function login(credentials: LoginCredentials): Promise<AuthResponse> {
  await sanctumClient.get('/sanctum/csrf-cookie')
  const { data } = await apiClient.post<AuthResponse>('/auth/login', credentials)
  return data
}

export async function register(payload: RegisterPayload): Promise<AuthResponse> {
  await sanctumClient.get('/sanctum/csrf-cookie')
  const { data } = await apiClient.post<AuthResponse>('/auth/register', payload)
  return data
}

export async function logout(): Promise<void> {
  await apiClient.post('/auth/logout')
}

export async function fetchCurrentUser(): Promise<User> {
  const { data } = await apiClient.get<{ data: User }>('/auth/me')
  return data.data
}
