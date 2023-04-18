import Button from '../components/ui/Button';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import Citys from '../components/Citys';
import { useRouteHooksContext } from '../context/RouteHooksContext';

export default function RouteDetail() {
  const { useRoute } = useRouteHooksContext();

  const navigate = useNavigate();
  const { id } = useParams();
  const { uid } = useAuthContext();

  const {
    routeQuery: { isLoading, error, data: route },
    removeItem,
  } = useRoute(null);

  const handleUpdate = () => navigate(`/routes/update/${id}`, { state: { route } });

  const handleDelete = () => {
    if (!window.confirm('삭제 하시겠습니까?')) return false;
    removeItem.mutate({ id }, { onSuccess: () => navigate('/routes') });
  };

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error</p>}
      {route && (
        <div className='flex flex-col'>
          {route.user_id === uid && (
            <div className='flex justify-end font-semibold pt-2'>
              <Button text={'수정'} onClick={handleUpdate} />
              <Button text={'삭제'} onClick={handleDelete} />
            </div>
          )}
          <div className='p-2'>
            <h1 className='text-2xl py-2'>{route.title}</h1>
            <hr />
            <span className='whitespace-pre '>{route.description}</span>
            <div className='flex items-center justify-evenly my-2'>
              <div>
                <span className='text-brand font-bold'>국가: </span>
                {route.country}
              </div>
              <div>
                <span className='text-brand font-bold'>주요 지역: </span>
                {route.region}
              </div>
              <div>
                <span className='text-brand font-bold'>시기: </span>
                {route.startMonth} ~ {route.endMonth}월
              </div>
            </div>
            <hr />
            <Citys route={route} />
          </div>
        </div>
      )}
    </>
  );
}
