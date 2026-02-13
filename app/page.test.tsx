import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Desktop from './page';

jest.mock('./components/WelcomeTour/WelcomeTour', () => {
  return function MockWelcomeTour({ isVisible, onClose }: { isVisible: boolean; onClose: () => void }) {
    if (!isVisible) return null;
    return <div data-testid="welcome-tour"><button onClick={onClose}>Close Tour</button></div>;
  };
});

jest.mock('./components/Terminal/Terminal', () => {
  return function MockTerminal({ isVisible, onClose }: { isVisible: boolean; onClose: () => void }) {
    if (!isVisible) return null;
    return <div data-testid="terminal"><button onClick={onClose}>Close Terminal</button></div>;
  };
});

jest.mock('./components/TodoList/TodoList', () => {
  return function MockTodoList({ readOnly }: { readOnly?: boolean }) {
    return <div data-testid="todo-list" data-readonly={String(!!readOnly)} />;
  };
});

describe('Desktop', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    localStorage.clear();
    sessionStorage.clear();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe('boot sequence', () => {
    it('shows the boot screen initially', () => {
      render(<Desktop />);
      expect(screen.getByText('kikOS')).toBeInTheDocument();
      expect(screen.getByText('Version 4.2.0')).toBeInTheDocument();
    });

    it('displays boot messages over time', () => {
      render(<Desktop />);

      act(() => { jest.advanceTimersByTime(1500); });
      expect(screen.getByText('kikOS v4.2.0')).toBeInTheDocument();

      act(() => { jest.advanceTimersByTime(445); });
      expect(screen.getByText('Initializing system...')).toBeInTheDocument();
    });

    it('transitions to the desktop after boot completes', () => {
      render(<Desktop />);

      act(() => { jest.advanceTimersByTime(6500); });

      expect(screen.queryByText('Version 4.2.0')).not.toBeInTheDocument();
      expect(screen.getByText('Finder')).toBeInTheDocument();
    });

    it('saves boot completion to sessionStorage', () => {
      render(<Desktop />);

      expect(sessionStorage.getItem('kikos-booted')).toBeNull();

      act(() => { jest.advanceTimersByTime(6500); });

      expect(sessionStorage.getItem('kikos-booted')).toBe('true');
    });

    it('skips the boot sequence when sessionStorage has kikos-booted', () => {
      sessionStorage.setItem('kikos-booted', 'true');
      render(<Desktop />);

      expect(screen.queryByText('Version 4.2.0')).not.toBeInTheDocument();
      expect(screen.getByText('Finder')).toBeInTheDocument();
    });
  });

  describe('desktop elements', () => {
    function renderDesktop() {
      render(<Desktop />);
      act(() => { jest.advanceTimersByTime(6500); });
    }

    it('renders the menu bar', () => {
      renderDesktop();
      expect(screen.getByText('Finder')).toBeInTheDocument();
      expect(screen.getByText('File')).toBeInTheDocument();
      expect(screen.getByText('Edit')).toBeInTheDocument();
      expect(screen.getByText('View')).toBeInTheDocument();
    });

    it('renders post-it notes with metrics', () => {
      renderDesktop();
      expect(screen.getByText('75%')).toBeInTheDocument();
      expect(screen.getByText('90%')).toBeInTheDocument();
      expect(screen.getByText('Zero')).toBeInTheDocument();
      expect(screen.getByText('13+')).toBeInTheDocument();
    });

it('renders desktop icons with correct labels', () => {
      renderDesktop();
      expect(screen.getByText('Resume')).toBeInTheDocument();
      expect(screen.getByText('Workspace')).toBeInTheDocument();
      expect(screen.getByText('Projects')).toBeInTheDocument();
      expect(screen.getByText('Snake')).toBeInTheDocument();
      expect(screen.getByText('Tour')).toBeInTheDocument();
    });

    it('renders desktop icon links with correct hrefs', () => {
      renderDesktop();
      expect(screen.getByText('Resume').closest('a')).toHaveAttribute('href', '/resume');
      expect(screen.getByText('Workspace').closest('a')).toHaveAttribute('href', '/workspace');
      expect(screen.getByText('Projects').closest('a')).toHaveAttribute('href', '/projects');
      expect(screen.getByText('Snake').closest('a')).toHaveAttribute('href', '/game');
    });

    it('renders the dock with items', () => {
      renderDesktop();
      expect(screen.getByTitle('Resume')).toBeInTheDocument();
      expect(screen.getByTitle('Workspace')).toBeInTheDocument();
      expect(screen.getByTitle('Projects')).toBeInTheDocument();
      expect(screen.getByTitle('Snake Game')).toBeInTheDocument();
      expect(screen.getByTitle('Email')).toBeInTheDocument();
    });

    it('renders the email dock link with mailto href', () => {
      renderDesktop();
      expect(screen.getByTitle('Email')).toHaveAttribute('href', 'mailto:me@kikopenetrante.com');
    });
  });

  describe('welcome tour integration', () => {
    function renderDesktop() {
      render(<Desktop />);
      act(() => { jest.advanceTimersByTime(6500); });
    }

    it('shows the tour on first visit', () => {
      renderDesktop();
      expect(screen.getByTestId('welcome-tour')).toBeInTheDocument();
    });

    it('does not show the tour if already completed', () => {
      localStorage.setItem('kikos-tour-completed', 'true');
      renderDesktop();
      expect(screen.queryByTestId('welcome-tour')).not.toBeInTheDocument();
    });

    it('saves to localStorage when tour is closed', async () => {
      const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
      renderDesktop();

      await user.click(screen.getByText('Close Tour'));

      expect(localStorage.getItem('kikos-tour-completed')).toBe('true');
      expect(screen.queryByTestId('welcome-tour')).not.toBeInTheDocument();
    });

    it('re-opens the tour when the Tour icon is clicked', async () => {
      localStorage.setItem('kikos-tour-completed', 'true');
      const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
      renderDesktop();

      expect(screen.queryByTestId('welcome-tour')).not.toBeInTheDocument();

      await user.click(screen.getByText('Tour'));
      expect(screen.getByTestId('welcome-tour')).toBeInTheDocument();
    });
  });

  describe('terminal shortcut', () => {
    function renderDesktop() {
      render(<Desktop />);
      act(() => { jest.advanceTimersByTime(6500); });
    }

    it('opens the terminal with Cmd+K', async () => {
      const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
      renderDesktop();

      expect(screen.queryByTestId('terminal')).not.toBeInTheDocument();

      await user.keyboard('{Meta>}k{/Meta}');
      expect(screen.getByTestId('terminal')).toBeInTheDocument();
    });

    it('closes the terminal with Cmd+K again', async () => {
      const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
      renderDesktop();

      await user.keyboard('{Meta>}k{/Meta}');
      expect(screen.getByTestId('terminal')).toBeInTheDocument();

      await user.keyboard('{Meta>}k{/Meta}');
      expect(screen.queryByTestId('terminal')).not.toBeInTheDocument();
    });

    it('does not show a terminal desktop icon or dock item', () => {
      renderDesktop();
      expect(screen.queryByText('Terminal')).not.toBeInTheDocument();
      expect(screen.queryByTitle('Terminal')).not.toBeInTheDocument();
    });
  });

  describe('todo list', () => {
    function renderDesktop() {
      render(<Desktop />);
      act(() => { jest.advanceTimersByTime(6500); });
    }

    it('always renders the todo list', () => {
      renderDesktop();
      expect(screen.getByTestId('todo-list')).toBeInTheDocument();
    });

    it('renders in read-only mode without an API key', () => {
      renderDesktop();
      expect(screen.getByTestId('todo-list')).toHaveAttribute('data-readonly', 'true');
    });

    it('renders in interactive mode with an API key', () => {
      localStorage.setItem('kikos-api-key', 'test-key');
      renderDesktop();
      expect(screen.getByTestId('todo-list')).toHaveAttribute('data-readonly', 'false');
    });

    it('switches to interactive mode after setting API key via terminal', async () => {
      const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
      renderDesktop();

      expect(screen.getByTestId('todo-list')).toHaveAttribute('data-readonly', 'true');

      // Open terminal and simulate setting the key
      await user.keyboard('{Meta>}k{/Meta}');
      localStorage.setItem('kikos-api-key', 'test-key');

      // Close terminal — triggers re-check
      await user.click(screen.getByText('Close Terminal'));
      expect(screen.getByTestId('todo-list')).toHaveAttribute('data-readonly', 'false');
    });
  });
});
