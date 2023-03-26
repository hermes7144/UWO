import { BsFillTrashFill } from 'react-icons/bs';
import { useRouteHooksContext } from '../context/RouteHooksContext';
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

type MarkerType = {
  city_id: number;
  city_nm: string;
  city_coordinates: [number, number];
};

type CityType = {
  index: number;
  route: RouteType;
  city: MarkerType;
};

export default function City({ route, index, city }: CityType) {
  const { useCity } = useRouteHooksContext();
  console.log(useCity);

  const { citys, setCitys, setCoordinates, editable } = useUWORouteContext();

  const {
    goodsQuery: { isLoading, data: goods },
  } = useCity(citys[index]);
  const {
    goodsQuery: { data: nextGoods },
  } = useCity(citys[index + 1]);

  const nextItems = nextGoods && nextGoods.map((nextgood) => nextgood.goods_nm);

  const handleDelete = (delIndex: number): void => setCitys(citys.filter((city, index) => index !== delIndex));
  const handleClick = (coordinates) => setCoordinates(coordinates);

  const isShow = !route || (route && !route.major_chk);

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
                <button onClick={() => handleClick(city.city_coordinates)}>{city.city_nm}</button>
                {editable && <BsFillTrashFill className='cursor-pointer opacity-50 hover:opacity-100' onClick={() => handleDelete(index)} />}
              </div>
            </th>
            {goods &&
              goods
                .filter((good) => editable || isShow || (route.major_chk && route.major_goods.includes(good.goods_nm)))
                .map((good, index) => (
                  <td key={index} className={'border-solid border-2 w-30 ' + (good.specialty ? 'bg-yellow-200' : '')}>
                    <img className='m-auto' src={good.goods_url} alt='' />
                  </td>
                ))}
          </tr>
          <tr>
            {goods &&
              goods
                .filter((good) => editable || isShow || (route.major_chk && route.major_goods.includes(good.goods_nm)))
                .map((good, index) => (
                  <td key={index} className='border-solid border-2 text-center text-xs'>
                    <span className={isShow && nextItems && nextItems.includes(good.goods_nm) ? 'text-red-600' : ''}>{good.goods_nm}</span>
                  </td>
                ))}
          </tr>
        </tbody>
      </table>
    </section>
  );
}
