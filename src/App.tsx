import { Outlet } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthContextProvider } from './components/context/AuthContextProvider';
import Navbar from './components/Navbar';
import { InfoContextProvider } from './components/context/InfoContextProvider';
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <Navbar />
        <InfoContextProvider>
          <Outlet />
        </InfoContextProvider>
      </AuthContextProvider>
    </QueryClientProvider>
  );
}

export default App;
