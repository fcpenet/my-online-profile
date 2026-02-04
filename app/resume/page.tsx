import Link from 'next/link';
import styles from './page.module.css';

export default function Resume() {
  return (
    <main className={styles.main}>
      <div className={styles.appWindow}>
        {/* Window Header */}
        <div className={styles.windowHeader}>
          <div className={styles.windowButtons}>
            <Link href="/" className={`${styles.windowButton} ${styles.closeButton}`} title="Close"></Link>
            <span className={`${styles.windowButton} ${styles.minimizeButton}`}></span>
            <span className={`${styles.windowButton} ${styles.maximizeButton}`}></span>
          </div>
          <span className={styles.windowTitle}>Resume.app</span>
          <div className={styles.windowButtonsPlaceholder}></div>
        </div>

        {/* Resume Content */}
        <div className={styles.windowContent}>
          <div className={styles.resume}>
            {/* Header */}
            <header className={styles.header}>
              <h1 className={styles.name}>Francis Penetrante</h1>
              <p className={styles.title}>Senior Software Engineer</p>
              <p className={styles.subtitle}>Full Stack Developer • Data Engineering Specialist</p>
            </header>

            <div className={styles.content}>
              {/* Sidebar */}
              <aside className={styles.sidebar}>
                {/* Contact */}
                <section className={styles.sidebarSection}>
                  <h2 className={styles.sidebarTitle}>Contact</h2>
                  <div className={styles.contactItem}>
                    <span className={styles.label}>Email</span>
                    <a href="mailto:fcpenet@gmail.com" className={styles.link}>fcpenet@gmail.com</a>
                  </div>
                  <div className={styles.contactItem}>
                    <span className={styles.label}>Phone</span>
                    <span className={styles.value}>+63 917 512 3972</span>
                  </div>
                  <div className={styles.contactItem}>
                    <span className={styles.label}>Location</span>
                    <span className={styles.value}>Taguig City, PH</span>
                  </div>
                </section>

                {/* Core Skills */}
                <section className={styles.sidebarSection}>
                  <h2 className={styles.sidebarTitle}>Core Technologies</h2>
                  <div className={styles.skillTags}>
                    <span className={styles.tag}>React</span>
                    <span className={styles.tag}>Node.js</span>
                    <span className={styles.tag}>TypeScript</span>
                    <span className={styles.tag}>Python</span>
                    <span className={styles.tag}>GCP</span>
                    <span className={styles.tag}>AWS</span>
                    <span className={styles.tag}>Azure</span>
                    <span className={styles.tag}>Airflow</span>
                    <span className={styles.tag}>BigQuery</span>
                    <span className={styles.tag}>Snowflake</span>
                    <span className={styles.tag}>Docker</span>
                    <span className={styles.tag}>Terraform</span>
                  </div>
                </section>

                {/* Education */}
                <section className={styles.sidebarSection}>
                  <h2 className={styles.sidebarTitle}>Education</h2>
                  <div className={styles.eduItem}>
                    <h3 className={styles.eduDegree}>M.S. Computer Science</h3>
                    <p className={styles.eduSchool}>Mapua University</p>
                    <p className={styles.eduYear}>2017 - Present</p>
                    <p className={styles.eduNote}>AI Specialization</p>
                  </div>
                  <div className={styles.eduItem}>
                    <h3 className={styles.eduDegree}>B.S. Computer Engineering</h3>
                    <p className={styles.eduSchool}>Mapua Institute of Technology</p>
                    <p className={styles.eduYear}>2011</p>
                  </div>
                </section>

                {/* Expertise */}
                <section className={styles.sidebarSection}>
                  <h2 className={styles.sidebarTitle}>Expertise</h2>
                  <ul className={styles.expertiseList}>
                    <li>Cloud Architecture</li>
                    <li>ETL Pipelines</li>
                    <li>Full Stack Development</li>
                    <li>CI/CD Automation</li>
                    <li>Agile/XP Methods</li>
                    <li>Clean Code Practices</li>
                  </ul>
                </section>
              </aside>

              {/* Main Content */}
              <div className={styles.mainContent}>
                {/* Key Achievements */}
                <section className={styles.section}>
                  <h2 className={styles.sectionTitle}>Key Achievements</h2>
                  <div className={styles.achievements}>
                    <div className={styles.achievement}>
                      <div className={styles.achievementMetric}>75%</div>
                      <div className={styles.achievementDesc}>Reduction in data processing time through optimization</div>
                    </div>
                    <div className={styles.achievement}>
                      <div className={styles.achievementMetric}>90%</div>
                      <div className={styles.achievementDesc}>On-time feature delivery rate with XP methodology</div>
                    </div>
                    <div className={styles.achievement}>
                      <div className={styles.achievementMetric}>Zero</div>
                      <div className={styles.achievementDesc}>Manual deployments after CI/CD automation</div>
                    </div>
                    <div className={styles.achievement}>
                      <div className={styles.achievementMetric}>13+</div>
                      <div className={styles.achievementDesc}>Years of professional software engineering experience</div>
                    </div>
                  </div>
                </section>

                {/* Summary */}
                <section className={styles.section}>
                  <h2 className={styles.sectionTitle}>Professional Summary</h2>
                  <p className={styles.summary}>
                    Results-driven Software Engineer with <strong>13 years</strong> of progressive experience in the IT industry.
                    Specialized in full-stack development with ReactJS and NodeJS, complemented by deep expertise in
                    cloud platforms (GCP, AWS, Azure) and modern data engineering. Proven track record of optimizing
                    systems, reducing processing time by <strong>75%</strong>, and achieving <strong>90%</strong> on-time delivery
                    through XP/Pair Programming methodologies. Passionate about emerging technologies and continuous learning.
                  </p>
                </section>

                {/* Professional Experience */}
                <section className={styles.section}>
                  <h2 className={styles.sectionTitle}>Professional Experience</h2>

                  <div className={styles.job}>
                    <div className={styles.jobHeader}>
                      <div>
                        <h3 className={styles.jobTitle}>Senior Software Engineer</h3>
                        <p className={styles.company}>Eclaro / SPINS</p>
                      </div>
                      <div className={styles.jobMeta}>
                        <span className={styles.location}>Quezon City</span>
                        <span className={styles.date}>Mar 2022 - Present</span>
                      </div>
                    </div>
                    <ul className={styles.jobAchievements}>
                      <li>Architected and implemented ETL pipelines using Google Composer, Apache Airflow, BigQuery, and Snowflake, enabling seamless data transfer across multiple platforms</li>
                      <li>Optimized data ingestion process by migrating from GCP Workflow to Composer/Airflow, achieving a <strong>75% reduction</strong> in processing time (12h → 3h)</li>
                      <li>Built responsive React applications with comprehensive testing (90% coverage baseline) using React Testing Library</li>
                      <li>Deployed federated GraphQL architecture using Apollo Federation with Auth0 security integration</li>
                      <li>Implemented automated CI/CD pipelines using CircleCI for 4+ applications across multiple environments, eliminating manual deployments entirely</li>
                      <li>Mentored 3 junior developers in Python and ReactJS, successfully onboarding them to production work</li>
                    </ul>
                  </div>

                  <div className={styles.job}>
                    <div className={styles.jobHeader}>
                      <div>
                        <h3 className={styles.jobTitle}>API Developer</h3>
                        <p className={styles.company}>Satellite Office / AXI</p>
                      </div>
                      <div className={styles.jobMeta}>
                        <span className={styles.location}>BGC</span>
                        <span className={styles.date}>Dec 2020 - Mar 2022</span>
                      </div>
                    </div>
                    <ul className={styles.jobAchievements}>
                      <li>Developed RESTful APIs using Kotlin/Spring-Boot with comprehensive automated regression testing via Karate framework</li>
                      <li>Established Azure CI/CD pipeline and led automation initiatives for service deployment</li>
                      <li>Designed API specifications using Stoplight Studio following OpenAPI standards</li>
                      <li>Implemented event-driven architecture using Solace Pub/Sub for distributed systems</li>
                    </ul>
                  </div>

                  <div className={styles.job}>
                    <div className={styles.jobHeader}>
                      <div>
                        <h3 className={styles.jobTitle}>Software Developer</h3>
                        <p className={styles.company}>RED Asia Inc</p>
                      </div>
                      <div className={styles.jobMeta}>
                        <span className={styles.location}>Makati City</span>
                        <span className={styles.date}>Sept 2018 - Nov 2020</span>
                      </div>
                    </div>
                    <ul className={styles.jobAchievements}>
                      <li>Developed enterprise web applications using Angular/TypeScript with Redux and NgRx for state management</li>
                      <li>Built serverless backend services using Python and Serverless framework, deployed on AWS Lambda</li>
                      <li>Managed AWS infrastructure including EC2, DynamoDB, CloudWatch, CloudFront, Lambda, and S3</li>
                    </ul>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
