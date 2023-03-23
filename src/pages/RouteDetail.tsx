import React, { useState, useEffect } from 'react';
import Button from '../components/ui/Button';
import { useNavigate, useParams } from 'react-router-dom';
import useRoute from '../Hooks/useRoute';
import { useAuthContext } from '../context/AuthContext';
import Map from '../components/Map';
import Citys from '../components/Citys';
import { useQuery } from '@tanstack/react-query';
import { getRoute } from '../api/firebaseTest';

export default function RouteDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { uid } = useAuthContext();
  const { removeItem } = useRoute();

  const { isLoading, error, data: route } = useQuery(['route', id], () => getRoute(id), { staleTime: 1000 * 60 });

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
              <div className='flex justify-end'>
                <Button text={'수정'} onClick={handleUpdate} />
                <Button text={'삭제'} onClick={handleDelete} />
              </div>
            )}
            <h1 className='text-2xl'>{route.title}</h1>
            <span className='whitespace-pre'>{route.description}</span>
            <Citys citys={route.citys} isEditable={false} onDelete={() => {}} />
          </div>
        </div>
      )}
    </>
  );
}
