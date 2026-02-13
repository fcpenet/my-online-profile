import { TodoService } from './TodoService';
import type { TodoApiResponse } from './types';

const BASE_URL = 'https://rag-pipeline-91ct-fdqd29zfy-fcpenets-projects.vercel.app';

function mockApiResponse(id: number, overrides: Partial<TodoApiResponse> = {}): TodoApiResponse {
  return {
    id,
    title: `Todo ${id}`,
    description: null,
    completed: false,
    created_at: '2025-01-01T00:00:00Z',
    updated_at: '2025-01-01T00:00:00Z',
    ...overrides,
  };
}

function mockFetch(response: unknown, status = 200) {
  return jest.fn().mockResolvedValue({
    ok: status >= 200 && status < 300,
    status,
    json: () => Promise.resolve(response),
  });
}

describe('TodoService', () => {
  let service: TodoService;
  const originalFetch = global.fetch;

  beforeEach(() => {
    service = new TodoService(BASE_URL);
    localStorage.setItem('kikos-api-key', 'test-key-123');
  });

  afterEach(() => {
    global.fetch = originalFetch;
    localStorage.clear();
  });

  describe('getAll', () => {
    it('calls GET /api/todos/ and returns mapped items', async () => {
      const apiItems = [mockApiResponse(1), mockApiResponse(2, { title: 'Second' })];
      global.fetch = mockFetch(apiItems);

      const items = await service.getAll();

      expect(global.fetch).toHaveBeenCalledWith(`${BASE_URL}/api/todos/`);
      expect(items).toHaveLength(2);
      expect(items[0]).toEqual({
        id: 1,
        title: 'Todo 1',
        description: null,
        completed: false,
        createdAt: '2025-01-01T00:00:00Z',
        updatedAt: '2025-01-01T00:00:00Z',
      });
      expect(items[1].title).toBe('Second');
    });

    it('returns an empty array when API returns no items', async () => {
      global.fetch = mockFetch([]);
      const items = await service.getAll();
      expect(items).toEqual([]);
    });

    it('throws when API returns an error', async () => {
      global.fetch = mockFetch(null, 500);
      await expect(service.getAll()).rejects.toThrow('Failed to fetch todos');
    });
  });

  describe('add', () => {
    it('calls POST /api/todos/ with title and returns the created item', async () => {
      const apiItem = mockApiResponse(1, { title: 'New task' });
      global.fetch = mockFetch(apiItem, 201);

      const item = await service.add('New task');

      expect(global.fetch).toHaveBeenCalledWith(`${BASE_URL}/api/todos/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-API-Key': 'test-key-123' },
        body: JSON.stringify({ title: 'New task' }),
      });
      expect(item.title).toBe('New task');
      expect(item.completed).toBe(false);
      expect(item.id).toBe(1);
    });

    it('throws when API returns an error', async () => {
      global.fetch = mockFetch(null, 422);
      await expect(service.add('Bad')).rejects.toThrow('Failed to create todo');
    });
  });

  describe('toggle', () => {
    it('fetches the item then patches with the opposite completed value', async () => {
      const getResponse = mockApiResponse(1, { completed: false });
      const patchResponse = mockApiResponse(1, { completed: true });

      global.fetch = jest.fn()
        .mockResolvedValueOnce({ ok: true, json: () => Promise.resolve(getResponse) })
        .mockResolvedValueOnce({ ok: true, json: () => Promise.resolve(patchResponse) });

      const item = await service.toggle(1);

      expect(global.fetch).toHaveBeenNthCalledWith(1, `${BASE_URL}/api/todos/1`);
      expect(global.fetch).toHaveBeenNthCalledWith(2, `${BASE_URL}/api/todos/1`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', 'X-API-Key': 'test-key-123' },
        body: JSON.stringify({ completed: true }),
      });
      expect(item.completed).toBe(true);
    });

    it('toggles a checked item to unchecked', async () => {
      const getResponse = mockApiResponse(1, { completed: true });
      const patchResponse = mockApiResponse(1, { completed: false });

      global.fetch = jest.fn()
        .mockResolvedValueOnce({ ok: true, json: () => Promise.resolve(getResponse) })
        .mockResolvedValueOnce({ ok: true, json: () => Promise.resolve(patchResponse) });

      const item = await service.toggle(1);

      expect(global.fetch).toHaveBeenNthCalledWith(2, `${BASE_URL}/api/todos/1`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', 'X-API-Key': 'test-key-123' },
        body: JSON.stringify({ completed: false }),
      });
      expect(item.completed).toBe(false);
    });

    it('throws when the GET request fails', async () => {
      global.fetch = mockFetch(null, 404);
      await expect(service.toggle(999)).rejects.toThrow('Failed to fetch todo');
    });

    it('throws when the PATCH request fails', async () => {
      const getResponse = mockApiResponse(1);
      global.fetch = jest.fn()
        .mockResolvedValueOnce({ ok: true, json: () => Promise.resolve(getResponse) })
        .mockResolvedValueOnce({ ok: false, status: 500, json: () => Promise.resolve(null) });

      await expect(service.toggle(1)).rejects.toThrow('Failed to update todo');
    });
  });

  describe('update', () => {
    it('calls PATCH /api/todos/{id} with the new title', async () => {
      const apiItem = mockApiResponse(1, { title: 'Updated' });
      global.fetch = mockFetch(apiItem);

      const item = await service.update(1, 'Updated');

      expect(global.fetch).toHaveBeenCalledWith(`${BASE_URL}/api/todos/1`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', 'X-API-Key': 'test-key-123' },
        body: JSON.stringify({ title: 'Updated' }),
      });
      expect(item.title).toBe('Updated');
    });

    it('throws when API returns an error', async () => {
      global.fetch = mockFetch(null, 404);
      await expect(service.update(999, 'text')).rejects.toThrow('Failed to update todo');
    });
  });

  describe('delete', () => {
    it('calls DELETE /api/todos/{id}', async () => {
      global.fetch = mockFetch(null);

      await service.delete(1);

      expect(global.fetch).toHaveBeenCalledWith(`${BASE_URL}/api/todos/1`, {
        method: 'DELETE',
        headers: { 'X-API-Key': 'test-key-123' },
      });
    });

    it('throws when API returns an error', async () => {
      global.fetch = mockFetch(null, 404);
      await expect(service.delete(999)).rejects.toThrow('Failed to delete todo');
    });
  });

  describe('mapResponse', () => {
    it('maps snake_case API fields to camelCase', async () => {
      const apiItem = mockApiResponse(5, {
        title: 'Test',
        description: 'A description',
        completed: true,
        created_at: '2025-06-01T12:00:00Z',
        updated_at: '2025-06-02T14:00:00Z',
      });
      global.fetch = mockFetch([apiItem]);

      const items = await service.getAll();

      expect(items[0]).toEqual({
        id: 5,
        title: 'Test',
        description: 'A description',
        completed: true,
        createdAt: '2025-06-01T12:00:00Z',
        updatedAt: '2025-06-02T14:00:00Z',
      });
    });
  });
});
