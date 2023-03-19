import React from 'react';
import useRoute from '../Hooks/useRoute';
import { useInfoContext } from './context/InfoContext';
import { BsFillTrashFill } from 'react-icons/bs';

type RouteType = {
  routeProps: {
    id: string;
    title: string;
    remark: string;
    citys: number[];
  };
};

export default function RouteCard({ routeProps }: RouteType) {
  const { setCitys, route, setRoute } = useInfoContext();
  const { removeItem } = useRoute();

  const handleRoute = () => {
    setCitys(routeProps.citys);
    setRoute(routeProps);
  };

  const handleDelete = () => {
    const id = routeProps.id;
    removeItem.mutate(
      { id },
      {
        onSuccess: () => {
          setRoute({ id: '', title: '', remark: '' });
          setCitys([]);
        },
      }
    );
  };

  return (
    <li className={'round-lg shadow-md overflow-hidden cursor-pointer p-2 m-1 ' + (routeProps.id === route.id ? 'bg-red-100' : '')} onClick={handleRoute}>
      <div className='mt-2 px-2 flex flex-row items-center justify-between'>
        <h3>{routeProps.title}</h3>
        <BsFillTrashFill className='cursor-pointer opacity-50 hover:opacity-100' onClick={handleDelete} />
      </div>
    </li>
  );
}
