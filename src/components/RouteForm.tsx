import { useState, useEffect } from 'react';
import useRoute from '../Hooks/useRoute';
import Button from './ui/Button';
import { useLocation, useNavigate } from 'react-router-dom';
type RouteType = {
  id: string;
  title: string;
  remark: string;
};

export default function RouteForm({ citys }) {
  const [route, setRoute] = useState<RouteType>({ id: '', title: '', remark: '' });
  const { addOrUpdateItem } = useRoute();
  const navigate = useNavigate();
  const { state } = useLocation();

  useEffect(() => {
    state && setRoute(state.route);
  }, [state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRoute((route) => ({ ...route, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addOrUpdateItem.mutate(
      { route, citys },
      {
        onSuccess: () => {
          navigate('/routes');
        },
      }
    );
  };
  return (
    <form className='flex flex-col px-12 mt-2' onSubmit={handleSubmit}>
      <input name='title' value={route.title ?? ''} placeholder='무역 루트명' required onChange={handleChange} />
      <input name='remark' value={route.remark ?? ''} placeholder=' 비고' onChange={handleChange} />
      <Button text={'Save'}></Button>
    </form>
  );
}
