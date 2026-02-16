import type { TodoItem, TodoApiResponse } from './types';

const DEFAULT_BASE_URL = 'https://rag-pipeline-91ct.vercel.app';

function mapResponse(data: TodoApiResponse): TodoItem {
  return {
    id: data.id,
    title: data.title,
    description: data.description,
    completed: data.completed,
    createdAt: data.created_at,
    updatedAt: data.updated_at,
  };
}

export class TodoService {
  private baseUrl: string;

  constructor(baseUrl: string = DEFAULT_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  private getAuthHeaders(): Record<string, string> {
    const apiKey = typeof window !== 'undefined'
      ? localStorage.getItem('kikos-api-key')
      : null;
    return apiKey ? { 'X-API-Key': apiKey } : {};
  }

  async validateKey(): Promise<boolean> {
    const headers = this.getAuthHeaders();
    if (!headers['X-API-Key']) return false;
    try {
      const res = await fetch(`${this.baseUrl}/api/settings/validate-key`, { headers });
      return res.ok;
    } catch {
      return false;
    }
  }

  async getAll(): Promise<TodoItem[]> {
    const res = await fetch(`${this.baseUrl}/api/todos/`);
    if (!res.ok) throw new Error('Failed to fetch todos');
    const data: TodoApiResponse[] = await res.json();
    return data.map(mapResponse);
  }

  async add(title: string): Promise<TodoItem> {
    const res = await fetch(`${this.baseUrl}/api/todos/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...this.getAuthHeaders() },
      body: JSON.stringify({ title }),
    });
    if (!res.ok) throw new Error('Failed to create todo');
    return mapResponse(await res.json());
  }

  async toggle(id: number): Promise<TodoItem> {
    const getRes = await fetch(`${this.baseUrl}/api/todos/${id}`);
    if (!getRes.ok) throw new Error('Failed to fetch todo');
    const current: TodoApiResponse = await getRes.json();

    const patchRes = await fetch(`${this.baseUrl}/api/todos/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', ...this.getAuthHeaders() },
      body: JSON.stringify({ completed: !current.completed }),
    });
    if (!patchRes.ok) throw new Error('Failed to update todo');
    return mapResponse(await patchRes.json());
  }

  async update(id: number, title: string): Promise<TodoItem> {
    const res = await fetch(`${this.baseUrl}/api/todos/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', ...this.getAuthHeaders() },
      body: JSON.stringify({ title }),
    });
    if (!res.ok) throw new Error('Failed to update todo');
    return mapResponse(await res.json());
  }

  async delete(id: number): Promise<void> {
    const res = await fetch(`${this.baseUrl}/api/todos/${id}`, {
      method: 'DELETE',
      headers: { ...this.getAuthHeaders() },
    });
    if (!res.ok) throw new Error('Failed to delete todo');
  }
}
