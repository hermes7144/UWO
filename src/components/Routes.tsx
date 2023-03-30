import { useRouteHooksContext } from '../context/RouteHooksContext';
import RouteCard from './RouteCard';

type RouteType = {
  id: string;
  title: string;
  description: string;
  createdAt: number;
  citys: number[];
};

export default function Routes() {
  const { useRoute } = useRouteHooksContext();

  const {
    routesQuery: { isLoading, error, data: routes },
  } = useRoute();

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {error && <p>Something is wrong</p>}
      {routes && (
        <ul className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4'>
          {routes.map((route: RouteType) => (
            <RouteCard key={route.id} route={route} />
          ))}
        </ul>
      )}
    </>
  );
}
