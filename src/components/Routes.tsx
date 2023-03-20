import { useQuery } from '@tanstack/react-query';
import { getUserRoutes } from '../api/firebaseTest';
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
  const { isLoading, error, data: routes } = useQuery(['routes', user.uid], () => getUserRoutes(user.uid), { enabled: !!user });

  return (
    <section className='mt-2'>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error</p>}
      <ul>{routes && routes.map((route: RouteType) => <RouteCard key={route.id} route={route} />)}</ul>
    </section>
  );
}
