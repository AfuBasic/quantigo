export type MerchantProfile = {
  business_name: string
  registration_type: 'sole_proprietorship' | 'limited_liability' | 'cooperative'
  registration_number: string
  business_address: string
  business_phone: string
  cac_certificate_path: string
  cac_status_report_path: string
  proof_of_address_path: string
  director_name: string
  director_phone: string
  director_bvn: string
  director_nin: string
  director_identity_path: string
  verification_status: 'unsubmitted' | 'pending' | 'approved' | 'rejected'
  verification_notes: string | null
}

export type User = {
  id: number
  name: string
  email: string
  email_verified: boolean
  merchant_profile: MerchantProfile | null
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

export type ResetPasswordPayload = {
  token: string
  email: string
  password: string
  password_confirmation: string
}

