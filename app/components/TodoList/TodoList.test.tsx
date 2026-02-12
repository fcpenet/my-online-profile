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

  it('shows error message when fetch fails', async () => {
    mockGetAll.mockRejectedValue(new Error('Network error'));
    render(<TodoList />);

    await waitFor(() => {
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

  it('reverts optimistic toggle when service call fails', async () => {
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

  describe('add item', () => {
    it('renders an input field and add button', async () => {
      await renderAndWaitForLoad();
      expect(screen.getByPlaceholderText('Add a new todo...')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Add' })).toBeInTheDocument();
    });

    it('calls the service and appends the new item to the list', async () => {
      const newItem: TodoItem = { id: 4, title: 'Brand new task', description: null, completed: false, createdAt: '', updatedAt: '' };
      mockAdd.mockResolvedValue(newItem);
      await renderAndWaitForLoad();

      const user = userEvent.setup();
      const input = screen.getByPlaceholderText('Add a new todo...');
      const button = screen.getByRole('button', { name: 'Add' });

      await user.type(input, 'Brand new task');
      await user.click(button);

      await waitFor(() => {
        expect(mockAdd).toHaveBeenCalledWith('Brand new task');
      });
      await waitFor(() => {
        expect(screen.getByText('Brand new task')).toBeInTheDocument();
      });
      expect(screen.getAllByRole('checkbox')).toHaveLength(4);
    });

    it('clears the input after adding', async () => {
      const newItem: TodoItem = { id: 4, title: 'Another task', description: null, completed: false, createdAt: '', updatedAt: '' };
      mockAdd.mockResolvedValue(newItem);
      await renderAndWaitForLoad();

      const user = userEvent.setup();
      const input = screen.getByPlaceholderText('Add a new todo...');

      await user.type(input, 'Another task');
      await user.click(screen.getByRole('button', { name: 'Add' }));

      await waitFor(() => {
        expect(input).toHaveValue('');
      });
    });

    it('does not add when input is empty', async () => {
      await renderAndWaitForLoad();

      const user = userEvent.setup();
      await user.click(screen.getByRole('button', { name: 'Add' }));

      expect(mockAdd).not.toHaveBeenCalled();
    });

    it('shows an error message when pressing add with empty input', async () => {
      await renderAndWaitForLoad();

      const user = userEvent.setup();
      await user.click(screen.getByRole('button', { name: 'Add' }));

      expect(screen.getByText('Please enter a todo title')).toBeInTheDocument();
    });

    it('clears the empty error when user starts typing', async () => {
      await renderAndWaitForLoad();

      const user = userEvent.setup();
      await user.click(screen.getByRole('button', { name: 'Add' }));
      expect(screen.getByText('Please enter a todo title')).toBeInTheDocument();

      await user.type(screen.getByPlaceholderText('Add a new todo...'), 'a');
      expect(screen.queryByText('Please enter a todo title')).not.toBeInTheDocument();
    });

    it('adds item on Enter key press', async () => {
      const newItem: TodoItem = { id: 4, title: 'Enter task', description: null, completed: false, createdAt: '', updatedAt: '' };
      mockAdd.mockResolvedValue(newItem);
      await renderAndWaitForLoad();

      const user = userEvent.setup();
      const input = screen.getByPlaceholderText('Add a new todo...');

      await user.type(input, 'Enter task{Enter}');

      await waitFor(() => {
        expect(mockAdd).toHaveBeenCalledWith('Enter task');
      });
      await waitFor(() => {
        expect(screen.getByText('Enter task')).toBeInTheDocument();
      });
    });
  });
});
