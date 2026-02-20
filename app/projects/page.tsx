'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './page.module.css';

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

interface Project {
  title: string;
  description: string;
  technologies: string[];
  category: string;
  impact?: string;
}

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeTab, setActiveTab] = useState('summary');

  const projects: Project[] = [
    {
      title: 'ETL Pipeline Optimization',
      description: 'Migrated from GCP Workflow to Composer/Airflow, implementing parallel processing and caching strategies that reduced data processing time from 12 hours to 3 hours.',
      technologies: ['Apache Airflow', 'GCP Composer', 'BigQuery', 'Snowflake', 'Python'],
      category: 'Data Engineering',
      impact: '75% reduction in processing time'
    },
    {
      title: 'Federated GraphQL Architecture',
      description: 'Deployed federated GraphQL architecture using Apollo Federation with Auth0 integration for secure microservices communication.',
      technologies: ['GraphQL', 'Apollo Federation', 'Auth0', 'Node.js', 'TypeScript'],
      category: 'Backend',
      impact: 'Improved API performance and security'
    },
    {
      title: 'CI/CD Automation Pipeline',
      description: 'Automated deployment pipeline for 4 applications across multiple environments, eliminating manual deployments entirely.',
      technologies: ['CircleCI', 'Docker', 'Terraform', 'AWS', 'GCP'],
      category: 'DevOps',
      impact: 'Zero manual deployments'
    },
    {
      title: 'React Testing Framework',
      description: 'Established comprehensive testing framework achieving 90% code coverage baseline for all React applications.',
      technologies: ['React Testing Library', 'Jest', 'Cypress', 'TypeScript'],
      category: 'Frontend',
      impact: '90% test coverage baseline'
    },
    {
      title: 'Cloud Infrastructure Migration',
      description: 'Led migration of legacy infrastructure to modern cloud platforms with Infrastructure as Code practices.',
      technologies: ['Terraform', 'GCP', 'AWS', 'Azure', 'Docker'],
      category: 'DevOps',
      impact: 'Improved scalability and reliability'
    },
    {
      title: 'Real-time Analytics Dashboard',
      description: 'Built real-time analytics dashboard for business intelligence with interactive data visualizations.',
      technologies: ['React', 'Next.js', 'BigQuery', 'Chart.js', 'WebSockets'],
      category: 'Frontend',
      impact: 'Enhanced decision-making capabilities'
    }
  ];

  const categories = ['all', 'Data Engineering', 'Frontend', 'Backend', 'DevOps'];

  const categoryClass: Record<string, string> = {
    'Data Engineering': styles.cardDataEngineering,
    'Frontend': styles.cardFrontend,
    'Backend': styles.cardBackend,
    'DevOps': styles.cardDevOps,
  };

  const filteredProjects = selectedCategory === 'all'
    ? projects
    : projects.filter(p => p.category === selectedCategory);

  return (
    <div className={styles.container}>
      <div className={styles.browser}>
        {/* Browser Top Bar */}
        <div className={styles.topBar}>
          <div className={styles.windowControls}>
            <Link href="/" className={styles.controlRed} title="Close"></Link>
            <span className={styles.controlYellow}></span>
            <span className={styles.controlGreen}></span>
          </div>
          <div className={styles.tabs}>
            <div
              className={`${styles.tab} ${activeTab === 'summary' ? styles.activeTab : styles.inactiveTab}`}
              onClick={() => setActiveTab('summary')}
            >
              <ChromeIcon />
              <span>Summary</span>
            </div>
            <div
              className={`${styles.tab} ${activeTab === 'pili-pinas' ? styles.activeTab : styles.inactiveTab}`}
              onClick={() => setActiveTab('pili-pinas')}
            >
              <span className={styles.tabFavicon}>🌐</span>
              <span>Pili Pinas</span>
            </div>
            <div
              className={`${styles.tab} ${activeTab === 'cocina-express' ? styles.activeTab : styles.inactiveTab}`}
              onClick={() => setActiveTab('cocina-express')}
            >
              <span className={styles.tabFavicon}>🍳</span>
              <span>Cocina Express</span>
            </div>
            <div
              className={`${styles.tab} ${activeTab === 'project-tracker' ? styles.activeTab : styles.inactiveTab}`}
              onClick={() => setActiveTab('project-tracker')}
            >
              <span className={styles.tabFavicon}>📋</span>
              <span>Project Tracker</span>
            </div>
            <div className={styles.newTab}>+</div>
          </div>
        </div>

        {/* Browser Address Bar */}
        <div className={styles.addressBar}>
          <div className={styles.navButtons}>
            <span>←</span>
            <span>→</span>
            <span>↻</span>
          </div>
          <div className={styles.urlBar}>
            <span className={styles.secure}>🔒</span>
            <span className={styles.url}>
              {activeTab === 'summary'
                ? 'kikopenetrante.com/projects'
                : activeTab === 'pili-pinas'
                ? 'pili-pinas.com'
                : activeTab === 'project-tracker'
                ? 'project-tracker-five-plum.vercel.app/login'
                : 'fcpenet.github.io/cocina-express'}
            </span>
          </div>
          <div className={styles.browserActions}>
            <span>⭐</span>
            <span>⋮</span>
          </div>
        </div>

        {/* Browser Content */}
        <div className={styles.browserContent}>
          {activeTab === 'summary' ? (
            <>
              <div className={styles.header}>
                <div className={styles.headerContent}>
                  <h1 className={styles.title}>My Projects</h1>
                  <p className={styles.subtitle}>
                    A showcase of professional projects and technical achievements
                  </p>
                </div>
              </div>

              {/* Category Filter */}
              <div className={styles.filterBar}>
                {categories.map(category => (
                  <button
                    key={category}
                    className={`${styles.filterBtn} ${selectedCategory === category ? styles.active : ''}`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category === 'all' ? 'All Projects' : category}
                  </button>
                ))}
              </div>

              {/* Projects Grid */}
              <div className={styles.projectsGrid}>
                {filteredProjects.map((project, index) => (
                  <div key={index} className={`${styles.projectCard} ${categoryClass[project.category] ?? ''}`}>
                    <div className={styles.projectHeader}>
                      <h3 className={styles.projectTitle}>{project.title}</h3>
                      <span className={styles.categoryBadge}>{project.category}</span>
                    </div>
                    <p className={styles.projectDescription}>{project.description}</p>
                    {project.impact && (
                      <div className={styles.impact}>
                        <span className={styles.impactIcon}>🎯</span>
                        <span className={styles.impactText}>{project.impact}</span>
                      </div>
                    )}
                    <div className={styles.techStack}>
                      {project.technologies.map((tech, idx) => (
                        <span key={idx} className={styles.techBadge}>{tech}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Stats Section */}
              <div className={styles.statsSection}>
                <h2 className={styles.statsTitle}>Overall Impact</h2>
                <div className={styles.statsGrid}>
                  <div className={styles.statCard}>
                    <div className={styles.statNumber}>6+</div>
                    <div className={styles.statLabel}>Major Projects</div>
                  </div>
                  <div className={styles.statCard}>
                    <div className={styles.statNumber}>20+</div>
                    <div className={styles.statLabel}>Technologies</div>
                  </div>
                  <div className={styles.statCard}>
                    <div className={styles.statNumber}>75%</div>
                    <div className={styles.statLabel}>Performance Gain</div>
                  </div>
                  <div className={styles.statCard}>
                    <div className={styles.statNumber}>90%</div>
                    <div className={styles.statLabel}>Delivery Rate</div>
                  </div>
                </div>
              </div>
            </>
          ) : activeTab === 'pili-pinas' ? (
            <div className={styles.iframeContainer}>
              <iframe
                src="https://pili-pinas.com"
                className={styles.iframe}
                title="Pili Pinas"
                sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                loading="lazy"
              />
            </div>
          ) : activeTab === 'project-tracker' ? (
            <div className={styles.iframeContainer}>
              <iframe
                src="https://project-tracker-five-plum.vercel.app/login"
                className={styles.iframe}
                title="Project Tracker"
                sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                loading="lazy"
              />
            </div>
          ) : (
            <div className={styles.iframeContainer}>
              <iframe
                src="https://fcpenet.github.io/cocina-express/"
                className={styles.iframe}
                title="Cocina Express"
                sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                loading="lazy"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
