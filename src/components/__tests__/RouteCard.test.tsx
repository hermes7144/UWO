import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Route, useLocation } from 'react-router-dom';
import { fakeRoute as route } from '../../tests/fakeRoutes';
import { withAllContexts, withRouter } from '../../tests/utils';
import RouteCard from '../RouteCard';

describe('RouteCard', () => {
  const fakeUseCity = jest.fn();

  it('renders correctly', () => {
    fakeUseCity.mockImplementation(() => {
      return { routeQuery: { data: route } };
    });
    const { asFragment } = renderRouteCard();

    expect(asFragment()).toMatchSnapshot();
  });

  it('navigates to detailed route page with route state when clicked', async () => {
    render(
      withAllContexts(
        withRouter(
          <>
            <Route path='/' element={<RouteCard route={route} />} />
            <Route path={`/routes/${route.id}`} element={<p>{route.description}</p>} />
          </>
        ),
        fakeUseCity
      )
    );

    const card = screen.getByRole('listitem');
    await userEvent.click(card);

    expect(screen.getByText(route.description)).toBeInTheDocument();
  });

  function renderRouteCard() {
    return render(withAllContexts(withRouter(<Route path='/' element={<RouteCard route={route} />} />), fakeUseCity));
  }
});
