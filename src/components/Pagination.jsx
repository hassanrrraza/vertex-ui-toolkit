import React, { useState } from 'react';
import styles from './Pagination.module.scss';

const paginationHtml = `<nav class="vertex-pagination" aria-label="Pagination">
  <button disabled>&laquo;</button>
  <button class="active">1</button>
  <button>2</button>
  <button>3</button>
  <button>&raquo;</button>
</nav>`;

const paginationCss = `.vertex-pagination {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}
.vertex-pagination button {
  background: #f3f6fa;
  color: #23272f;
  border: 1px solid #e0e7ef;
  border-radius: 0.5rem;
  padding: 0.4em 1em;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.13s, color 0.13s, border 0.13s;
}
.vertex-pagination button.active, .vertex-pagination button:focus {
  background: #3b82f6;
  color: #fff;
  border: 1.5px solid #2563eb;
  outline: none;
}
.vertex-pagination button:disabled {
  background: #e0e7ef;
  color: #6b7280;
  cursor: not-allowed;
  border: 1px solid #e0e7ef;
}
`;

const paginationJs = `// React controlled pagination
const [page, setPage] = useState(1);
const total = 3;

<nav className="vertex-pagination" aria-label="Pagination">
  <button disabled={page === 1} onClick={() => setPage(page - 1)}>&laquo;</button>
  {[...Array(total)].map((_, i) => (
    <button
      key={i + 1}
      className={page === i + 1 ? 'active' : ''}
      onClick={() => setPage(i + 1)}
    >
      {i + 1}
    </button>
  ))}
  <button disabled={page === total} onClick={() => setPage(page + 1)}>&raquo;</button>
</nav>`;

const codeTabs = [
  { label: 'HTML', code: paginationHtml, lang: 'html' },
  { label: 'CSS', code: paginationCss, lang: 'css' },
  { label: 'JS/React', code: paginationJs, lang: 'js' },
];

const Pagination = () => {
  const [page, setPage] = useState(1);
  const total = 3;
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
    <div className={styles['pagination-demo-block']}>
      <div className={styles['pagination-preview']}>
        <nav className={styles['vertex-pagination']} aria-label="Pagination">
          <button disabled={page === 1} onClick={() => setPage(page - 1)} aria-label="Previous page">&laquo;</button>
          {[...Array(total)].map((_, i) => (
            <button
              key={i + 1}
              className={page === i + 1 ? styles['active'] : ''}
              onClick={() => setPage(i + 1)}
              aria-current={page === i + 1 ? 'page' : undefined}
            >
              {i + 1}
            </button>
          ))}
          <button disabled={page === total} onClick={() => setPage(page + 1)} aria-label="Next page">&raquo;</button>
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

export default Pagination; 