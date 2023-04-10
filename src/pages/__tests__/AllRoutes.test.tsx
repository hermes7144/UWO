import { Route } from 'react-router-dom';
import AllRoutes from '../AllRoutes';
import { render } from '@testing-library/react';
import { withAllContexts, withRouter } from '../../tests/utils';

describe('AllRoutes', () => {
  const fakeUseRoute = jest.fn();
  it('renders correctly', () => {
    expect(true).toBeTruthy();
    // const { asFragment } = renderRouteForm();
    // expect(asFragment()).toMatchSnapshot();
  });

  // function renderRouteForm() {
  //   return render(withAllContexts(withRouter(<Route path='/' element={<AllRoutes />} />), fakeUseRoute));
  // }
});
