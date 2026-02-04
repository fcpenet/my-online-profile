'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './page.module.css';

export default function BookPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  const pages = [
    // Cover
    {
      title: 'Francis Penetrante',
      subtitle: 'Senior Software Engineer',
      type: 'cover'
    },
    // Contact & Skills
    {
      title: 'Contact & Skills',
      type: 'content',
      content: (
        <>
          <div className={styles.section}>
            <h3>Contact</h3>
            <p><strong>Email:</strong> fcpenet@gmail.com</p>
            <p><strong>Phone:</strong> +63 917 512 3972</p>
            <p><strong>Location:</strong> Taguig City, PH</p>
          </div>
          <div className={styles.section}>
            <h3>Core Technologies</h3>
            <div className={styles.tags}>
              <span>React</span>
              <span>Node.js</span>
              <span>TypeScript</span>
              <span>Python</span>
              <span>GCP</span>
              <span>AWS</span>
              <span>Azure</span>
              <span>Airflow</span>
              <span>BigQuery</span>
              <span>Snowflake</span>
              <span>Docker</span>
              <span>Terraform</span>
            </div>
          </div>
        </>
      )
    },
    // Education & Expertise
    {
      title: 'Education & Expertise',
      type: 'content',
      content: (
        <>
          <div className={styles.section}>
            <h3>Education</h3>
            <div className={styles.edu}>
              <h4>M.S. Computer Science</h4>
              <p>Mapua University</p>
              <p>2017 - Present (AI Specialization)</p>
            </div>
            <div className={styles.edu}>
              <h4>B.S. Computer Engineering</h4>
              <p>Mapua Institute of Technology</p>
              <p>2011</p>
            </div>
          </div>
          <div className={styles.section}>
            <h3>Expertise</h3>
            <ul>
              <li>Cloud Architecture</li>
              <li>ETL Pipelines</li>
              <li>Full Stack Development</li>
              <li>CI/CD Automation</li>
              <li>Agile/XP Methods</li>
              <li>Clean Code Practices</li>
            </ul>
          </div>
        </>
      )
    },
    // Key Achievements
    {
      title: 'Key Achievements',
      type: 'content',
      content: (
        <div className={styles.achievements}>
          <div className={styles.achievement}>
            <div className={styles.metric}>75%</div>
            <p>Reduction in data processing time through optimization</p>
          </div>
          <div className={styles.achievement}>
            <div className={styles.metric}>90%</div>
            <p>On-time feature delivery rate with XP methodology</p>
          </div>
          <div className={styles.achievement}>
            <div className={styles.metric}>Zero</div>
            <p>Manual deployments after CI/CD automation</p>
          </div>
          <div className={styles.achievement}>
            <div className={styles.metric}>13+</div>
            <p>Years of professional software engineering experience</p>
          </div>
        </div>
      )
    },
    // Professional Summary
    {
      title: 'Professional Summary',
      type: 'content',
      content: (
        <div className={styles.section}>
          <p>
            Results-driven Software Engineer with <strong>13 years</strong> of progressive experience in the IT industry.
            Specialized in full-stack development with ReactJS and NodeJS, complemented by deep expertise in
            cloud platforms (GCP, AWS, Azure) and modern data engineering.
          </p>
          <p>
            Proven track record of optimizing systems, reducing processing time by <strong>75%</strong>, and achieving <strong>90%</strong> on-time delivery
            through XP/Pair Programming methodologies. Passionate about emerging technologies and continuous learning.
          </p>
        </div>
      )
    },
    // Experience 1
    {
      title: 'Professional Experience',
      type: 'content',
      content: (
        <div className={styles.job}>
          <h3>Senior Software Engineer</h3>
          <p className={styles.company}>Eclaro / SPINS</p>
          <p className={styles.date}>Mar 2022 - Present • Quezon City</p>
          <ul>
            <li>Architected and implemented ETL pipelines using Google Composer, Apache Airflow, BigQuery, and Snowflake</li>
            <li>Optimized data ingestion process achieving <strong>75% reduction</strong> in processing time (12h → 3h)</li>
            <li>Built responsive React applications with 90% test coverage</li>
            <li>Deployed federated GraphQL architecture with Auth0 security</li>
          </ul>
        </div>
      )
    },
    // Experience 2
    {
      title: 'Professional Experience',
      type: 'content',
      content: (
        <div className={styles.job}>
          <h3>API Developer</h3>
          <p className={styles.company}>Satellite Office / AXI</p>
          <p className={styles.date}>Dec 2020 - Mar 2022 • BGC</p>
          <ul>
            <li>Developed RESTful APIs using Kotlin/Spring-Boot with comprehensive automated testing</li>
            <li>Established Azure CI/CD pipeline and led automation initiatives</li>
            <li>Designed API specifications using Stoplight Studio following OpenAPI standards</li>
            <li>Implemented event-driven architecture using Solace Pub/Sub</li>
          </ul>
        </div>
      )
    },
    // Experience 3
    {
      title: 'Professional Experience',
      type: 'content',
      content: (
        <div className={styles.job}>
          <h3>Software Developer</h3>
          <p className={styles.company}>RED Asia Inc</p>
          <p className={styles.date}>Sept 2018 - Nov 2020 • Makati City</p>
          <ul>
            <li>Developed enterprise web applications using Angular/TypeScript with Redux and NgRx</li>
            <li>Built serverless backend services using Python and Serverless framework on AWS Lambda</li>
            <li>Managed AWS infrastructure including EC2, DynamoDB, CloudWatch, CloudFront, Lambda, and S3</li>
          </ul>
        </div>
      )
    },
  ];

  const nextPage = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const currentPageData = pages[currentPage];

  return (
    <div className={styles.container}>
      <Link href="/" className={styles.backLink}>← Back to Resume</Link>

      {!isOpen ? (
        <div className={styles.closedBookWrapper} onClick={() => setIsOpen(true)}>
          <div className={styles.closedBook}>
            <div className={styles.bookSpine}></div>
            <div className={styles.frontCover}>
              <div className={styles.coverTitle}>
                <h1>Francis Penetrante</h1>
                <div className={styles.coverLine}></div>
                <p>Senior Software Engineer</p>
                <span className={styles.coverSubtitle}>Professional Portfolio</span>
              </div>
            </div>
            <div className={styles.bookEdges}></div>
          </div>
          <p className={styles.clickHint}>Click to open</p>
        </div>
      ) : (
        <>
          <div className={styles.bookWrapper}>
            <div className={`${styles.book} ${styles.bookOpen}`}>
          {/* Left Page */}
          <div className={styles.page}>
            <div className={styles.pageContent}>
              {currentPage > 0 && currentPage % 2 === 0 && (
                <>
                  {pages[currentPage - 1].type === 'cover' ? (
                    <div className={styles.coverContent}>
                      <h1>{pages[currentPage - 1].title}</h1>
                      <p>{pages[currentPage - 1].subtitle}</p>
                    </div>
                  ) : (
                    <>
                      <h2 className={styles.pageTitle}>{pages[currentPage - 1].title}</h2>
                      {pages[currentPage - 1].content}
                    </>
                  )}
                  <div className={styles.pageNumber}>{currentPage - 1}</div>
                </>
              )}
            </div>
          </div>

          {/* Right Page */}
          <div className={styles.page}>
            <div className={styles.pageContent}>
              {currentPageData.type === 'cover' ? (
                <div className={styles.coverContent}>
                  <h1>{currentPageData.title}</h1>
                  <p>{currentPageData.subtitle}</p>
                </div>
              ) : (
                <>
                  <h2 className={styles.pageTitle}>{currentPageData.title}</h2>
                  {currentPageData.content}
                  <div className={styles.pageNumber}>{currentPage}</div>
                </>
              )}
            </div>
          </div>
        </div>
          </div>

          {/* Navigation */}
          <div className={styles.navigation}>
        <button
          onClick={prevPage}
          disabled={currentPage === 0}
          className={styles.navButton}
        >
          ← Previous
        </button>
        <span className={styles.pageIndicator}>
          Page {currentPage + 1} of {pages.length}
        </span>
        <button
          onClick={nextPage}
          disabled={currentPage === pages.length - 1}
          className={styles.navButton}
        >
          Next →
        </button>
          </div>
        </>
      )}
    </div>
  );
}
