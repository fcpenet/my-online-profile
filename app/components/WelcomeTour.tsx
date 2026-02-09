'use client';

import { useState } from 'react';
import styles from './WelcomeTour.module.css';

interface WelcomeTourProps {
  isVisible: boolean;
  onClose: () => void;
}

export default function WelcomeTour({ isVisible, onClose }: WelcomeTourProps) {
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  const tourSlides = [
    {
      title: 'Welcome to My World! 👋',
      content: 'Hi! I\'m Kiko (Francis Penetrante), a Senior Software Engineer with 13+ years of experience. This is my digital playground where technology meets creativity.',
      icon: '🚀'
    },
    {
      title: 'The Builder',
      content: 'I love crafting elegant solutions to complex problems. From optimizing ETL pipelines to building federated GraphQL architectures, I thrive on making systems faster and more efficient.',
      icon: '🛠️'
    },
    {
      title: 'Full Stack Enthusiast',
      content: 'I work across the entire stack - React, Node.js, Python, cloud platforms (GCP, AWS, Azure). Whether it\'s frontend beauty or backend performance, I\'ve got you covered.',
      icon: '💻'
    },
    {
      title: 'Impact Driven',
      content: 'My work speaks through results: 75% reduction in processing time, 90% code coverage, zero manual deployments. I don\'t just write code, I deliver measurable impact.',
      icon: '🎯'
    },
    {
      title: 'Explore & Connect',
      content: 'Feel free to explore my workspace, check out my projects, or dive into a quick game of Snake. Ready to see what I can do? Let\'s connect!',
      icon: '🌟'
    }
  ];

  const handleNextSlide = () => {
    if (currentSlide < tourSlides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onClose();
    }
  };

  const handlePrevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const handleSkipTour = () => {
    onClose();
  };

  if (!isVisible) return null;

  return (
    <div className={styles.tourOverlay}>
      <div className={styles.tourWindow}>
        <div className={styles.tourHeader}>
          <div className={styles.tourControls}>
            <button
              className={styles.tourControlRed}
              onClick={handleSkipTour}
              title="Close"
            />
            <span className={styles.tourControlYellow}></span>
            <span className={styles.tourControlGreen}></span>
          </div>
          <div className={styles.tourTitle}>Welcome Tour</div>
          <div className={styles.tourControlsPlaceholder}></div>
        </div>
        <div className={styles.tourContent}>
          <div className={styles.tourSlide}>
            <div className={styles.tourIcon}>{tourSlides[currentSlide].icon}</div>
            <h2 className={styles.tourSlideTitle}>{tourSlides[currentSlide].title}</h2>
            <p className={styles.tourSlideContent}>{tourSlides[currentSlide].content}</p>
          </div>
          <div className={styles.tourProgress}>
            {tourSlides.map((_, index) => (
              <span
                key={index}
                className={`${styles.tourDot} ${index === currentSlide ? styles.tourDotActive : ''}`}
              />
            ))}
          </div>
          <div className={styles.tourNavigation}>
            <button
              className={styles.tourButton}
              onClick={handlePrevSlide}
              disabled={currentSlide === 0}
            >
              Previous
            </button>
            <button
              className={styles.tourButtonSkip}
              onClick={handleSkipTour}
            >
              Skip Tour
            </button>
            <button
              className={styles.tourButton}
              onClick={handleNextSlide}
            >
              {currentSlide === tourSlides.length - 1 ? 'Get Started' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
