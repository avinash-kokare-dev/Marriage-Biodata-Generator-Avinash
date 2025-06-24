'use client'
// src/components/layout/Footer/Footer.tsx
import React from 'react';
import Link from 'next/link';
import styles from './footer.module.scss';

// Example: Using react-icons (npm install react-icons)
// import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

// Placeholder Icons if not using react-icons
const FacebookIcon = () => <span>FB</span>;
const TwitterIcon = () => <span>TW</span>;
const InstagramIcon = () => <span>IG</span>;

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerTop}>
          <div className={styles.footerBrand}>
            <Link href="/" className={styles.footerLogo}>AI Marriage Journey</Link>
            <p className={styles.footerSlogan}>Crafting connections, intelligently.</p>
          </div>
          <div className={styles.footerLinks}>
            <h4>Quick Links</h4>
            <ul>
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/contact">Contact</Link></li>
              <li><Link href="/faq">FAQ</Link></li>
              <li><Link href="/blog">Blog</Link></li> {/* Example new link */}
            </ul>
          </div>
          <div className={styles.footerLegal}>
            <h4>Legal</h4>
            <ul>
              <li><Link href="/privacy">Privacy Policy</Link></li>
              <li><Link href="/terms">Terms of Service</Link></li>
            </ul>
          </div>
          <div className={styles.footerSocial}>
            <h4>Connect With Us</h4>
            <div className={styles.socialIcons}>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><FacebookIcon /></a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter"><TwitterIcon /></a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><InstagramIcon /></a>
            </div>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <p>&copy; {currentYear} AI Marriage Journey Platform. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;