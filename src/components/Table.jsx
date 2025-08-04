import React, { useState } from 'react';
import styles from './Table.module.scss';

const tableHtml = `<table class="vertex-table">
  <thead>
    <tr><th>Name</th><th>Email</th><th>Status</th></tr>
  </thead>
  <tbody>
    <tr><td>Alice</td><td>alice@email.com</td><td>Active</td></tr>
    <tr><td>Bob</td><td>bob@email.com</td><td>Inactive</td></tr>
    <tr><td>Carol</td><td>carol@email.com</td><td>Active</td></tr>
  </tbody>
</table>`;

const tableCss = `.vertex-table {
  width: 100%;
  border-collapse: collapse;
  background: #fff;
  border-radius: 0.75rem;
  overflow: hidden;
  box-shadow: 0 1px 4px rgba(16,19,26,0.10);
}
.vertex-table th, .vertex-table td {
  padding: 0.75em 1em;
  text-align: left;
  border-bottom: 1px solid #e0e7ef;
  font-size: 1rem;
}
.vertex-table th {
  background: #f3f6fa;
  color: #23272f;
  font-weight: 600;
}
.vertex-table tr:last-child td {
  border-bottom: none;
}
`;

const tableJs = `// React usage
const rows = [
  { name: 'Alice', email: 'alice@email.com', status: 'Active' },
  { name: 'Bob', email: 'bob@email.com', status: 'Inactive' },
  { name: 'Carol', email: 'carol@email.com', status: 'Active' }
];

<table className="vertex-table">
  <thead>
    <tr><th>Name</th><th>Email</th><th>Status</th></tr>
  </thead>
  <tbody>
    {rows.map(row => (
      <tr key={row.email}>
        <td>{row.name}</td>
        <td>{row.email}</td>
        <td>{row.status}</td>
      </tr>
    ))}
  </tbody>
</table>`;

const codeTabs = [
  { label: 'HTML', code: tableHtml, lang: 'html' },
  { label: 'CSS', code: tableCss, lang: 'css' },
  { label: 'JS/React', code: tableJs, lang: 'js' },
];

const rows = [
  { name: 'Alice', email: 'alice@email.com', status: 'Active' },
  { name: 'Bob', email: 'bob@email.com', status: 'Inactive' },
  { name: 'Carol', email: 'carol@email.com', status: 'Active' }
];

const Table = () => {
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
    <div className={styles['table-demo-block']}>
      <div className={styles['table-preview']}>
        <table className={styles['vertex-table']}>
          <thead>
            <tr><th>Name</th><th>Email</th><th>Status</th></tr>
          </thead>
          <tbody>
            {rows.map(row => (
              <tr key={row.email}>
                <td>{row.name}</td>
                <td>{row.email}</td>
                <td>{row.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
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

export default Table; 