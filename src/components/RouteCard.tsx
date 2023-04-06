import React from 'react';
import { useNavigate } from 'react-router-dom';
import { formatDate } from '../utils/date';

type RouteType = {
  route: {
    id: string;
    title: string;
    description: string;
    citys: number[];
    country: string;
    region: string;
    startMonth: number;
    endMonth: number;
    createdAt: number;
  };
};

export default function RouteCard({ route }: RouteType) {
  const navigate = useNavigate();

  return (
    <li
      className='round-lg shadow-lg overflow-hidden cursor-pointer hover:shadow-sm'
      onClick={() => {
        navigate(`/routes/${route.id}`);
      }}>
      <div className='px-1 text-xl overflow-hidden overflow-ellipsis whitespace-nowrap flex justify-between mx-2'>
        <div>
          <span>{route.country}</span>
          <span>{route.region}</span>
          <span className='pl-3'>{route.startMonth}</span>~<span>{route.endMonth}</span>
        </div>
        <span>{route.title}</span>
        <span>{formatDate(route.createdAt)}</span>
      </div>
    </li>
  );
}
