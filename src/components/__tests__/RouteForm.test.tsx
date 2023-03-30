import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Route } from 'react-router-dom';
import { withAllContexts, withRouter } from '../../tests/utils';
import RouteForm from '../RouteForm';

describe('RouteForm', () => {
  const fakeUseRoute = jest.fn();

  it('renders correctly', () => {
    const { asFragment } = renderRouteForm();
    expect(asFragment()).toMatchSnapshot();
  });

  it('type route information', () => {
    const searchKeyword = 'title';
    renderRouteForm();

    const title = screen.getByPlaceholderText('제목');

    userEvent.type(title, searchKeyword);

    expect(screen.getByText('title')).toBeInTheDocument();
  });

  function renderRouteForm() {
    return render(withAllContexts(withRouter(<Route path='/' element={<RouteForm />} />), fakeUseRoute));
  }
});
