'use client';

import Link from 'next/link';
import styles from './ResumeTimeline.module.css';

export default function ResumeTimeline() {
  return (
    <div className={styles.appWindow}>
      <div className={styles.windowHeader}>
        <div className={styles.windowButtons}>
          <Link href="/" className={`${styles.windowButton} ${styles.closeButton}`} title="Close"></Link>
          <span className={`${styles.windowButton} ${styles.minimizeButton}`}></span>
          <span className={`${styles.windowButton} ${styles.maximizeButton}`}></span>
        </div>
        <span className={styles.windowTitle}>Profile.app</span>
        <div className={styles.windowButtonsPlaceholder}></div>
      </div>

      <div className={styles.windowContent}>
        <div className={styles.resume}>
          {/* Header */}
          <header className={styles.header}>
            <h1 className={styles.name}>Francis Penetrante</h1>
            <p className={styles.title}>Senior Software Engineer | Full Stack Developer</p>
            <div className={styles.contactRow}>
              <a href="mailto:me@kikopenetrante.com" className={styles.contactLink}>me@kikopenetrante.com</a>
              <span className={styles.dot}></span>
              <span>+63 917 512 3972</span>
              <span className={styles.dot}></span>
              <span>Taguig City, PH</span>
            </div>
          </header>

          {/* Summary */}
          <section className={styles.section}>
            <p className={styles.summary}>
              Senior Software Engineer with 13+ years building scalable cloud systems and full-stack
              applications. Expertise in Python, React, Node.js, and GCP. Proven track record optimizing data
              pipelines (12h → 3h), leading architecture decisions, and mentoring teams. Always learning, always shipping.
            </p>
          </section>

          {/* Skills Bar */}
          <section className={styles.skillsBar}>
            <div className={styles.skillCategory}>
              <h3>Languages</h3>
              <div className={styles.pills}>
                <span>Python</span><span>TypeScript</span><span>Node.js</span><span>Kotlin</span><span>C++</span><span>C#</span><span>JavaScript</span>
              </div>
            </div>
            <div className={styles.skillCategory}>
              <h3>Cloud & DevOps</h3>
              <div className={styles.pills}>
                <span>GCP</span><span>AWS</span><span>BigQuery</span><span>Snowflake</span><span>Terraform</span><span>Docker</span><span>CircleCI</span><span>Airflow</span>
              </div>
            </div>
            <div className={styles.skillCategory}>
              <h3>Frameworks</h3>
              <div className={styles.pills}>
                <span>React</span><span>Express</span><span>GraphQL</span><span>Apollo Federation</span><span>Spring Boot</span>
              </div>
            </div>
          </section>

          {/* Timeline */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Experience</h2>
            <div className={styles.timeline}>

              <div className={styles.timelineItem}>
                <div className={styles.timelineLine}>
                  <div className={styles.timelineDot}></div>
                </div>
                <div className={styles.timelineContent}>
                  <div className={styles.timelineDate}>Mar 2022 - Present</div>
                  <h3 className={styles.timelineRole}>Senior Software Engineer</h3>
                  <p className={styles.timelineCompany}>Eclaro / SPINS &bull; Quezon City</p>
                  <ul>
                    <li>Designed and implemented ETL pipelines using Google Composer, Apache Airflow, Python, GraphQL, and Strawberry; integrated Snowflake and BigQuery for large-scale data ingestion and transfer</li>
                    <li>Optimized data ingestion process, reducing time from 12 hours to 3 hours — a <strong>75% improvement</strong></li>
                    <li>Built client-facing GraphQL endpoints and GCP Cloud Functions for automated data processing triggered by file uploads</li>
                    <li>Managed GCP infrastructure (Cloud Run, Cloud Functions, BigQuery, IAM) and Snowflake environments using Terraform</li>
                    <li>Developed responsive React web applications with <strong>90%+ test coverage</strong>; built Express/GraphQL APIs secured with Auth0</li>
                    <li>Deployed Apollo Federation microservices; managed NX monorepo for frontend, backend, and cloud function coordination</li>
                    <li>Automated CI/CD pipelines for 4+ applications across dev, UAT, and prod using CircleCI; reduced manual deployments to zero</li>
                    <li>Orchestrated cross-cloud integration (GCP + AWS) via workflows and Pub/Sub, reducing data refresh time by 72 hours per cycle</li>
                    <li>Practiced XP/pair programming; mentored 3 junior developers in Python and React</li>
                  </ul>
                </div>
              </div>

              <div className={styles.timelineItem}>
                <div className={styles.timelineLine}>
                  <div className={styles.timelineDot}></div>
                </div>
                <div className={styles.timelineContent}>
                  <div className={styles.timelineDate}>Dec 2020 - Mar 2022</div>
                  <h3 className={styles.timelineRole}>API Developer</h3>
                  <p className={styles.timelineCompany}>Satellite Office / AXI &bull; BGC, Manila</p>
                  <ul>
                    <li>Developed REST APIs using Kotlin/Spring Boot with API-first design in Stoplight Studio</li>
                    <li>Built robust regression test suites using Karate framework and Docker for test isolation</li>
                    <li>Designed and automated CI/CD pipeline in Azure; spearheaded service deployment automation</li>
                    <li>Implemented event-driven architectures using Solace Pub/Sub</li>
                  </ul>
                </div>
              </div>

              <div className={styles.timelineItem}>
                <div className={styles.timelineLine}>
                  <div className={styles.timelineDot}></div>
                </div>
                <div className={styles.timelineContent}>
                  <div className={styles.timelineDate}>Sept 2018 - Nov 2020</div>
                  <h3 className={styles.timelineRole}>Software Developer</h3>
                  <p className={styles.timelineCompany}>RED Asia Inc &bull; Makati</p>
                  <ul>
                    <li>Frontend: Developed scalable UIs using Angular, TypeScript, Redux, and NGRx</li>
                    <li>Backend: Built serverless APIs using Python and Lambda functions deployed on AWS</li>
                    <li>DevOps: Managed AWS infrastructure — EC2, DynamoDB, CloudFront, CloudFormation, S3, IAM</li>
                  </ul>
                </div>
              </div>

              <div className={styles.timelineItem}>
                <div className={styles.timelineLine}>
                  <div className={styles.timelineDot}></div>
                </div>
                <div className={styles.timelineContent}>
                  <div className={styles.timelineDate}>Mar 2017 - Sept 2018</div>
                  <h3 className={styles.timelineRole}>Senior Science Research Specialist</h3>
                  <p className={styles.timelineCompany}>Mapua University &bull; Manila</p>
                  <ul>
                    <li>Developed High Frequency Doppler Radar Ship Detection Algorithm for Philippine Navy using C++ and Python</li>
                    <li>Built full-stack web application (Django → MERN) as user interface for radar data visualization</li>
                    <li>Trained development teams in C++, Python, and OOP principles</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Education & Additional */}
          <div className={styles.bottomRow}>
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Education</h2>
              <div className={styles.eduGrid}>
                <div className={styles.eduCard}>
                  <h3>M.S. Computer Science</h3>
                  <p className={styles.eduSchool}>Mapua University &bull; 2017 - Present</p>
                  <p className={styles.eduDetail}>AI Specialization: Neural Networks, CNN, Sentiment Analysis</p>
                </div>
                <div className={styles.eduCard}>
                  <h3>B.S. Computer Engineering</h3>
                  <p className={styles.eduSchool}>Mapua Institute of Technology &bull; 2011</p>
                  <p className={styles.eduDetail}>Thesis: Neural Network-Aided Third-Party Software for E-Nose Acoustic Wave Sensors</p>
                </div>
              </div>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Additional</h2>
              <div className={styles.additionalList}>
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
