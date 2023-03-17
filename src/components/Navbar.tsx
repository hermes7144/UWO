import { Link } from 'react-router-dom';
import { BsFillPencilFill } from 'react-icons/bs';
import User from './User';
import Button from './ui/Button';
import { useAuthContext } from './context/AuthContext';
import { login, logout } from '../api/firebase';

export default function Navbar() {
  const { user } = useAuthContext();

  return (
    <header className='flex justify-between border-b border-gray-300 p-2'>
      <Link to='/' className='flex items-center text-4xl text-brand'>
        <h1>UWOInsight</h1>
      </Link>
      <nav className='flex items-center gap-4 font-semibold'>
        {user?.isAdmin && (
          <Link to='/items/new'>
            <BsFillPencilFill />
          </Link>
        )}

        {user && <User user={user} />}
        {!user && <Button text={'Login'} onClick={login}></Button>}
        {user && <Button text={'Logout'} onClick={logout}></Button>}
      </nav>
    </header>
  );
}
