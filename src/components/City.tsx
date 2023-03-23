import { useEffect } from 'react';
import { BsFillTrashFill } from 'react-icons/bs';
import { useCoordinatesContext } from '../context/CoordinatesContext';
import useCity from '../Hooks/useCity';

type CityProps = {
  citys: number[];
  index: number;
  cityNm: string;
  isEditable?: boolean;
  coordinates: [number, number];
  onDelete: (index: number) => void;
};

export default function City({ citys, index, cityNm, coordinates, isEditable = true, onDelete }: CityProps) {
  const { setCoordinates } = useCoordinatesContext();
  const {
    goodsQuery: { isLoading, data: goods },
  } = useCity(citys[index]);
  const {
    goodsQuery: { data: nextGoods },
  } = useCity(citys[index + 1]);

  const nextItems = nextGoods && nextGoods.map((nextgood) => nextgood.goods_nm);
  const handleDelete = () => onDelete(index);

  const handleClick = (coordinates) => setCoordinates(coordinates);
  useEffect(() => {
    index === 0 && setCoordinates(coordinates);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
