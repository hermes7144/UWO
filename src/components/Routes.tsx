import { useNavigate } from 'react-router-dom';
import { useRouteHooksContext } from '../context/RouteHooksContext';
import { formatDate } from '../utils/date';

type RouteType = {
  id: string;
  title: string;
  description: string;
  createdAt: number;
  citys: number[];
  country: string;
  region: string;
  startMonth: number;
  endMonth: number;
};

// type RoutesType = {
//   country: string;
//   region: string;
//   month: string | number;
// };

type RoutesType = {
  filter: {
    region: string;
    country: string;
    month: string | number;
  };
};

export default function Routes({ filter }: RoutesType) {
  const { useRoute } = useRouteHooksContext();
  const navigate = useNavigate();

  const {
    routesQuery: { isLoading, error, data: routes },
  } = useRoute();

  const filteredRoutes =
    routes &&
    routes.filter((route) => {
      const isCommonMonth = filter.month === '전체';
      const isStartMonthBeforeEndMonth = Number(route.startMonth) < Number(route.endMonth);
      const isMonthInRange = isStartMonthBeforeEndMonth ? Number(filter.month) >= Number(route.startMonth) && Number(filter.month) <= Number(route.endMonth) : Number(filter.month) >= Number(route.startMonth) || Number(filter.month) <= Number(route.endMonth);

      const isMonthValid = isCommonMonth || isMonthInRange;

      const isCountryValid = filter.country === '공통' || route.country === filter.country;
      const isRegionValid = filter.region === '전체' || route.region === filter.region;

      return isMonthValid && isCountryValid && isRegionValid;
    });

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {error && <p>Something is wrong</p>}
      {routes && (
        <table className='min-w-full text-center text-sm font-light'>
          <colgroup>
            <col className='sm:w-1/12' />
            <col className='sm:w-1/12' />
            <col className='sm:w-1/12' />
            <col className='sm:w-7/12' />
            <col className='sm:w-1/12' />
            <col className='sm:w-1/12' />
          </colgroup>
          <thead className='border-b bg-neutral-50 font-medium dark:border-neutral-500 dark:text-neutral-800'>
            <tr>
              <th scope='col' className='px-1 py-4'>
                국가
              </th>
              <th scope='col' className='px-1 py-4'>
                지역
              </th>
              <th scope='col' className='px-1 py-4'>
                기간
              </th>
              <th scope='col' className='px-1 py-4'>
                제목
              </th>
              <th scope='col' className='px-1 py-4'>
                작성일
              </th>
              <th scope='col' className='px-1 py-4'>
                추천
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredRoutes &&
              filteredRoutes.map((route: RouteType) => (
                <tr key={route.id} className='border-b dark:border-neutral-500'>
                  <td className='px-1 py-1'>{route.country}</td>
                  <td className='px-1 py-1'>{route.region}</td>
                  <td className='px-1 py-1'>
                    {route.startMonth} ~ {route.endMonth}월
                  </td>
                  <td className='overflow-hidden px-2 py-1 text-left text-ellipsis whitespace-nowrap' style={{ maxWidth: '250px' }}>
                    <span
                      className='cursor-pointer hover:underline'
                      onClick={() => {
                        navigate(`/routes/${route.id}`);
                      }}>
                      {route.title}
                    </span>
                  </td>
                  <td className='px-2 py-2'>{formatDate(route.createdAt)}</td>
                  <td className='px-2 py-2'>0</td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </>
  );
}
