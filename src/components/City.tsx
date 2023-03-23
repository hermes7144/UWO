import React, { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { BsFillTrashFill } from 'react-icons/bs';
import { useInfoContext } from '../context/InfoContext';
import { useCoordinatesContext } from '../context/CoordinatesContext';

type CityProps = {
  city: number;
  nextCity: number;
  index: number;
  cityNm: string;
  isEditable?: boolean;
  coordinates: [number, number];
  onDelete: (index: number) => void;
};

export default function City({ city, nextCity, index, cityNm, coordinates, isEditable = true, onDelete }: CityProps) {
  const { getGoods } = useInfoContext();
  const { setCoordinates } = useCoordinatesContext();
  const { isLoading, data: goods } = useQuery(['goods', city], () => getGoods(city), { staleTime: Infinity });
  const { data: nextGoods } = useQuery(['goods', nextCity], () => getGoods(nextCity), { staleTime: Infinity, enabled: !!nextCity });

  const nextItems = nextGoods && nextGoods.map((nextgood) => nextgood.goods_nm);
  const handleDelete = () => onDelete(index);

  const handleClick = (coordinates) => {
    setCoordinates(coordinates);
  };

  useEffect(() => {
    index === 0 && setCoordinates(coordinates);
  }, []);

  return (
    <section>
      {isLoading && <p>Loading...</p>}
      <table className='border-solid border-2 my-2'>
        <tbody>
          <tr>
            <th className='border-solid border-2 w-6' rowSpan={2}>
              {index + 1}
            </th>
            <th rowSpan={2}>
              <div className='flex flex-col justify-center items-center w-24'>
                <button onClick={() => handleClick(coordinates)}>{cityNm}</button>

                {isEditable && <BsFillTrashFill className='cursor-pointer opacity-50 hover:opacity-100' onClick={handleDelete} />}
              </div>
            </th>
            {goods &&
              goods.map((good, index) => (
                <td key={index} className={'border-solid border-2 w-30 ' + (good.specialty ? 'bg-yellow-200' : '')}>
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
    </section>
  );
}
