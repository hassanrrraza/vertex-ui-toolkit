import React, { useState } from 'react';
import './Navbar.module.scss';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="vertex-navbar">
      <div className="vertex-navbar-container">
        <a href="#" className="vertex-navbar-brand">Vertex</a>
        
        <button 
          className="vertex-navbar-toggler"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation"
        >
          {isOpen ? (
            <span className="vertex-navbar-toggler-icon">×</span>
          ) : (
            <span className="vertex-navbar-toggler-icon">☰</span>
          )}
        </button>

        <div className={`vertex-navbar-collapse ${isOpen ? 'show' : ''}`}>
          <ul className="vertex-navbar-nav">
            <li className="vertex-nav-item">
              <a href="#" className="vertex-nav-link active">Home</a>
            </li>
            <li className="vertex-nav-item">
              <a href="#" className="vertex-nav-link">Components</a>
            </li>
            <li className="vertex-nav-item">
              <a href="#" className="vertex-nav-link">Documentation</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
      icon: <FiLayers className={styles['nav-icon']} />,
      href: '#',
      dropdown: [
        { label: 'All Components', href: '#' },
        { label: 'Inputs', href: '#inputs' },
        { label: 'Feedback', href: '#feedback' },
        { label: 'Navigation', href: '#navigation' },
        { label: 'Layout', href: '#layout' }
      ]
    },
    { 
      label: 'Documentation', 
      icon: <FiBook className={styles['nav-icon']} />,
      href: '#',
      dropdown: [
        { label: 'Getting Started', href: '#' },
        { label: 'Installation', href: '#' },
        { label: 'Customization', href: '#' },
        { label: 'Theming', href: '#' }
      ]
    },
    { 
      label: 'Examples', 
      icon: <FiCode className={styles['nav-icon']} />,
      href: '#'
    }
  ];

  const navbarHtml = `
<nav class="${styles['vertex-navbar']} ${isScrolled ? styles.scrolled : ''}">
  <div class="${styles['vertex-navbar-container']}">
    <a href="#" class="${styles['vertex-navbar-brand']}">
      <span class="${styles['vertex-navbar-brand-icon']}">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
          <polyline points="2 17 12 22 22 17"></polyline>
          <polyline points="2 12 12 17 22 12"></polyline>
        </svg>
      </span>
      Vertex
    </a>
    
    <button class="${styles['vertex-navbar-toggler']}" type="button" aria-label="Toggle navigation">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="3" y1="12" x2="21" y2="12"></line>
        <line x1="3" y1="6" x2="21" y2="6"></line>
        <line x1="3" y1="18" x2="21" y2="18"></line>
      </svg>
    </button>
    
    <ul class="${styles['vertex-navbar-nav']}">
      <li class="${styles['vertex-navbar-nav-item']}">
        <a href="#" class="${styles['nav-link']} ${styles.active}">Home</a>
      </li>
      <li class="${styles['vertex-navbar-nav-item']}">
        <a href="#" class="${styles['nav-link']}">Components</a>
        <div class="${styles['dropdown-menu']}">
          <a href="#" class="${styles['dropdown-item']}">All Components</a>
          <a href="#" class="${styles['dropdown-item']}">Inputs</a>
          <a href="#" class="${styles['dropdown-item']}">Feedback</a>
          <a href="#" class="${styles['dropdown-item']}">Navigation</a>
          <a href="#" class="${styles['dropdown-item']}">Layout</a>
        </div>
      </li>
      <li class="${styles['vertex-navbar-nav-item']}">
        <a href="#" class="${styles['nav-link']}">Documentation</a>
      </li>
    </ul>
  </div>
</nav>`;

