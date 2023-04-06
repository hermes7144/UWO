import React, { useEffect } from 'react';
import { ComposableMap, Geographies, Geography, ZoomableGroup, Marker } from 'react-simple-maps';
import { useRouteHooksContext } from '../context/RouteHooksContext';
import { useUWORouteContext } from '../context/UWORouteContext';
const geoUrl = process.env.PUBLIC_URL + '/maps/land-50m.json';

export default function Map() {
  const { citys, setCitys, coordinates, setCoordinates, editable } = useUWORouteContext();

  const { useRoute } = useRouteHooksContext();
  const {
    routeQuery: { data: route },
  } = useRoute();
  const {
    markersQuery: { isLoading, data: markers },
  } = useRoute(null);

  useEffect(() => {
    setCitys(route?.citys);
    markers && route?.citys?.length > 0 ? setCoordinates(markers[route.citys[0] - 1].city_coordinates) : setCoordinates([5, 42]);
    return () => {
      setCoordinates(null);
    };
  }, [markers, route, setCitys, setCoordinates]);

  function handleClick(id: number) {
    if (citys[citys.length - 1] !== id) {
      // 클릭한 값이 마지막 값과 다르면 배열에 추가
      setCitys([...citys, id]);
    } else {
      // 클릭한 값이 마지막 값과 같으면 배열에서 제거
      setCitys(citys.slice(0, citys.length - 1));
    }
  }

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {coordinates && markers && (
        <ComposableMap projectionConfig={{ scale: 250 }} width={650} height={500} className='bg-blue-300'>
          <ZoomableGroup center={coordinates} zoom={6}>
            <Geographies geography={geoUrl}>{({ geographies }) => geographies.map((geo) => <Geography key={geo.rsmKey} geography={geo} fill='#D0AE89' />)}</Geographies>
            {markers.map(({ city_id, city_nm, city_coordinates, markerOffset }) => (
              <Marker className={!editable ? '' : 'cursor-pointer'} key={city_id} coordinates={city_coordinates} onClick={() => editable && handleClick(city_id)}>
                <circle r={0.55} fill='#F00' />
                <text textAnchor='middle' x={-1} y={1} style={{ fontSize: 1, fontWeight: 'bold', fontFamily: 'system-ui' }}>
                  {citys && citys.indexOf(city_id) >= 0 && citys.indexOf(city_id) + 1}
                </text>
                <text
                  textAnchor='middle'
                  y={markerOffset ? markerOffset : 2}
                  style={{
                    fontSize: 1,
                    fontWeight: 'bold',
                    fontFamily: 'system-ui',
                    fill: citys && citys.includes(city_id) ? '#F00' : '#5D5A6D',
                  }}>
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
