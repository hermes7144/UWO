import { useState, useEffect } from 'react';
import useRoute from '../Hooks/useRoute';
import Button from './ui/Button';
import { useLocation, useNavigate } from 'react-router-dom';
type RouteType = {
  id?: string;
  title?: string;
  description?: string;
};

export default function RouteForm({ citys }) {
  const [route, setRoute] = useState<RouteType>({});
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
    <form className='flex flex-col px-12' onSubmit={handleSubmit}>
      <input name='title' value={route.title ?? ''} placeholder='제목' required onChange={handleChange} />
      <textarea rows={5} className='resize-none border border-gray-300 px-2 py-2 focus:outline-none my-2' name='description' value={route.description ?? ''} placeholder=' 설명' onChange={handleChange}></textarea>
      <Button text={'Save'}></Button>
    </form>
  );
}
