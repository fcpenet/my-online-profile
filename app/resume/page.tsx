'use client';

import { useState } from 'react';
import styles from './page.module.css';
import ResumeMinimal from '../components/Resume/ResumeMinimal';
import ResumeTimeline from '../components/Resume/ResumeTimeline';

type ResumeFormat = 'minimal' | 'timeline';

const formats: { key: ResumeFormat; label: string }[] = [
  { key: 'minimal', label: 'Minimal' },
  { key: 'timeline', label: 'Timeline' },
];

export default function ResumePage() {
  const [format, setFormat] = useState<ResumeFormat>('minimal');

  return (
    <main className={styles.main}>
      <div className={styles.formatSwitcher}>
        {formats.map(({ key, label }) => (
          <button
            key={key}
            className={`${styles.formatButton} ${format === key ? styles.formatButtonActive : ''}`}
            onClick={() => setFormat(key)}
          >
            {label}
          </button>
        ))}
      </div>
      {format === 'minimal' && <ResumeMinimal />}
      {format === 'timeline' && <ResumeTimeline />}
    </main>
  );
}
