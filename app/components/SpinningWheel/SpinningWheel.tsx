import styles from './SpinningWheel.module.css';

interface SpinningWheelProps {
  size?: number;
}

export default function SpinningWheel({ size = 32 }: SpinningWheelProps) {
  return (
    <div className={styles.container} role="status">
      <div
        className={styles.wheel}
        style={{ width: size, height: size }}
      />
      <span className={styles.srOnly}>Loading</span>
    </div>
  );
}
