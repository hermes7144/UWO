import React from 'react';
import Map from '../components/Map';
import RouteDetail from './RouteDetail';

export default function RouteDetailWrapper() {
  return (
    <div className='flex flex-col sm:flex-row p-2'>
      <div className='basis-4/6'>
        <Map />
      </div>
      <div className='basis-2/6 flex flex-col'>
        <RouteDetail />
      </div>
    </div>
  );
}
