import React, { useState } from 'react';
import styles from './SelectDropdown.module.scss';

const selectHtml = `<label for="vertex-select-demo">Choose an option</label>
<select id="vertex-select-demo" class="vertex-select">
  <option value="">Select...</option>
  <option value="apple">Apple</option>
  <option value="banana">Banana</option>
  <option value="orange">Orange</option>
</select>`;

const selectCss = `.vertex-select {
  width: 100%;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  border: 1.5px solid #3b82f6;
  background: #23272f;
  color: #e0e7ef;
  font-size: 1rem;
  transition: border 0.15s, box-shadow 0.15s;
}
.vertex-select:focus {
  border: 1.5px solid #2563eb;
  box-shadow: 0 0 0 2px #3b82f6;
}
`;

const selectJs = `// React example for controlled select
const [value, setValue] = useState('');

<select
  value={value}
  onChange={e => setValue(e.target.value)}
  className="vertex-select"
>
  <option value="">Select...</option>
  <option value="apple">Apple</option>
  <option value="banana">Banana</option>
  <option value="orange">Orange</option>
</select>`;

const searchableJs = `// Searchable dropdown (custom implementation)
const [search, setSearch] = useState('');
const [open, setOpen] = useState(false);
const options = ['Apple', 'Banana', 'Orange', 'Grape', 'Mango'];
const filtered = options.filter(opt => opt.toLowerCase().includes(search.toLowerCase()));

<div className="vertex-searchable-select">
  <input
    value={search}
    onChange={e => setSearch(e.target.value)}
    onFocus={() => setOpen(true)}
    placeholder="Search..."
    className="vertex-select"
  />
  {open && (
    <ul className="vertex-select-list">
      {filtered.map(opt => (
        <li key={opt}>{opt}</li>
      ))}
    </ul>
  )}
</div>`;

const codeTabs = [
  { label: 'HTML', code: selectHtml, lang: 'html' },
  { label: 'CSS', code: selectCss, lang: 'css' },
  { label: 'JS/React', code: selectJs, lang: 'js' },
  { label: 'Searchable', code: searchableJs, lang: 'js' },
];

const options = [
  { value: '', label: 'Select...' },
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'orange', label: 'Orange' },
  { value: 'grape', label: 'Grape' },
  { value: 'mango', label: 'Mango' },
];

const SelectDropdown = () => {
  const [value, setValue] = useState('');
  const [activeTab, setActiveTab] = useState('HTML');
  const [copied, setCopied] = useState(false);
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);

  const currentTab = codeTabs.find(tab => tab.label === activeTab);
  const filtered = options.filter(opt =>
    opt.label.toLowerCase().includes(search.toLowerCase())
  );

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
    <div className={styles['select-demo-block']}>
      <div className={styles['select-preview']}>
        <label htmlFor="vertex-select-demo" className={styles['select-label']}>
          Choose an option
        </label>
        <select
          id="vertex-select-demo"
          className={styles['vertex-select']}
          value={value}
          onChange={e => setValue(e.target.value)}
          aria-label="Choose an option"
        >
          {options.slice(0, 4).map(opt => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <div className={styles['searchable-demo']}>
          <label htmlFor="vertex-searchable-demo" className={styles['select-label']}>
            Searchable dropdown
          </label>
          <input
            id="vertex-searchable-demo"
            type="text"
            className={styles['vertex-select']}
            placeholder="Search..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            onFocus={() => setOpen(true)}
            aria-label="Search options"
            autoComplete="off"
          />
          {open && (
            <ul className={styles['vertex-select-list']} onMouseLeave={() => setOpen(false)}>
              {filtered.length === 0 && (
                <li className={styles['vertex-select-empty']}>No options</li>
              )}
              {filtered.map(opt => (
                <li
                  key={opt.value}
                  tabIndex={0}
                  onClick={() => {
                    setValue(opt.value);
                    setSearch(opt.label);
                    setOpen(false);
                  }}
                  onKeyDown={e => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      setValue(opt.value);
                      setSearch(opt.label);
                      setOpen(false);
                    }
                  }}
                  className={styles['vertex-select-option']}
                  aria-selected={value === opt.value}
                >
                  {opt.label}
                </li>
              ))}
            </ul>
          )}
        </div>
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

export default SelectDropdown; 