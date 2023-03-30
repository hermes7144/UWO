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

  it('type route information', async () => {
    const handleSubmit = jest.fn();
    handleSubmit.mockImplementation(() => true);

    renderRouteForm();

    const searchKeyword = '제목입니다';
    const title = screen.getByPlaceholderText('제목');
    await userEvent.type(title, searchKeyword);
    expect(screen.getByDisplayValue('제목입니다')).toBeInTheDocument();

    const checkBox = screen.getByRole('checkbox');
    await userEvent.click(checkBox);
    expect(checkBox).toBeChecked();
  });

  function renderRouteForm() {
    return render(withAllContexts(withRouter(<Route path='/' element={<RouteForm />} />), fakeUseRoute));
  }
});
