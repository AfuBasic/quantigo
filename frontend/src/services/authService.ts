import type {
  AuthResponse,
  LoginCredentials,
  RegisterPayload,
  User,
} from "@/types/auth";

export async function login(
  credentials: LoginCredentials,
): Promise<AuthResponse> {
  // Return simulated auth response immediately to allow login with any credentials
  return {
    token: "simulated-auth-token-id",
    user: {
      id: 1,
      name: "Idris Afuwape",
      email: credentials.email,
    },
  };
}

export async function register(
  payload: RegisterPayload,
): Promise<AuthResponse> {
  // Return simulated auth response immediately to allow registration with any credentials
  return {
    token: "simulated-auth-token-id",
    user: {
      id: 1,
      name: payload.name,
      email: payload.email,
    },
  };
}

export async function logout(): Promise<void> {
  // Mock success logout
}

export async function fetchCurrentUser(): Promise<User> {
  return {
    id: 1,
    name: "Idris Afuwape",
    email: "idris@apexpharmacy.com",
  };
}
