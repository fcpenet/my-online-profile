'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './page.module.css';

const VSCodeIcon = () => (
  <svg viewBox="0 0 100 100" className={styles.vscodeIcon}>
    <mask id="mask" fill="#fff">
      <path d="M70 10L30 50l40 40 20-15V25z" />
      <path d="M30 50L10 35v30z" />
      <path d="M70 10L10 35l60 55 20-15z" fill="#fff" fillOpacity=".3" />
    </mask>
    <path d="M70 10L30 50l40 40 20-15V25L70 10z" fill="#0065A9" />
    <path d="M30 50L10 35v30l20-15z" fill="#007ACC" />
    <path d="M70 10L10 35l60 55 20-15V25L70 10z" fill="#1F9CF0" mask="url(#mask)" />
    <path d="M70 10v80l20-15V25L70 10z" fill="#0065A9" />
  </svg>
);

export default function Desktop() {
  const [time, setTime] = useState<string>('');
  const [date, setDate] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      }));
      setDate(now.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric'
      }));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.desktop}>
      {/* Menu Bar */}
      <div className={styles.menuBar}>
        <div className={styles.menuLeft}>
          <span className={styles.appleIcon}></span>
          <span className={styles.menuItem}>Finder</span>
          <span className={styles.menuItem}>File</span>
          <span className={styles.menuItem}>Edit</span>
          <span className={styles.menuItem}>View</span>
        </div>
        <div className={styles.menuRight}>
          <span className={styles.menuIcon}>🔋</span>
          <span className={styles.menuIcon}>📶</span>
          <span className={styles.dateTime}>
            <span>{date}</span>
            <span>{time}</span>
          </span>
        </div>
      </div>

      {/* Post-it Notes */}
      <div className={styles.postItContainer}>
        <div className={`${styles.postIt} ${styles.postItYellow}`} style={{ transform: 'rotate(-2deg)' }}>
          <div className={styles.postItMetric}>75%</div>
          <div className={styles.postItText}>Reduction in data processing time</div>
        </div>
        <div className={`${styles.postIt} ${styles.postItPink}`} style={{ transform: 'rotate(3deg)' }}>
          <div className={styles.postItMetric}>90%</div>
          <div className={styles.postItText}>On-time feature delivery rate</div>
        </div>
        <div className={`${styles.postIt} ${styles.postItBlue}`} style={{ transform: 'rotate(-1deg)' }}>
          <div className={styles.postItMetric}>Zero</div>
          <div className={styles.postItText}>Manual deployments</div>
        </div>
        <div className={`${styles.postIt} ${styles.postItGreen}`} style={{ transform: 'rotate(2deg)' }}>
          <div className={styles.postItMetric}>13+</div>
          <div className={styles.postItText}>Years of experience</div>
        </div>
      </div>

      {/* Desktop Icons */}
      <div className={styles.iconsContainer}>
        <Link href="/resume" className={styles.iconWrapper}>
          <div className={styles.icon} style={{ background: 'linear-gradient(135deg, #3b82f622, #3b82f644)' }}>
            <span className={styles.iconEmoji}>📄</span>
          </div>
          <span className={styles.iconLabel}>Resume</span>
        </Link>

        <Link href="/workspace" className={styles.iconWrapper}>
          <div className={styles.icon} style={{ background: 'linear-gradient(135deg, #007ACC22, #007ACC44)' }}>
            <VSCodeIcon />
          </div>
          <span className={styles.iconLabel}>Workspace</span>
        </Link>

        <Link href="/game" className={styles.iconWrapper}>
          <div className={styles.icon} style={{ background: 'linear-gradient(135deg, #22c55e22, #22c55e44)' }}>
            <span className={styles.iconEmoji}>🐍</span>
          </div>
          <span className={styles.iconLabel}>Snake</span>
        </Link>
      </div>

      {/* Dock */}
      <div className={styles.dock}>
        <div className={styles.dockContainer}>
          <Link href="/resume" className={styles.dockItem} title="Resume">
            <div className={styles.dockIcon}>📄</div>
          </Link>
          <Link href="/workspace" className={styles.dockItem} title="Workspace">
            <div className={`${styles.dockIcon} ${styles.dockIconVscode}`}>
              <VSCodeIcon />
            </div>
          </Link>
          <Link href="/game" className={styles.dockItem} title="Snake Game">
            <div className={styles.dockIcon}>🐍</div>
          </Link>
          <div className={styles.dockSeparator}></div>
          <a href="mailto:me@kikopenetrante.com" className={styles.dockItem} title="Email">
            <div className={styles.dockIcon}>✉️</div>
          </a>
        </div>
      </div>
    </div>
  );
}
