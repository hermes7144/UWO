import React, { useEffect } from 'react';
import Button from '../components/ui/Button';
import { useNavigate } from 'react-router-dom';
import useRoute from '../Hooks/useRoute';
import { useAuthContext } from '../context/AuthContext';
import Map from '../components/Map';
import Citys from '../components/Citys';
import RouteForm from '../components/RouteForm';
import { useUWORouteContext } from '../context/UWORouteContext';

export default function NewRoute() {
  const { setEditable, setCitys } = useUWORouteContext();
  const { uid } = useAuthContext();
  const { removeItem } = useRoute();
  const navigate = useNavigate();

  const {
    routeQuery: { data: route },
  } = useRoute();

  useEffect(() => {
    route.citys ? setCitys(route.citys) : setCitys([]);
    setEditable(true);

    return () => {
      setEditable(false);
    };
  }, [route, setCitys, setEditable]);

  const handleDeleteRoute = () => {
    if (!window.confirm('삭제하시겠습니까?')) return false;
    const id = route.id;
    removeItem.mutate({ id }, { onSuccess: () => navigate('/routes') });
  };

  return (
    <div className='flex flex-col sm:flex-row'>
      <div className='basis-4/6'>
        <Map />
      </div>
      <div className='basis-2/6 flex flex-col p-2'>
        <div className='flex justify-end'>{route && route.user_id === uid && <Button text={'삭제'} onClick={handleDeleteRoute} />}</div>
        <Citys route={route} />
        <RouteForm />
      </div>
    </div>
  );
}
