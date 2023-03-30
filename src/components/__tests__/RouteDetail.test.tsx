import { render, screen } from '@testing-library/react';
import { Route } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import RouteDetail from '../../pages/RouteDetail';
import { fakeMarkers } from '../../tests/fakeGoods';
import { fakeRoute } from '../../tests/fakeRoutes';
import { withAllContexts, withRouter } from '../../tests/utils';

jest.mock('../../context/AuthContext');

describe('Router Detail', () => {
  const mockUseAuthContext = useAuthContext as jest.MockedFunction<typeof useAuthContext>;
  const fakeUseRoute = jest.fn();

  beforeEach(() => {
    mockUseAuthContext.mockReturnValue({
      user: null,
      login: jest.fn(),
      logout: jest.fn(),
      uid: 'uid',
    });

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
