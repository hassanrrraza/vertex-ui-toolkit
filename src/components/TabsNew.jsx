import React, { useState } from 'react';
import './TabsNew.module.scss';

const tabsHtml = `<div class="vertex-tabs">
  <div class="vertex-tab-nav" role="tablist">
    <button class="vertex-tab-button vertex-tab-button--active" role="tab" aria-selected="true">
      Overview
    </button>
    <button class="vertex-tab-button" role="tab" aria-selected="false">
      Features
    </button>
    <button class="vertex-tab-button" role="tab" aria-selected="false">
      Documentation
    </button>
  </div>
  <div class="vertex-tab-content">
    <div class="vertex-tab-panel vertex-tab-panel--active" role="tabpanel">
      <h3>Project Overview</h3>
      <p>This is the overview content panel with project information.</p>
    </div>
  </div>
</div>`;

const tabsCss = `.vertex-tabs {
  width: 100%;
}

.vertex-tab-nav {
  display: flex;
  border-bottom: 2px solid #e0e6ed;
  margin-bottom: 1rem;
  overflow-x: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.vertex-tab-nav::-webkit-scrollbar {
  display: none;
}

.vertex-tab-button {
  background: none;
  border: none;
  padding: 0.75rem 1.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: #666;
  cursor: pointer;
  border-bottom: 2px solid transparent;
  transition: all 0.2s ease;
  white-space: nowrap;
  position: relative;
}

.vertex-tab-button:hover {
  color: #384E77;
  background: #f8f9fa;
}

.vertex-tab-button:focus {
  outline: 2px solid #8BBEB2;
  outline-offset: -2px;
}

.vertex-tab-button--active {
  color: #384E77;
  border-bottom-color: #384E77;
  background: #fff;
}

.vertex-tab-button--active::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  right: 0;
  height: 2px;
  background: #384E77;
}

.vertex-tab-content {
  min-height: 200px;
}

.vertex-tab-panel {
  display: none;
  animation: vertex-tab-fade-in 0.2s ease;
}

.vertex-tab-panel--active {
  display: block;
}

@keyframes vertex-tab-fade-in {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Variants */
.vertex-tabs--pills .vertex-tab-nav {
  border-bottom: none;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.vertex-tabs--pills .vertex-tab-button {
  border-radius: 1.25rem;
  border-bottom: none;
  background: #f8f9fa;
}

.vertex-tabs--pills .vertex-tab-button--active {
  background: #384E77;
  color: #fff;
}

.vertex-tabs--pills .vertex-tab-button--active::after {
  display: none;
}

.vertex-tabs--vertical {
  display: flex;
  gap: 1rem;
}

.vertex-tabs--vertical .vertex-tab-nav {
  flex-direction: column;
  border-bottom: none;
  border-right: 2px solid #e0e6ed;
  margin-bottom: 0;
  margin-right: 1rem;
  min-width: 200px;
}

.vertex-tabs--vertical .vertex-tab-button {
  text-align: left;
  border-bottom: none;
  border-right: 2px solid transparent;
}

.vertex-tabs--vertical .vertex-tab-button--active {
  border-right-color: #384E77;
  border-bottom-color: transparent;
}

.vertex-tabs--vertical .vertex-tab-button--active::after {
  top: 0;
  bottom: 0;
  right: -2px;
  left: auto;
  width: 2px;
  height: auto;
}`;

const tabsReact = `import React, { useState } from 'react';

const Tabs = ({ 
  tabs = [], 
  defaultTab = 0,
  variant = 'default', // 'default', 'pills', 'vertical'
  className = '',
  onChange 
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab);

  const handleTabChange = (index) => {
    setActiveTab(index);
    if (onChange) onChange(index);
  };

  const tabsClasses = [
    'vertex-tabs',
    variant !== 'default' ? \`vertex-tabs--\${variant}\` : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={tabsClasses}>
      <div className="vertex-tab-nav" role="tablist">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={\`vertex-tab-button \${activeTab === index ? 'vertex-tab-button--active' : ''}\`}
            role="tab"
            aria-selected={activeTab === index}
            onClick={() => handleTabChange(index)}
            disabled={tab.disabled}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="vertex-tab-content">
        {tabs.map((tab, index) => (
          <div
            key={index}
            className={\`vertex-tab-panel \${activeTab === index ? 'vertex-tab-panel--active' : ''}\`}
            role="tabpanel"
            aria-hidden={activeTab !== index}
          >
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tabs;`;

