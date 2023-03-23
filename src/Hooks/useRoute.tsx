import { useMutation, UseMutationResult, useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { addOrUpdateRoute, getRoutes, getRoute, removeRoute } from '../api/firebaseTest';
import { useAuthContext } from '../context/AuthContext';

export default function useRoute() {
  const { uid } = useAuthContext();
  const queryClient = useQueryClient();

  const { id } = useParams();

  type RouteType = {
    id?: string;
    route: {
      id: string;
      title: string;
      description?: string;
    };
    citys: number[];
  };

  type RemoveType = {
    id: string;
  };

  const routesQuery = useQuery(['routes'], getRoutes, { staleTime: 1000 * 60 });
  const routeQuery = useQuery(['route', id], () => getRoute(id), { enabled: !!id });

  const addOrUpdateItem: UseMutationResult<RouteType> = useMutation(({ route, citys }: RouteType) => addOrUpdateRoute(uid, route, citys), {
    onSuccess: () => {
      queryClient.invalidateQueries(['routes']);
      queryClient.invalidateQueries(['route', id]);
    },
  });

  const removeItem: UseMutationResult<RemoveType> = useMutation(({ id }: RemoveType) => removeRoute(id), {
    onSuccess: () => {
      queryClient.invalidateQueries(['routes']);
    },
  });

  return { routesQuery, routeQuery, addOrUpdateItem, removeItem };
}
