import React, { useState } from 'react';
import styles from './ListGroup.module.scss';

const listHtml = `<ul class="vertex-list-group" role="list">
  <li class="active">Active item</li>
  <li>Second item</li>
  <li>Third item</li>
  <li disabled>Disabled item</li>
</ul>`;

const listCss = `.vertex-list-group {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  list-style: none;
  padding: 0;
  margin: 0;
}
.vertex-list-group li {
  background: #f3f6fa;
  color: #23272f;
  border: 1px solid #e0e7ef;
  border-radius: 0.5rem;
  padding: 0.75em 1.25em;
  font-size: 1rem;
  font-weight: 500;
  transition: background 0.13s, color 0.13s, border 0.13s;
  cursor: pointer;
}
.vertex-list-group li.active, .vertex-list-group li:focus {
  background: #3b82f6;
  color: #fff;
  border: 1.5px solid #2563eb;
  outline: none;
}
.vertex-list-group li[disabled] {
  background: #e0e7ef;
  color: #6b7280;
  cursor: not-allowed;
  border: 1px solid #e0e7ef;
}
`;

const listJs = `// React usage
const items = [
  { label: 'Active item', active: true },
  { label: 'Second item' },
  { label: 'Third item' },
  { label: 'Disabled item', disabled: true }
];

<ul className="vertex-list-group" role="list">
  {items.map((item, i) => (
    <li
      key={i}
      className={item.active ? 'active' : ''}
      tabIndex={item.disabled ? -1 : 0}
      aria-disabled={item.disabled}
      disabled={item.disabled}
    >
      {item.label}
    </li>
  ))}
</ul>`;

const codeTabs = [
  { label: 'HTML', code: listHtml, lang: 'html' },
  { label: 'CSS', code: listCss, lang: 'css' },
  { label: 'JS/React', code: listJs, lang: 'js' },
];

const items = [
  { label: 'Active item', active: true },
  { label: 'Second item' },
  { label: 'Third item' },
  { label: 'Disabled item', disabled: true }
];

const ListGroup = () => {
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
    <div className={styles['list-demo-block']}>
      <div className={styles['list-preview']}>
        <ul className={styles['vertex-list-group']} role="list">
          {items.map((item, i) => (
            <li
              key={i}
              className={item.active ? styles['active'] : ''}
              tabIndex={item.disabled ? -1 : 0}
              aria-disabled={item.disabled}
              disabled={item.disabled}
            >
              {item.label}
            </li>
          ))}
        </ul>
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

export default ListGroup; 