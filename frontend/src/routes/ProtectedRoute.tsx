import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from '@/hooks/useAuth';
import { Loader2 } from 'lucide-react';

export function ProtectedRoute() {
  const { isAuthenticated, isLoading, user } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-q-dark flex flex-col items-center justify-center text-white space-y-4">
        <Loader2 className="h-10 w-10 text-q-blue animate-spin" />
        <p className="text-xs text-white/50 font-bold uppercase tracking-widest animate-pulse">
          Initializing Command Center...
        </p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // Enforce complete onboarding (email verified & KYB approved) before accessing other pages
  const hasVerifiedEmail = user?.email_verified ?? false;
  const isKybApproved = user?.merchant_profile?.verification_status === "approved";

  if ((!hasVerifiedEmail || !isKybApproved) && location.pathname !== "/dashboard") {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}
