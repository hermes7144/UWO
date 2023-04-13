import { getCitys as fetchCitys, getGoods } from '../api/firebase';
import { useMutation, UseMutationResult, useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { addOrUpdateRoute, getRoutes, getRoute, removeRoute } from '../api/firebase';
import { useAuthContext } from '../context/AuthContext';

type RouteType = {
  id: string;
  title: string;
  description?: string;
  country: string;
  region: string;
  startMonth: number;
  endMonth: number;
  citys?: number[];
  major_chk: boolean;
  major_goods?: string;
};

export default function useRoute(city_id: number) {
  const { uid } = useAuthContext();
  const { id } = useParams();
  const queryClient = useQueryClient();

  const markersQuery = useQuery(['citys'], fetchCitys, { staleTime: 1000 * 60 * 5 });

  const goodsQuery = useQuery(['goods', city_id], () => getGoods(city_id), { staleTime: 1000 * 60 * 5, enabled: !!city_id });

  const routesQuery = useQuery(['routes'], getRoutes, { staleTime: 1000 * 60 });
  const routeQuery = useQuery(['route', id], () => getRoute(id), { enabled: !!id });

  const addOrUpdateItem: UseMutationResult<RouteType> = useMutation((route: RouteType) => addOrUpdateRoute(uid, route), {
    onSuccess: () => {
      queryClient.invalidateQueries(['routes']);
      queryClient.invalidateQueries(['route', id]);
    },
  });

  const removeItem: UseMutationResult<string> = useMutation((id: string) => removeRoute(id), {
    onSuccess: () => {
      queryClient.invalidateQueries(['routes']);
    },
  });

  return { markersQuery, goodsQuery, routesQuery, routeQuery, addOrUpdateItem, removeItem };
}
