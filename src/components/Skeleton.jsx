import React, { useState } from 'react';
import './Skeleton.module.scss';

const skeletonHtml = `<div class="vertex-skeleton">
  <div class="vertex-skeleton-line vertex-skeleton-line--title"></div>
  <div class="vertex-skeleton-line"></div>
  <div class="vertex-skeleton-line"></div>
  <div class="vertex-skeleton-line vertex-skeleton-line--short"></div>
</div>

<div class="vertex-skeleton-card">
  <div class="vertex-skeleton-avatar"></div>
  <div class="vertex-skeleton-content">
    <div class="vertex-skeleton-line vertex-skeleton-line--title"></div>
    <div class="vertex-skeleton-line"></div>
  </div>
</div>`;

const skeletonCss = `.vertex-skeleton {
  padding: 1rem;
}

.vertex-skeleton-line {
  height: 1rem;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: vertex-skeleton-loading 1.5s infinite;
  border-radius: 0.25rem;
  margin-bottom: 0.75rem;
}

.vertex-skeleton-line--title {
  height: 1.5rem;
  width: 60%;
}

.vertex-skeleton-line--short {
  width: 40%;
}

.vertex-skeleton-card {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem;
  border: 1px solid #e0e6ed;
  border-radius: 0.5rem;
}

.vertex-skeleton-avatar {
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: vertex-skeleton-loading 1.5s infinite;
  flex-shrink: 0;
}

.vertex-skeleton-content {
  flex: 1;
}

@keyframes vertex-skeleton-loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}`;

const skeletonReact = `import React from 'react';

const Skeleton = ({ 
  lines = 3, 
  avatar = false, 
  title = false,
  className = '' 
}) => {
  if (avatar) {
    return (
      <div className={\`vertex-skeleton-card \${className}\`}>
        <div className="vertex-skeleton-avatar"></div>
        <div className="vertex-skeleton-content">
          {title && <div className="vertex-skeleton-line vertex-skeleton-line--title"></div>}
          {Array.from({ length: lines }).map((_, index) => (
            <div 
              key={index}
              className={\`vertex-skeleton-line \${
                index === lines - 1 ? 'vertex-skeleton-line--short' : ''
              }\`}
            ></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={\`vertex-skeleton \${className}\`}>
      {title && <div className="vertex-skeleton-line vertex-skeleton-line--title"></div>}
      {Array.from({ length: lines }).map((_, index) => (
        <div 
          key={index}
          className={\`vertex-skeleton-line \${
            index === lines - 1 ? 'vertex-skeleton-line--short' : ''
          }\`}
        ></div>
      ))}
    </div>
  );
};

export default Skeleton;`;

const codeTabs = [
  { label: 'HTML', code: skeletonHtml, lang: 'html' },
  { label: 'CSS', code: skeletonCss, lang: 'css' },
  { label: 'React', code: skeletonReact, lang: 'jsx' }
];

const Skeleton = () => {
  const [activeTab, setActiveTab] = useState('HTML');
  const [copied, setCopied] = useState(false);

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

  return (
    <div className="vertex-component-block" aria-label="Skeleton component demo">
      <h2>Skeleton</h2>
      <p className="vertex-component-description">
        Loading placeholder component that mimics content structure while data is being fetched.
      </p>
      <div className="vertex-preview" style={{ marginBottom: '1rem' }}>
        <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
          <div>
            <h4 style={{ marginBottom: '0.5rem', color: '#384E77' }}>Text Skeleton</h4>
            <div className="vertex-skeleton">
              <div className="vertex-skeleton-line vertex-skeleton-line--title"></div>
              <div className="vertex-skeleton-line"></div>
              <div className="vertex-skeleton-line"></div>
              <div className="vertex-skeleton-line vertex-skeleton-line--short"></div>
            </div>
          </div>
          <div>
            <h4 style={{ marginBottom: '0.5rem', color: '#384E77' }}>Card Skeleton</h4>
            <div className="vertex-skeleton-card">
              <div className="vertex-skeleton-avatar"></div>
              <div className="vertex-skeleton-content">
                <div className="vertex-skeleton-line vertex-skeleton-line--title"></div>
                <div className="vertex-skeleton-line"></div>
                <div className="vertex-skeleton-line vertex-skeleton-line--short"></div>
              </div>
            </div>
          </div>
        </div>
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

export default Skeleton;