const navbarCss = `/* Navbar container */
.vertex-navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(135deg, #384E77 0%, #2a3c5a 100%);
  color: #fff;
  padding: 0.75rem 2rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  transition: all 0.3s ease;
}

/* Navbar when scrolled */
.vertex-navbar.scrolled {
  padding: 0.5rem 2rem;
  background: rgba(56, 78, 119, 0.98);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

/* Navbar container */
.vertex-navbar-container {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Brand styles */
.vertex-navbar-brand {
  font-weight: 700;
  font-size: 1.5rem;
  letter-spacing: 1px;
  color: #fff;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 0;
  transition: transform 0.2s ease;
}

.vertex-navbar-brand:hover {
  transform: translateY(-1px);
}

.vertex-navbar-brand-icon {
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  padding: 4px;
}

/* Navigation links */
.vertex-navbar-nav {
  display: flex;
  gap: 1.5rem;
  list-style: none;
  margin: 0;
  padding: 0;
  align-items: center;
}

.vertex-navbar-nav-item {
  position: relative;
}

.nav-link {
  color: rgba(255, 255, 255, 0.85);
  text-decoration: none;
  font-weight: 500;
  padding: 0.75rem 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s ease;
  position: relative;
  cursor: pointer;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: #8BBEB2;
  transition: width 0.3s ease;
  border-radius: 2px;
}

.nav-link:hover,
.nav-link.active {
  color: #fff;
}

.nav-link:hover::after,
.nav-link.active::after {
  width: 100%;
}

/* Dropdown menu */
.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  background: #fff;
  min-width: 200px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  opacity: 0;
  visibility: hidden;
  transform: translateY(10px);
  transition: all 0.25s ease;
  z-index: 100;
  padding: 0.5rem 0;
}

.dropdown-item {
  color: #333;
  padding: 0.5rem 1.25rem;
  text-decoration: none;
  display: block;
  transition: all 0.2s ease;
  font-size: 0.95rem;
}

.dropdown-item:hover {
  background: #f8f9fa;
  color: #384E77;
  padding-left: 1.5rem;
}

/* Show dropdown on hover */
.vertex-navbar-nav-item:hover .dropdown-menu {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

/* Mobile menu button */
.vertex-navbar-toggler {
  display: none;
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 4px;
  transition: background-color 0.2s ease;
}

.vertex-navbar-toggler:hover {
  background: rgba(255, 255, 255, 0.1);
}

.vertex-navbar-toggler:focus {
  outline: 2px solid #8BBEB2;
  outline-offset: 2px;
}

/* Mobile styles */
@media (max-width: 992px) {
  .vertex-navbar {
    padding: 0.75rem 1.5rem;
  }
  
  .vertex-navbar-toggler {
    display: block;
  }
  
  .vertex-navbar-nav {
    position: fixed;
    top: 70px;
    left: 0;
    width: 100%;
    background: #2a3c5a;
    flex-direction: column;
    align-items: stretch;
    padding: 1rem 0;
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s ease-in-out;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  .vertex-navbar-nav.open {
    max-height: 500px;
  }
  
  .vertex-navbar-nav-item {
    width: 100%;
  }
  
  .nav-link {
    padding: 1rem 1.5rem;
  }
  
  .nav-link::after {
    display: none;
  }
  
  .nav-link.active {
    background: rgba(255, 255, 255, 0.1);
  }
  
  .dropdown-menu {
    position: static;
    box-shadow: none;
    background: rgba(0, 0, 0, 0.1);
    display: none;
    opacity: 1;
    visibility: visible;
    transform: none;
    max-height: 0;
    transition: max-height 0.3s ease-in-out;
    overflow: hidden;
    padding: 0;
  }
  
  .dropdown-menu.show {
    display: block;
    max-height: 500px;
  }
  
  .dropdown-item {
    padding-left: 2.5rem;
    color: rgba(255, 255, 255, 0.85);
  }
  
  .dropdown-item:hover {
    background: rgba(255, 255, 255, 0.1);
    color: #fff;
    padding-left: 3rem;
  }
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .vertex-navbar {
    background: linear-gradient(135deg, #2a3c5a 0%, #1e2b41 100%);
  }
  
  .dropdown-menu {
    background: #2a3c5a;
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  .dropdown-item {
    color: rgba(255, 255, 255, 0.85);
  }
  
  .dropdown-item:hover {
    background: rgba(255, 255, 255, 0.05);
    color: #fff;
  }
}`;

const navbarJs = `// Toggle mobile menu
const toggleMenu = () => {
  const nav = document.querySelector('.${styles['vertex-navbar-nav']}');
  nav.classList.toggle('open');
};

// Close dropdowns when clicking outside
document.addEventListener('click', (e) => {
  if (!e.target.matches('.${styles['nav-link']}')) {
    const dropdowns = document.querySelectorAll('.${styles['dropdown-menu']}');
    dropdowns.forEach(dropdown => {
      dropdown.style.display = 'none';
    });
  }
});

// Toggle dropdown on click (for mobile)
const navLinks = document.querySelectorAll('.${styles['nav-link']}');
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    if (window.innerWidth <= 992) {
      const dropdown = link.nextElementSibling;
      if (dropdown && dropdown.classList.contains('${styles['dropdown-menu']}')) {
        e.preventDefault();
        const isOpen = dropdown.style.display === 'block';
        document.querySelectorAll('.${styles['dropdown-menu']}').forEach(d => {
          d.style.display = 'none';
        });
        dropdown.style.display = isOpen ? 'none' : 'block';
      }
    }
  });
});

// Add scroll effect
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.${styles['vertex-navbar']}');
  if (window.scrollY > 10) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});`;

