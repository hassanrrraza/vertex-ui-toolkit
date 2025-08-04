import React, { useState } from 'react';
import './Chip.module.scss';

const chipHtml = `<div class="vertex-chip">Default Chip</div>
<div class="vertex-chip vertex-chip--primary">Primary</div>
<div class="vertex-chip vertex-chip--secondary">Secondary</div>
<div class="vertex-chip vertex-chip--outline">Outline</div>
<div class="vertex-chip vertex-chip--removable">
  Removable
  <button class="vertex-chip-remove" aria-label="Remove chip">×</button>
</div>
<div class="vertex-chip vertex-chip--sm">Small</div>
<div class="vertex-chip vertex-chip--lg">Large</div>`;

const chipCss = `.vertex-chip {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.375rem 0.75rem;
  background: #f8f9fa;
  color: #0D0630;
  border: 1px solid #e0e6ed;
  border-radius: 1.25rem;
  font-size: 0.875rem;
  font-weight: 500;
  margin: 0.25rem;
  transition: all 0.2s ease;
}

.vertex-chip:hover {
  background: #e9ecef;
}

.vertex-chip--primary {
  background: #384E77;
  color: #fff;
  border-color: #384E77;
}

.vertex-chip--primary:hover {
  background: #2d3e5f;
}

.vertex-chip--secondary {
  background: #8BBEB2;
  color: #0D0630;
  border-color: #8BBEB2;
}

.vertex-chip--secondary:hover {
  background: #7ab3a8;
}

.vertex-chip--outline {
  background: transparent;
  color: #384E77;
  border-color: #384E77;
}

.vertex-chip--outline:hover {
  background: #384E77;
  color: #fff;
}

.vertex-chip--sm {
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
}

.vertex-chip--lg {
  padding: 0.5rem 1rem;
  font-size: 1rem;
}

.vertex-chip-remove {
  background: none;
  border: none;
  color: inherit;
  cursor: pointer;
  font-size: 1.25rem;
  line-height: 1;
  padding: 0;
  margin-left: 0.25rem;
  border-radius: 50%;
  width: 1.25rem;
  height: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s ease;
}

.vertex-chip-remove:hover {
  background: rgba(0, 0, 0, 0.1);
}

.vertex-chip--primary .vertex-chip-remove:hover {
  background: rgba(255, 255, 255, 0.2);
}`;

const chipReact = `import React from 'react';

const Chip = ({ 
  children, 
  variant = 'default',
  size = 'medium',
  removable = false,
  onRemove,
  className = '',
  ...props 
}) => {
  const chipClasses = [
    'vertex-chip',
    variant !== 'default' ? \`vertex-chip--\${variant}\` : '',
    size !== 'medium' ? \`vertex-chip--\${size === 'small' ? 'sm' : 'lg'}\` : '',
    removable ? 'vertex-chip--removable' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={chipClasses} {...props}>
      {children}
      {removable && (
        <button 
          className="vertex-chip-remove" 
          onClick={onRemove}
          aria-label="Remove chip"
        >
          ×
        </button>
      )}
    </div>
  );
};

export default Chip;`;

const codeTabs = [
  { label: 'HTML', code: chipHtml, lang: 'html' },
  { label: 'CSS', code: chipCss, lang: 'css' },
  { label: 'React', code: chipReact, lang: 'jsx' }
];

const Chip = () => {
  const [activeTab, setActiveTab] = useState('HTML');
  const [copied, setCopied] = useState(false);
  const [chips, setChips] = useState([
    { id: 1, label: 'React', variant: 'primary' },
    { id: 2, label: 'JavaScript', variant: 'secondary' },
    { id: 3, label: 'CSS', variant: 'outline' },
    { id: 4, label: 'HTML', variant: 'default' }
  ]);

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

  const removeChip = (id) => {
    setChips(chips.filter(chip => chip.id !== id));
  };

  return (
    <div className="vertex-component-block" aria-label="Chip component demo">
      <h2>Chip / Tag</h2>
      <p className="vertex-component-description">
        Compact elements for labels, tags, filters, and removable selections.
      </p>
      <div className="vertex-preview" style={{ marginBottom: '1rem' }}>
        <div style={{ marginBottom: '1rem' }}>
          <h4 style={{ marginBottom: '0.5rem', color: '#384E77' }}>Variants</h4>
          <div className="vertex-chip">Default Chip</div>
          <div className="vertex-chip vertex-chip--primary">Primary</div>
          <div className="vertex-chip vertex-chip--secondary">Secondary</div>
          <div className="vertex-chip vertex-chip--outline">Outline</div>
        </div>
        
        <div style={{ marginBottom: '1rem' }}>
          <h4 style={{ marginBottom: '0.5rem', color: '#384E77' }}>Sizes</h4>
          <div className="vertex-chip vertex-chip--sm">Small</div>
          <div className="vertex-chip">Medium</div>
          <div className="vertex-chip vertex-chip--lg">Large</div>
        </div>

        <div>
          <h4 style={{ marginBottom: '0.5rem', color: '#384E77' }}>Removable Tags</h4>
          {chips.map(chip => (
            <div key={chip.id} className={`vertex-chip vertex-chip--${chip.variant} vertex-chip--removable`}>
              {chip.label}
              <button 
                className="vertex-chip-remove" 
                onClick={() => removeChip(chip.id)}
                aria-label={`Remove ${chip.label} chip`}
              >
                ×
              </button>
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

export default Chip;
