import React, { useState, useEffect } from 'react';
import Button from '../components/ui/Button';
import { useLocation, useNavigate } from 'react-router-dom';
import useRoute from '../Hooks/useRoute';
import { useAuthContext } from '../context/AuthContext';
import Map from '../components/Map';
import Citys from '../components/Citys';

export default function RouteDetail() {
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
    <div className='flex flex-col sm:flex-row'>
      <div className='basis-4/6'>
        <Map citys={citys} isEditable={false} onMarker={() => false} />
      </div>
      <div className='basis-2/6 flex flex-col p-2'>
        {state && state.route.user_id === uid && (
          <div className='flex justify-end'>
            <Button text={'수정'} onClick={handleUpdate} />
            <Button text={'삭제'} onClick={handleDelete} />
          </div>
        )}
        <h1 className='text-2xl'>{state.route.title}</h1>
        <Citys citys={citys} isEditable={false} onDelete={() => {}} />
        <p>{state.route.description}</p>
      </div>
    </div>
  );
}
