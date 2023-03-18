import React from 'react';
type RouteType = {
  route: {
    id: string;
    routeNm: string;
    city: number[];
  };
};

export default function RouteCard({ route }: RouteType) {
  const handleRoute = (route) => {};

  return (
    <li className='round-lg shadow-md overflow-hidden cursor-pointer' onClick={() => handleRoute(route)}>
      <div className='mt-2 px-2'>
        <h3>{route.routeNm}</h3>
      </div>
    </li>
  );
}
