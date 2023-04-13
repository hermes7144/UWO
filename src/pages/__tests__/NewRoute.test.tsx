import { render } from '@testing-library/react';
import { withAllContexts, withRouter } from '../../tests/utils';
import { Route } from 'react-router-dom';
import NewRoute from '../NewRoute';
import { fakeRoute } from '../../tests/fakeRoutes';

jest.mock('../../components/Map');
jest.mock('../../components/Citys');
jest.mock('../../components/RouteForm');

describe('NewRoute', () => {
  const fakeUseRoute = jest.fn();

  beforeEach(() => {
    fakeUseRoute.mockImplementation(() => {
      return {
        routeQuery: { isLoading: false, data: fakeRoute },
      };
    });
  });

  afterEach(() => {
    fakeUseRoute.mockReset();
  });

  it('renders correctly', () => {
    const { asFragment } = renderNewRoute();
    expect(asFragment()).toMatchSnapshot();
  });

  function renderNewRoute() {
    return render(withAllContexts(withRouter(<Route path='/' element={<NewRoute />} />), fakeUseRoute));
  }
});
