import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { getRoutes } from '../api/firebaseTest';
import RouteCard from '../components/RouteCard';

type RouteType = {
  id: string;
  title: string;
  remark: string;
  citys: number[];
};

export default function Routes() {
  const { isLoading, error, data: routes } = useQuery(['routes'], getRoutes);

  return (
    <section className='mt-2'>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error</p>}
      <ul>{routes && routes.map((route: RouteType) => <RouteCard key={route.id} routeProps={route} />)}</ul>
    </section>
  );
}
