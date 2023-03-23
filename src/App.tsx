import { Outlet } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthContextProvider } from './context/AuthContextProvider';
import Navbar from './components/Navbar';
import { CoordinatesContextProvider } from './context/CoordintatesContextProvider';
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <Navbar />
        <CoordinatesContextProvider>
          <Outlet />
        </CoordinatesContextProvider>
      </AuthContextProvider>
    </QueryClientProvider>
  );
}

export default App;