const codeTabs = [
  { label: 'HTML', code: tabsHtml, lang: 'html' },
  { label: 'CSS', code: tabsCss, lang: 'css' },
  { label: 'React', code: tabsReact, lang: 'jsx' }
];

const TabsNew = () => {
  const [activeTab, setActiveTab] = useState('HTML');
  const [copied, setCopied] = useState(false);

  const demoTabs = [
    {
      label: 'Overview',
      content: (
        <div>
          <h3 style={{ marginTop: 0, color: '#384E77' }}>Project Overview</h3>
          <p>This is the overview content panel with project information and key details about the current project status.</p>
        </div>
      )
    },
    {
      label: 'Features',
      content: (
        <div>
          <h3 style={{ marginTop: 0, color: '#384E77' }}>Key Features</h3>
          <ul>
            <li>Modern React components</li>
            <li>Accessible design patterns</li>
            <li>Responsive layouts</li>
            <li>Copy-ready code snippets</li>
          </ul>
        </div>
      )
    },
    {
      label: 'Documentation',
      content: (
        <div>
          <h3 style={{ marginTop: 0, color: '#384E77' }}>Documentation</h3>
          <p>Comprehensive documentation with examples, API references, and best practices for implementation.</p>
        </div>
      )
    }
  ];

  const pillTabs = [
    { label: 'Design', content: <div><p>Design system and guidelines</p></div> },
    { label: 'Code', content: <div><p>Implementation details and code examples</p></div> },
    { label: 'Testing', content: <div><p>Testing strategies and quality assurance</p></div> }
  ];

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

  const TabsComponent = ({ tabs, variant = 'default', className = '' }) => {
    const [activeTabIndex, setActiveTabIndex] = useState(0);

    const tabsClasses = [
      'vertex-tabs',
      variant !== 'default' ? `vertex-tabs--${variant}` : '',
      className
    ].filter(Boolean).join(' ');

    return (
      <div className={tabsClasses}>
        <div className="vertex-tab-nav" role="tablist">
          {tabs.map((tab, index) => (
            <button
              key={index}
              className={`vertex-tab-button ${activeTabIndex === index ? 'vertex-tab-button--active' : ''}`}
              role="tab"
              aria-selected={activeTabIndex === index}
              onClick={() => setActiveTabIndex(index)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="vertex-tab-content">
          {tabs.map((tab, index) => (
            <div
              key={index}
              className={`vertex-tab-panel ${activeTabIndex === index ? 'vertex-tab-panel--active' : ''}`}
              role="tabpanel"
              aria-hidden={activeTabIndex !== index}
            >
              {tab.content}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="vertex-component-block" aria-label="Tabs component demo">
      <h2>Tabs</h2>
      <p className="vertex-component-description">
        Tabbed interface for organizing content into separate views within the same context.
      </p>
      <div className="vertex-preview" style={{ marginBottom: '1rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div>
            <h4 style={{ marginBottom: '1rem', color: '#384E77' }}>Default Tabs</h4>
            <TabsComponent tabs={demoTabs} />
          </div>

          <div>
            <h4 style={{ marginBottom: '1rem', color: '#384E77' }}>Pill Style</h4>
            <TabsComponent tabs={pillTabs} variant="pills" />
          </div>

          <div>
            <h4 style={{ marginBottom: '1rem', color: '#384E77' }}>Vertical Tabs</h4>
            <TabsComponent tabs={demoTabs} variant="vertical" />
          </div>
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

export default TabsNew;
