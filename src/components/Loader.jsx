import React, { useState } from 'react';
import styles from './Loader.module.scss';

const loaderHtml = `<span class="vertex-loader" aria-label="Loading" role="status"></span>`;

const loaderCss = `.vertex-loader {
  display: inline-block;
  width: 2.2em;
  height: 2.2em;
  border: 0.3em solid #e0e7ef;
  border-top: 0.3em solid #3b82f6;
  border-radius: 50%;
  animation: vertex-spin 0.8s linear infinite;
}
@keyframes vertex-spin {
  to { transform: rotate(360deg); }
}
`;

const loaderJs = `// React usage
<span className="vertex-loader" aria-label="Loading" role="status"></span>`;

const codeTabs = [
  { label: 'HTML', code: loaderHtml, lang: 'html' },
  { label: 'CSS', code: loaderCss, lang: 'css' },
  { label: 'JS/React', code: loaderJs, lang: 'js' },
];

const Loader = () => {
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
    <div className={styles['loader-demo-block']}>
      <div className={styles['loader-preview']}>
        <span className={styles['vertex-loader']} aria-label="Loading" role="status"></span>
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

export default Loader; 