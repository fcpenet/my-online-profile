import { render, screen } from '@testing-library/react';
import SpinningWheel from './SpinningWheel';

describe('SpinningWheel', () => {
  it('renders with accessible status role', () => {
    render(<SpinningWheel />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('renders with default size', () => {
    const { container } = render(<SpinningWheel />);
    const wheel = container.querySelector('[class*="wheel"]') as HTMLElement;
    expect(wheel.style.width).toBe('32px');
    expect(wheel.style.height).toBe('32px');
  });

  it('renders with custom size', () => {
    const { container } = render(<SpinningWheel size={16} />);
    const wheel = container.querySelector('[class*="wheel"]') as HTMLElement;
    expect(wheel.style.width).toBe('16px');
    expect(wheel.style.height).toBe('16px');
  });

  it('contains visually hidden loading text for screen readers', () => {
    render(<SpinningWheel />);
    expect(screen.getByText('Loading')).toBeInTheDocument();
  });
});
