import React, { useState } from 'react';
import styles from './Tabs.module.scss';

const tabsHtml = `<div class="vertex-tabs" role="tablist" aria-label="Sample Tabs">
  <button role="tab" aria-selected="true" aria-controls="tab-panel-1" id="tab-1">Tab 1</button>
  <button role="tab" aria-selected="false" aria-controls="tab-panel-2" id="tab-2">Tab 2</button>
  <button role="tab" aria-selected="false" aria-controls="tab-panel-3" id="tab-3">Tab 3</button>
  <div role="tabpanel" id="tab-panel-1" aria-labelledby="tab-1">Tab 1 content</div>
</div>`;

const tabsCss = `.vertex-tabs {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.vertex-tabs [role="tablist"] {
  display: flex;
  gap: 0.5rem;
}
.vertex-tabs [role="tab"] {
  background: #f3f6fa;
  color: #23272f;
  border: 1px solid #e0e7ef;
  border-radius: 0.5rem 0.5rem 0 0;
  padding: 0.5em 1.25em;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.13s, color 0.13s, border 0.13s;
  outline: none;
}
.vertex-tabs [role="tab"][aria-selected="true"],
.vertex-tabs [role="tab"]:focus {
  background: #3b82f6;
  color: #fff;
  border: 1.5px solid #2563eb;
}
.vertex-tabs [role="tabpanel"] {
  background: #f8fafc;
  color: #23272f;
  border: 1px solid #e0e7ef;
  border-radius: 0 0 0.5rem 0.5rem;
  padding: 1.25em 1em;
  margin-top: -1px;
  font-size: 1rem;
}
`;

const tabsJs = `// React accessible tabs
const [tab, setTab] = useState(0);
const tabLabels = ['Tab 1', 'Tab 2', 'Tab 3'];
const tabPanels = ['Tab 1 content', 'Tab 2 content', 'Tab 3 content'];

<div className="vertex-tabs" role="tablist" aria-label="Sample Tabs">
  {tabLabels.map((label, i) => (
    <button
      key={label}
      role="tab"
      aria-selected={tab === i}
      aria-controls={`tab-panel-${i}`}
      id={`tab-${i}`}
      tabIndex={tab === i ? 0 : -1}
      onClick={() => setTab(i)}
      onKeyDown={e => {
        if (e.key === 'ArrowRight') setTab((tab + 1) % tabLabels.length);
        if (e.key === 'ArrowLeft') setTab((tab - 1 + tabLabels.length) % tabLabels.length);
      }}
    >
      {label}
    </button>
  ))}
  <div
    role="tabpanel"
    id={`tab-panel-${tab}`}
    aria-labelledby={`tab-${tab}`}
  >
    {tabPanels[tab]}
  </div>
</div>`;

const codeTabs = [
  { label: 'HTML', code: tabsHtml, lang: 'html' },
  { label: 'CSS', code: tabsCss, lang: 'css' },
  { label: 'JS/React', code: tabsJs, lang: 'js' },
];

const tabLabels = ['Tab 1', 'Tab 2', 'Tab 3'];
const tabPanels = ['Tab 1 content', 'Tab 2 content', 'Tab 3 content'];

const Tabs = () => {
  const [tab, setTab] = useState(0);
  const [activeTab, setActiveTab] = useState('HTML');
  const [copied, setCopied] = useState(false);

  const currentTab = codeTabs.find(tabObj => tabObj.label === activeTab);

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
    <div className={styles['tabs-demo-block']}>
      <div className={styles['tabs-preview']}>
        <div className={styles['vertex-tabs']} role="tablist" aria-label="Sample Tabs">
          {tabLabels.map((label, i) => (
            <button
              key={label}
              role="tab"
              aria-selected={tab === i}
              aria-controls={`tab-panel-${i}`}
              id={`tab-${i}`}
              tabIndex={tab === i ? 0 : -1}
              onClick={() => setTab(i)}
              onKeyDown={e => {
                if (e.key === 'ArrowRight') setTab((tab + 1) % tabLabels.length);
                if (e.key === 'ArrowLeft') setTab((tab - 1 + tabLabels.length) % tabLabels.length);
              }}
              className={tab === i ? styles['active'] : ''}
            >
              {label}
            </button>
          ))}
        </div>
        <div
          role="tabpanel"
          id={`tab-panel-${tab}`}
          aria-labelledby={`tab-${tab}`}
          className={styles['vertex-tabpanel']}
        >
          {tabPanels[tab]}
        </div>
      </div>
      <div className="vertex-code-tabs">
        <div className="vertex-tab-list">
          {codeTabs.map(tabObj => (
            <button
              key={tabObj.label}
              className={`vertex-tab${activeTab === tabObj.label ? ' active' : ''}`}
              onClick={() => setActiveTab(tabObj.label)}
              type="button"
              aria-selected={activeTab === tabObj.label}
              tabIndex={activeTab === tabObj.label ? 0 : -1}
            >
              {tabObj.label}
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

export default Tabs; 