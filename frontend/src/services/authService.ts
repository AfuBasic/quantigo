import { apiClient } from "@/api/client";
import type {
  AuthResponse,
  LoginCredentials,
  RegisterPayload,
  ResetPasswordPayload,
  User,
} from "@/types/auth";
import axios from "axios";

export async function login(
  credentials: LoginCredentials,
): Promise<AuthResponse> {
  const response = await apiClient.post<AuthResponse>("/auth/login", credentials);
  return response.data;
}

export async function register(
  payload: RegisterPayload,
): Promise<AuthResponse> {
  const response = await apiClient.post<AuthResponse>("/auth/register", payload);
  return response.data;
}

export async function logout(): Promise<void> {
  await apiClient.post("/auth/logout");
}

export async function fetchCurrentUser(): Promise<User> {
  const response = await apiClient.get<{ data?: User } & User>("/auth/me");
  return response.data.data ?? response.data;
}

export async function forgotPassword(email: string): Promise<void> {
  await apiClient.post("/auth/forgot-password", { email });
}

export async function resetPassword(
  payload: ResetPasswordPayload,
): Promise<void> {
  await apiClient.post("/auth/reset-password", payload);
}

/** Resend the verification email for the currently authenticated user. */
export async function resendVerificationEmail(): Promise<void> {
  await apiClient.post("/auth/email/verification-notification");
}

export async function verifyEmail(
  id: string,
  hash: string,
  expires?: string,
  signature?: string,
): Promise<void> {
  await apiClient.post("/auth/verify-email", {
    id,
    hash,
    expires,
    signature,
  });
}

export async function getUploadSignature(): Promise<{
  signature: string;
  timestamp: number;
  api_key: string;
  cloud_name: string;
  folder: string;
}> {
  const response = await apiClient.get("/auth/kyb/signature");
  return response.data;
}

export async function uploadFileDirectly(
  file: File,
  sig: {
    signature: string;
    timestamp: number;
    api_key: string;
    cloud_name: string;
    folder: string;
  }
): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("signature", sig.signature);
  formData.append("timestamp", sig.timestamp.toString());
  formData.append("api_key", sig.api_key);
  formData.append("folder", sig.folder);

  const url = `https://api.cloudinary.com/v1_1/${sig.cloud_name}/auto/upload`;
  const response = await axios.post<{ secure_url: string }>(url, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data.secure_url;
}

export async function checkAssetHash(hash: string): Promise<{ exists: boolean; url?: string }> {
  const response = await apiClient.post<{ exists: boolean; url?: string }>("/auth/kyb/check-hash", { hash });
  return response.data;
}

export async function registerAsset(payload: {
  file_hash: string;
  url: string;
  file_name?: string;
  file_size?: number;
  mime_type?: string;
}): Promise<void> {
  await apiClient.post("/auth/kyb/register-asset", payload);
}

export async function submitKyb(payload: any): Promise<{ user: User }> {
  const response = await apiClient.post<{ user: User }>("/auth/kyb", payload);
  return response.data;
}

export async function verifyBvn(bvn: string, directorName: string): Promise<{ status: string; name: string }> {
  const response = await apiClient.post<{ status: string; name: string }>("/auth/kyb/bvn-verify", { bvn, director_name: directorName });
  return response.data;
}
