import React, { useState, useEffect } from 'react';
import Button from '../components/ui/Button';
import { useLocation, useNavigate } from 'react-router-dom';
import useRoute from '../Hooks/useRoute';
import { useAuthContext } from '../context/AuthContext';
import Map from '../components/Map';
import Citys from '../components/Citys';
import RouteForm from '../components/RouteForm';

export default function NewRoute() {
  const [citys, setCitys] = useState<number[]>([]);

  const { uid } = useAuthContext();
  const { state } = useLocation();
  const { removeItem } = useRoute();
  const navigate = useNavigate();

  useEffect(() => {
    if (state && state.route.citys) {
      setCitys(state.route.citys);
    }
  }, [state]);

  function handleMarkerClick(id: number) {
    if (citys[citys.length - 1] !== id) {
      // 클릭한 값이 마지막 값과 다르면 배열에 추가
      setCitys([...citys, id]);
    } else {
      // 클릭한 값이 마지막 값과 같으면 배열에서 제거
      setCitys(citys.slice(0, citys.length - 1));
    }
  }

  const handleDeleteRoute = () => {
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

  const handleDeleteCity = (delIndex: number): void => setCitys(citys.filter((city, index) => index !== delIndex));

  return (
    <div className='flex flex-col sm:flex-row'>
      <div className='basis-4/6'>
        <Map citys={citys} onMarker={handleMarkerClick} />
      </div>
      <div className='basis-2/6 flex flex-col p-2'>
        <div className='flex justify-end'>{state && state.route.user_id === uid && <Button text={'삭제'} onClick={handleDeleteRoute} />}</div>
        <Citys citys={citys} major_goods={state && state.route.major_goods} onDelete={handleDeleteCity} />
        <RouteForm citys={citys} />
      </div>
    </div>
  );
}
