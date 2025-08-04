import React, { useState } from 'react';
import styles from './Toast.module.scss';

const toastHtml = `<div class="vertex-toast" role="alert" aria-live="assertive">
  <span>Success! Your changes have been saved.</span>
  <button aria-label="Dismiss">&times;</button>
</div>`;

const toastCss = `.vertex-toast {
  background: #22c55e;
  color: #fff;
  padding: 1rem 1.5rem;
  border-radius: 0.75rem;
  box-shadow: 0 4px 24px rgba(16,19,26,0.13);
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 1rem;
  min-width: 240px;
  max-width: 340px;
}
.vertex-toast button {
  background: none;
  border: none;
  color: #fff;
  font-size: 1.5rem;
  cursor: pointer;
  margin-left: auto;
  line-height: 1;
}
`;

const toastJs = `// React usage
const [show, setShow] = useState(true);

{show && (
  <div className="vertex-toast" role="alert" aria-live="assertive">
    <span>Success! Your changes have been saved.</span>
    <button aria-label="Dismiss" onClick={() => setShow(false)}>&times;</button>
  </div>
)}`;

const codeTabs = [
  { label: 'HTML', code: toastHtml, lang: 'html' },
  { label: 'CSS', code: toastCss, lang: 'css' },
  { label: 'JS/React', code: toastJs, lang: 'js' },
];

const Toast = () => {
  const [show, setShow] = useState(false); // Changed to false to not show by default
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
    <div className={styles['toast-demo-block']}>
      <div className={styles['toast-preview']}>
        {show && (
          <div className={styles['vertex-toast']} role="alert" aria-live="assertive">
            <span>Success! Your changes have been saved.</span>
            <button aria-label="Dismiss" onClick={() => setShow(false)}>&times;</button>
          </div>
        )}
        {!show && (
          <button onClick={() => setShow(true)} className={styles['show-toast-btn']}>
            Show Toast
          </button>
        )}
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

export default Toast; 