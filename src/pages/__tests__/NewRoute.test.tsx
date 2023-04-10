import { render } from '@testing-library/react';
import { withAllContexts, withRouter } from '../../tests/utils';
import { Route } from 'react-router-dom';
import NewRoute from '../NewRoute';
import { fakeRoute } from '../../tests/fakeRoutes';

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
