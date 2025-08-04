import React, { useState } from 'react';
import styles from './Navbar.new.module.scss';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: 'Home', href: '#' },
    { label: 'Components', href: '#components' },
    { label: 'Documentation', href: '#docs' },
  ];

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.logoSection}>
          <div className={styles.logoCircle}>
            <span className={styles.logoText}>V</span>
          </div>
          <a href="/" className={styles.brand}>
            Vertex
          </a>
        </div>

        <div className={styles.navSection}>
          <ul className={styles.navList}>
            {navItems.map((item, index) => (
              <li key={index} className={styles.navItem}>
                <a 
                  href={item.href} 
                  className={styles.navLink}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.actionSection}>
          <button className={styles.searchButton}>
            <svg className={styles.searchIcon} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>
          <button className={styles.getStartedButton}>
            Get Started
          </button>
        </div>

        <button 
          className={styles.toggle}
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-label="Toggle navigation"
        >
          <span className={styles.toggleIcon}>
            {isOpen ? '×' : '☰'}
          </span>
        </button>

        <div className={`${styles.mobileMenu} ${isOpen ? styles.show : ''}`}>
          <ul className={styles.mobileNavList}>
            {navItems.map((item, index) => (
              <li key={index} className={styles.mobileNavItem}>
                <a 
                  href={item.href} 
                  className={styles.mobileNavLink}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
