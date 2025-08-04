import React, { useState } from 'react';
import styles from './Timeline.module.scss';

const timelineHtml = `<div class="vertex-timeline">
  <div class="vertex-timeline-item">
    <div class="vertex-timeline-marker"></div>
    <div class="vertex-timeline-content">
      <div class="vertex-timeline-time">2 hours ago</div>
      <h4 class="vertex-timeline-title">Project Created</h4>
      <p class="vertex-timeline-description">New project has been initialized with basic setup.</p>
    </div>
  </div>
  <div class="vertex-timeline-item vertex-timeline-item--active">
    <div class="vertex-timeline-marker"></div>
    <div class="vertex-timeline-content">
      <div class="vertex-timeline-time">1 hour ago</div>
      <h4 class="vertex-timeline-title">Components Added</h4>
      <p class="vertex-timeline-description">UI components library has been integrated.</p>
    </div>
  </div>
  <div class="vertex-timeline-item">
    <div class="vertex-timeline-marker"></div>
    <div class="vertex-timeline-content">
      <div class="vertex-timeline-time">30 minutes ago</div>
      <h4 class="vertex-timeline-title">Testing Complete</h4>
      <p class="vertex-timeline-description">All components tested and working properly.</p>
    </div>
  </div>
</div>`;

const timelineCss = `.vertex-timeline {
  position: relative;
  padding-left: 2rem;
}

.vertex-timeline::before {
  content: '';
  position: absolute;
  left: 0.75rem;
  top: 0;
  bottom: 0;
  width: 2px;
  background: #e0e6ed;
}

.vertex-timeline-item {
  position: relative;
  margin-bottom: 2rem;
}

.vertex-timeline-item:last-child {
  margin-bottom: 0;
}

.vertex-timeline-marker {
  position: absolute;
  left: -2rem;
  top: 0.25rem;
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  background: #fff;
  border: 3px solid #e0e6ed;
  z-index: 1;
}

.vertex-timeline-item--active .vertex-timeline-marker {
  border-color: #384E77;
  background: #384E77;
}

.vertex-timeline-content {
  background: #fff;
  border: 1px solid #e0e6ed;
  border-radius: 0.5rem;
  padding: 1rem;
  position: relative;
}

.vertex-timeline-content::before {
  content: '';
  position: absolute;
  left: -0.5rem;
  top: 1rem;
  width: 0;
  height: 0;
  border-top: 0.5rem solid transparent;
  border-bottom: 0.5rem solid transparent;
  border-right: 0.5rem solid #e0e6ed;
}

.vertex-timeline-content::after {
  content: '';
  position: absolute;
  left: -0.4rem;
  top: 1rem;
  width: 0;
  height: 0;
  border-top: 0.5rem solid transparent;
  border-bottom: 0.5rem solid transparent;
  border-right: 0.5rem solid #fff;
}

.vertex-timeline-time {
  font-size: 0.75rem;
  color: #666;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.vertex-timeline-title {
  margin: 0 0 0.5rem 0;
  font-size: 1rem;
  font-weight: 600;
  color: #0D0630;
}

.vertex-timeline-description {
  margin: 0;
  font-size: 0.875rem;
  color: #666;
  line-height: 1.5;
}

.vertex-timeline-item--active .vertex-timeline-title {
  color: #384E77;
}`;

const timelineReact = `import React from 'react';

const Timeline = ({ items = [], className = '' }) => {
  return (
    <div className={\`vertex-timeline \${className}\`}>
      {items.map((item, index) => (
        <div 
          key={index}
          className={\`vertex-timeline-item \${item.active ? 'vertex-timeline-item--active' : ''}\`}
        >
          <div className="vertex-timeline-marker"></div>
          <div className="vertex-timeline-content">
            <div className="vertex-timeline-time">{item.time}</div>
            <h4 className="vertex-timeline-title">{item.title}</h4>
            <p className="vertex-timeline-description">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Timeline;`;

const codeTabs = [
  { label: 'HTML', code: timelineHtml, lang: 'html' },
  { label: 'CSS', code: timelineCss, lang: 'css' },
  { label: 'React', code: timelineReact, lang: 'jsx' }
];

const Timeline = () => {
  const [activeTab, setActiveTab] = useState('HTML');
  const [copied, setCopied] = useState(false);

  const timelineItems = [
    {
      time: '2 hours ago',
      title: 'Project Created',
      description: 'New project has been initialized with basic setup.',
      active: false
    },
    {
      time: '1 hour ago',
      title: 'Components Added',
      description: 'UI components library has been integrated.',
      active: true
    },
    {
      time: '30 minutes ago',
      title: 'Testing Complete',
      description: 'All components tested and working properly.',
      active: false
    }
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

  return (
    <div className="vertex-component-block" aria-label="Timeline component demo">
      <h2>Timeline</h2>
      <p className="vertex-component-description">
        Vertical timeline component for displaying chronological events and activities.
      </p>
      <div className="vertex-preview" style={{ marginBottom: '1rem' }}>
        <div className={styles['vertex-timeline']}>
          {timelineItems.map((item, index) => (
            <div 
              key={index}
              className={`${styles['vertex-timeline-item']} ${item.active ? styles['vertex-timeline-item--active'] : ''}`}
            >
              <div className={styles['vertex-timeline-marker']}></div>
              <div className={styles['vertex-timeline-content']}>
                <div className={styles['vertex-timeline-time']}>{item.time}</div>
                <h4 className={styles['vertex-timeline-title']}>{item.title}</h4>
                <p className={styles['vertex-timeline-description']}>{item.description}</p>
              </div>
            </div>
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

export default Timeline;
