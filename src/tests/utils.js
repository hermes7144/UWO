import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter, Routes } from 'react-router-dom';
import { RouteHooksContext } from '../context/RouteHooksContext';
import UWORouteProvider from '../context/UWORouteProvider';

export function withRouter(routes, initialEntry = '/') {
  return <MemoryRouter initialEntry={[initialEntry]}>
    <Routes>{routes}</Routes>
  </MemoryRouter>
}

export function withAllContexts(children, useRoute) {
  const testClient = createTestQueryClient();
  return (
    <RouteHooksContext.Provider value={{ useRoute }}>
      <UWORouteProvider>
        <QueryClientProvider client={testClient}>{children}</QueryClientProvider>
      </UWORouteProvider>
    </RouteHooksContext.Provider>

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