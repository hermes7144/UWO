import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter, Routes } from 'react-router-dom';
import UWORouteContextProvider from '../context/UWORouteContextProvider';
export function withRouter(routes, initialEntry = '/') {
  return <MemoryRouter initialEntry={[initialEntry]}>
    <Routes>{routes}</Routes>
  </MemoryRouter>
}

export function withAllContexts(children) {
  const testClient = createTestQueryClient();
  return (
    <QueryClientProvider client={testClient}>
      <UWORouteContextProvider>
        {children}
      </UWORouteContextProvider>
    </QueryClientProvider>
  )
}

function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
    logger: {
      log: console.log,
      warn: console.warn,
      error: () => {
      }
    }
  })
}