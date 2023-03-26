import { Outlet } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthContextProvider } from './context/AuthContextProvider';
import Navbar from './components/Navbar';
import UWORouteProvider from './context/UWORouteProvider';
import RouteHooksProvider from './context/RouteHooksProvider';
const queryClient = new QueryClient();

function App() {
  return (
    <AuthContextProvider>
      <RouteHooksProvider>
        <UWORouteProvider>
          <QueryClientProvider client={queryClient}>
            <Navbar />
            <Outlet />
          </QueryClientProvider>
        </UWORouteProvider>
      </RouteHooksProvider>
    </AuthContextProvider>
  );
}

export default App;

