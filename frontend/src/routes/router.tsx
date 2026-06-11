import { createBrowserRouter } from 'react-router-dom'
import { AuthLayout } from '@/layouts/AuthLayout'
import { MerchantLayout } from '@/layouts/MerchantLayout'
import { LoginPage } from '@/pages/auth/LoginPage'
import { RegisterPage } from '@/pages/auth/RegisterPage'
import { ForgotPasswordPage } from '@/pages/auth/ForgotPasswordPage'
import { ResetPasswordPage } from '@/pages/auth/ResetPasswordPage'
import { VerifyEmailPage } from '@/pages/auth/VerifyEmailPage'
import { DashboardPage } from '@/pages/dashboard/DashboardPage'
import { NotificationsPage } from '@/pages/notifications/NotificationsPage'
import { OrdersPage } from '@/pages/orders/OrdersPage'
import { OrderDetailsPage } from '@/pages/orders/OrderDetailsPage'
import { PaymentsPage } from '@/pages/payments/PaymentsPage'
import { BrowsePoolsPage } from '@/pages/pools/BrowsePoolsPage'
import { JoinPoolPage } from '@/pages/pools/JoinPoolPage'
import { PoolDetailsPage } from '@/pages/pools/PoolDetailsPage'
import { ProfilePage } from '@/pages/profile/ProfilePage'
import { LandingPage } from '@/pages/marketing/LandingPage'
import { ProtectedRoute } from '@/routes/ProtectedRoute'
import { RootErrorPage } from '@/pages/errors/RootErrorPage'
import { NotFoundPage } from '@/pages/errors/NotFoundPage'

// In dev: let Vite's native overlay show full stack traces.
// In production/staging: show the polished custom error page.
const errorElement = import.meta.env.DEV ? undefined : <RootErrorPage />;

export const router = createBrowserRouter([
  // Public marketing page
  {
    path: '/',
    element: <LandingPage />,
    errorElement,
  },
  // Auth pages
  {
    element: <AuthLayout />,
    children: [
      { path: '/login', element: <LoginPage /> },
      { path: '/register', element: <RegisterPage /> },
      { path: '/forgot-password', element: <ForgotPasswordPage /> },
      { path: '/reset-password', element: <ResetPasswordPage /> },
      { path: '/verify-email', element: <VerifyEmailPage /> },
    ],
  },
  // Protected merchant app
  {
    element: <ProtectedRoute />,
    errorElement,
    children: [
      {
        element: <MerchantLayout />,
        children: [
          { path: '/dashboard', element: <DashboardPage /> },
          { path: '/pools', element: <BrowsePoolsPage /> },
          { path: '/pools/:poolId', element: <PoolDetailsPage /> },
          { path: '/pools/:poolId/join', element: <JoinPoolPage /> },
          { path: '/orders', element: <OrdersPage /> },
          { path: '/orders/:orderId', element: <OrderDetailsPage /> },
          { path: '/payments', element: <PaymentsPage /> },
          { path: '/notifications', element: <NotificationsPage /> },
          { path: '/profile', element: <ProfilePage /> },
        ],
      },
    ],
  },
  // Catch all 404
  { path: '*', element: <NotFoundPage /> },
])
