import { useState, useEffect } from 'react';
import Button from './ui/Button';
import { useLocation, useNavigate } from 'react-router-dom';
import { useUWORouteContext } from '../context/UWORouteContext';
import { useRouteHooksContext } from '../context/RouteHooksContext';
type RouteType = {
  title?: string;
  description?: string;
  major_goods?: string;
  major_chk?: boolean;
  country: string;
  region: string;
  startMonth: number;
  endMonth: number;
};
const countries = ['공통', '포트투갈', '에스파냐', '잉글랜드', '네덜란드', '오스만', '명', '조선', '일본'];
const regions = ['공통', '동지중해', '서지중해', '북해', '카리브해', '서아프리카', '동아프리카', '아랍', '서인도', '동인도', '서남아', '동남아', '동아시아', '기타'];
const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

export default function RouteForm() {
  const { useRoute } = useRouteHooksContext();
  const { addOrUpdateItem } = useRoute();
  const { citys } = useUWORouteContext();
  const { state } = useLocation();
  const navigate = useNavigate();

  const [route, setRoute] = useState<RouteType>({
    title: '',
    description: '',
    major_goods: '',
    major_chk: false,
    country: countries[0],
    region: regions[0],
    startMonth: months[0],
    endMonth: months[months.length - 1],
  });

  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (state) {
      setRoute(state.route);
    }
  }, [state]);

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    setRoute((prevState) => ({
      ...prevState,
      [name]: name === 'major_chk' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setRoute((route) => ({ ...route, major_goods: String(route.major_goods).replaceAll(' ', '') }));

    addOrUpdateItem.mutate(
      { ...route, citys },
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
    <form className='flex flex-col px-1 font-semibold' onSubmit={handleSubmit}>
      {success && <p className='my-2'>✔️{success}</p>}
      <input name='title' value={route.title} placeholder='제목' required onChange={handleChange} maxLength={50} />
      <textarea rows={5} className='resize-none border border-gray-300 px-2 py-2 focus:outline-none my-2' name='description' value={route.description} placeholder=' 설명' onChange={handleChange}></textarea>
      <div className='flex justify-between items-center'>
        <input className='w-11/12' name='major_goods' value={route.major_goods} placeholder='주요교역품' onChange={handleChange} />
        <input className='w-4 h-4 mx-3' name='major_chk' type='checkbox' checked={route.major_chk} onChange={handleChange} />
      </div>
      <div className='flex items-center'>
        <label className='text-brand font-bold'>국가:</label>
        <select name='country' className='p-1 m-1 flex-1 border-2 outline-none' onChange={handleChange} value={route.country}>
          {countries && countries.map((option, index) => <option key={index}>{option}</option>)}
        </select>
        <label className='text-brand font-bold'>지역:</label>
        <select name='region' className='p-1 m-1 flex-1 border-2 outline-none' onChange={handleChange} value={route.region}>
          {regions && regions.map((option, index) => <option key={index}>{option}</option>)}
        </select>
        <label className='text-brand font-bold'>월:</label>
        <select name='startMonth' className='p-1 m-1 flex-1 border-2  outline-none' onChange={handleChange} value={route.startMonth}>
          {months && months.map((option, index) => <option key={index}>{option}</option>)}
        </select>
        ~
        <select name='endMonth' className='p-1 m-1 flex-1 border-2 outline-none' onChange={handleChange} value={route.endMonth}>
          {months && months.map((option, index) => <option key={index}>{option}</option>)}
        </select>
      </div>
      <Button text={'Save'}></Button>
    </form>
  );
}
