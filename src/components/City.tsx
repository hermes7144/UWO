import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { BsFillTrashFill } from 'react-icons/bs';
import { useInfoContext } from './context/InfoContext';

type CityProps = {
  city: string;
  nextCity: string;
  index: number;
  onDelete: (index: number) => void;
};

export default function City({ city, nextCity, index, onDelete }: CityProps) {
  const { getGoods } = useInfoContext();

  const { isLoading, data: goods } = useQuery(['goods', city], () => getGoods(city), { staleTime: Infinity, enabled: !!city });
  const { data: nextGoods } = useQuery(['goods', nextCity], () => getGoods(nextCity), { staleTime: Infinity, enabled: !!nextCity });

  const nextItems = nextGoods && nextGoods.map((nextgood) => nextgood.goods_nm);

  const handleDelete = () => onDelete(index);

  return (
    <>
      {isLoading && <p>Loading...</p>}

      <table className='border-solid border-2 mt-2'>
        <tbody>
          <tr>
            <th className='border-solid border-2 w-6' rowSpan={2}>
              {index + 1}
            </th>
            <th rowSpan={2}>
              <div className='flex justify-center items-center w-24'>
                {city}
                <br />
                <BsFillTrashFill className='cursor-pointer opacity-50 hover:opacity-100' onClick={handleDelete} />
              </div>
            </th>
            {goods &&
              goods.map((good, index) => (
                <td key={index} className={'border-solid border-2 w-30' + (good.specialty ? 'bg-yellow-200' : '')}>
                  <img className='m-auto' src={good.goods_url} alt='' />
                </td>
              ))}
          </tr>
          <tr>
            {goods &&
              goods.map((good, index) => (
                <td key={index} className='border-solid border-2 text-center text-xs'>
                  <span className={nextItems && nextItems.includes(good.goods_nm) ? 'text-red-600' : ''}>{good.goods_nm}</span>
                </td>
              ))}
          </tr>
        </tbody>
      </table>
    </>
  );
}
