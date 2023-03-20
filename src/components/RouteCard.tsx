import React from 'react';
import useRoute from '../Hooks/useRoute';
import { useInfoContext } from './context/InfoContext';
import { BsFillTrashFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

type RouteType = {
  route: {
    id: string;
    title: string;
    remark: string;
    citys: number[];
  };
};

export default function RouteCard({ route }: RouteType) {
  const navigate = useNavigate();

  const { setCitys, setRoute } = useInfoContext();
  const { removeItem } = useRoute();

  const handleRoute = () => {
    navigate(`/routes/${route.id}`, { state: { route } });
    setCitys(route.citys);
    setRoute(route);
  };

  const handleDelete = () => {
    const id = route.id;
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
    <li className={'round-lg shadow-md overflow-hidden cursor-pointer p-2 m-1'} onClick={handleRoute}>
      <div className='mt-2 px-2 flex flex-row items-center justify-between'>
        <h3>{route.title}</h3>
        <BsFillTrashFill className='cursor-pointer opacity-50 hover:opacity-100' onClick={handleDelete} />
      </div>
    </li>
  );
}
