import React, { useRef, useState } from 'react';
import styles from './Tooltip.module.scss';

const tooltipHtml = `<button class="vertex-tooltip-trigger" aria-describedby="vertex-tooltip-demo">
  Hover or focus me
</button>
<span id="vertex-tooltip-demo" class="vertex-tooltip">Tooltip text</span>`;

const tooltipCss = `.vertex-tooltip-trigger {
  position: relative;
  background: #3b82f6;
  color: #fff;
  border: none;
  border-radius: 0.5rem;
  padding: 0.5rem 1.25rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.15s;
}
.vertex-tooltip-trigger:focus {
  outline: 2px solid #8BBEB2;
}
.vertex-tooltip {
  visibility: hidden;
  opacity: 0;
  position: absolute;
  left: 50%;
  top: 120%;
  transform: translateX(-50%);
  background: #23272f;
  color: #e0e7ef;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-size: 0.98rem;
  white-space: nowrap;
  box-shadow: 0 2px 8px rgba(16,19,26,0.10);
  transition: opacity 0.18s, visibility 0.18s;
  z-index: 20;
}
.vertex-tooltip-trigger:hover + .vertex-tooltip,
.vertex-tooltip-trigger:focus + .vertex-tooltip {
  visibility: visible;
  opacity: 1;
}
`;

const tooltipJs = `// React tooltip with hover/focus
const [show, setShow] = useState(false);
const btnRef = useRef();

<button
  ref={btnRef}
  className="vertex-tooltip-trigger"
  aria-describedby="vertex-tooltip-demo"
  onMouseEnter={() => setShow(true)}
  onMouseLeave={() => setShow(false)}
  onFocus={() => setShow(true)}
  onBlur={() => setShow(false)}
>
  Hover or focus me
</button>
{show && (
  <span id="vertex-tooltip-demo" className="vertex-tooltip">Tooltip text</span>
)}`;

const codeTabs = [
  { label: 'HTML', code: tooltipHtml, lang: 'html' },
  { label: 'CSS', code: tooltipCss, lang: 'css' },
  { label: 'JS/React', code: tooltipJs, lang: 'js' },
];

const Tooltip = () => {
  const [show, setShow] = useState(false);
  const [activeTab, setActiveTab] = useState('HTML');
  const [copied, setCopied] = useState(false);
  const btnRef = useRef();

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
    <div className={styles['tooltip-demo-block']}>
      <div className={styles['tooltip-preview']}>
        <div className={styles['tooltip-container']}>
          <button
            ref={btnRef}
            className={styles['vertex-tooltip-trigger']}
            aria-describedby="vertex-tooltip-demo"
            onMouseEnter={() => setShow(true)}
            onMouseLeave={() => setShow(false)}
            onFocus={() => setShow(true)}
            onBlur={() => setShow(false)}
          >
            Hover or focus me
          </button>
          <span
            id="vertex-tooltip-demo"
            className={styles['vertex-tooltip']}
            style={{ visibility: show ? 'visible' : 'hidden', opacity: show ? 1 : 0 }}
            role="tooltip"
          >
            Tooltip text
          </span>
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

export default Tooltip; 