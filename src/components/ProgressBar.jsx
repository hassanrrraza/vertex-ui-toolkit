import React, { useState } from 'react';
import styles from './ProgressBar.module.scss';

const progressHtml = `<div class="vertex-progress" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100">
  <div class="vertex-progress-bar" style="width: 60%"></div>
</div>`;

const progressCss = `.vertex-progress {
  width: 100%;
  background: #e0e7ef;
  border-radius: 0.5rem;
  height: 1.25rem;
  overflow: hidden;
  box-shadow: 0 1px 4px rgba(16,19,26,0.10);
}
.vertex-progress-bar {
  height: 100%;
  background: #3b82f6;
  width: 60%;
  border-radius: 0.5rem 0 0 0.5rem;
  transition: width 0.3s;
}
`;

const progressJs = `// React controlled progress bar
const [value, setValue] = useState(60);

<div className="vertex-progress" role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={100}>
  <div className="vertex-progress-bar" style={{ width: value + '%' }}></div>
</div>`;

const codeTabs = [
  { label: 'HTML', code: progressHtml, lang: 'html' },
  { label: 'CSS', code: progressCss, lang: 'css' },
  { label: 'JS/React', code: progressJs, lang: 'js' },
];

const ProgressBar = () => {
  const [value, setValue] = useState(60);
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
    <div className={styles['progress-demo-block']}>
      <div className={styles['progress-preview']}>
        <div className={styles['vertex-progress']} role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={100}>
          <div className={styles['vertex-progress-bar']} style={{ width: value + '%' }}></div>
        </div>
        <input
          type="range"
          min={0}
          max={100}
          value={value}
          onChange={e => setValue(Number(e.target.value))}
          aria-label="Progress value"
          style={{ marginTop: '1rem', width: '100%' }}
        />
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

export default ProgressBar; 