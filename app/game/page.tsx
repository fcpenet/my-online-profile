'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import styles from './page.module.css';

type Position = { x: number; y: number };
type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

const GRID_SIZE = 20;
const INITIAL_SPEED = 150;

export default function Game() {
  const [snake, setSnake] = useState<Position[]>([{ x: 10, y: 10 }]);
  const [food, setFood] = useState<Position>({ x: 15, y: 10 });
  const [direction, setDirection] = useState<Direction>('RIGHT');
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const generateFood = useCallback((currentSnake: Position[]): Position => {
    let newFood: Position;
    do {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
    } while (currentSnake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
    return newFood;
  }, []);

  const resetGame = useCallback(() => {
    const initialSnake = [{ x: 10, y: 10 }];
    setSnake(initialSnake);
    setFood(generateFood(initialSnake));
    setDirection('RIGHT');
    setGameOver(false);
    setScore(0);
    setIsPlaying(true);
  }, [generateFood]);

  const checkCollision = useCallback((head: Position, snakeBody: Position[]): boolean => {
    // Wall collision
    if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
      return true;
    }
    // Self collision (check against body, not head)
    for (let i = 1; i < snakeBody.length; i++) {
      if (head.x === snakeBody[i].x && head.y === snakeBody[i].y) {
        return true;
      }
    }
    return false;
  }, []);

  // Game loop
  useEffect(() => {
    if (!isPlaying || gameOver) return;

    const moveSnake = () => {
      setSnake(prevSnake => {
        const head = { ...prevSnake[0] };

        switch (direction) {
          case 'UP':
            head.y -= 1;
            break;
          case 'DOWN':
            head.y += 1;
            break;
          case 'LEFT':
            head.x -= 1;
            break;
          case 'RIGHT':
            head.x += 1;
            break;
        }

        if (checkCollision(head, prevSnake)) {
          setGameOver(true);
          setIsPlaying(false);
          if (score > highScore) {
            setHighScore(score);
          }
          return prevSnake;
        }

        const newSnake = [head, ...prevSnake];

        // Check if food is eaten
        if (head.x === food.x && head.y === food.y) {
          setScore(prev => prev + 10);
          setFood(generateFood(newSnake));
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    };

    const gameInterval = setInterval(moveSnake, INITIAL_SPEED - Math.min(score, 100));
    return () => clearInterval(gameInterval);
  }, [isPlaying, gameOver, direction, food, score, highScore, checkCollision, generateFood]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!isPlaying && !gameOver && e.key === ' ') {
        resetGame();
        return;
      }

      if (gameOver && e.key === ' ') {
        resetGame();
        return;
      }

      switch (e.key) {
        case 'ArrowUp':
          if (direction !== 'DOWN') setDirection('UP');
          break;
        case 'ArrowDown':
          if (direction !== 'UP') setDirection('DOWN');
          break;
        case 'ArrowLeft':
          if (direction !== 'RIGHT') setDirection('LEFT');
          break;
        case 'ArrowRight':
          if (direction !== 'LEFT') setDirection('RIGHT');
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [direction, isPlaying, gameOver, resetGame]);

  return (
    <div className={styles.container}>
      {/* Hamburger Menu */}
      <div className={styles.hamburger} onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      {menuOpen && (
        <>
          <div className={styles.menuOverlay} onClick={() => setMenuOpen(false)}></div>
          <div className={styles.menu}>
            <Link href="/" className={styles.menuItem}>← Back to Resume</Link>
            <Link href="/book" className={styles.menuItem}>📖 Book View</Link>
            <Link href="/workspace" className={styles.menuItem}>💻 Workspace</Link>
          </div>
        </>
      )}

      <div className={styles.gameWrapper}>
        <h1 className={styles.title}>🐍 Snake Game</h1>

        <div className={styles.scoreBoard}>
          <div className={styles.score}>Score: {score}</div>
          <div className={styles.highScore}>High Score: {highScore}</div>
        </div>

        <div className={styles.gameContainer}>
          <div className={styles.grid}>
            {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, index) => {
              const x = index % GRID_SIZE;
              const y = Math.floor(index / GRID_SIZE);
              const isSnake = snake.some(segment => segment.x === x && segment.y === y);
              const isHead = snake[0].x === x && snake[0].y === y;
              const isFood = food.x === x && food.y === y;

              return (
                <div
                  key={index}
                  className={`${styles.cell} ${isSnake ? styles.snake : ''} ${isHead ? styles.head : ''} ${isFood ? styles.food : ''}`}
                />
              );
            })}
          </div>

          {!isPlaying && !gameOver && (
            <div className={styles.overlay}>
              <div className={styles.message}>
                <h2>Ready to Play?</h2>
                <p>Use arrow keys to control the snake</p>
                <button className={styles.startButton} onClick={resetGame}>
                  Start Game
                </button>
                <p className={styles.hint}>or press Space</p>
              </div>
            </div>
          )}

          {gameOver && (
            <div className={styles.overlay}>
              <div className={styles.message}>
                <h2>Game Over!</h2>
                <p>Your score: {score}</p>
                {score === highScore && score > 0 && (
                  <p className={styles.newRecord}>🎉 New High Score!</p>
                )}
                <button className={styles.startButton} onClick={resetGame}>
                  Play Again
                </button>
                <p className={styles.hint}>or press Space</p>
              </div>
            </div>
          )}
        </div>

        <div className={styles.controls}>
          <p>Use <span className={styles.key}>↑</span> <span className={styles.key}>↓</span> <span className={styles.key}>←</span> <span className={styles.key}>→</span> to move</p>
        </div>

        {/* Mobile Controls */}
        <div className={styles.mobileControls}>
          <button
            className={styles.controlButton}
            onClick={() => direction !== 'DOWN' && setDirection('UP')}
          >
            ↑
          </button>
          <div className={styles.controlRow}>
            <button
              className={styles.controlButton}
              onClick={() => direction !== 'RIGHT' && setDirection('LEFT')}
            >
              ←
            </button>
            <button
              className={styles.controlButton}
              onClick={() => direction !== 'LEFT' && setDirection('RIGHT')}
            >
              →
            </button>
          </div>
          <button
            className={styles.controlButton}
            onClick={() => direction !== 'UP' && setDirection('DOWN')}
          >
            ↓
          </button>
        </div>
      </div>
    </div>
  );
}
