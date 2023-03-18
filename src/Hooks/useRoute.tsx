import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { addOrUpdateRoute, removeRoute } from '../api/firebaseTest';
import { useAuthContext } from '../components/context/AuthContext';

export default function useRoute() {
  const { uid } = useAuthContext();
  const queryClient = useQueryClient();
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

  const addOrUpdateItem: UseMutationResult<RouteType> = useMutation(({ route, citys }) => addOrUpdateRoute(uid, route, citys), {
    onSuccess: () => {
      queryClient.invalidateQueries(['routes', uid]);
    },
  });

  const removeItem: UseMutationResult<RemoveType> = useMutation(({ id }) => removeRoute(uid, id), {
    onSuccess: () => {
      queryClient.invalidateQueries(['routes', uid]);
    },
  });

  return { addOrUpdateItem, removeItem };
}
