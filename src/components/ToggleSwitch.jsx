import React, { useState } from 'react';
import styles from './ToggleSwitch.module.scss';

const toggleHtml = `<label class="vertex-toggle">
  <input type="checkbox" />
  <span class="vertex-toggle-slider"></span>
  <span class="vertex-toggle-label">Toggle me</span>
</label>`;

const toggleCss = `.vertex-toggle {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  user-select: none;
}
.vertex-toggle input[type="checkbox"] {
  display: none;
}
.vertex-toggle-slider {
  width: 2.5rem;
  height: 1.3rem;
  background: #23272f;
  border-radius: 1rem;
  position: relative;
  transition: background 0.2s;
  box-shadow: 0 1px 4px rgba(16,19,26,0.10);
}
.vertex-toggle input[type="checkbox"]:checked + .vertex-toggle-slider {
  background: #3b82f6;
}
.vertex-toggle-slider::before {
  content: '';
  position: absolute;
  left: 0.2rem;
  top: 0.18rem;
  width: 1rem;
  height: 1rem;
  background: #fff;
  border-radius: 50%;
  transition: transform 0.2s;
  box-shadow: 0 1px 4px rgba(16,19,26,0.10);
}
.vertex-toggle input[type="checkbox"]:checked + .vertex-toggle-slider::before {
  transform: translateX(1.2rem);
}
.vertex-toggle-label {
  font-size: 1rem;
  color: #e0e7ef;
}
`;

const toggleJs = `// React controlled toggle switch
const [on, setOn] = useState(false);

<label className="vertex-toggle">
  <input
    type="checkbox"
    checked={on}
    onChange={e => setOn(e.target.checked)}
    aria-checked={on}
    role="switch"
    aria-label="Toggle switch"
  />
  <span className="vertex-toggle-slider"></span>
  <span className="vertex-toggle-label">{on ? 'On' : 'Off'}</span>
</label>`;

const codeTabs = [
  { label: 'HTML', code: toggleHtml, lang: 'html' },
  { label: 'CSS', code: toggleCss, lang: 'css' },
  { label: 'JS/React', code: toggleJs, lang: 'js' },
];

const ToggleSwitch = () => {
  const [on, setOn] = useState(false);
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
    <div className={styles['toggle-demo-block']}>
      <div className={styles['toggle-preview']}>
        <label className={styles['vertex-toggle']}>
          <input
            type="checkbox"
            checked={on}
            onChange={e => setOn(e.target.checked)}
            aria-checked={on}
            role="switch"
            aria-label="Toggle switch"
          />
          <span className={styles['vertex-toggle-slider']}></span>
          <span className={styles['vertex-toggle-label']}>{on ? 'On' : 'Off'}</span>
        </label>
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

export default ToggleSwitch; 