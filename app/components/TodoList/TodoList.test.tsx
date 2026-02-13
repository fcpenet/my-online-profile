import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TodoList from './TodoList';
import type { TodoItem } from '../../services/TodoService/types';

const mockGetAll = jest.fn();
const mockToggle = jest.fn();
const mockAdd = jest.fn();

jest.mock('../../services/TodoService/TodoService', () => ({
  TodoService: jest.fn().mockImplementation(() => ({
    getAll: (...args: unknown[]) => mockGetAll(...args),
    toggle: (...args: unknown[]) => mockToggle(...args),
    add: (...args: unknown[]) => mockAdd(...args),
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

  it('applies strikethrough class for completed items', async () => {
    await renderAndWaitForLoad();
    const text = screen.getByText('Create new app for the store!');
    expect(text.className).toContain('todoTextChecked');
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

  describe('toggle (local only)', () => {
    it('toggles checkbox locally without calling the API', async () => {
      await renderAndWaitForLoad();
      const user = userEvent.setup();
      const checkboxes = screen.getAllByRole('checkbox');

      await user.click(checkboxes[0]);

      expect(checkboxes[0]).toBeChecked();
      expect(mockToggle).not.toHaveBeenCalled();
    });

    it('applies strikethrough class after toggling', async () => {
      await renderAndWaitForLoad();
      const user = userEvent.setup();
      const checkboxes = screen.getAllByRole('checkbox');
      const text = screen.getByText('Setup vercel account for backend!');

      expect(text.className).not.toContain('todoTextChecked');
      await user.click(checkboxes[0]);
      expect(text.className).toContain('todoTextChecked');
    });
  });

  describe('save button', () => {
    it('is not visible when there are no changes', async () => {
      await renderAndWaitForLoad();
      expect(screen.queryByRole('button', { name: 'Save' })).not.toBeInTheDocument();
    });

    it('appears after toggling a checkbox', async () => {
      await renderAndWaitForLoad();
      const user = userEvent.setup();
      const checkboxes = screen.getAllByRole('checkbox');

      await user.click(checkboxes[0]);

      expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument();
    });

    it('disappears after toggling back to original state', async () => {
      await renderAndWaitForLoad();
      const user = userEvent.setup();
      const checkboxes = screen.getAllByRole('checkbox');

      await user.click(checkboxes[0]);
      expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument();

      await user.click(checkboxes[0]);
      expect(screen.queryByRole('button', { name: 'Save' })).not.toBeInTheDocument();
    });

    it('calls toggle for each changed item when clicked', async () => {
      const toggled1 = { ...fakeItems[0], completed: true };
      const toggled2 = { ...fakeItems[1], completed: true };
      mockToggle.mockImplementation((id: number) => {
        if (id === 1) return Promise.resolve(toggled1);
        if (id === 2) return Promise.resolve(toggled2);
        return Promise.reject(new Error('Unexpected id'));
      });

      await renderAndWaitForLoad();
      const user = userEvent.setup();
      const checkboxes = screen.getAllByRole('checkbox');

      await user.click(checkboxes[0]);
      await user.click(checkboxes[1]);

      await user.click(screen.getByRole('button', { name: 'Save' }));

      await waitFor(() => {
        expect(mockToggle).toHaveBeenCalledWith(1);
        expect(mockToggle).toHaveBeenCalledWith(2);
        expect(mockToggle).toHaveBeenCalledTimes(2);
      });
    });

    it('disappears after successful save', async () => {
      const toggled = { ...fakeItems[0], completed: true };
      mockToggle.mockResolvedValue(toggled);

      await renderAndWaitForLoad();
      const user = userEvent.setup();
      const checkboxes = screen.getAllByRole('checkbox');

      await user.click(checkboxes[0]);
      await user.click(screen.getByRole('button', { name: 'Save' }));

      await waitFor(() => {
        expect(screen.queryByRole('button', { name: 'Save' })).not.toBeInTheDocument();
      });
    });

    it('reverts changes and shows error dialog when save fails', async () => {
      mockToggle.mockRejectedValue(new Error('Server error'));

      await renderAndWaitForLoad();
      const user = userEvent.setup();
      const checkboxes = screen.getAllByRole('checkbox');

      await user.click(checkboxes[0]);
      expect(checkboxes[0]).toBeChecked();

      await user.click(screen.getByRole('button', { name: 'Save' }));

      await waitFor(() => {
        expect(checkboxes[0]).not.toBeChecked();
      });
      expect(screen.getByTestId('error-dialog')).toBeInTheDocument();
      expect(screen.getByText('Failed to save changes')).toBeInTheDocument();
    });

    it('is not visible in readOnly mode even with local changes', async () => {
      mockGetAll.mockResolvedValue(fakeItems);
      render(<TodoList readOnly />);
      await waitFor(() => {
        expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
      });
      expect(screen.queryByRole('button', { name: 'Save' })).not.toBeInTheDocument();
    });
  });

  describe('add item', () => {
    it('renders the add form when not readOnly', async () => {
      await renderAndWaitForLoad();
      expect(screen.getByPlaceholderText('Add a new todo...')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Add' })).toBeInTheDocument();
    });

    it('does not render the add form in readOnly mode', async () => {
      mockGetAll.mockResolvedValue(fakeItems);
      render(<TodoList readOnly />);
      await waitFor(() => {
        expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
      });
      expect(screen.queryByPlaceholderText('Add a new todo...')).not.toBeInTheDocument();
      expect(screen.queryByRole('button', { name: 'Add' })).not.toBeInTheDocument();
    });

    it('adds a new item via the service', async () => {
      const newItem: TodoItem = { id: 4, title: 'New todo', description: null, completed: false, createdAt: '', updatedAt: '' };
      mockAdd.mockResolvedValue(newItem);

      await renderAndWaitForLoad();
      const user = userEvent.setup();

      await user.type(screen.getByPlaceholderText('Add a new todo...'), 'New todo');
      await user.click(screen.getByRole('button', { name: 'Add' }));

      await waitFor(() => {
        expect(mockAdd).toHaveBeenCalledWith('New todo');
      });
      expect(screen.getByText('New todo')).toBeInTheDocument();
    });

    it('clears input after successful add', async () => {
      const newItem: TodoItem = { id: 4, title: 'New todo', description: null, completed: false, createdAt: '', updatedAt: '' };
      mockAdd.mockResolvedValue(newItem);

      await renderAndWaitForLoad();
      const user = userEvent.setup();

      const input = screen.getByPlaceholderText('Add a new todo...');
      await user.type(input, 'New todo');
      await user.click(screen.getByRole('button', { name: 'Add' }));

      await waitFor(() => {
        expect(input).toHaveValue('');
      });
    });

    it('shows validation error when submitting empty input', async () => {
      await renderAndWaitForLoad();
      const user = userEvent.setup();

      await user.click(screen.getByRole('button', { name: 'Add' }));

      expect(screen.getByText('Please enter a title')).toBeInTheDocument();
      expect(mockAdd).not.toHaveBeenCalled();
    });

    it('clears validation error when typing', async () => {
      await renderAndWaitForLoad();
      const user = userEvent.setup();

      await user.click(screen.getByRole('button', { name: 'Add' }));
      expect(screen.getByText('Please enter a title')).toBeInTheDocument();

      await user.type(screen.getByPlaceholderText('Add a new todo...'), 'a');
      expect(screen.queryByText('Please enter a title')).not.toBeInTheDocument();
    });

    it('adds item on Enter key', async () => {
      const newItem: TodoItem = { id: 4, title: 'Enter todo', description: null, completed: false, createdAt: '', updatedAt: '' };
      mockAdd.mockResolvedValue(newItem);

      await renderAndWaitForLoad();
      const user = userEvent.setup();

      await user.type(screen.getByPlaceholderText('Add a new todo...'), 'Enter todo{Enter}');

      await waitFor(() => {
        expect(mockAdd).toHaveBeenCalledWith('Enter todo');
      });
      expect(screen.getByText('Enter todo')).toBeInTheDocument();
    });

    it('shows error dialog when add fails', async () => {
      mockAdd.mockRejectedValue(new Error('Server error'));

      await renderAndWaitForLoad();
      const user = userEvent.setup();

      await user.type(screen.getByPlaceholderText('Add a new todo...'), 'Failing todo');
      await user.click(screen.getByRole('button', { name: 'Add' }));

      await waitFor(() => {
        expect(screen.getByTestId('error-dialog')).toBeInTheDocument();
        expect(screen.getByText('Failed to add todo')).toBeInTheDocument();
      });
    });
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
