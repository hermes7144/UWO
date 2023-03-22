import React, { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ComposableMap, Geographies, Geography, ZoomableGroup, Marker } from 'react-simple-maps';
import { getCitys } from '../api/firebase';
import { useCoordinatesContext } from '../context/CoordinatesContext';
const geoUrl = process.env.PUBLIC_URL + '/maps/land-50m.json';

type MapType = {
  citys: number[];
  isEditable?: boolean;
  onMarker?: (id: number) => void;
};

export default function Map({ citys, isEditable = true, onMarker }: MapType) {
  const { data: cityDatas } = useQuery(['citys'], getCitys);
  const { coordinates, setCoordinates } = useCoordinatesContext();

  useEffect(() => {
    setCoordinates(cityDatas && citys && citys.length > 0 ? cityDatas.filter((city) => city.city_id === citys[0])[0].city_coordinates : [12, 43]);
  }, [citys && citys[0]]);
  return (
    <>
      {cityDatas && (
        <ComposableMap projectionConfig={{ scale: 110 }} width={650} height={445} className='bg-blue-300'>
          <ZoomableGroup center={coordinates} zoom={7} minZoom={1}>
            <Geographies geography={geoUrl}>{({ geographies }) => geographies.map((geo) => <Geography key={geo.rsmKey} geography={geo} fill='#D0AE89' />)}</Geographies>
            {cityDatas.map(({ city_id, city_nm, city_coordinates, markerOffset }) => (
              <Marker className={!isEditable ? '' : 'cursor-pointer'} key={city_id} coordinates={city_coordinates} onClick={() => onMarker(city_id)}>
                <circle r={0.55} fill='#F00' />
                <text textAnchor='middle' x={-1} y={1} style={{ fontSize: 1, fontWeight: 'bold', fontFamily: 'system-ui' }}>
                  {citys && citys.indexOf(city_id) >= 0 && citys.indexOf(city_id) + 1}
                </text>
                <text textAnchor='middle' y={markerOffset ? markerOffset : 2} style={{ fontSize: 1, fontWeight: 'bold', fontFamily: 'system-ui', fill: citys && citys.includes(city_id) ? '#F00' : '#5D5A6D' }}>
                  {city_nm}
                </text>
              </Marker>
            ))}
          </ZoomableGroup>
        </ComposableMap>
      )}
    </>
  );
}
