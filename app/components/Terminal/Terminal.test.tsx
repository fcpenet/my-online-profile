import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Terminal from './Terminal';

const mockValidateKey = jest.fn();
jest.mock('../../services/TodoService/TodoService', () => ({
  TodoService: jest.fn().mockImplementation(() => ({
    validateKey: (...args: unknown[]) => mockValidateKey(...args),
  })),
}));

describe('Terminal', () => {
  const onClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockValidateKey.mockResolvedValue(true);
    localStorage.clear();
  });

  it('does not render when isVisible is false', () => {
    render(<Terminal isVisible={false} onClose={onClose} />);
    expect(screen.queryByText('Terminal')).not.toBeInTheDocument();
  });

  it('renders the terminal window when visible', () => {
    render(<Terminal isVisible={true} onClose={onClose} />);
    expect(screen.getByText('Terminal')).toBeInTheDocument();
    expect(screen.getByText(/Welcome to kikOS Terminal/)).toBeInTheDocument();
  });

  it('renders the input prompt', () => {
    render(<Terminal isVisible={true} onClose={onClose} />);
    expect(screen.getByText('$')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('shows available commands when typing help', async () => {
    const user = userEvent.setup();
    render(<Terminal isVisible={true} onClose={onClose} />);

    await user.type(screen.getByRole('textbox'), 'help{Enter}');

    expect(screen.getByText(/set-api-key <key>/)).toBeInTheDocument();
    expect(screen.getByText(/clear/)).toBeInTheDocument();
  });

  it('clears output when typing clear', async () => {
    const user = userEvent.setup();
    render(<Terminal isVisible={true} onClose={onClose} />);

    expect(screen.getByText(/Welcome to kikOS Terminal/)).toBeInTheDocument();

    await user.type(screen.getByRole('textbox'), 'clear{Enter}');

    expect(screen.queryByText(/Welcome to kikOS Terminal/)).not.toBeInTheDocument();
  });

  it('validates and saves a valid API key', async () => {
    mockValidateKey.mockResolvedValue(true);
    const user = userEvent.setup();
    render(<Terminal isVisible={true} onClose={onClose} />);

    await user.type(screen.getByRole('textbox'), 'set-api-key mySecretKey123{Enter}');

    expect(screen.getByText('Validating API key...')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(/API key valid: mySe\*\*\*\*\*\*\*\*\*\*/)).toBeInTheDocument();
    });
    expect(localStorage.getItem('kikos-api-key')).toBe('mySecretKey123');
  });

  it('removes an invalid API key after validation fails', async () => {
    mockValidateKey.mockResolvedValue(false);
    const user = userEvent.setup();
    render(<Terminal isVisible={true} onClose={onClose} />);

    await user.type(screen.getByRole('textbox'), 'set-api-key badKey{Enter}');

    await waitFor(() => {
      expect(screen.getByText('Invalid API key. Key has been removed.')).toBeInTheDocument();
    });
    expect(localStorage.getItem('kikos-api-key')).toBeNull();
  });

  it('shows error when set-api-key is used without a value', async () => {
    const user = userEvent.setup();
    render(<Terminal isVisible={true} onClose={onClose} />);

    await user.type(screen.getByRole('textbox'), 'set-api-key{Enter}');

    expect(screen.getByText('Usage: set-api-key <key>')).toBeInTheDocument();
    expect(localStorage.getItem('kikos-api-key')).toBeNull();
  });

  it('shows error for unknown commands', async () => {
    const user = userEvent.setup();
    render(<Terminal isVisible={true} onClose={onClose} />);

    await user.type(screen.getByRole('textbox'), 'whoami{Enter}');

    expect(screen.getByText('command not found: whoami')).toBeInTheDocument();
  });

  it('calls onClose when red close button is clicked', async () => {
    const user = userEvent.setup();
    render(<Terminal isVisible={true} onClose={onClose} />);

    await user.click(screen.getByRole('button', { name: 'Close terminal' }));

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('shows masked API key when one is set', async () => {
    localStorage.setItem('kikos-api-key', 'mySecretKey123');
    const user = userEvent.setup();
    render(<Terminal isVisible={true} onClose={onClose} />);

    await user.type(screen.getByRole('textbox'), 'get-api-key{Enter}');

    expect(screen.getByText(/Current API key: mySe\*\*\*\*\*\*\*\*\*\*/)).toBeInTheDocument();
  });

  it('shows error when no API key is set and get-api-key is used', async () => {
    const user = userEvent.setup();
    render(<Terminal isVisible={true} onClose={onClose} />);

    await user.type(screen.getByRole('textbox'), 'get-api-key{Enter}');

    expect(screen.getByText(/No API key set/)).toBeInTheDocument();
  });

  it('clears the input after submitting a command', async () => {
    const user = userEvent.setup();
    render(<Terminal isVisible={true} onClose={onClose} />);

    const input = screen.getByRole('textbox');
    await user.type(input, 'help{Enter}');

    expect(input).toHaveValue('');
  });
});
