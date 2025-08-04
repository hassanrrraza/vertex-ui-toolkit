import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { CodeBlock, CopyButton } from '../common';
import Timeline from './Timeline';
import styles from './TimelineDemo.module.scss';

// Mock data for the timeline demo
const timelineItems = [
  {
    time: '09:30 AM',
    dateTime: '2025-07-23T09:30:00',
    title: 'Project Kickoff',
    description: 'Initial meeting with the client to discuss project requirements and goals.',
    completed: true
  },
  {
    time: '11:15 AM',
    dateTime: '2025-07-23T11:15:00',
    title: 'Design Review',
    description: 'Review the initial design mockups with the design team.',
    active: true
  },
  {
    time: '02:00 PM',
    dateTime: '2025-07-23T14:00:00',
    title: 'Development Sprint Planning',
    description: 'Plan the development tasks for the upcoming sprint.'
  },
  {
    time: '04:30 PM',
    dateTime: '2025-07-23T16:30:00',
    title: 'Team Sync',
    description: 'Daily sync with the development team to discuss progress and blockers.'
  }
];

const TimelineDemo = ({ className }) => {

  const [activeTab, setActiveTab] = useState('preview');
  const [activeVariant, setActiveVariant] = useState('default');
  
  // Get the current variant label
  const getVariantLabel = (variant) => {
    const labels = {
      default: 'Default',
      compact: 'Compact',
      horizontal: 'Horizontal'
    };
    return labels[variant] || variant;
  };

  const demoCode = `import React from 'react';
import Timeline from './components/Timeline';

const timelineItems = ${JSON.stringify(timelineItems, null, 2)};

function MyComponent() {
  return (
    <div className="timeline-demo">
      <Timeline 
        items={timelineItems}
        variant="${activeVariant}"
      />
    </div>
  );
}

export default MyComponent;`;

  const variantOptions = [
    { value: 'default', label: 'Default' },
    { value: 'compact', label: 'Compact' },
    { value: 'horizontal', label: 'Horizontal' },
  ];

  return (
    <div className={classNames(styles.container, className)}>
      <div className={styles.header}>
        <h2 className={styles.title}>Timeline Component</h2>
        <p className={styles.description}>
          A responsive timeline component that displays a series of events in chronological order.
          Perfect for showing progress, history, or any sequence of events.
        </p>
      </div>

      <div className={styles.controls}>
        <div className={styles.controlGroup}>
          <label htmlFor="variant-selector" className={styles.controlLabel}>
            Variant:
          </label>
          <div className={styles.variantSelector} id="variant-selector">
            {variantOptions.map(({ value }) => (
              <button
                key={value}
                className={classNames(styles.variantButton, {
                  [styles.active]: activeVariant === value,
                })}
                onClick={() => setActiveVariant(value)}
                type="button"
                aria-pressed={activeVariant === value}
                aria-label={`Show ${value} variant`}
              >
                {getVariantLabel(value)}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.tabs} role="tablist" aria-label="Component display options">
          <button
            className={classNames(styles.tab, { [styles.active]: activeTab === 'preview' })}
            onClick={() => setActiveTab('preview')}
            type="button"
            role="tab"
            aria-selected={activeTab === 'preview'}
            aria-controls="preview-panel"
            id="preview-tab"
          >
            Preview
          </button>
          <button
            className={classNames(styles.tab, { [styles.active]: activeTab === 'code' })}
            onClick={() => setActiveTab('code')}
            type="button"
            role="tab"
            aria-selected={activeTab === 'code'}
            aria-controls="code-panel"
            id="code-tab"
          >
            Code
          </button>
        </div>
      </div>

      <div 
        className={styles.demoArea}
        role="tabpanel"
        id={activeTab === 'preview' ? 'preview-panel' : 'code-panel'}
        aria-labelledby={`${activeTab}-tab`}
        tabIndex="0"
      >
        {activeTab === 'preview' ? (
          <div className={styles.preview}>
            <div className={styles.previewHeader}>
              <h3 className={styles.previewTitle}>
                {getVariantLabel(activeVariant)} Timeline
              </h3>
            </div>
            <div className={styles.previewContent}>
              <Timeline 
                items={timelineItems} 
                variant={activeVariant}
                className={styles.timelinePreview}
              />
            </div>
          </div>
        ) : (
          <div className={styles.codeBlock}>
            <div className={styles.codeHeader}>
              <span className={styles.codeLanguage}>JSX</span>
              <CopyButton 
                content={demoCode} 
                className={styles.copyButton}
                label="Copy code to clipboard"
              />
            </div>
            <CodeBlock 
              code={demoCode} 
              language="jsx" 
              className={styles.codeElement}
            />
          </div>
        )}
      </div>

      <div className={styles.variants}>
        <h3 className={styles.variantsTitle}>Available Variants</h3>
        <p className={styles.variantsDescription}>
          Choose from different timeline styles to match your application's design system.
        </p>
        <div className={styles.variantGrid}>
          {variantOptions.map(({ value }) => (
            <div key={value} className={styles.variantCard}>
              <h4 className={styles.variantName}>
                {getVariantLabel(value)}
              </h4>
              <div className={styles.variantPreview}>
                <Timeline 
                  items={timelineItems.slice(0, 2)} 
                  variant={value}
                  className={styles.variantTimeline}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.usage}>
        <h3 className={styles.usageTitle}>Usage</h3>
        <p className={styles.usageDescription}>
          The Timeline component requires an array of items with at least a title and time.
          You can also mark items as active or completed, and provide custom content.
        </p>
        
        <h4 className={styles.usageSubtitle}>Props</h4>
        <div className={styles.propsTable}>
          <div className={styles.propsHeader}>
            <div className={styles.propName}>Name</div>
            <div className={styles.propType}>Type</div>
            <div className={styles.propDefault}>Default</div>
            <div className={styles.propDescription}>Description</div>
          </div>
          
          <div className={styles.propRow}>
            <div className={styles.propName}><code>items</code></div>
            <div className={styles.propType}><code>Array</code></div>
            <div className={styles.propDefault}><em>Required</em></div>
            <div className={styles.propDescription}>
              Array of timeline items to display. Each item should have at least a title and time.
            </div>
          </div>
          
          <div className={styles.propRow}>
            <div className={styles.propName}><code>variant</code></div>
            <div className={styles.propType}><code>string</code></div>
            <div className={styles.propDefault}><code>'default'</code></div>
            <div className={styles.propDescription}>
              Visual style variant. One of: 'default', 'compact', 'horizontal'
            </div>
          </div>
          
          <div className={styles.propRow}>
            <div className={styles.propName}><code>className</code></div>
            <div className={styles.propType}><code>string</code></div>
            <div className={styles.propDefault}><code>''</code></div>
            <div className={styles.propDescription}>
              Additional CSS class name for the timeline container
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

TimelineDemo.propTypes = {
  /** Additional class name for the demo container */
  className: PropTypes.string,
};

TimelineDemo.defaultProps = {
  className: '',
};

export default TimelineDemo;
