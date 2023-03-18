import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { getRoutes } from '../api/firebaseTest';
import RouteCard from './RouteCard';
import { useAuthContext } from './context/AuthContext';

type RouteType = {
  id: string;
  routeNm: string;
  city: number[];
};

export default function Routes() {
  const { user } = useAuthContext();
  const { isLoading, error, data: routes } = useQuery(['routes'], () => getRoutes(user.uid), { enabled: !!user });
  return (
    <ul className='grid grid-cols-1 md:grid-cols-2'>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error</p>}
      <ul>{routes && routes.map((route: RouteType) => <RouteCard key={route.id} route={route} />)}</ul>
    </ul>
  );
}
