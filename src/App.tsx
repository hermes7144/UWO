import { Outlet } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthContextProvider } from './context/AuthContextProvider';
import Navbar from './components/Navbar';
import UWORouteContextProvider from './context/UWORouteContextProvider';
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <UWORouteContextProvider>
          <Navbar />
          <Outlet />
        </UWORouteContextProvider>
      </AuthContextProvider>
    </QueryClientProvider>
  );
}

export default App;

