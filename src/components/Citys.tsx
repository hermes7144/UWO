import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getCitys } from '../api/firebase';
import City from './City';

type CityType = {
  citys: number[];
  isEditable?: boolean;
  onDelete: (delIndex: number) => void;
};

export default function Citys({ citys, isEditable, onDelete }: CityType) {
  const { data: cityDatas } = useQuery(['citys'], getCitys);

  return <div>{cityDatas && citys && citys.map((city, index) => <City key={index} city={city} cityNm={cityDatas[city - 1].city_nm} nextCity={citys[index + 1]} index={index} isEditable={isEditable} onDelete={onDelete} />)}</div>;
}
