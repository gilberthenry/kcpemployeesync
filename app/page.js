'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './page.module.css';

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const features = [
    {
      icon: '👥',
      title: 'Employee Management',
      description: 'Manage employee profiles, documents, and information efficiently'
    },
    {
      icon: '📋',
      title: 'Leave Management',
      description: 'Track and manage employee leaves with ease'
    },
    {
      icon: '📜',
      title: 'Contracts & Documents',
      description: 'Store and organize all employee contracts and documents'
    },
    {
      icon: '📊',
      title: 'Reports & Analytics',
      description: 'Generate comprehensive HR reports and insights'
    },
    {
      icon: '🔔',
      title: 'Notifications',
      description: 'Stay updated with important employee notifications'
    },
    {
      icon: '🏢',
      title: 'Department Management',
      description: 'Organize employees by departments and designations'
    }
  ];

  return (
    <div className={`${styles.container} ${isLoaded ? styles.loaded : ''}`}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.title}>
            <span className={styles.word}>Welcome</span>
            <span className={styles.word}>to</span>
            <span className={styles.word}>KCP</span>
            <span className={styles.word}>Employee</span>
            <span className={styles.word}>Sync</span>
          </h1>
          <p className={styles.subtitle}>
            Your Complete HR Management Solution
          </p>
          <p className={styles.description}>
            Streamline employee management, automate HR processes, and enhance workplace productivity with our modern HR platform.
          </p>
          <div className={styles.ctaButtons}>
            <Link href="/hr" className={`${styles.btn} ${styles.btnPrimary}`}>
              Get Started
            </Link>
            <Link href="/employee" className={`${styles.btn} ${styles.btnSecondary}`}>
              Employee Portal
            </Link>
          </div>
        </div>
        <div className={styles.heroAnimation}>
          <div className={styles.animatedBox}></div>
          <div className={styles.animatedBox}></div>
          <div className={styles.animatedBox}></div>
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.features}>
        <h2 className={styles.sectionTitle}>Our Features</h2>
        <div className={styles.featuresGrid}>
          {features.map((feature, index) => (
            <div
              key={index}
              className={styles.featureCard}
              style={{ '--delay': `${index * 0.1}s` }}
            >
              <div className={styles.featureIcon}>{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className={styles.stats}>
        <div className={styles.statCard}>
          <h3 className={styles.statNumber}>100+</h3>
          <p>Employees Managed</p>
        </div>
        <div className={styles.statCard}>
          <h3 className={styles.statNumber}>50+</h3>
          <p>Departments</p>
        </div>
        <div className={styles.statCard}>
          <h3 className={styles.statNumber}>24/7</h3>
          <p>System Availability</p>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className={styles.cta}>
        <h2>Ready to Transform Your HR?</h2>
        <p>Start managing your workforce more efficiently today</p>
        <Link href="/hr" className={`${styles.btn} ${styles.btnLarge}`}>
          Access HR Dashboard
        </Link>
      </section>
    </div>
  );
}