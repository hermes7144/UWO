import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { addOrUpdateRoute, removeRoute } from '../api/firebaseTest';
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

  const addOrUpdateItem: UseMutationResult<RouteType> = useMutation(({ route, citys }: RouteType) => addOrUpdateRoute(uid, route, citys), {
    onSuccess: () => {
      queryClient.invalidateQueries(['citys']);
      queryClient.invalidateQueries(['route', id]);
    },
  });

  const removeItem: UseMutationResult<RemoveType> = useMutation(({ id }: RemoveType) => removeRoute(id), {
    onSuccess: () => {
      queryClient.invalidateQueries(['routes']);
    },
  });

  return { addOrUpdateItem, removeItem };
}
