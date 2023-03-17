import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { addOrUpdateRoute } from '../api/firebaseTest';
import { useAuthContext } from '../components/context/AuthContext';

export default function useRoute() {
  const { uid } = useAuthContext();
  const queryClient = useQueryClient();
  type RouteType = {
    routeNm: string;
    citys: number[];
  };

  const addOrUpdateItem: UseMutationResult<RouteType> = useMutation(({ routeNm, citys }) => addOrUpdateRoute(uid, routeNm, citys), {
    onSuccess: () => {
      queryClient.invalidateQueries(['routes', uid]);
    },
  });

  return { addOrUpdateItem };
}
