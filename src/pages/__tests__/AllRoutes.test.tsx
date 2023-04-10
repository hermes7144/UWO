import { Route } from 'react-router-dom';
import AllRoutes from '../AllRoutes';
import { render, screen } from '@testing-library/react';
import { withAllContexts, withRouter } from '../../tests/utils';
import { fakeRoute } from '../../tests/fakeRoutes';
import Routes from '../../components/Routes';

jest.mock('../../components/Routes');

describe('AllRoutes', () => {
  const fakeUseRoute = jest.fn();
  let user = null;

  beforeEach(() => {
    fakeUseRoute.mockImplementation(() => {
      return {
        routeQuery: { isLoading: false, data: fakeRoute },
      };
    });
  });

  afterEach(() => {
    fakeUseRoute.mockReset();
    Routes.mockReset();
    user = null;
  });

  it('renders correctly', () => {
    const { asFragment } = renderAllRoutes();
    expect(asFragment()).toMatchSnapshot();
  });

  it('user logined and show new button', () => {
    user = { id: 'test' };
    renderAllRoutes();
    expect(screen.getByText('New')).toBeInTheDocument();
  });

  function renderAllRoutes() {
    return render(withAllContexts(withRouter(<Route path='/' element={<AllRoutes />} />), fakeUseRoute, user));
  }
});
