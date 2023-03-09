import { Outlet } from 'react-router-dom';
import { AuthContextProvider } from './components/context/AuthContextProvider';
import Navbar from './components/Navbar';

function App() {
  return (
    <AuthContextProvider>
      <Navbar />
      <Outlet />
    </AuthContextProvider>
  );
}

export default App;
