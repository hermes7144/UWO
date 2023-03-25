import React from 'react';
import City from './City';
import useCity from '../Hooks/useCity';
import { useUWORouteContext } from '../context/UWORouteContext';

type RouteType = {
  id?: string;
  user_id?: string;
  title?: string;
  description?: string;
  citys?: number[];
  major_goods?: string[];
  major_chk?: boolean;
};

type CityType = {
  route: RouteType;
};

export default function Citys({ route }: CityType) {
  const {
    markersQuery: { data: markers },
  } = useCity(null);

  const { citys } = useUWORouteContext();

  return <div>{markers && citys && citys.map((city, index) => <City key={index} route={route} city={markers[city - 1]} index={index} />)}</div>;
}
