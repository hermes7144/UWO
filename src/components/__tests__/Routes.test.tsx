import { render, screen, waitFor } from '@testing-library/react';
import { Route } from 'react-router-dom';
import { fakeRoutes } from '../../tests/fakeRoutes';
import { withAllContexts, withRouter } from '../../tests/utils';
import Routes from '../Routes';

describe('Routes', () => {
  const fakeUseRoute = jest.fn();

  afterEach(() => fakeUseRoute.mockReset());

  it('renders correctly', () => {
    fakeUseRoute.mockImplementation(() => {
      return {
        routesQuery: { data: fakeRoutes },
      };
    });
    const { asFragment } = renderRoutes();
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders loading', () => {
    fakeUseRoute.mockImplementation(() => {
      return { routesQuery: { isLoading: true, data: fakeRoutes } };
    });
    renderRoutes();

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders error', async () => {
    fakeUseRoute.mockImplementation(() => {
      return { routesQuery: { error: true } };
    });
    renderRoutes();

    await waitFor(() => {
      expect(screen.getByText('Something is wrong')).toBeInTheDocument();
    });
  });

  function renderRoutes() {
    return render(withAllContexts(withRouter(<Route path='/' element={<Routes country={'오스만'} region={'카리브해'} month={2} />} />), fakeUseRoute));
  }
});
