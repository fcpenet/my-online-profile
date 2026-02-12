'use client';

import { useState } from 'react';
import styles from './TodoList.module.css';

const todoItems = [
  'Setup vercel account for backend!',
  'Add to do list feature on my profile page',
  'Create new app for the store!',
];

export default function TodoList() {
  const [checkedItems, setCheckedItems] = useState<Set<number>>(new Set());

  const toggleItem = (index: number) => {
    setCheckedItems(prev => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
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
        {todoItems.map((text, index) => (
          <div key={index} className={styles.todoItem}>
            <input
              type="checkbox"
              className={styles.todoCheckbox}
              checked={checkedItems.has(index)}
              onChange={() => toggleItem(index)}
            />
            <span className={`${styles.todoText} ${checkedItems.has(index) ? styles.todoTextChecked : ''}`}>
              {text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
