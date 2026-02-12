import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TodoList from './TodoList';

describe('TodoList', () => {
  it('renders the window header with title', () => {
    render(<TodoList />);
    expect(screen.getByText('To Do')).toBeInTheDocument();
  });

  it('renders all three todo items', () => {
    render(<TodoList />);
    expect(screen.getByText('Setup vercel account for backend!')).toBeInTheDocument();
    expect(screen.getByText('Add to do list feature on my profile page')).toBeInTheDocument();
    expect(screen.getByText('Create new app for the store!')).toBeInTheDocument();
  });

  it('renders three checkboxes, all unchecked by default', () => {
    render(<TodoList />);
    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes).toHaveLength(3);
    checkboxes.forEach(cb => {
      expect(cb).not.toBeChecked();
    });
  });

  it('checks a checkbox when clicked', async () => {
    const user = userEvent.setup();
    render(<TodoList />);
    const checkboxes = screen.getAllByRole('checkbox');

    await user.click(checkboxes[0]);
    expect(checkboxes[0]).toBeChecked();
    expect(checkboxes[1]).not.toBeChecked();
    expect(checkboxes[2]).not.toBeChecked();
  });

  it('unchecks a checkbox when clicked again', async () => {
    const user = userEvent.setup();
    render(<TodoList />);
    const checkboxes = screen.getAllByRole('checkbox');

    await user.click(checkboxes[1]);
    expect(checkboxes[1]).toBeChecked();

    await user.click(checkboxes[1]);
    expect(checkboxes[1]).not.toBeChecked();
  });

  it('applies strikethrough class when item is checked', async () => {
    const user = userEvent.setup();
    render(<TodoList />);
    const checkboxes = screen.getAllByRole('checkbox');
    const text = screen.getByText('Setup vercel account for backend!');

    expect(text.className).not.toContain('todoTextChecked');

    await user.click(checkboxes[0]);
    expect(text.className).toContain('todoTextChecked');
  });

  it('allows multiple items to be checked independently', async () => {
    const user = userEvent.setup();
    render(<TodoList />);
    const checkboxes = screen.getAllByRole('checkbox');

    await user.click(checkboxes[0]);
    await user.click(checkboxes[2]);

    expect(checkboxes[0]).toBeChecked();
    expect(checkboxes[1]).not.toBeChecked();
    expect(checkboxes[2]).toBeChecked();
  });
});
