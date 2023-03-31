import { render, screen } from '@testing-library/react';
import Navbar from '../Navbar';
import { withAllContexts, withRouter } from '../../tests/utils';
import { Route } from 'react-router-dom';

describe('Navbar', () => {
  const fakeUseRoute = jest.fn();

  let user;
  afterEach(() => {
    user = null;
  });

  test('renders user is empty', () => {
    user = { displayName: 'test' };
    const { asFragment } = renderNavbar();

    expect(asFragment()).toMatchSnapshot();
  });

  test('renders user is not login', () => {
    renderNavbar();

    const navbarElement = screen.getByText('Login');
    expect(navbarElement).toBeInTheDocument();
  });

  function renderNavbar() {
    return render(withAllContexts(withRouter(<Route path='/' element={<Navbar />} />), fakeUseRoute, user));
  }
});
