import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ErrorDialog from './ErrorDialog';

describe('ErrorDialog', () => {
  const onClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('does not render when isVisible is false', () => {
    render(<ErrorDialog isVisible={false} onClose={onClose} title="Error" message="Something went wrong" />);
    expect(screen.queryByText('Something went wrong')).not.toBeInTheDocument();
  });

  it('renders the title, message, and icon when visible', () => {
    render(<ErrorDialog isVisible={true} onClose={onClose} title="Error" message="Something went wrong" />);
    expect(screen.getByText('⚠️')).toBeInTheDocument();
    expect(screen.getAllByText('Error')).toHaveLength(2); // header + body title
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });

  it('calls onClose when OK button is clicked', async () => {
    const user = userEvent.setup();
    render(<ErrorDialog isVisible={true} onClose={onClose} title="Error" message="Oops" />);

    await user.click(screen.getByRole('button', { name: 'OK' }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when red close button is clicked', async () => {
    const user = userEvent.setup();
    render(<ErrorDialog isVisible={true} onClose={onClose} title="Error" message="Oops" />);

    await user.click(screen.getByRole('button', { name: 'Close dialog' }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
