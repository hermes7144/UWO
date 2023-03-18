import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { getRoutes } from '../api/firebaseTest';
import RouteCard from './RouteCard';
import { useAuthContext } from './context/AuthContext';

type RouteType = {
  id: string;
  title: string;
  remark: string;
  citys: number[];
};

export default function Routes() {
  const { user } = useAuthContext();
  const { isLoading, error, data: routes } = useQuery(['routes', user.uid], () => getRoutes(user.uid), { enabled: !!user });
  return (
    <>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error</p>}
      등록한 무역 루트
      <ul>{routes && routes.map((route: RouteType) => <RouteCard key={route.id} route={route} />)}</ul>
    </>
  );
}
