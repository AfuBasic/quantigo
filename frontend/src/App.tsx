import { QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider } from 'react-router-dom'
import { Toaster } from 'sonner'
import { AuthProvider } from '@/features/auth/AuthProvider'
import { LanguageProvider } from '@/contexts/LanguageContext'
import { router } from '@/routes/router'
import { queryClient } from '@/services/queryClient'

function App() {
  return (
      <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <AuthProvider>
          <RouterProvider router={router} />
          <Toaster
            position="top-right"
            expand
            richColors
            closeButton
            toastOptions={{
              style: { borderRadius: '16px', fontFamily: 'inherit' },
              duration: 5000,
            }}
          />
        </AuthProvider>
      </LanguageProvider>
    </QueryClientProvider>
  )
}

export default App
