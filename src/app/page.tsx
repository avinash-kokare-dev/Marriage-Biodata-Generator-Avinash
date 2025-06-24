'use client';
import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";
import { FaHeart } from "react-icons/fa";
import { useEffect, useState } from "react";
import TemplateCarousel from "@/components/TemplateCarousel";
import HeroSection from "@/components/HeroSection";

const animatedTexts = [
  "AI-powered About Me generator",
  "Smart Partner Expectations suggestions",
  "Instant, beautiful biodata preview",
];

export default function Home() {
  const [currentText, setCurrentText] = useState(animatedTexts[0]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % animatedTexts.length);
    }, 2200);
    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    setCurrentText(animatedTexts[index]);
  }, [index]);

  return (
    <div className={styles.heroWrapper}>
      <HeroSection />
      {/* Home Features Section */}
      <section id="features" className={styles.featuresSection}>
        <h2 className={styles.featuresTitle}>Why Choose Us?</h2>
        <div className={styles.featuresGrid}>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}><FaHeart /></div>
            <h3 className={styles.featureHeading}>AI-Powered Writing</h3>
            <p className={styles.featureText}>Let AI help you write your "About Me" and partner expectations, making your biodata stand out.</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}><Image src="/globe.svg" alt="Modern Design" width={32} height={32} /></div>
            <h3 className={styles.featureHeading}>Modern, Elegant Design</h3>
            <p className={styles.featureText}>Enjoy a clean, beautiful, and professional look that feels like a premium SaaS app.</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}><Image src="/window.svg" alt="Instant Preview" width={32} height={32} /></div>
            <h3 className={styles.featureHeading}>Instant Live Preview</h3>
            <p className={styles.featureText}>See your biodata update in real time as you edit, with no surprises.</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}><Image src="/file.svg" alt="Easy Export" width={32} height={32} /></div>
            <h3 className={styles.featureHeading}>Easy Export</h3>
            <p className={styles.featureText}>Download your biodata as a beautiful PDF, ready to share with family and prospects.</p>
          </div>
        </div>
      </section>
      {/* Add Template Carousel Section */}
      <TemplateCarousel />
    </div>
  );
}
