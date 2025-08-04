import React, { useState } from 'react';
import styles from './Avatar.module.scss';

const avatarHtml = `<img src="https://i.pravatar.cc/48?img=3" alt="User avatar" class="vertex-avatar" />
<span class="vertex-avatar vertex-avatar--initials" aria-label="User initials">AB</span>`;

const avatarCss = `.vertex-avatar {
  display: inline-block;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  object-fit: cover;
  background: #e0e7ef;
  color: #23272f;
  font-size: 1.25rem;
  font-weight: 600;
  text-align: center;
  line-height: 3rem;
  vertical-align: middle;
  margin-right: 0.5em;
}
.vertex-avatar--initials {
  background: #3b82f6;
  color: #fff;
}
`;

const avatarJs = `// React usage
<img src="https://i.pravatar.cc/48?img=3" alt="User avatar" className="vertex-avatar" />
<span className="vertex-avatar vertex-avatar--initials" aria-label="User initials">AB</span>`;

const codeTabs = [
  { label: 'HTML', code: avatarHtml, lang: 'html' },
  { label: 'CSS', code: avatarCss, lang: 'css' },
  { label: 'JS/React', code: avatarJs, lang: 'js' },
];

const Avatar = () => {
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
    <div className={styles['avatar-demo-block']}>
      <div className={styles['avatar-preview']}>
        <img src="https://i.pravatar.cc/48?img=3" alt="User avatar" className={styles['vertex-avatar']} />
        <span className={`${styles['vertex-avatar']} ${styles['vertex-avatar--initials']}`} aria-label="User initials">AB</span>
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

export default Avatar; 