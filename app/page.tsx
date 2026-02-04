import styles from './page.module.css';

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1 className={styles.title}>Welcome to My Online Profile</h1>

        <p className={styles.description}>
          This is a simple static website built with Next.js
        </p>

        <div className={styles.grid}>
          <div className={styles.card}>
            <h2>About Me</h2>
            <p>
              A passionate developer interested in building modern web applications.
            </p>
          </div>

          <div className={styles.card}>
            <h2>Skills</h2>
            <ul>
              <li>React & Next.js</li>
              <li>TypeScript</li>
              <li>Web Development</li>
            </ul>
          </div>

          <div className={styles.card}>
            <h2>Projects</h2>
            <p>
              Check out my projects and portfolio work.
            </p>
          </div>

          <div className={styles.card}>
            <h2>Contact</h2>
            <p>
              Feel free to reach out and connect!
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
