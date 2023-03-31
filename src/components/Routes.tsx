import { useNavigate } from 'react-router-dom';
import { useRouteHooksContext } from '../context/RouteHooksContext';
import { formatDate } from '../utils/date';
import RouteCard from './RouteCard';

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

export default function Routes() {
  const { useRoute } = useRouteHooksContext();
  const navigate = useNavigate();

  const {
    routesQuery: { isLoading, error, data: routes },
  } = useRoute();

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {error && <p>Something is wrong</p>}
      {routes && (
        <table className='min-w-full text-center text-sm font-light'>
          <colgroup>
            <col width={'5%'} />
            <col width={'5%'} />
            <col width={'5%'} />
            <col width={'75%'} />
            <col width={'6%'} />
          </colgroup>
          <thead className='border-b bg-neutral-50 font-medium dark:border-neutral-500 dark:text-neutral-800'>
            <tr>
              <th scope='col' className='px-6 py-4'>
                국가
              </th>
              <th scope='col' className='px-6 py-4'>
                지역
              </th>
              <th scope='col' className='px-6 py-4'>
                기간
              </th>
              <th scope='col' className='px-6 py-4'>
                제목
              </th>
              <th scope='col' className='px-6 py-4'>
                작성일
              </th>
            </tr>
          </thead>
          {routes.map((route: RouteType) => (
            <tbody>
              <tr key={route.id} className='border-b dark:border-neutral-500'>
                <td className='whitespace-nowrap px-3 py-2'>{route.country}</td>
                <td className='whitespace-nowrap px-3 py-2'>{route.region}</td>
                <td className='whitespace-nowrap px-3 py-2'>
                  {route.startMonth} ~ {route.endMonth}
                </td>
                <td className='whitespace-nowrap overflow-hidden overflow-ellipsis px-6 py-4 text-left'>
                  <span
                    className='cursor-pointer hover:underline'
                    onClick={() => {
                      navigate(`/routes/${route.id}`);
                    }}>
                    {route.title}
                  </span>
                </td>
                <td className='whitespace-nowrap py-2'>{formatDate(route.createdAt)}</td>
              </tr>
            </tbody>
          ))}
        </table>
      )}
    </>
  );
}
