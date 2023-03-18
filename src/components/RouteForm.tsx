import { useInfoContext } from './context/InfoContext';
import useRoute from '../Hooks/useRoute';
import Button from './ui/Button';

export default function RouteForm() {
  const { citys, setCitys, route, setRoute } = useInfoContext();
  const { addOrUpdateItem } = useRoute();

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
          setCitys([]);
          setRoute({ id: '', title: '', remark: '' });
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
