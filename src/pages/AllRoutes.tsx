import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { getRoutes } from '../api/firebaseTest';
import RouteCard from '../components/RouteCard';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import { useInfoContext } from '../components/context/InfoContext';

type RouteType = {
  id: string;
  title: string;
  remark: string;
  citys: number[];
};

export default function AllRoutes() {
  const navigate = useNavigate();
  const { isLoading, error, data: routes } = useQuery(['routes'], getRoutes);
  const { setCitys, setRoute } = useInfoContext();

  const handleClick = () => {
    navigate('/routes/new');
    setCitys([]);
    setRoute({ id: '', title: '', remark: '' });
  };
  return (
    <section>
      <div className='flex justify-end m-2'>
        <Button text={'새 무역경로'} onClick={handleClick}></Button>
      </div>

      {isLoading && <p>Loading...</p>}
      {error && <p>Error</p>}
      <ul>{routes && routes.map((route: RouteType) => <RouteCard key={route.id} route={route} />)}</ul>
    </section>
  );
}
