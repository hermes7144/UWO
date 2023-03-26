import { useQuery } from '@tanstack/react-query';
import { getCitys as fetchCitys, getGoods } from '../api/firebase';

export default function useCity(id: number) {
  const markersQuery = useQuery(['citys'], fetchCitys, { staleTime: 1000 * 60 * 5 });
  const goodsQuery = useQuery(['goods', id], () => getGoods(id), { staleTime: 1000 * 60 * 5, enabled: !!id });

  return { markersQuery, goodsQuery };
}
