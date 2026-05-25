// src/main.tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import 'lenis/dist/lenis.css'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { registerSW } from 'virtual:pwa-register'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: true,
      retry: 2,
    },
  },
})

// Advanced PWA registration with update detection
registerSW({
  onNeedRefresh() {
    console.log('New content available, user will be prompted to refresh.');
    window.dispatchEvent(new CustomEvent('pwa-update-available'));
  },
  onOfflineReady() {
    console.log('App ready to work offline.');
  },
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
)
