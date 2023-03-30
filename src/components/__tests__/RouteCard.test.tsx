import { render } from '@testing-library/react';
import { Route } from 'react-router-dom';
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

  function renderRouteCard() {
    return render(
      withAllContexts(
        withRouter(
          <>
            <Route path='/' element={<RouteCard route={route} />} />
            {/* <Route path='/routes/${}' element={} /> */}
          </>
        ),
        fakeUseCity
      )
    );
  }
});
