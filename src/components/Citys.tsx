import React from 'react';
import City from './City';
import useCity from '../Hooks/useCity';

type CityType = {
  citys: number[];
  major_goods?: string;
  major_chk?: boolean;
  isEditable?: boolean;
  onDelete: (delIndex: number) => void;
};

export default function Citys({ citys, major_goods, major_chk, isEditable, onDelete }: CityType) {
  const {
    citysQuery: { data: cityDatas },
  } = useCity(null);

  return <div>{cityDatas && citys && citys.map((city, index) => <City key={index} citys={citys} major_goods={major_goods} major_chk={major_chk} cityNm={cityDatas[city - 1].city_nm} index={index} isEditable={isEditable} onDelete={onDelete} coordinates={cityDatas[city - 1].city_coordinates} />)}</div>;
}
