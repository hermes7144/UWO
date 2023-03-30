import { render, screen } from '@testing-library/react';
import Navbar from '../Navbar';
import { withAuthContexts, withRouter } from '../../tests/utils';
import { Route } from 'react-router-dom';

describe('Navbar', () => {
  const fakeAuthRoute = jest.fn();

  afterEach(() => {
    fakeAuthRoute.mockReset();
  });

  test('renders user login', () => {
    fakeAuthRoute.mockImplementation(() => {
      return { user: { displayName: 'name' }, login: jest.fn(), logout: jest.fn() };
    });

    renderNavbar();

    const navbarElement = screen.getByText('Logout');
    expect(navbarElement).toBeInTheDocument();
  });

  function renderNavbar() {
    return render(withAuthContexts(withRouter(<Route path='/' element={<Navbar />} />), { user: 'name' }));
  }
});
