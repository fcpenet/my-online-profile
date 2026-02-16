'use client';

import { useState, useRef, useEffect } from 'react';
import styles from './Terminal.module.css';
import { TodoService } from '../../services/TodoService/TodoService';

const todoService = new TodoService();

interface TerminalProps {
  isVisible: boolean;
  onClose: () => void;
}

interface OutputLine {
  text: string;
  type: 'input' | 'output' | 'error' | 'success';
}

export default function Terminal({ isVisible, onClose }: TerminalProps) {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState<OutputLine[]>([
    { text: 'Welcome to kikOS Terminal. Type "help" for available commands.', type: 'output' },
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isVisible) {
      inputRef.current?.focus();
    }
  }, [isVisible]);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output]);

  const handleCommand = (command: string) => {
    const trimmed = command.trim();
    if (!trimmed) return;

    const newOutput: OutputLine[] = [
      ...output,
      { text: `$ ${trimmed}`, type: 'input' },
    ];

    if (trimmed === 'help') {
      newOutput.push({
        text: 'Available commands:\n  set-api-key <key>  Save an API key\n  get-api-key         Show current API key\n  clear               Clear terminal\n  help                Show this help',
        type: 'output',
      });
    } else if (trimmed === 'clear') {
      setOutput([]);
      setInput('');
      return;
    } else if (trimmed === 'get-api-key') {
      const key = localStorage.getItem('kikos-api-key');
      if (!key) {
        newOutput.push({ text: 'No API key set. Use set-api-key <key> to save one.', type: 'error' });
      } else {
        const masked = key.length <= 4 ? '****' : key.slice(0, 4) + '*'.repeat(key.length - 4);
        newOutput.push({ text: `Current API key: ${masked}`, type: 'output' });
      }
    } else if (trimmed.startsWith('set-api-key')) {
      const key = trimmed.slice('set-api-key'.length).trim();
      if (!key) {
        newOutput.push({ text: 'Usage: set-api-key <key>', type: 'error' });
      } else {
        localStorage.setItem('kikos-api-key', key);
        newOutput.push({ text: 'Validating API key...', type: 'output' });
        setOutput(newOutput);
        setInput('');
        todoService.validateKey().then((valid) => {
          if (valid) {
            const masked = key.length <= 4 ? '****' : key.slice(0, 4) + '*'.repeat(key.length - 4);
            setOutput(prev => [...prev, { text: `API key valid: ${masked}`, type: 'success' }]);
          } else {
            localStorage.removeItem('kikos-api-key');
            setOutput(prev => [...prev, { text: 'Invalid API key. Key has been removed.', type: 'error' }]);
          }
        });
        return;
      }
    } else {
      newOutput.push({ text: `command not found: ${trimmed}`, type: 'error' });
    }

    setOutput(newOutput);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(input);
    }
  };

  if (!isVisible) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.terminal}>
        <div className={styles.header}>
          <div className={styles.controls}>
            <span
              className={styles.control}
              style={{ backgroundColor: '#ff5f56' }}
              onClick={onClose}
              role="button"
              aria-label="Close terminal"
            />
            <span className={styles.control} style={{ backgroundColor: '#ffbd2e' }} />
            <span className={styles.control} style={{ backgroundColor: '#27c93f' }} />
          </div>
          <div className={styles.title}>Terminal</div>
        </div>
        <div className={styles.body} ref={outputRef} onClick={() => inputRef.current?.focus()}>
          {output.map((line, i) => (
            <div key={i} className={`${styles.line} ${styles[line.type]}`}>
              {line.text}
            </div>
          ))}
          <div className={styles.inputLine}>
            <span className={styles.prompt}>$ </span>
            <input
              ref={inputRef}
              className={styles.input}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              spellCheck={false}
              autoComplete="off"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
