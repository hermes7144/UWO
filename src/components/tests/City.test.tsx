import { render } from '@testing-library/react';
import City from '../City';
import { fakeGoods } from '../../tests/fakeGoods';
import { withAllContexts, withRouter } from '../../tests/utils';
import { Route } from 'react-router-dom';

describe('City', () => {
  const getGoods = jest.fn();

  afterEach(() => {
    getGoods.mockReset();
  });

  const city = '리스보아';
  const nextCity = '세비야';
  const index = 1;
  const handleDelete = (delIndex: number): void => {};

  it('render City items', async () => {
    getGoods.mockImplementation(() => fakeGoods);
    renderCitys();
  });

  function renderCitys() {
    return render(withAllContexts(withRouter(<Route path='/' element={<City city={city} nextCity={nextCity} index={index} onDelete={handleDelete} />} />), getGoods));
  }
});
