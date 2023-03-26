import { render, screen, fireEvent } from '@testing-library/react';
import { Route } from 'react-router-dom';
import { withAllContexts, withRouter } from '../../tests/utils';
import City from '../City';

type RouteType = {
  id?: string;
  user_id?: string;
  title?: string;
  description?: string;
  citys?: number[];
  major_goods?: string[];
  major_chk?: boolean;
};

type MarkerType = {
  city_id: number;
  city_nm: string;
  city_coordinates: [number, number];
};

describe('City component', () => {
  const city: MarkerType = {
    city_id: 1,
    city_nm: 'City Name',
    city_coordinates: [0, 0],
  };

  const mockRoute = {
    id: '123',
    user_id: '456',
    title: 'Test Route',
    description: 'Test Route Description',
    citys: [1, 2, 3],
    major_goods: ['Good 1', 'Good 2'],
    major_chk: true,
  };

  const useCity = {
    getGoods: jest.fn(),
  };

  useCity.getGoods.mockReturnValue({ loading: false, data: [0, 12] });

  it('mock implementation', () => {
    useCity.getGoods.mockImplementation(() => {
      console.log('Mock implementation');
      return 77;
    });
    // renderCity();
  });

  // it('renders the city name', () => {
  //   renderCity();

  //   const cityName = screen.getByText('City Name');
  //   expect(cityName).toBeInTheDocument();
  // });

  // function renderCity() {
  //   return render(withAllContexts(withRouter(<Route path='/' element={<City route={mockRoute} index={0} city={city} />} />)));
  // }
});
