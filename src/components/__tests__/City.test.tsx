import { render, screen } from '@testing-library/react';
import { Route } from 'react-router-dom';
import { fakeGoods } from '../../tests/fakeGoods';
import { withAllContexts, withRouter } from '../../tests/utils';
import City from '../City';

describe('City', () => {
  const fakeUseCity = jest.fn();

  beforeEach(() => {
    fakeUseCity.mockImplementation(() => {
      return {
        goodsQuery: { isLoading: false, data: fakeGoods },
      };
    });
  });

  afterEach(() => fakeUseCity.mockReset());

  it('renders correctlyd', async () => {
    const { asFragment } = renderCity();

    await screen.findAllByText('아몬드');
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders city name', () => {
    renderCity();
    const cityName = screen.getByText('test city');
    expect(cityName).toBeInTheDocument();
  });

  function renderCity() {
    return render(withAllContexts(withRouter(<Route path='/' element={<City route={{}} index={0} city={{ city_id: 1, city_nm: 'test city', city_coordinates: [37.5665, 126.978] }} />} />), fakeUseCity));
  }
});
