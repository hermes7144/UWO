import { render, screen } from '@testing-library/react';
import { Route } from 'react-router-dom';
import { useUWORouteContext } from '../../context/UWORouteContext';
import { fakeGoods } from '../../tests/fakeGoods';
import { withAllContexts, withRouter } from '../../tests/utils';
import City from '../City';

jest.mock('../../context/UWORouteContext');

describe('City', () => {
  const mockUseUWORouteContext = useUWORouteContext as jest.MockedFunction<typeof useUWORouteContext>;
  const fakeUseCity = jest.fn();

  beforeEach(() => {
    mockUseUWORouteContext.mockReturnValue({
      citys: [1],
      coordinates: [1, 3],
      setCitys: jest.fn(),
      setCoordinates: jest.fn(),
      setEditable: jest.fn(),
      editable: true,
    });
  });

  test('renders city name', () => {
    fakeUseCity.mockImplementation(() => {
      return {
        goodsQuery: { isLoading: true, data: fakeGoods },
      };
    });

    renderCity();

    const cityName = screen.getByText(/Seoul/);
    expect(cityName).toBeInTheDocument();
  });

  function renderCity() {
    return render(withAllContexts(withRouter(<Route path='/' element={<City route={{}} index={0} city={{ city_id: 1, city_nm: 'Seoul', city_coordinates: [37.5665, 126.978] }} />} />), fakeUseCity));
  }
});