const codeTabs = [
  { label: 'HTML', code: navbarHtml, lang: 'html' },
  { label: 'CSS', code: navbarCss, lang: 'css' },
  { label: 'JS', code: navbarJs, lang: 'js' },
];

  return (
    <div className="vertex-component-block" aria-label="Navbar component demo">
      <h2>Navbar</h2>
      <div className="vertex-preview" style={{ marginBottom: '1rem' }}>
        <nav 
          ref={navbarRef} 
          className={`${styles['vertex-navbar']} ${isScrolled ? styles.scrolled : ''}`}
        >
          <div className={styles['vertex-navbar-container']}>
            <a href="#" className={styles['vertex-navbar-brand']}>
              <span className={styles['vertex-navbar-brand-icon']}>
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                  <polyline points="2 17 12 22 22 17"></polyline>
                  <polyline points="2 12 12 17 22 12"></polyline>
                </svg>
              </span>
              Vertex
            </a>
            
            <button 
              className={styles['vertex-navbar-toggler']} 
              onClick={toggleMenu}
              type="button" 
              aria-label="Toggle navigation"
              aria-expanded={isOpen}
            >
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
            
            <ul className={`${styles['vertex-navbar-nav']} ${isOpen ? styles.open : ''}`}>
              {navItems.map((item, index) => (
                <li key={index} className={styles['vertex-navbar-nav-item']}>
                  {item.dropdown ? (
                    <>
                      <button 
                        className={`${styles['nav-link']} ${activeDropdown === item.label ? styles.active : ''}`}
                        onClick={() => toggleDropdown(item.label)}
                        aria-haspopup="true"
                        aria-expanded={activeDropdown === item.label}
                      >
                        {item.icon}
                        {item.label}
                        <FiChevronDown className={styles['nav-icon']} style={{ marginLeft: '4px' }} />
                      </button>
                      <div 
                        className={`${styles['dropdown-menu']} ${activeDropdown === item.label ? styles.show : ''}`}
                        role="menu"
                      >
                        {item.dropdown.map((subItem, subIndex) => (
                          <a 
                            key={subIndex} 
                            href={subItem.href} 
                            className={styles['dropdown-item']}
                            role="menuitem"
                          >
                            {subItem.label}
                          </a>
                        ))}
                      </div>
                    </>
                  ) : (
                    <a 
                      href={item.href} 
                      className={`${styles['nav-link']} ${item.active ? styles.active : ''}`}
                      onClick={() => setActiveDropdown(null)}
                    >
                      {item.icon}
                      {item.label}
                    </a>
                  )}
                </li>
              ))}
              <li className={styles['vertex-navbar-nav-item']} style={{ marginLeft: '0.5rem' }}>
                <a 
                  href="https://github.com/yourusername/vertex" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={styles['nav-link']}
                  aria-label="GitHub repository"
                >
                  <FiGithub className={styles['nav-icon']} />
                  <span className="sr-only">GitHub</span>
                </a>
              </li>
              <li className={styles['vertex-navbar-nav-item']}>
                <a 
                  href="#" 
                  className={`${styles['nav-link']} ${styles['cta-button']}`}
                  style={{
                    background: '#8BBEB2',
                    color: '#0D0630',
                    padding: '0.5rem 1.25rem',
                    borderRadius: '6px',
                    fontWeight: '600',
                    marginLeft: '0.5rem'
                  }}
                >
                  <FiDownload className={styles['nav-icon']} />
                  Download
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
      
      <div className="vertex-code-tabs">
        <div className="vertex-tab-list">
          {codeTabs.map(tab => (
            <button
              key={tab.label}
              className={`vertex-tab${activeTab === tab.label ? ' active' : ''}`}
              onClick={() => setActiveTab(tab.label)}
              type="button"
              aria-selected={activeTab === tab.label}
              tabIndex={activeTab === tab.label ? 0 : -1}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="vertex-tab-panel">
          <pre>
            <code className={`language-${currentTab.lang}`}>
              {currentTab.label === 'HTML' ? navbarHtml : 
               currentTab.label === 'CSS' ? navbarCss : 
               navbarJs}
            </code>
          </pre>
          <button 
            className="vertex-copy-btn" 
            onClick={handleCopy} 
            type="button" 
            aria-label="Copy code"
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar; 