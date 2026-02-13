import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TodoList from './TodoList';
import type { TodoItem } from '../../services/TodoService/types';

const mockGetAll = jest.fn();
const mockToggle = jest.fn();

jest.mock('../../services/TodoService/TodoService', () => ({
  TodoService: jest.fn().mockImplementation(() => ({
    getAll: (...args: unknown[]) => mockGetAll(...args),
    toggle: (...args: unknown[]) => mockToggle(...args),
  })),
}));

jest.mock('../ErrorDialog/ErrorDialog', () => {
  return function MockErrorDialog({ isVisible, onClose, message }: { isVisible: boolean; onClose: () => void; message: string }) {
    if (!isVisible) return null;
    return <div data-testid="error-dialog"><span>{message}</span><button onClick={onClose}>OK</button></div>;
  };
});

const fakeItems: TodoItem[] = [
  { id: 1, title: 'Setup vercel account for backend!', description: null, completed: false, createdAt: '', updatedAt: '' },
  { id: 2, title: 'Add to do list feature on my profile page', description: null, completed: false, createdAt: '', updatedAt: '' },
  { id: 3, title: 'Create new app for the store!', description: null, completed: true, createdAt: '', updatedAt: '' },
];

function renderAndWaitForLoad() {
  mockGetAll.mockResolvedValue(fakeItems);
  render(<TodoList />);
  return waitFor(() => {
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
  });
}

describe('TodoList', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('shows loading state then renders items from the service', async () => {
    mockGetAll.mockResolvedValue(fakeItems);
    render(<TodoList />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Setup vercel account for backend!')).toBeInTheDocument();
    });
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    expect(mockGetAll).toHaveBeenCalledTimes(1);
  });

  it('shows error dialog when fetch fails', async () => {
    mockGetAll.mockRejectedValue(new Error('Network error'));
    render(<TodoList />);

    await waitFor(() => {
      expect(screen.getByTestId('error-dialog')).toBeInTheDocument();
      expect(screen.getByText('Failed to load todos')).toBeInTheDocument();
    });
  });

  it('renders the window header with title', async () => {
    await renderAndWaitForLoad();
    expect(screen.getByText('To Do')).toBeInTheDocument();
  });

  it('renders all todo items from the API', async () => {
    await renderAndWaitForLoad();
    expect(screen.getByText('Setup vercel account for backend!')).toBeInTheDocument();
    expect(screen.getByText('Add to do list feature on my profile page')).toBeInTheDocument();
    expect(screen.getByText('Create new app for the store!')).toBeInTheDocument();
  });

  it('renders checkboxes matching the completed state from the API', async () => {
    await renderAndWaitForLoad();
    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes).toHaveLength(3);
    expect(checkboxes[0]).not.toBeChecked();
    expect(checkboxes[1]).not.toBeChecked();
    expect(checkboxes[2]).toBeChecked();
  });

  it('optimistically toggles then calls the service', async () => {
    const toggledItem = { ...fakeItems[0], completed: true };
    mockToggle.mockResolvedValue(toggledItem);
    await renderAndWaitForLoad();

    const user = userEvent.setup();
    const checkboxes = screen.getAllByRole('checkbox');

    await user.click(checkboxes[0]);

    expect(checkboxes[0]).toBeChecked();
    await waitFor(() => {
      expect(mockToggle).toHaveBeenCalledWith(1);
    });
  });

  it('reverts optimistic toggle and shows error dialog when service call fails', async () => {
    mockToggle.mockRejectedValue(new Error('Failed'));
    await renderAndWaitForLoad();

    const user = userEvent.setup();
    const checkboxes = screen.getAllByRole('checkbox');

    await user.click(checkboxes[0]);

    await waitFor(() => {
      expect(mockToggle).toHaveBeenCalledWith(1);
    });
    await waitFor(() => {
      expect(checkboxes[0]).not.toBeChecked();
    });
    expect(screen.getByTestId('error-dialog')).toBeInTheDocument();
    expect(screen.getByText('Failed to update todo')).toBeInTheDocument();
  });

  it('dismisses error dialog when OK is clicked', async () => {
    mockGetAll.mockRejectedValue(new Error('Network error'));
    render(<TodoList />);

    await waitFor(() => {
      expect(screen.getByTestId('error-dialog')).toBeInTheDocument();
    });

    const user = userEvent.setup();
    await user.click(screen.getByRole('button', { name: 'OK' }));

    expect(screen.queryByTestId('error-dialog')).not.toBeInTheDocument();
  });

  it('applies strikethrough class for completed items', async () => {
    await renderAndWaitForLoad();
    const text = screen.getByText('Create new app for the store!');
    expect(text.className).toContain('todoTextChecked');
  });

  it('applies strikethrough class after toggling', async () => {
    const toggledItem = { ...fakeItems[0], completed: true };
    mockToggle.mockResolvedValue(toggledItem);
    await renderAndWaitForLoad();

    const user = userEvent.setup();
    const checkboxes = screen.getAllByRole('checkbox');
    const text = screen.getByText('Setup vercel account for backend!');

    expect(text.className).not.toContain('todoTextChecked');
    await user.click(checkboxes[0]);
    expect(text.className).toContain('todoTextChecked');
  });

  describe('readOnly mode', () => {
    function renderReadOnly() {
      mockGetAll.mockResolvedValue(fakeItems);
      render(<TodoList readOnly />);
      return waitFor(() => {
        expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
      });
    }

    it('disables all checkboxes when readOnly is true', async () => {
      await renderReadOnly();
      const checkboxes = screen.getAllByRole('checkbox');
      checkboxes.forEach(cb => expect(cb).toBeDisabled());
    });

    it('does not call toggle when clicking a disabled checkbox', async () => {
      await renderReadOnly();
      const user = userEvent.setup();
      const checkboxes = screen.getAllByRole('checkbox');

      await user.click(checkboxes[0]);
      expect(mockToggle).not.toHaveBeenCalled();
    });
  });
});
