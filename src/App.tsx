import { Outlet } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthContextProvider } from './context/AuthContextProvider';
import Navbar from './components/Navbar';
import { InfoContextProvider } from './context/InfoContextProvider';
import { CoordinatesContextProvider } from './context/CoordintatesContextProvider';
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <Navbar />
        <InfoContextProvider>
          <CoordinatesContextProvider>
            <Outlet />
          </CoordinatesContextProvider>
        </InfoContextProvider>
      </AuthContextProvider>
    </QueryClientProvider>
  );
}

export default App;
