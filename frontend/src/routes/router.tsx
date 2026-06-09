import { createBrowserRouter, Navigate } from 'react-router-dom'
import { AuthLayout } from '../layouts/AuthLayout'
import { MerchantLayout } from '../layouts/MerchantLayout'
import { LoginPage } from '../pages/auth/LoginPage'
import { RegisterPage } from '../pages/auth/RegisterPage'
import { DashboardPage } from '../pages/dashboard/DashboardPage'
import { NotificationsPage } from '../pages/notifications/NotificationsPage'
import { OrdersPage } from '../pages/orders/OrdersPage'
import { PaymentsPage } from '../pages/payments/PaymentsPage'
import { BrowsePoolsPage } from '../pages/pools/BrowsePoolsPage'
import { JoinPoolPage } from '../pages/pools/JoinPoolPage'
import { PoolDetailsPage } from '../pages/pools/PoolDetailsPage'
import { ProfilePage } from '../pages/profile/ProfilePage'
import { ProtectedRoute } from './ProtectedRoute'

export const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      { path: '/login', element: <LoginPage /> },
      { path: '/register', element: <RegisterPage /> },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <MerchantLayout />,
        children: [
          { path: '/', element: <Navigate to="/dashboard" replace /> },
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
