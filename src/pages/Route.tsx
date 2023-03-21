import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ComposableMap, Geographies, Geography, ZoomableGroup, Marker } from 'react-simple-maps';
import { getCitys } from '../api/firebase';
import City from '../components/City';
import Button from '../components/ui/Button';
import { useLocation, useNavigate } from 'react-router-dom';
import useRoute from '../Hooks/useRoute';
import { useAuthContext } from '../context/AuthContext';

const geoUrl = process.env.PUBLIC_URL + '/maps/land-50m.json';

export default function Route() {
  const [citys, setCitys] = useState<number[]>([]);
  const { uid } = useAuthContext();
  const { state } = useLocation();
  const { removeItem } = useRoute();
  const navigate = useNavigate();

  useEffect(() => {
    if (state && state.route.citys) {
      setCitys(state.route.citys);
    }
  }, [state, setCitys]);

  const { data: cityDatas } = useQuery(['citys'], getCitys);

  const handleUpdate = () => {
    navigate(`/routes/update/${state.route.id}`, { state: state });
  };

  const handleDelete = () => {
    if (!window.confirm('삭제하시겠습니까?')) return false;

    const id = state.route.id;
    removeItem.mutate(
      { id },
      {
        onSuccess: () => {
          navigate('/routes');
        },
      }
    );
  };
  return (
    <div className='flex flex-col md:flex-row'>
      <div className='basis-4/6'>
        <ComposableMap projectionConfig={{ scale: 110 }} width={650} height={445} className='bg-blue-300'>
          <ZoomableGroup center={[15, 40]} zoom={7} minZoom={1}>
            <Geographies geography={geoUrl}>{({ geographies }) => geographies.map((geo) => <Geography key={geo.rsmKey} geography={geo} fill='#D0AE89' />)}</Geographies>
            {cityDatas &&
              cityDatas.map(({ city_id, city_nm, city_coordinates, markerOffset }) => (
                <Marker key={city_id} coordinates={city_coordinates}>
                  <circle r={0.55} fill='#F00' />
                  <text textAnchor='middle' y={markerOffset ? markerOffset : 2} style={{ fontSize: 1, fontWeight: 'bold', fontFamily: 'system-ui', fill: citys && citys.includes(city_id) ? '#F00' : '#5D5A6D' }}>
                    {city_nm}
                  </text>
                </Marker>
              ))}
          </ZoomableGroup>
        </ComposableMap>
      </div>
      <div className='w-full basis-2/6 flex flex-col p-4'>
        {state && state.route.user_id === uid && (
          <div className='flex justify-end'>
            <Button text={'수정'} onClick={handleUpdate} />
            <Button text={'삭제'} onClick={handleDelete} />
          </div>
        )}
        <p>{state.route.title}</p>
        <textarea>{state.route.remark}</textarea>

        {cityDatas && citys && citys.map((city, index) => <City key={index} city={city} cityNm={cityDatas[city - 1].city_nm} nextCity={citys[index + 1]} index={index} onDelete={() => false} />)}
      </div>
    </div>
  );
}
