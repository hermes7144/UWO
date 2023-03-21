import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getRoutes } from '../api/firebaseTest';
import RouteCard from '../components/RouteCard';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import { useAuthContext } from '../context/AuthContext';

type RouteType = {
  id: string;
  title: string;
  remark: string;
  citys: number[];
};

export default function AllRoutes() {
  const { isLoading, error, data: routes } = useQuery(['routes'], getRoutes);
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/routes/new');
  };
  return (
    <section>
      {user && (
        <div className='flex justify-end m-2'>
          <Button text={'새 무역경로'} onClick={handleClick}></Button>
        </div>
      )}
      {isLoading && <p>Loading...</p>}
      {error && <p>Error</p>}
      <ul>{routes && routes.map((route: RouteType) => <RouteCard key={route.id} route={route} />)}</ul>
    </section>
  );
}
