import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import { Provider } from 'react-redux'
import './App.css'
import { router } from './routes/route.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import store from './redux/store.ts'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5*60*1000
    }
  }
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </Provider>
  </StrictMode>,
)
