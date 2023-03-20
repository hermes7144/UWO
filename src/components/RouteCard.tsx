import React from 'react';
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

  const handleRoute = () => {
    navigate(`/routes/${route.id}`, { state: { route } });
  };

  return (
    <li className={'round-lg shadow-md overflow-hidden cursor-pointer p-2 m-1'} onClick={handleRoute}>
      <div className='mt-2 px-2 flex flex-row items-center justify-between'>
        <h3>{route.title}</h3>
      </div>
    </li>
  );
}
