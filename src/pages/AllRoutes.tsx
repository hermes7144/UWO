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
    <>
      {user && (
        <div className='flex justify-end m-1 font-semibold'>
          <Button text={'신규 경로'} onClick={handleClick}></Button>
        </div>
      )}
      <Routes />
    </>
  );
}
