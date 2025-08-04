import React, { useState } from 'react';
import styles from './Breadcrumbs.module.scss';

const breadcrumbsHtml = `<nav class="vertex-breadcrumbs" aria-label="Breadcrumb">
  <ol>
    <li><a href="#">Home</a></li>
    <li><a href="#">Library</a></li>
    <li aria-current="page">Data</li>
  </ol>
</nav>`;

const breadcrumbsCss = `.vertex-breadcrumbs {
  display: flex;
  align-items: center;
  font-size: 1rem;
}
.vertex-breadcrumbs ol {
  display: flex;
  gap: 0.5em;
  list-style: none;
  padding: 0;
  margin: 0;
}
.vertex-breadcrumbs li {
  color: #3b82f6;
}
.vertex-breadcrumbs li:not(:last-child)::after {
  content: '/';
  color: #6b7280;
  margin: 0 0.5em;
}
.vertex-breadcrumbs a {
  color: #3b82f6;
  text-decoration: none;
  transition: text-decoration 0.13s;
}
.vertex-breadcrumbs a:hover, .vertex-breadcrumbs a:focus {
  text-decoration: underline;
}
.vertex-breadcrumbs li[aria-current="page"] {
  color: #23272f;
  font-weight: 600;
}
`;

const breadcrumbsJs = `// React usage
<nav className="vertex-breadcrumbs" aria-label="Breadcrumb">
  <ol>
    <li><a href="#">Home</a></li>
    <li><a href="#">Library</a></li>
    <li aria-current="page">Data</li>
  </ol>
</nav>`;

const codeTabs = [
  { label: 'HTML', code: breadcrumbsHtml, lang: 'html' },
  { label: 'CSS', code: breadcrumbsCss, lang: 'css' },
  { label: 'JS/React', code: breadcrumbsJs, lang: 'js' },
];

const Breadcrumbs = () => {
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
    <div className={styles['breadcrumbs-demo-block']}>
      <div className={styles['breadcrumbs-preview']}>
        <nav className={styles['vertex-breadcrumbs']} aria-label="Breadcrumb">
          <ol>
            <li><a href="#">Home</a></li>
            <li><a href="#">Library</a></li>
            <li aria-current="page">Data</li>
          </ol>
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

export default Breadcrumbs; 