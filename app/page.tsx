'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './page.module.css';
import WelcomeTour from './components/WelcomeTour';

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

const ChromeIcon = () => (
  <svg viewBox="0 0 100 100" className={styles.chromeIcon}>
    <circle cx="50" cy="50" r="45" fill="#fff"/>
    <circle cx="50" cy="50" r="40" fill="#4285F4"/>
    <circle cx="50" cy="50" r="30" fill="#fff"/>
    <circle cx="50" cy="50" r="20" fill="#4285F4"/>
    <path d="M50 10 L50 45 L15 20 Z" fill="#EA4335"/>
    <path d="M50 45 L85 20 L70 50 Z" fill="#FBBC04"/>
    <path d="M50 45 L70 50 L30 80 Z" fill="#34A853"/>
  </svg>
);

export default function Desktop() {
  const [time, setTime] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [isBooting, setIsBooting] = useState<boolean>(true);
  const [bootProgress, setBootProgress] = useState<number>(0);
  const [bootMessages, setBootMessages] = useState<string[]>([]);
  const [showTour, setShowTour] = useState<boolean>(false);

  const bootSequence = [
    'kikOS v4.2.0',
    'Initializing system...',
    'Loading kernel modules...',
    'Detecting hardware...',
    'Starting network services...',
    'Mounting file systems...',
    'Loading user profile...',
    'Starting desktop environment...',
    'kikOS ready.'
  ];

  useEffect(() => {
    if (!isBooting) return;

    const totalDuration = 3000; // 3 seconds total boot time
    const messageDelay = totalDuration / bootSequence.length;

    bootSequence.forEach((message, index) => {
      setTimeout(() => {
        setBootMessages(prev => [...prev, message]);
        setBootProgress(((index + 1) / bootSequence.length) * 100);

        if (index === bootSequence.length - 1) {
          setTimeout(() => {
            setIsBooting(false);
            setShowTour(true);
          }, 500);
        }
      }, messageDelay * index);
    });
  }, []);

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

  const handleCloseTour = () => {
    setShowTour(false);
  };

  if (isBooting) {
    return (
      <div className={styles.bootScreen}>
        <div className={styles.bootContent}>
          <div className={styles.bootHeader}>
            <div className={styles.bootLogo}>kikOS</div>
            <div className={styles.bootVersion}>Version 4.2.0</div>
          </div>
          <div className={styles.bootMessages}>
            {bootMessages.map((message, index) => (
              <div key={index} className={styles.bootMessage}>
                {message}
              </div>
            ))}
          </div>
          <div className={styles.bootProgressBar}>
            <div
              className={styles.bootProgressFill}
              style={{ width: `${bootProgress}%` }}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.desktop}>
      {/* Personality Tour */}
      <WelcomeTour isVisible={showTour} onClose={handleCloseTour} />

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

      {/* To-Do List */}
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
          <div className={styles.todoItem}>
            <input type="checkbox" className={styles.todoCheckbox} />
            <span className={styles.todoText}>Setup vercel account for backend!</span>
          </div>
          <div className={styles.todoItem}>
            <input type="checkbox" className={styles.todoCheckbox} />
            <span className={styles.todoText}>Add to do list feature on my profile page</span>
          </div>
          <div className={styles.todoItem}>
            <input type="checkbox" className={styles.todoCheckbox} />
            <span className={styles.todoText}>Create new app for the store!</span>
          </div>
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

        <Link href="/projects" className={styles.iconWrapper}>
          <div className={styles.icon} style={{ background: 'linear-gradient(135deg, #4285F422, #4285F444)' }}>
            <ChromeIcon />
          </div>
          <span className={styles.iconLabel}>Projects</span>
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
          <Link href="/projects" className={styles.dockItem} title="Projects">
            <div className={`${styles.dockIcon} ${styles.dockIconChrome}`}>
              <ChromeIcon />
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
