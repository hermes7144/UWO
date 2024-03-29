import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import { useAuthContext } from '../context/AuthContext';
import Routes from '../components/Routes';

const countries = ['공통', '포트투갈', '에스파냐', '잉글랜드', '네덜란드', '오스만', '명', '조선', '일본'];
const regions = ['전체', '동지중해', '서지중해', '북해', '카리브해', '서아프리카', '동아프리카', '아랍', '서인도', '동인도', '서남아', '동남아', '동아시아', '기타'];
const months = ['전체', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

type filterType = {
  country: string;
  region: string;
  month: string | number;
};

export default function AllRoutes() {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const [filter, setFilter] = useState<filterType>({
    country: countries[0],
    region: regions[0],
    month: months[0],
  });

  const handleClick = () => navigate('/routes/new');

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFilter((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className='p-2'>
      {user && (
        <div className='flex justify-end font-semibold py-2'>
          <Button text={'New'} onClick={handleClick}></Button>
        </div>
      )}
      <div>
        <div className='flex flex-col lg:flex-row items-center justify-center p-2'>
          <label className='text-brand font-bold block min-w-fit'>국가:</label>
          <select name='country' className='p-1 m-1 w-full max-w-xs border-2 outline-none mr-5' onChange={handleChange} value={filter.country}>
            {countries && countries.map((option, index) => <option key={index}>{option}</option>)}
          </select>
          <label className='text-brand font-bold block min-w-fit'>주요 지역:</label>
          <select name='region' className='p-1 m-1 w-full max-w-xs border-2 outline-none mr-5' onChange={handleChange} value={filter.region}>
            {regions && regions.map((option, index) => <option key={index}>{option}</option>)}
          </select>
          <label className='text-brand font-bold block min-w-fit'>월:</label>
          <select name='month' className='p-1 m-1 w-full max-w-xs border-2 outline-none' onChange={handleChange} value={filter.month}>
            {months && months.map((option, index) => <option key={index}>{option}</option>)}
          </select>
        </div>
      </div>
      <Routes filter={filter} />
    </div>
  );
}
