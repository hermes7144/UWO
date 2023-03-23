import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getCitys as fetchCitys, getGoods } from '../api/firebase';

export default function useCity(id: number) {
  const citysQuery = useQuery(['citys'], fetchCitys);
  const goodsQuery = useQuery(['goods', id], () => getGoods(id), { staleTime: Infinity, enabled: !!id });

  return { citysQuery, goodsQuery };
}
