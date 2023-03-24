import { Link } from 'react-router-dom';
import User from './User';
import Button from './ui/Button';
import { useAuthContext } from '../context/AuthContext';

export default function Navbar() {
  const { user, login, logout } = useAuthContext();

  return (
    <header className='flex justify-between border-b border-gray-300 p-2'>
      <Link to='/' className='flex items-center text-2xl text-brand'>
        <h1>UW TOOL</h1>
      </Link>
      <nav className='flex items-center gap-4 font-semibold'>
        <Link to='/routes'>
          <h2>무역 루트</h2>
        </Link>

        {user && <User user={user} />}
        {!user && <Button text={'Login'} onClick={login}></Button>}
        {user && <Button text={'Logout'} onClick={logout}></Button>}
      </nav>
    </header>
  );
}
