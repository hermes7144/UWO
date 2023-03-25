import { useState, useEffect } from 'react';
import useRoute from '../Hooks/useRoute';
import Button from './ui/Button';
import { useLocation, useNavigate } from 'react-router-dom';
import { useUWORouteContext } from '../context/UWORouteContext';
type RouteType = {
  id?: string;
  title?: string;
  description?: string;
  major_goods?: string;
  major_chk?: boolean;
};

export default function RouteForm() {
  const { citys } = useUWORouteContext();
  const { addOrUpdateItem } = useRoute();
  const { state } = useLocation();
  const [route, setRoute] = useState<RouteType>({});
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    state && setRoute(state.route);
  }, [state]);

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    if (name === 'major_chk') {
      const major_chk = checked ? true : false;
      setRoute((route) => ({ ...route, major_chk }));
    } else {
      setRoute((route) => ({ ...route, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setRoute((route) => ({ ...route, major_goods: String(route.major_goods).replaceAll(' ', '') }));
    addOrUpdateItem.mutate(
      { citys, route },
      {
        onSuccess: () => {
          setSuccess('성공적으로 경로가 추가되었습니다.');
          setTimeout(() => {
            setSuccess(null);
            navigate('/routes');
          }, 1000);
        },
      }
    );
  };
  return (
    <form className='flex flex-col px-12 font-semibold' onSubmit={handleSubmit}>
      {success && <p className='my-2'>✔️{success}</p>}
      <input name='title' value={route.title ?? ''} placeholder='제목' required onChange={handleChange} />
      <textarea rows={5} className='resize-none border border-gray-300 px-2 py-2 focus:outline-none my-2' name='description' value={route.description ?? ''} placeholder=' 설명' onChange={handleChange}></textarea>
      <div className='flex justify-between items-center'>
        <input className='w-11/12' name='major_goods' value={route.major_goods || ''} placeholder='주요교역품' onChange={handleChange} />
        <input className='w-4 h-4 mx-3' name='major_chk' type='checkbox' checked={route.major_chk || false} onChange={handleChange} />
      </div>
      <Button text={'Save'}></Button>
    </form>
  );
}
