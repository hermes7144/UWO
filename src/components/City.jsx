import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getGoods } from '../api/firebase';

export default function City(city) {
  const { data: goods } = useQuery(['goods', city.city], () => getGoods(city.city), { staleTime: Infinity, enabled: !!city.city });
  const { data: nextGoods } = useQuery(['goods', city.nextCity], () => getGoods(city.nextCity), { staleTime: Infinity, enabled: !!city.nextCity });

  const nextItems = nextGoods && nextGoods.map((nextgood) => nextgood.goods_nm);

  return (
    <table>
      <tbody>
        <tr>
          <th>{city.city}</th>

          {goods &&
            goods.map((good, index) => (
              <td key={index} className={nextItems && nextItems.includes(good.goods_nm) ? 'text-red-600' : ''}>
                {good.goods_nm}
              </td>
            ))}
        </tr>
      </tbody>
    </table>
  );
}
