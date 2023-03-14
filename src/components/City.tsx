import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getGoods } from '../api/firebase';
import { BsFillTrashFill } from 'react-icons/bs';

type CityProps = {
  city: string;
  nextCity: string;
  index: number;
  onDelete: (index: number) => void;
};

export default function City({ city, nextCity, index, onDelete }: CityProps) {
  const { data: goods } = useQuery(['goods', city], () => getGoods(city), { staleTime: Infinity, enabled: !!city });
  const { data: nextGoods } = useQuery(['goods', nextCity], () => getGoods(nextCity), { staleTime: Infinity, enabled: !!nextCity });

  const nextItems = nextGoods && nextGoods.map((nextgood) => nextgood.goods_nm);

  const handleDelete = () => onDelete(index);

  return (
    <table className='border-solid border-2 mt-2'>
      <tbody>
        <tr>
          <th className='border-solid border-2 w-10' rowSpan={2}>
            {index + 1}
          </th>
          <th className='w-24' rowSpan={2}>
            {city}
          </th>
          {goods &&
            goods.map((good, index) => (
              <td key={index} className={'w-24 border-solid border-2 ' + (good.specialty ? 'bg-yellow-200' : '')}>
                <div>
                  <img className='m-auto' src={good.goods_url} alt='' />
                </div>
              </td>
            ))}
          <td rowSpan={2} className='w-10 '>
            <BsFillTrashFill className='m-auto cursor-pointer opacity-50 hover:opacity-100' onClick={handleDelete} />
          </td>
        </tr>
        <tr>
          {goods &&
            goods.map((good, index) => (
              <td key={index} className='border-solid border-2 text-center text-s'>
                <span className={nextItems && nextItems.includes(good.goods_nm) ? 'text-red-600' : ''}>{good.goods_nm}</span>
              </td>
            ))}
        </tr>
      </tbody>
    </table>
  );
}
