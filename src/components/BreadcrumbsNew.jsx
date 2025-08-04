import React, { useState } from 'react';
import './BreadcrumbsNew.module.scss';

const breadcrumbsHtml = `<nav class="vertex-breadcrumbs" aria-label="Breadcrumb">
  <ol class="vertex-breadcrumb-list">
    <li class="vertex-breadcrumb-item">
      <a href="#" class="vertex-breadcrumb-link">Home</a>
    </li>
    <li class="vertex-breadcrumb-item">
      <span class="vertex-breadcrumb-separator">/</span>
      <a href="#" class="vertex-breadcrumb-link">Components</a>
    </li>
    <li class="vertex-breadcrumb-item">
      <span class="vertex-breadcrumb-separator">/</span>
      <a href="#" class="vertex-breadcrumb-link">Navigation</a>
    </li>
    <li class="vertex-breadcrumb-item vertex-breadcrumb-item--current">
      <span class="vertex-breadcrumb-separator">/</span>
      <span class="vertex-breadcrumb-current" aria-current="page">Breadcrumbs</span>
    </li>
  </ol>
</nav>`;

const breadcrumbsCss = `.vertex-breadcrumbs {
  margin-bottom: 1rem;
}

.vertex-breadcrumb-list {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  list-style: none;
  margin: 0;
  padding: 0;
  font-size: 0.875rem;
}

.vertex-breadcrumb-item {
  display: flex;
  align-items: center;
}

.vertex-breadcrumb-link {
  color: #384E77;
  text-decoration: none;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  transition: all 0.2s ease;
}

.vertex-breadcrumb-link:hover {
  color: #2d3e5f;
  background: #f5f7ff;
  text-decoration: underline;
}

.vertex-breadcrumb-link:focus {
  outline: 2px solid #8BBEB2;
  outline-offset: 2px;
}

.vertex-breadcrumb-separator {
  color: #666;
  margin: 0 0.5rem;
  user-select: none;
}

.vertex-breadcrumb-current {
  color: #666;
  font-weight: 500;
  padding: 0.25rem 0.5rem;
}

.vertex-breadcrumb-item--current {
  pointer-events: none;
}

/* Responsive design */
@media (max-width: 768px) {
  .vertex-breadcrumb-list {
    font-size: 0.75rem;
  }
  
  .vertex-breadcrumb-separator {
    margin: 0 0.25rem;
  }
  
  .vertex-breadcrumb-link,
  .vertex-breadcrumb-current {
    padding: 0.125rem 0.25rem;
  }
}

/* Alternative styles */
.vertex-breadcrumbs--compact .vertex-breadcrumb-link,
.vertex-breadcrumbs--compact .vertex-breadcrumb-current {
  padding: 0.125rem 0.25rem;
}

.vertex-breadcrumbs--compact .vertex-breadcrumb-separator {
  margin: 0 0.25rem;
}`;

const breadcrumbsReact = `import React from 'react';

const Breadcrumbs = ({ 
  items = [], 
  separator = '/',
  maxItems = null,
  className = '' 
}) => {
  const displayItems = maxItems && items.length > maxItems 
    ? [
        items[0],
        { label: '...', href: null, disabled: true },
        ...items.slice(-(maxItems - 2))
      ]
    : items;

  return (
    <nav className={\`vertex-breadcrumbs \${className}\`} aria-label="Breadcrumb">
      <ol className="vertex-breadcrumb-list">
        {displayItems.map((item, index) => {
          const isLast = index === displayItems.length - 1;
          const isEllipsis = item.label === '...';
          
          return (
            <li 
              key={index}
              className={\`vertex-breadcrumb-item \${isLast ? 'vertex-breadcrumb-item--current' : ''}\`}
            >
              {index > 0 && (
                <span className="vertex-breadcrumb-separator">{separator}</span>
              )}
              {isLast ? (
                <span className="vertex-breadcrumb-current" aria-current="page">
                  {item.label}
                </span>
              ) : isEllipsis ? (
                <span className="vertex-breadcrumb-current">{item.label}</span>
              ) : (
                <a 
                  href={item.href} 
                  className="vertex-breadcrumb-link"
                  onClick={item.onClick}
                >
                  {item.label}
                </a>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;`;

