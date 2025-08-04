import React, { useState } from 'react';
import styles from './Badge.module.scss';

const badgeHtml = `<span class="vertex-badge vertex-badge--primary">Primary</span>
<span class="vertex-badge vertex-badge--success">Success</span>
<span class="vertex-badge vertex-badge--warning">Warning</span>
<span class="vertex-badge vertex-badge--danger">Danger</span>`;

const badgeCss = `.vertex-badge {
  display: inline-block;
  padding: 0.25em 0.75em;
  border-radius: 0.5em;
  font-size: 0.98em;
  font-weight: 600;
  background: #e0e7ef;
  color: #23272f;
  margin-right: 0.5em;
  vertical-align: middle;
}
.vertex-badge--primary {
  background: #3b82f6;
  color: #fff;
}
.vertex-badge--success {
  background: #22c55e;
  color: #fff;
}
.vertex-badge--warning {
  background: #facc15;
  color: #23272f;
}
.vertex-badge--danger {
  background: #ef4444;
  color: #fff;
}
`;

const badgeJs = `// React usage
<span className="vertex-badge vertex-badge--primary">Primary</span>
<span className="vertex-badge vertex-badge--success">Success</span>
<span className="vertex-badge vertex-badge--warning">Warning</span>
<span className="vertex-badge vertex-badge--danger">Danger</span>`;

const codeTabs = [
  { label: 'HTML', code: badgeHtml, lang: 'html' },
  { label: 'CSS', code: badgeCss, lang: 'css' },
  { label: 'JS/React', code: badgeJs, lang: 'js' },
];

const Badge = () => {
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
    <div className={styles['badge-demo-block']}>
      <div className={styles['badge-preview']}>
        <span className={`${styles['vertex-badge']} ${styles['vertex-badge--primary']}`}>Primary</span>
        <span className={`${styles['vertex-badge']} ${styles['vertex-badge--success']}`}>Success</span>
        <span className={`${styles['vertex-badge']} ${styles['vertex-badge--warning']}`}>Warning</span>
        <span className={`${styles['vertex-badge']} ${styles['vertex-badge--danger']}`}>Danger</span>
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

export default Badge; 