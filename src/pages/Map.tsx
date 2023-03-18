import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { ComposableMap, Geographies, Geography, ZoomableGroup, Marker } from 'react-simple-maps';
import { getCitys } from '../api/firebase';
import City from '../components/City';
import { useAuthContext } from '../components/context/AuthContext';
import Routes from '../components/Routes';
import Button from '../components/ui/Button';
import useRoute from '../Hooks/useRoute';
const geoUrl = process.env.PUBLIC_URL + '/maps/land-50m.json';

export default function Map() {
  const [citys, setCitys] = useState<number[]>([]);
  const { user } = useAuthContext();

  const { addOrUpdateItem } = useRoute();

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
  const handleReset = () => setCitys([]);

  const handleInsert = () => {
    const routeNm = prompt('교역 루트명 입력해주세요.');
    addOrUpdateItem.mutate({ routeNm, citys });
    setCitys([]);
  };
  return (
    <div className='flex'>
      <div className='basis-4/6'>
        <ComposableMap projectionConfig={{ scale: 110 }} width={650} height={500}>
          <ZoomableGroup center={[15, 40]} zoom={7}>
            <Geographies geography={geoUrl}>{({ geographies }) => geographies.map((geo) => <Geography key={geo.rsmKey} geography={geo} fill='#D0AE89' />)}</Geographies>
            {cityDatas &&
              cityDatas.map(({ city_id, city_nm, city_coordinates, markerOffset }) => (
                <Marker className='cursor-pointer' key={city_id} coordinates={city_coordinates} onClick={() => handleMarkerClick(city_id)}>
                  <circle r={0.55} fill='#F00' />
                  <text textAnchor='middle' y={markerOffset ? markerOffset : 2} style={{ fontSize: 1, fontWeight: 'bold', fontFamily: 'system-ui', fill: citys.includes(city_id) ? '#F00' : '#5D5A6D' }}>
                    {city_nm}
                  </text>
                </Marker>
              ))}
          </ZoomableGroup>
        </ComposableMap>
      </div>
      <div className='m-2 basis-2/6'>
        {user && <Routes />}
        <div className='flex justify-between mt-2'>
          <Button text={'Reset'} onClick={handleReset}></Button>
          <Button text={'Save'} onClick={handleInsert}></Button>
        </div>
        {citys.map((city, index) => (
          <City key={index} city={city} cityNm={cityDatas[city - 1].city_nm} nextCity={citys[index + 1]} index={index} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
}
