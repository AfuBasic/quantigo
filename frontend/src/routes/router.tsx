import { createBrowserRouter } from 'react-router-dom'
import { AuthLayout } from '@/layouts/AuthLayout'
import { MerchantLayout } from '@/layouts/MerchantLayout'
import { LoginPage } from '@/pages/auth/LoginPage'
import { RegisterPage } from '@/pages/auth/RegisterPage'
import { DashboardPage } from '@/pages/dashboard/DashboardPage'
import { NotificationsPage } from '@/pages/notifications/NotificationsPage'
import { OrdersPage } from '@/pages/orders/OrdersPage'
import { PaymentsPage } from '@/pages/payments/PaymentsPage'
import { BrowsePoolsPage } from '@/pages/pools/BrowsePoolsPage'
import { JoinPoolPage } from '@/pages/pools/JoinPoolPage'
import { PoolDetailsPage } from '@/pages/pools/PoolDetailsPage'
import { ProfilePage } from '@/pages/profile/ProfilePage'
import { LandingPage } from '@/pages/marketing/LandingPage'
import { ProtectedRoute } from '@/routes/ProtectedRoute'

export const router = createBrowserRouter([
  // Public marketing page
  {
    path: '/',
    element: <LandingPage />,
  },
  // Auth pages
  {
    element: <AuthLayout />,
    children: [
      { path: '/login', element: <LoginPage /> },
      { path: '/register', element: <RegisterPage /> },
    ],
  },
  // Protected merchant app
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <MerchantLayout />,
        children: [
          { path: '/dashboard', element: <DashboardPage /> },
          { path: '/pools', element: <BrowsePoolsPage /> },
          { path: '/pools/:poolId', element: <PoolDetailsPage /> },
          { path: '/pools/:poolId/join', element: <JoinPoolPage /> },
          { path: '/orders', element: <OrdersPage /> },
          { path: '/payments', element: <PaymentsPage /> },
          { path: '/notifications', element: <NotificationsPage /> },
          { path: '/profile', element: <ProfilePage /> },
        ],
      },
    ],
  },
])
