import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import WelcomeTour from './WelcomeTour';

describe('WelcomeTour', () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders nothing when isVisible is false', () => {
    const { container } = render(<WelcomeTour isVisible={false} onClose={mockOnClose} />);
    expect(container.innerHTML).toBe('');
  });

  it('renders the tour overlay when isVisible is true', () => {
    render(<WelcomeTour isVisible={true} onClose={mockOnClose} />);
    expect(screen.getByText('Welcome Tour')).toBeInTheDocument();
  });

  it('shows the first slide by default', () => {
    render(<WelcomeTour isVisible={true} onClose={mockOnClose} />);
    expect(screen.getByText('Welcome to My World! 👋')).toBeInTheDocument();
  });

  it('disables the Previous button on the first slide', () => {
    render(<WelcomeTour isVisible={true} onClose={mockOnClose} />);
    expect(screen.getByText('← Previous')).toBeDisabled();
  });

  it('navigates to the next slide when Next is clicked', async () => {
    const user = userEvent.setup();
    render(<WelcomeTour isVisible={true} onClose={mockOnClose} />);

    await user.click(screen.getByText('Next'));
    expect(screen.getByText('The Builder')).toBeInTheDocument();
  });

  it('navigates back to the previous slide', async () => {
    const user = userEvent.setup();
    render(<WelcomeTour isVisible={true} onClose={mockOnClose} />);

    await user.click(screen.getByText('Next'));
    expect(screen.getByText('The Builder')).toBeInTheDocument();

    await user.click(screen.getByText('← Previous'));
    expect(screen.getByText('Welcome to My World! 👋')).toBeInTheDocument();
  });

  it('shows Get Started on the last slide', async () => {
    const user = userEvent.setup();
    render(<WelcomeTour isVisible={true} onClose={mockOnClose} />);

    await user.click(screen.getByText('Next')); // slide 2
    await user.click(screen.getByText('Next')); // slide 3
    await user.click(screen.getByText('Next')); // slide 4
    await user.click(screen.getByText('Next')); // slide 5

    expect(screen.getByText('Explore & Connect')).toBeInTheDocument();
    expect(screen.getByText('Get Started')).toBeInTheDocument();
  });

  it('calls onClose when Get Started is clicked on the last slide', async () => {
    const user = userEvent.setup();
    render(<WelcomeTour isVisible={true} onClose={mockOnClose} />);

    await user.click(screen.getByText('Next'));
    await user.click(screen.getByText('Next'));
    await user.click(screen.getByText('Next'));
    await user.click(screen.getByText('Next'));
    await user.click(screen.getByText('Get Started'));

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when Skip Tour is clicked', async () => {
    const user = userEvent.setup();
    render(<WelcomeTour isVisible={true} onClose={mockOnClose} />);

    await user.click(screen.getByText('Skip Tour'));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when the red close button is clicked', async () => {
    const user = userEvent.setup();
    render(<WelcomeTour isVisible={true} onClose={mockOnClose} />);

    await user.click(screen.getByTitle('Close'));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('renders progress dots matching the number of slides', () => {
    render(<WelcomeTour isVisible={true} onClose={mockOnClose} />);
    const dots = document.querySelectorAll('[class*="tourDot"]');
    expect(dots).toHaveLength(5);
  });

  it('marks the active dot for the current slide', async () => {
    const user = userEvent.setup();
    render(<WelcomeTour isVisible={true} onClose={mockOnClose} />);

    const dots = document.querySelectorAll('[class*="tourDot"]');
    expect(dots[0].className).toContain('tourDotActive');
    expect(dots[1].className).not.toContain('tourDotActive');

    await user.click(screen.getByText('Next'));
    expect(dots[0].className).not.toContain('tourDotActive');
    expect(dots[1].className).toContain('tourDotActive');
  });
});
