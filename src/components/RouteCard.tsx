import React from 'react';
import { useNavigate } from 'react-router-dom';

type RouteType = {
  route: {
    id: string;
    title: string;
    description: string;
    citys: number[];
  };
};

export default function RouteCard({ route }: RouteType) {
  const navigate = useNavigate();

  return (
    <li
      className='round-lg shadow-lg overflow-hidden cursor-pointer hover:scale-105'
      onClick={() => {
        navigate(`/routes/${route.id}`);
      }}>
      <div className='mt-1 px-1 text-xl overflow-hidden overflow-ellipsis whitespace-nowrap'>
        <span>{route.title}</span>
      </div>
    </li>
  );
}
