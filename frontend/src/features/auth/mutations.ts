import { useMutation, useQueryClient } from '@tanstack/react-query';
import * as authService from '@/services/authService';
import type { LoginCredentials, RegisterPayload, ResetPasswordPayload } from '@/types/auth';
import { authKeys } from '@/features/auth/queryKeys';

export function useLoginMutation() {
  return useMutation({
    mutationFn: (credentials: LoginCredentials) => authService.login(credentials),
  });
}

export function useRegisterMutation() {
  return useMutation({
    mutationFn: (payload: RegisterPayload) => authService.register(payload),
  });
}

export function useLogoutMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => authService.logout(),
    onSettled: () => {
      queryClient.clear();
    },
  });
}

export function useForgotPasswordMutation() {
  return useMutation({
    mutationFn: (email: string) => authService.forgotPassword(email),
  });
}

export function useResetPasswordMutation() {
  return useMutation({
    mutationFn: (payload: ResetPasswordPayload) => authService.resetPassword(payload),
  });
}

export function useResendVerificationEmailMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => authService.resendVerificationEmail(),
    onSuccess: () => {
      // Optimistically refetch the current user so email_verified_at is updated
      queryClient.invalidateQueries({ queryKey: authKeys.currentUser() });
    },
  });
}

export function useSubmitKybMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: any) => authService.submitKyb(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: authKeys.currentUser() });
    },
  });
}
