'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './page.module.css';

export default function WorkspacePage() {
  const [activeFile, setActiveFile] = useState('App.tsx');
  const [terminalOutput, setTerminalOutput] = useState<string[]>([
    '$ npm start',
    'Compiled successfully!',
    '',
    'You can now view the app in the browser.',
    'Local: http://localhost:3000',
  ]);

  const files = {
    'App.tsx': {
      language: 'typescript',
      content: `import React from 'react';
import './App.css';

interface Experience {
  title: string;
  company: string;
  location: string;
  period: string;
  achievements: string[];
}

const App: React.FC = () => {
  const profile = {
    name: "Francis Penetrante",
    role: "Senior Software Engineer",
    experience: 13,
    email: "fcpenet@gmail.com",
    phone: "+63 917 512 3972",
    location: "Taguig City, PH"
  };

  const skills = [
    "React", "Node.js", "TypeScript", "Python",
    "GCP", "AWS", "Azure", "Airflow",
    "BigQuery", "Snowflake", "Docker", "Terraform"
  ];

  const achievements = [
    { metric: "75%", desc: "Reduction in processing time" },
    { metric: "90%", desc: "On-time delivery rate" },
    { metric: "Zero", desc: "Manual deployments" },
    { metric: "13+", desc: "Years of experience" }
  ];

  return (
    <div className="app">
      <header className="header">
        <h1>{profile.name}</h1>
        <h2>{profile.role}</h2>
      </header>
      <main className="content">
        {/* Rendered component will show here */}
      </main>
    </div>
  );
};

export default App;`
    },
    'skills.json': {
      language: 'json',
      content: `{
  "languages": {
    "primary": ["TypeScript", "JavaScript", "Python", "Kotlin"],
    "familiar": ["Java", "Go", "SQL"]
  },
  "frontend": {
    "frameworks": ["React", "Next.js", "Angular"],
    "stateManagement": ["Redux", "NgRx", "Context API"],
    "testing": ["Jest", "React Testing Library", "Cypress"]
  },
  "backend": {
    "runtime": ["Node.js", "Python", "Spring Boot"],
    "api": ["REST", "GraphQL", "Apollo Federation"],
    "authentication": ["Auth0", "JWT", "OAuth"]
  },
  "cloud": {
    "platforms": ["GCP", "AWS", "Azure"],
    "services": [
      "BigQuery",
      "Composer/Airflow",
      "Lambda",
      "DynamoDB",
      "CloudFront",
      "S3"
    ]
  },
  "dataEngineering": {
    "etl": ["Apache Airflow", "Google Composer"],
    "warehouses": ["BigQuery", "Snowflake"],
    "orchestration": ["Airflow", "Cloud Composer"]
  },
  "devops": {
    "ci_cd": ["CircleCI", "GitHub Actions", "Azure DevOps"],
    "containers": ["Docker"],
    "iac": ["Terraform"],
    "monitoring": ["CloudWatch", "Datadog"]
  }
}`
    },
    'projects.py': {
      language: 'python',
      content: `"""
Major Projects & Achievements
Software Engineering Portfolio
"""

class ETLPipeline:
    """
    Optimized data ingestion pipeline
    Achievement: 75% reduction in processing time
    """
    def __init__(self):
        self.tools = ['Apache Airflow', 'BigQuery', 'Snowflake']
        self.migration = 'GCP Workflow → Composer/Airflow'
        self.result = '12h → 3h processing time'

    def optimize(self):
        """Implemented parallel processing and caching"""
        return "Performance improved by 75%"


class GraphQLFederation:
    """
    Deployed federated GraphQL architecture
    with Apollo Federation and Auth0
    """
    security = 'Auth0 Integration'
    architecture = 'Microservices'
    gateway = 'Apollo Gateway'


class CICDAutomation:
    """
    Automated deployment pipeline
    Achievement: Zero manual deployments
    """
    def __init__(self):
        self.tool = 'CircleCI'
        self.apps = 4
        self.environments = ['dev', 'staging', 'prod']
        self.manual_deployments = 0  # eliminated!

    def deploy(self, env: str):
        """Automated deployment to any environment"""
        print(f"🚀 Deploying to {env}...")
        print("✓ Tests passed")
        print("✓ Build successful")
        print("✓ Deployment complete")


# Testing Excellence
TESTING_COVERAGE = 0.90  # 90% baseline
TESTING_FRAMEWORK = 'React Testing Library'

# Mentorship
mentored_developers = 3
technologies_taught = ['Python', 'ReactJS']
onboarding_success_rate = 1.0  # 100%`
    },
    'README.md': {
      language: 'markdown',
      content: `# Francis Penetrante
## Senior Software Engineer

### 🎯 Professional Summary
Results-driven Software Engineer with **13 years** of progressive
experience in the IT industry. Specialized in full-stack development
with ReactJS and NodeJS, complemented by deep expertise in cloud
platforms and modern data engineering.

### 🏆 Key Achievements
- ⚡ **75%** reduction in data processing time through optimization
- 📊 **90%** on-time feature delivery rate with XP methodology
- 🚀 **Zero** manual deployments after CI/CD automation
- 👨‍💻 **13+** years of professional software engineering experience

### 💼 Current Position
**Senior Software Engineer** at Eclaro / SPINS
📍 Quezon City | 📅 Mar 2022 - Present

### 🛠️ Core Technologies
\`\`\`
React • Node.js • TypeScript • Python
GCP • AWS • Azure • Docker • Terraform
Airflow • BigQuery • Snowflake
\`\`\`

### 📫 Contact
- 📧 fcpenet@gmail.com
- 📱 +63 917 512 3972
- 📍 Taguig City, PH

### 🎓 Education
**M.S. Computer Science** - Mapua University (2017 - Present)
_AI Specialization_

**B.S. Computer Engineering** - Mapua Institute of Technology (2011)

---
⭐ Passionate about emerging technologies and continuous learning`
    }
  };

  const fileIcons: { [key: string]: string } = {
    ts: '📘',
    json: '📋',
    py: '🐍',
    md: '📝'
  };

  const getFileIcon = (filename: string) => {
    const ext = filename.split('.').pop() || '';
    return fileIcons[ext] || '📄';
  };

  const fileList = Object.keys(files);

  return (
    <div className={styles.container}>
      <div className={styles.ide}>
        {/* Top Bar */}
        <div className={styles.topBar}>
          <div className={styles.windowControls}>
            <Link href="/" className={styles.controlRed} title="Close"></Link>
            <span className={styles.controlYellow}></span>
            <span className={styles.controlGreen}></span>
          </div>
          <div className={styles.ideTitle}>
            Francis Penetrante - Senior Software Engineer - Workspace
          </div>
        </div>

        {/* Main Content */}
        <div className={styles.ideContent}>
          {/* Sidebar */}
          <div className={styles.sidebar}>
            <div className={styles.sidebarHeader}>
              <span>📁 PORTFOLIO</span>
            </div>
            <div className={styles.fileList}>
              {fileList.map((file) => (
                <div
                  key={file}
                  className={`${styles.fileItem} ${
                    activeFile === file ? styles.activeFile : ''
                  }`}
                  onClick={() => setActiveFile(file)}
                >
                  <span className={styles.fileIcon}>{getFileIcon(file)}</span>
                  <span className={styles.fileName}>{file}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Editor */}
          <div className={styles.editorContainer}>
            {/* Split View */}
            <div className={styles.splitView}>
              {/* Left: Code Editor */}
              <div className={styles.editorPanel}>
                <div className={styles.panelHeader}>
                  <span>{getFileIcon(activeFile)}</span>
                  <span>{activeFile}</span>
                  <span className={styles.panelLabel}>Code</span>
                </div>
                <div className={styles.editor}>
                  <pre className={styles.codeBlock}>
                    <code className={`language-${files[activeFile as keyof typeof files].language}`}>
                      {files[activeFile as keyof typeof files].content}
                    </code>
                  </pre>
                </div>
              </div>

              {/* Right: Live Preview */}
              <div className={styles.previewPanel}>
                <div className={styles.panelHeader}>
                  <span>🌐</span>
                  <span>Live Preview</span>
                  <span className={styles.panelLabel}>localhost:3000</span>
                </div>
                <div className={styles.browser}>
                {/* Browser Header */}
                <div className={styles.browserHeader}>
                  <div className={styles.browserControls}>
                    <span>←</span>
                    <span>→</span>
                    <span>↻</span>
                  </div>
                  <div className={styles.addressBar}>
                    <span className={styles.secure}>🔒</span>
                    <span className={styles.url}>localhost:3000</span>
                  </div>
                </div>

                {/* Rendered React App */}
                <div className={styles.reactApp}>
                  <div className={styles.appHeader}>
                    <h1 className={styles.appName}>Francis Penetrante</h1>
                    <h2 className={styles.appRole}>Senior Software Engineer</h2>
                    <p className={styles.appTagline}>Full Stack Developer • Data Engineering Specialist</p>
                  </div>

                  <div className={styles.appContent}>
                    <div className={styles.appSection}>
                      <h3 className={styles.sectionTitle}>🎯 Key Achievements</h3>
                      <div className={styles.achievementGrid}>
                        <div className={styles.achievementCard}>
                          <div className={styles.achievementMetric}>75%</div>
                          <p>Reduction in processing time</p>
                        </div>
                        <div className={styles.achievementCard}>
                          <div className={styles.achievementMetric}>90%</div>
                          <p>On-time delivery rate</p>
                        </div>
                        <div className={styles.achievementCard}>
                          <div className={styles.achievementMetric}>Zero</div>
                          <p>Manual deployments</p>
                        </div>
                        <div className={styles.achievementCard}>
                          <div className={styles.achievementMetric}>13+</div>
                          <p>Years of experience</p>
                        </div>
                      </div>
                    </div>

                    <div className={styles.appSection}>
                      <h3 className={styles.sectionTitle}>💻 Core Technologies</h3>
                      <div className={styles.skillGrid}>
                        {['React', 'Node.js', 'TypeScript', 'Python', 'GCP', 'AWS', 'Azure', 'Airflow', 'BigQuery', 'Snowflake', 'Docker', 'Terraform'].map((skill) => (
                          <span key={skill} className={styles.skillBadge}>{skill}</span>
                        ))}
                      </div>
                    </div>

                    <div className={styles.appSection}>
                      <h3 className={styles.sectionTitle}>💼 Current Position</h3>
                      <div className={styles.currentRole}>
                        <h4>Senior Software Engineer</h4>
                        <p className={styles.company}>Eclaro / SPINS</p>
                        <p className={styles.period}>Mar 2022 - Present • Quezon City</p>
                        <ul className={styles.highlights}>
                          <li>Architected ETL pipelines using Apache Airflow & BigQuery</li>
                          <li>Achieved 75% reduction in data processing time</li>
                          <li>Built React applications with 90% test coverage</li>
                          <li>Deployed GraphQL federation with Auth0 security</li>
                        </ul>
                      </div>
                    </div>

                    <div className={styles.appSection}>
                      <h3 className={styles.sectionTitle}>📫 Contact</h3>
                      <div className={styles.contactInfo}>
                        <p>📧 fcpenet@gmail.com</p>
                        <p>📱 +63 917 512 3972</p>
                        <p>📍 Taguig City, PH</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </div>

            {/* Terminal */}
            <div className={styles.terminal}>
              <div className={styles.terminalHeader}>
                <span>⚡ TERMINAL</span>
              </div>
              <div className={styles.terminalContent}>
                {terminalOutput.map((line, index) => (
                  <div key={index} className={styles.terminalLine}>
                    {line}
                  </div>
                ))}
                <div className={styles.terminalCursor}>
                  <span className={styles.prompt}>$</span>
                  <span className={styles.cursor}>_</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Status Bar */}
        <div className={styles.statusBar}>
          <div className={styles.statusLeft}>
            <span>⚡ Ready</span>
            <span>🔧 {files[activeFile as keyof typeof files].language}</span>
            <span>✓ No Problems</span>
          </div>
          <div className={styles.statusRight}>
            <span>13+ Years Experience</span>
            <span>Senior Software Engineer</span>
          </div>
        </div>
      </div>
    </div>
  );
}
