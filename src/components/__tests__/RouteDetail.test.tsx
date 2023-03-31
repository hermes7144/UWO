import { render, screen } from '@testing-library/react';
import { Route } from 'react-router-dom';
import RouteDetail from '../../pages/RouteDetail';
import { fakeMarkers } from '../../tests/fakeGoods';
import { fakeRoute } from '../../tests/fakeRoutes';
import { withAllContexts, withRouter } from '../../tests/utils';

describe('Router Detail', () => {
  const fakeUseRoute = jest.fn();

  beforeEach(() => {
    fakeUseRoute.mockImplementation(() => {
      return {
        routeQuery: { isLoading: false, data: fakeRoute },
        markersQuery: { isLoading: false, data: fakeMarkers },
      };
    });
  });

  afterEach(() => fakeUseRoute.mockReset());

  it('renders correctly', async () => {
    const { asFragment } = renderRouterDetail();

    await screen.findAllByText('title');
    expect(asFragment()).toMatchSnapshot();
  });

  function renderRouterDetail() {
    return render(withAllContexts(withRouter(<Route path='/' element={<RouteDetail />} />), fakeUseRoute));
  }
});
