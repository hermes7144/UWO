import React from 'react';
import Button from '../components/ui/Button';
import { useNavigate, useParams } from 'react-router-dom';
import useRoute from '../Hooks/useRoute';
import { useAuthContext } from '../context/AuthContext';
import Map from '../components/Map';
import Citys from '../components/Citys';

export default function RouteDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { uid } = useAuthContext();
  const { removeItem } = useRoute();

  const {
    routeQuery: { isLoading, error, data: route },
  } = useRoute();

  const handleUpdate = () => {
    navigate(`/routes/update/${id}`, { state: { route } });
  };

  const handleDelete = () => {
    if (!window.confirm('삭제하시겠습니까?')) return false;

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
    <>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error</p>}
      {route && (
        <div className='flex flex-col sm:flex-row'>
          <div className='basis-4/6'>
            <Map citys={route.citys} isEditable={false} onMarker={() => {}} />
          </div>
          <div className='basis-2/6 flex flex-col p-2'>
            {route.user_id === uid && (
              <div className='flex justify-end font-semibold'>
                <Button text={'수정'} onClick={handleUpdate} />
                <Button text={'삭제'} onClick={handleDelete} />
              </div>
            )}
            <h1 className='text-2xl'>{route.title}</h1>
            <span className='whitespace-pre'>{route.description}</span>
            <Citys citys={route.citys} major_goods={route.major_goods} major_chk={route.major_chk} isEditable={false} onDelete={() => {}} />
          </div>
        </div>
      )}
    </>
  );
}
