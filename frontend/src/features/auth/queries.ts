import { useQuery } from '@tanstack/react-query';
import * as authService from '@/services/authService';
import { authKeys } from '@/features/auth/queryKeys';

export function useCurrentUserQuery(enabled: boolean = true) {
  return useQuery({
    queryKey: authKeys.currentUser(),
    queryFn: () => authService.fetchCurrentUser(),
    enabled,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: false,
  });
}
