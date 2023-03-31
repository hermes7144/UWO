import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import { useAuthContext } from '../context/AuthContext';
import Routes from '../components/Routes';

export default function AllRoutes() {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/routes/new');
  };
  return (
    <div className='p-2'>
      {user && (
        <div className='flex justify-end font-semibold py-2'>
          <Button text={'New'} onClick={handleClick}></Button>
        </div>
      )}
      <Routes />
    </div>
  );
}
