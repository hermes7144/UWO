import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ComposableMap, Geographies, Geography, ZoomableGroup, Marker } from 'react-simple-maps';
import { getCitys } from '../api/firebase';
import City from '../components/City';
import RouteForm from '../components/RouteForm';
import Button from '../components/ui/Button';
import { useLocation, useNavigate } from 'react-router-dom';
import useRoute from '../Hooks/useRoute';
import { useAuthContext } from '../context/AuthContext';

const geoUrl = process.env.PUBLIC_URL + '/maps/land-50m.json';

export default function Map() {
  const [citys, setCitys] = useState<number[]>([]);
  const { removeItem } = useRoute();
  const navigate = useNavigate();

  const { uid } = useAuthContext();

  const { state } = useLocation();

  useEffect(() => {
    if (state && state.route.citys) {
      setCitys(state.route.citys);
    }
  }, [state, setCitys]);

  function handleMarkerClick(id: number) {
    if (citys[citys.length - 1] !== id) {
      // 클릭한 값이 마지막 값과 다르면 배열에 추가
      setCitys([...citys, id]);
    } else {
      // 클릭한 값이 마지막 값과 같으면 배열에서 제거
      setCitys(citys.slice(0, citys.length - 1));
    }
  }

  const { data: cityDatas } = useQuery(['citys'], getCitys);
  const handleDelete = (delIndex: number): void => setCitys(citys.filter((city, index) => index !== delIndex));

  const handleDelete2 = () => {
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
                <Marker className='cursor-pointer' key={city_id} coordinates={city_coordinates} onClick={() => handleMarkerClick(city_id)}>
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
        <h2>무역 루트</h2>

        {state && state.route.user_id === uid && <Button text={'삭제'} onClick={handleDelete2} />}
        {cityDatas && citys && citys.map((city, index) => <City key={index} city={city} cityNm={cityDatas[city - 1].city_nm} nextCity={citys[index + 1]} index={index} onDelete={handleDelete} />)}
        <RouteForm citys={citys} />
      </div>
    </div>
  );
}
