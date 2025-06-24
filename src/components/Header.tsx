// src/components/layout/Header/Header.tsx
'use client'; // Required for useState and event handlers

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; // For active link highlighting
import styles from './Header.module.scss';

interface NavLink {
  href: string;
  label: string;
}

const navLinks: NavLink[] = [
  { href: '/biodata', label: 'Biodata Creator' },
  { href: '/pool', label: 'Marriage Pool' },
  { href: '/invitations', label: 'Invitations' },
  { href: '/auth/login', label: 'Login' }, // Example auth link
];

const Header: React.FC = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const pathname = usePathname();

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  // Close nav on route change
  useEffect(() => {
    setIsNavOpen(false);
  }, [pathname]);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link href="/">AI Marriage Journey</Link>
        </div>
        <nav className={`${styles.nav} ${isNavOpen ? styles.open : ''}`}>
          <ul>
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={pathname === link.href ? styles.active : ''}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <button className={styles.menuToggle} onClick={toggleNav} aria-label="Toggle navigation">
          {/* Simple hamburger icon, consider using an SVG icon library */}
          &#9776;
        </button>
      </div>
    </header>
  );
};

export default Header;