const codeTabs = [
  { label: 'HTML', code: breadcrumbsHtml, lang: 'html' },
  { label: 'CSS', code: breadcrumbsCss, lang: 'css' },
  { label: 'React', code: breadcrumbsReact, lang: 'jsx' }
];

const BreadcrumbsNew = () => {
  const [activeTab, setActiveTab] = useState('HTML');
  const [copied, setCopied] = useState(false);

  const breadcrumbItems = [
    { label: 'Home', href: '#' },
    { label: 'Components', href: '#' },
    { label: 'Navigation', href: '#' },
    { label: 'Breadcrumbs', href: '#' }
  ];

  const longBreadcrumbItems = [
    { label: 'Home', href: '#' },
    { label: 'Dashboard', href: '#' },
    { label: 'Projects', href: '#' },
    { label: 'Web Development', href: '#' },
    { label: 'Frontend', href: '#' },
    { label: 'React Components', href: '#' },
    { label: 'UI Library', href: '#' },
    { label: 'Breadcrumbs', href: '#' }
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

  const BreadcrumbsComponent = ({ items, separator = '/', maxItems = null, className = '' }) => {
    const displayItems = maxItems && items.length > maxItems 
      ? [
          items[0],
          { label: '...', href: null, disabled: true },
          ...items.slice(-(maxItems - 2))
        ]
      : items;

    return (
      <nav className={`vertex-breadcrumbs ${className}`} aria-label="Breadcrumb">
        <ol className="vertex-breadcrumb-list">
          {displayItems.map((item, index) => {
            const isLast = index === displayItems.length - 1;
            const isEllipsis = item.label === '...';
            
            return (
              <li 
                key={index}
                className={`vertex-breadcrumb-item ${isLast ? 'vertex-breadcrumb-item--current' : ''}`}
              >
                {index > 0 && (
                  <span className="vertex-breadcrumb-separator">{separator}</span>
                )}
                {isLast ? (
                  <span className="vertex-breadcrumb-current" aria-current="page">
                    {item.label}
                  </span>
                ) : isEllipsis ? (
                  <span className="vertex-breadcrumb-current">{item.label}</span>
                ) : (
                  <a 
                    href={item.href} 
                    className="vertex-breadcrumb-link"
                    onClick={(e) => e.preventDefault()}
                  >
                    {item.label}
                  </a>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    );
  };

  return (
    <div className="vertex-component-block" aria-label="Breadcrumbs component demo">
      <h2>Breadcrumbs</h2>
      <p className="vertex-component-description">
        Navigation path indicator showing the user's location within the site hierarchy.
      </p>
      <div className="vertex-preview" style={{ marginBottom: '1rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <h4 style={{ marginBottom: '0.5rem', color: '#384E77' }}>Standard Breadcrumbs</h4>
            <BreadcrumbsComponent items={breadcrumbItems} />
          </div>

          <div>
            <h4 style={{ marginBottom: '0.5rem', color: '#384E77' }}>Custom Separator</h4>
            <BreadcrumbsComponent items={breadcrumbItems} separator=">" />
          </div>

          <div>
            <h4 style={{ marginBottom: '0.5rem', color: '#384E77' }}>Truncated (Max 4 items)</h4>
            <BreadcrumbsComponent items={longBreadcrumbItems} maxItems={4} />
          </div>

          <div>
            <h4 style={{ marginBottom: '0.5rem', color: '#384E77' }}>Compact Style</h4>
            <BreadcrumbsComponent items={breadcrumbItems} className="vertex-breadcrumbs--compact" separator="•" />
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

export default BreadcrumbsNew;
