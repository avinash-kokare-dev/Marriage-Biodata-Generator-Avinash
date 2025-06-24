// src/app/page.tsx
'use client'; // Needed for potential future client-side animations or useEffects for scroll

import React, { useEffect } from 'react';
import Button from '../components/Button';
import styles from './home.module.scss';
import Link from 'next/link'; // For internal navigation

const BiodataIcon = () => <span style={{ fontSize: '2rem' }}>📝</span>;
const PoolIcon = () => <span style={{ fontSize: '2rem' }}>💖</span>;
const InvitationIcon = () => <span style={{ fontSize: '2rem' }}>💌</span>;

export default function HeroSection() {
  // Simple fade-in on scroll observer (optional, can be expanded)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
            observer.unobserve(entry.target); // Optional: stop observing after visible
          }
        });
      },
      { threshold: 0.1 } // Trigger when 10% of the element is visible
    );

    const elementsToAnimate = document.querySelectorAll(`.${styles.animateFadeIn}`);
    elementsToAnimate.forEach((el) => observer.observe(el));

    return () => elementsToAnimate.forEach((el) => observer.unobserve(el));
  }, []);

  return (
    <div className={styles.homePageWrapper}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroOverlay}></div>
        <div className={`${styles.heroContent} ${styles.animateFadeIn}`}>
          <h1 className={styles.heroTitle}>Begin Your Beautiful Journey, Intelligently.</h1>
          <p className={styles.heroSubtitle}>
            The AI-Powered Marriage Journey Platform, designed with culture, connection, and you in mind.
          </p>
          <Link href="/biodata" passHref>
            <Button variant="primary" className={styles.heroCta}>
              Create Your Biodata
            </Button>
          </Link>
        </div>
      </section>

      {/* Introduction Section */}
      <section className={`${styles.introSection} ${styles.animateFadeIn}`}>
        <div className="container"> {/* Using global container class */}
          <h2>The Path to 'I Do', Reimagined</h2>
          <p>
            Embarking on the journey of marriage is profound. We understand the traditions, the excitement,
            and the complexities. Our platform seamlessly blends cultural wisdom with intelligent AI
            to make every step—from crafting the perfect biodata to finding your match and sending beautiful
            invitations—smoother and more joyful.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.featuresSection}>
        <div className="container">
          <h2 className={styles.sectionTitle}>Your AI-Powered Companions</h2>
          <div className={styles.featuresGrid}>
            <div className={`${styles.featureCard} ${styles.animateFadeIn}`}>
              <BiodataIcon />
              <h3>AI Biodata Generator</h3>
              <p>Create compelling, authentic biodatas that truly represent you, with AI assistance every step of the way.</p>
              <Link href="/biodata" className={styles.featureLink}>Learn More &rarr;</Link>
            </div>
            <div className={`${styles.featureCard} ${styles.animateFadeIn}`}>
              <PoolIcon />
              <h3>Intelligent Match Pool</h3>
              <p>Opt-in to discover relevant connections in a secure, privacy-first environment, guided by smart matching.</p>
              <Link href="/pool" className={styles.featureLink}>Explore Matches &rarr;</Link>
            </div>
            <div className={`${styles.featureCard} ${styles.animateFadeIn}`}>
              <InvitationIcon />
              <h3>Elegant Invitation Creator</h3>
              <p>Design beautiful, culturally appropriate wedding invitations with ease, powered by AI suggestions.</p>
              <Link href="/invitations" className={styles.featureLink}>Design Invitations &rarr;</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className={`${styles.whyChooseUsSection} ${styles.animateFadeIn}`}>
        <div className="container">
          <h2 className={styles.sectionTitle}>Crafted with Care & Intelligence</h2>
          <div className={styles.whyChooseGrid}>
            <div>
              <h4>Cultural Sensitivity</h4>
              <p>Deeply embedded understanding of diverse Indian traditions and etiquette.</p>
            </div>
            <div>
              <h4>AI That Understands</h4>
              <p>Go beyond keywords with AI that grasps nuance and intent for better results.</p>
            </div>
            <div>
              <h4>Trust & Security</h4>
              <p>Your privacy is paramount. Robust security and user control are our foundations.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className={`${styles.finalCtaSection} ${styles.animateFadeIn}`}>
        <div className="container">
          <h2>Ready to Start Your Journey?</h2>
          <p>Join thousands of others who are finding a smarter, more heartfelt way to navigate one of life's most important milestones.</p>
          <Link href="/auth/signup" passHref> {/* Assuming a signup page */}
            <Button variant="secondary" className={styles.heroCta}>
              Sign Up for Free
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}