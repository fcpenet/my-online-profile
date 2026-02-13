'use client';

import styles from './ErrorDialog.module.css';

interface ErrorDialogProps {
  isVisible: boolean;
  onClose: () => void;
  title: string;
  message: string;
}

export default function ErrorDialog({ isVisible, onClose, title, message }: ErrorDialogProps) {
  if (!isVisible) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.dialog}>
        <div className={styles.header}>
          <div className={styles.controls}>
            <span
              className={styles.control}
              style={{ backgroundColor: '#ff5f56' }}
              onClick={onClose}
              role="button"
              aria-label="Close dialog"
            />
            <span className={styles.control} style={{ backgroundColor: '#ffbd2e' }} />
            <span className={styles.control} style={{ backgroundColor: '#27c93f' }} />
          </div>
          <div className={styles.headerTitle}>{title}</div>
        </div>
        <div className={styles.body}>
          <div className={styles.icon}>⚠️</div>
          <div className={styles.title}>{title}</div>
          <div className={styles.message}>{message}</div>
          <button className={styles.button} onClick={onClose}>OK</button>
        </div>
      </div>
    </div>
  );
}
