'use client';

import { useState, useEffect } from 'react';
import styles from './TodoList.module.css';
import { TodoService } from '../../services/TodoService/TodoService';
import type { TodoItem } from '../../services/TodoService/types';

const todoService = new TodoService();

export default function TodoList() {
  const [items, setItems] = useState<TodoItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    todoService.getAll()
      .then(setItems)
      .catch(() => setError('Failed to load todos'))
      .finally(() => setLoading(false));
  }, []);

  const toggleItem = async (id: number) => {
    const original = items;
    setItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
    try {
      const updated = await todoService.toggle(id);
      setItems(prev =>
        prev.map(item => (item.id === updated.id ? updated : item))
      );
    } catch {
      setItems(original);
    }
  };

  return (
    <div className={styles.todoList}>
      <div className={styles.todoHeader}>
        <div className={styles.todoControls}>
          <span className={styles.todoControl} style={{ backgroundColor: '#ff5f56' }}></span>
          <span className={styles.todoControl} style={{ backgroundColor: '#ffbd2e' }}></span>
          <span className={styles.todoControl} style={{ backgroundColor: '#27c93f' }}></span>
        </div>
        <div className={styles.todoTitle}>To Do</div>
      </div>
      <div className={styles.todoContent}>
        {loading && <div className={styles.todoText}>Loading...</div>}
        {error && <div className={styles.todoText}>{error}</div>}
        {items.map(item => (
          <div key={item.id} className={styles.todoItem}>
            <input
              type="checkbox"
              className={styles.todoCheckbox}
              checked={item.completed}
              onChange={() => toggleItem(item.id)}
            />
            <span className={`${styles.todoText} ${item.completed ? styles.todoTextChecked : ''}`}>
              {item.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
