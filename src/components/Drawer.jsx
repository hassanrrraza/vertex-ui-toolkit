import React, { useState, useEffect } from 'react';
import './Drawer.module.scss';

const drawerHtml = `<div class="vertex-drawer-overlay vertex-drawer-overlay--open">
  <div class="vertex-drawer vertex-drawer--right vertex-drawer--open">
    <div class="vertex-drawer-header">
      <h3 class="vertex-drawer-title">Navigation Menu</h3>
      <button class="vertex-drawer-close" aria-label="Close drawer">×</button>
    </div>
    <div class="vertex-drawer-content">
      <nav class="vertex-drawer-nav">
        <a href="#" class="vertex-drawer-link">Dashboard</a>
        <a href="#" class="vertex-drawer-link">Profile</a>
        <a href="#" class="vertex-drawer-link">Settings</a>
        <a href="#" class="vertex-drawer-link">Help</a>
      </nav>
    </div>
  </div>
</div>`;

const drawerCss = `.vertex-drawer-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease, visibility 0.3s ease;
}

.vertex-drawer-overlay--open {
  opacity: 1;
  visibility: visible;
}

.vertex-drawer {
  position: fixed;
  top: 0;
  bottom: 0;
  width: 320px;
  max-width: 80vw;
  background: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transform: translateX(-100%);
  transition: transform 0.3s ease;
  display: flex;
  flex-direction: column;
}

.vertex-drawer--right {
  right: 0;
  transform: translateX(100%);
}

.vertex-drawer--open {
  transform: translateX(0);
}

.vertex-drawer-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  border-bottom: 1px solid #e0e6ed;
}

.vertex-drawer-title {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: #0D0630;
}

.vertex-drawer-close {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #666;
  padding: 0.25rem;
  border-radius: 0.25rem;
  transition: background 0.2s ease;
}

.vertex-drawer-close:hover {
  background: #f8f9fa;
}

.vertex-drawer-content {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
}

.vertex-drawer-nav {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.vertex-drawer-link {
  display: block;
  padding: 0.75rem;
  color: #0D0630;
  text-decoration: none;
  border-radius: 0.375rem;
  transition: background 0.2s ease;
}

.vertex-drawer-link:hover {
  background: #f8f9fa;
  color: #384E77;
}`;

const drawerReact = `import React, { useState, useEffect } from 'react';

const Drawer = ({ 
  isOpen = false, 
  onClose, 
  position = 'left',
  title = 'Menu',
  children,
  className = '' 
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose?.();
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className={\`vertex-drawer-overlay vertex-drawer-overlay--open\`}
      onClick={handleOverlayClick}
    >
      <div className={\`vertex-drawer vertex-drawer--\${position} vertex-drawer--open \${className}\`}>
        <div className="vertex-drawer-header">
          <h3 className="vertex-drawer-title">{title}</h3>
          <button 
            className="vertex-drawer-close" 
            onClick={onClose}
            aria-label="Close drawer"
          >
            ×
          </button>
        </div>
        <div className="vertex-drawer-content">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Drawer;`;

const codeTabs = [
  { label: 'HTML', code: drawerHtml, lang: 'html' },
  { label: 'CSS', code: drawerCss, lang: 'css' },
  { label: 'React', code: drawerReact, lang: 'jsx' }
];

const Drawer = () => {
  const [activeTab, setActiveTab] = useState('HTML');
  const [copied, setCopied] = useState(false);
  const [leftDrawerOpen, setLeftDrawerOpen] = useState(false);
  const [rightDrawerOpen, setRightDrawerOpen] = useState(false);

  const currentTab = codeTabs.find(tab => tab.label === activeTab);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentTab.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch (err) {
      setCopied(false);
    }
  };

  const DrawerComponent = ({ isOpen, onClose, position, title, children }) => {
    useEffect(() => {
      if (isOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'unset';
      }
      
      return () => {
        document.body.style.overflow = 'unset';
      };
    }, [isOpen]);

    const handleOverlayClick = (e) => {
      if (e.target === e.currentTarget) {
        onClose?.();
      }
    };

    if (!isOpen) return null;

    return (
      <div 
        className="vertex-drawer-overlay vertex-drawer-overlay--open"
        onClick={handleOverlayClick}
      >
        <div className={`vertex-drawer vertex-drawer--${position} vertex-drawer--open`}>
          <div className="vertex-drawer-header">
            <h3 className="vertex-drawer-title">{title}</h3>
            <button 
              className="vertex-drawer-close" 
              onClick={onClose}
              aria-label="Close drawer"
            >
              ×
            </button>
          </div>
          <div className="vertex-drawer-content">
            {children}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="vertex-component-block" aria-label="Drawer component demo">
      <h2>Drawer</h2>
      <p className="vertex-component-description">
        Slide-out navigation panel that overlays content from the side of the screen.
      </p>
      <div className="vertex-preview" style={{ marginBottom: '1rem' }}>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <button 
            className="vertex-btn vertex-btn--primary"
            onClick={() => setLeftDrawerOpen(true)}
            aria-label="Open left drawer"
          >
            Open Left Drawer
          </button>
          <button 
            className="vertex-btn vertex-btn--secondary"
            onClick={() => setRightDrawerOpen(true)}
            aria-label="Open right drawer"
          >
            Open Right Drawer
          </button>
        </div>

        <DrawerComponent
          isOpen={leftDrawerOpen}
          onClose={() => setLeftDrawerOpen(false)}
          position="left"
          title="Left Navigation"
        >
          <nav className="vertex-drawer-nav">
            <a href="#" className="vertex-drawer-link">Dashboard</a>
            <a href="#" className="vertex-drawer-link">Profile</a>
            <a href="#" className="vertex-drawer-link">Settings</a>
            <a href="#" className="vertex-drawer-link">Help</a>
          </nav>
        </DrawerComponent>

        <DrawerComponent
          isOpen={rightDrawerOpen}
          onClose={() => setRightDrawerOpen(false)}
          position="right"
          title="Right Menu"
        >
          <nav className="vertex-drawer-nav">
            <a href="#" className="vertex-drawer-link">Notifications</a>
            <a href="#" className="vertex-drawer-link">Messages</a>
            <a href="#" className="vertex-drawer-link">Account</a>
            <a href="#" className="vertex-drawer-link">Logout</a>
          </nav>
        </DrawerComponent>
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
            <code className={`language-${currentTab.lang}`}>{currentTab.code}</code>
          </pre>
          <button className="vertex-copy-btn" onClick={handleCopy} type="button" aria-label="Copy code">
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Drawer;
