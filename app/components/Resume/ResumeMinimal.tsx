'use client';

import Link from 'next/link';
import styles from './ResumeMinimal.module.css';

export default function ResumeMinimal() {
  return (
    <div className={styles.appWindow}>
      <div className={styles.windowHeader}>
        <div className={styles.windowButtons}>
          <Link href="/" className={`${styles.windowButton} ${styles.closeButton}`} title="Close"></Link>
          <span className={`${styles.windowButton} ${styles.minimizeButton}`}></span>
          <span className={`${styles.windowButton} ${styles.maximizeButton}`}></span>
        </div>
        <span className={styles.windowTitle}>Profile</span>
        <div className={styles.windowButtonsPlaceholder}></div>
      </div>

      <div className={styles.windowContent}>
        <div className={styles.resume}>
          {/* Header */}
          <header className={styles.header}>
            <h1 className={styles.name}>Francis Penetrante</h1>
            <p className={styles.title}>Senior Software Engineer | Full Stack Developer</p>
            <div className={styles.contactRow}>
              <span>+63 917 512 3972</span>
              <span className={styles.separator}>/</span>
              <a href="mailto:me@kikopenetrante.com" className={styles.link}>me@kikopenetrante.com</a>
              <span className={styles.separator}>/</span>
              <span>Taguig City, PH</span>
            </div>
          </header>

          {/* Summary */}
          <section className={styles.section}>
            <p className={styles.summary}>
              Senior Software Engineer with 13+ years building scalable cloud systems and full-stack
              applications. Expertise in Python, React, Node.js, and GCP. Proven track record optimizing data
              pipelines (12h → 3h), leading architecture decisions, and mentoring teams.
            </p>
          </section>

          {/* Key Achievements */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Key Achievements</h2>
            <div className={styles.achievements}>
              <div className={styles.achievement}>
                <div className={styles.achievementMetric}>75%</div>
                <div className={styles.achievementDesc}>Reduction in data processing time</div>
              </div>
              <div className={styles.achievement}>
                <div className={styles.achievementMetric}>90%+</div>
                <div className={styles.achievementDesc}>Test coverage on React applications</div>
              </div>
              <div className={styles.achievement}>
                <div className={styles.achievementMetric}>Zero</div>
                <div className={styles.achievementDesc}>Manual deployments after CI/CD</div>
              </div>
              <div className={styles.achievement}>
                <div className={styles.achievementMetric}>13+</div>
                <div className={styles.achievementDesc}>Years of engineering experience</div>
              </div>
            </div>
          </section>

          {/* Core Competencies */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Core Competencies</h2>
            <div className={styles.competencies}>
              <div className={styles.competencyCol}>
                <h3 className={styles.competencyLabel}>Languages</h3>
                <p>Python, TypeScript, Node.js, Kotlin, C++, C#, JavaScript</p>
              </div>
              <div className={styles.competencyCol}>
                <h3 className={styles.competencyLabel}>Cloud & DevOps</h3>
                <p>GCP, AWS, BigQuery, Snowflake, Terraform, Docker, CircleCI, Airflow</p>
              </div>
              <div className={styles.competencyCol}>
                <h3 className={styles.competencyLabel}>Frameworks & Tools</h3>
                <p>React, Express, GraphQL, Apollo Federation, Spring Boot, TDD, Agile/XP</p>
              </div>
            </div>
          </section>

          {/* Experience */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Professional Experience</h2>

            <div className={styles.job}>
              <div className={styles.jobHeader}>
                <h3 className={styles.jobTitle}>Senior Software Engineer</h3>
                <span className={styles.jobDate}>Mar 2022 - Present</span>
              </div>
              <p className={styles.jobCompany}>Eclaro / SPINS &mdash; Quezon City</p>
              <ul className={styles.jobList}>
                <li>Designed and implemented ETL pipelines using Google Composer, Apache Airflow, Python, GraphQL, and Strawberry; integrated Snowflake and BigQuery for large-scale data ingestion and transfer</li>
                <li>Optimized data ingestion process, reducing time from 12 hours to 3 hours — a 75% improvement</li>
                <li>Built client-facing GraphQL endpoints and GCP Cloud Functions for automated data processing triggered by file uploads</li>
                <li>Managed GCP infrastructure (Cloud Run, Cloud Functions, BigQuery, IAM) and Snowflake environments using Terraform</li>
                <li>Developed responsive React web applications with 90%+ test coverage; built Express/GraphQL APIs secured with Auth0</li>
                <li>Deployed Apollo Federation microservices; managed NX monorepo for frontend, backend, and cloud function coordination</li>
                <li>Automated CI/CD pipelines for 4+ applications across dev, UAT, and prod using CircleCI; reduced manual deployments to zero</li>
                <li>Orchestrated cross-cloud integration (GCP + AWS) via workflows and Pub/Sub, reducing data refresh time by 72 hours per cycle</li>
                <li>Practiced XP/pair programming; mentored 3 junior developers in Python and React</li>
              </ul>
            </div>

            <div className={styles.job}>
              <div className={styles.jobHeader}>
                <h3 className={styles.jobTitle}>API Developer</h3>
                <span className={styles.jobDate}>Dec 2020 - Mar 2022</span>
              </div>
              <p className={styles.jobCompany}>Satellite Office / AXI &mdash; BGC, Manila</p>
              <ul className={styles.jobList}>
                <li>Developed REST APIs using Kotlin/Spring Boot with API-first design in Stoplight Studio</li>
                <li>Built robust regression test suites using Karate framework and Docker for test isolation</li>
                <li>Designed and automated CI/CD pipeline in Azure; spearheaded service deployment automation</li>
                <li>Implemented event-driven architectures using Solace Pub/Sub</li>
              </ul>
            </div>

            <div className={styles.job}>
              <div className={styles.jobHeader}>
                <h3 className={styles.jobTitle}>Software Developer</h3>
                <span className={styles.jobDate}>Sept 2018 - Nov 2020</span>
              </div>
              <p className={styles.jobCompany}>RED Asia Inc &mdash; Makati</p>
              <ul className={styles.jobList}>
                <li>Frontend: Developed scalable UIs using Angular, TypeScript, Redux, and NGRx</li>
                <li>Backend: Built serverless APIs using Python and Lambda functions deployed on AWS</li>
                <li>DevOps: Managed AWS infrastructure — EC2, DynamoDB, CloudFront, CloudFormation, S3, IAM</li>
              </ul>
            </div>

            <div className={styles.job}>
              <div className={styles.jobHeader}>
                <h3 className={styles.jobTitle}>Senior Science Research Specialist</h3>
                <span className={styles.jobDate}>Mar 2017 - Sept 2018</span>
              </div>
              <p className={styles.jobCompany}>Mapua University &mdash; Manila</p>
              <ul className={styles.jobList}>
                <li>Developed High Frequency Doppler Radar Ship Detection Algorithm for Philippine Navy using C++ and Python</li>
                <li>Built full-stack web application (Django → MERN) as user interface for radar data visualization</li>
                <li>Trained development teams in C++, Python, and OOP principles</li>
              </ul>
            </div>
          </section>

          {/* Education & Additional */}
          <div className={styles.bottomGrid}>
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Education</h2>
              <div className={styles.eduItem}>
                <div className={styles.eduHeader}>
                  <strong>M.S. Computer Science</strong>
                  <span>2017 - Present</span>
                </div>
                <p>Mapua University — AI Specialization (Neural Networks, CNN, Sentiment Analysis)</p>
              </div>
              <div className={styles.eduItem}>
                <div className={styles.eduHeader}>
                  <strong>B.S. Computer Engineering</strong>
                  <span>2011</span>
                </div>
                <p>Mapua Institute of Technology</p>
              </div>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Additional Skills</h2>
              <div className={styles.additionalGrid}>
                <p><strong>Databases:</strong> MySQL, PostgreSQL, MongoDB</p>
                <p><strong>Testing:</strong> Jest, RTL, Karate, GoogleMock</p>
                <p><strong>CI/CD:</strong> CircleCI, Jenkins, Concourse</p>
                <p><strong>Tools:</strong> Git, SVN, Jira, Redmine</p>
                <p><strong>Languages:</strong> English (Proficient), Japanese (Minimal)</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
