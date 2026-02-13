'use client';

import { useState, useEffect } from 'react';
import styles from './TodoList.module.css';
import { TodoService } from '../../services/TodoService/TodoService';
import type { TodoItem } from '../../services/TodoService/types';
import ErrorDialog from '../ErrorDialog/ErrorDialog';

const todoService = new TodoService();

interface TodoListProps {
  readOnly?: boolean;
}

export default function TodoList({ readOnly = false }: TodoListProps) {
  const [items, setItems] = useState<TodoItem[]>([]);
  const [savedItems, setSavedItems] = useState<TodoItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newTitle, setNewTitle] = useState('');
  const [addError, setAddError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    todoService.getAll()
      .then((data) => {
        setItems(data);
        setSavedItems(data);
      })
      .catch(() => setError('Failed to load todos'))
      .finally(() => setLoading(false));
  }, []);

  const hasChanges = items.some((item) => {
    const saved = savedItems.find((s) => s.id === item.id);
    return saved && saved.completed !== item.completed;
  });

  const toggleItem = (id: number) => {
    setItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const saveChanges = async () => {
    setSaving(true);
    try {
      const changed = items.filter((item) => {
        const saved = savedItems.find((s) => s.id === item.id);
        return saved && saved.completed !== item.completed;
      });
      const results = await Promise.all(
        changed.map((item) => todoService.toggle(item.id))
      );
      setItems(prev =>
        prev.map(item => {
          const updated = results.find(r => r.id === item.id);
          return updated || item;
        })
      );
      setSavedItems(prev =>
        prev.map(saved => {
          const updated = results.find(r => r.id === saved.id);
          return updated || saved;
        })
      );
    } catch {
      setItems(savedItems);
      setError('Failed to save changes');
    } finally {
      setSaving(false);
    }
  };

  const addItem = async () => {
    const title = newTitle.trim();
    if (!title) {
      setAddError('Please enter a title');
      return;
    }
    setAddError(null);
    try {
      const created = await todoService.add(title);
      setItems(prev => [...prev, created]);
      setSavedItems(prev => [...prev, created]);
      setNewTitle('');
    } catch {
      setError('Failed to add todo');
    }
  };

  return (
    <div className={styles.todoList}>
      <ErrorDialog
        isVisible={!!error}
        onClose={() => setError(null)}
        title="Error"
        message={error || ''}
      />
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
        {items.map(item => (
          <div key={item.id} className={styles.todoItem}>
            <input
              type="checkbox"
              className={styles.todoCheckbox}
              checked={item.completed}
              onChange={() => toggleItem(item.id)}
              disabled={readOnly}
            />
            <span className={`${styles.todoText} ${item.completed ? styles.todoTextChecked : ''}`}>
              {item.title}
            </span>
          </div>
        ))}
        {hasChanges && !readOnly && (
          <button className={styles.saveButton} onClick={saveChanges} disabled={saving}>
            {saving ? 'Saving...' : 'Save'}
          </button>
        )}
        {!readOnly && (
          <div className={styles.addForm}>
            <input
              className={styles.addInput}
              type="text"
              placeholder="Add a new todo..."
              value={newTitle}
              onChange={(e) => {
                setNewTitle(e.target.value);
                if (addError) setAddError(null);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') addItem();
              }}
            />
            <button className={styles.addButton} onClick={addItem}>Add</button>
            {addError && <div className={styles.addError}>{addError}</div>}
          </div>
        )}
      </div>
    </div>
  );
}
