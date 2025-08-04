import React, { useState } from 'react';
import styles from './Accordion.module.scss';

const accordionHtml = `<div class="vertex-accordion" role="presentation">
  <button aria-expanded="true" aria-controls="panel-1" id="accordion-1">Section 1</button>
  <div id="panel-1" role="region" aria-labelledby="accordion-1">Content for section 1</div>
  <button aria-expanded="false" aria-controls="panel-2" id="accordion-2">Section 2</button>
  <div id="panel-2" role="region" aria-labelledby="accordion-2" hidden>Content for section 2</div>
</div>`;

const accordionCss = `.vertex-accordion {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.vertex-accordion button {
  background: #f3f6fa;
  color: #23272f;
  border: 1px solid #e0e7ef;
  border-radius: 0.5rem;
  padding: 0.75em 1.25em;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.13s, color 0.13s, border 0.13s;
  outline: none;
  text-align: left;
}
.vertex-accordion button[aria-expanded="true"],
.vertex-accordion button:focus {
  background: #3b82f6;
  color: #fff;
  border: 1.5px solid #2563eb;
}
.vertex-accordion [role="region"] {
  background: #f8fafc;
  color: #23272f;
  border: 1px solid #e0e7ef;
  border-radius: 0.5rem;
  padding: 1.25em 1em;
  margin-top: -1px;
  font-size: 1rem;
}
`;

const accordionJs = `// React accessible accordion
const [open, setOpen] = useState(0);
const sections = [
  { title: 'Section 1', content: 'Content for section 1' },
  { title: 'Section 2', content: 'Content for section 2' }
];

<div className="vertex-accordion" role="presentation">
  {sections.map((section, i) => (
    <React.Fragment key={section.title}>
      <button
        aria-expanded={open === i}
        aria-controls={`panel-${i}`}
        id={`accordion-${i}`}
        onClick={() => setOpen(open === i ? -1 : i)}
        onKeyDown={e => {
          if (e.key === 'ArrowDown') setOpen((open + 1) % sections.length);
          if (e.key === 'ArrowUp') setOpen((open - 1 + sections.length) % sections.length);
        }}
      >
        {section.title}
      </button>
      <div
        id={`panel-${i}`}
        role="region"
        aria-labelledby={`accordion-${i}`}
        hidden={open !== i}
      >
        {section.content}
      </div>
    </React.Fragment>
  ))}
</div>`;

const codeTabs = [
  { label: 'HTML', code: accordionHtml, lang: 'html' },
  { label: 'CSS', code: accordionCss, lang: 'css' },
  { label: 'JS/React', code: accordionJs, lang: 'js' },
];

const sections = [
  { title: 'Section 1', content: 'Content for section 1' },
  { title: 'Section 2', content: 'Content for section 2' }
];

const Accordion = () => {
  const [open, setOpen] = useState(0);
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
    <div className={styles['accordion-demo-block']}>
      <div className={styles['accordion-preview']}>
        <div className={styles['vertex-accordion']} role="presentation">
          {sections.map((section, i) => (
            <React.Fragment key={section.title}>
              <button
                aria-expanded={open === i}
                aria-controls={`panel-${i}`}
                id={`accordion-${i}`}
                onClick={() => setOpen(open === i ? -1 : i)}
                onKeyDown={e => {
                  if (e.key === 'ArrowDown') setOpen((open + 1) % sections.length);
                  if (e.key === 'ArrowUp') setOpen((open - 1 + sections.length) % sections.length);
                }}
                className={open === i ? styles['active'] : ''}
              >
                {section.title}
              </button>
              <div
                id={`panel-${i}`}
                role="region"
                aria-labelledby={`accordion-${i}`}
                hidden={open !== i}
                className={styles['vertex-accordion-panel']}
              >
                {section.content}
              </div>
            </React.Fragment>
          ))}
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

export default Accordion; 