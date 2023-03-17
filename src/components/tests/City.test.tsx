import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import City from '../City';
import { fakeGoods } from '../../tests/fakeGoods';
import { withAllContexts, withRouter } from '../../tests/utils';
import { Route } from 'react-router-dom';

describe('City', () => {
  const getGoods = jest.fn();

  afterEach(() => {
    getGoods.mockReset();
  });

  const city = 1;
  const nextCity = 2;
  const index = 1;
  const cityNm = '리브보아';
  const handleDelete = (delIndex: number): void => {};

  it('renders correctly', async () => {
    getGoods.mockImplementation(() => fakeGoods);

    const { asFragment } = renderCitys();

    await waitForElementToBeRemoved(screen.queryByText('Loading...'));
    expect(asFragment()).toMatchSnapshot();
  });

  it('render City items', async () => {
    getGoods.mockImplementation(() => fakeGoods);
    renderCitys();
    await waitForElementToBeRemoved(screen.queryByText('Loading...'));

    expect(screen.getByText('아몬드')).toHaveClass('text-red-600');
  });

  function renderCitys() {
    return render(withAllContexts(withRouter(<Route path='/' element={<City city={city} nextCity={nextCity} cityNm={cityNm} index={index} onDelete={handleDelete} />} />), getGoods));
  }
});
