import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter, Routes } from 'react-router-dom';
import { InfoContext } from '../context/InfoContext';

export function withRouter(routes, initialEntry = '/') {
  return <MemoryRouter initialEntry={[initialEntry]}>
    <Routes>{routes}</Routes>
  </MemoryRouter>
}

export function withAllContexts(children, getGoods) {
  const testClient = createTestQueryClient();
  return (
    <QueryClientProvider client={testClient}>
      <InfoContext.Provider value={{ getGoods }}>
        {children}
      </InfoContext.Provider>
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