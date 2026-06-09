export type User = {
  id: number
  name: string
  email: string
}

export type AuthResponse = {
  user: User
  token: string
}

export type LoginCredentials = {
  email: string
  password: string
}

export type RegisterPayload = LoginCredentials & {
  name: string
}
