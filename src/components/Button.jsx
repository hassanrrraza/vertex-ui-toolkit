import React, { useState } from 'react';
import './Button.module.scss';

const buttonHtml = `<!-- Basic Button Variants -->
<button class="vertex-btn vertex-btn--primary">
  <span class="vertex-btn__text">Primary</span>
</button>

<button class="vertex-btn vertex-btn--secondary">
  <span class="vertex-btn__text">Secondary</span>
</button>

<button class="vertex-btn vertex-btn--outline">
  <span class="vertex-btn__text">Outline</span>
</button>

<button class="vertex-btn vertex-btn--ghost">
  <span class="vertex-btn__text">Ghost</span>
</button>

<!-- Button with Icon -->
<button class="vertex-btn vertex-btn--primary vertex-btn--icon">
  <svg class="vertex-btn__icon" viewBox="0 0 20 20" fill="currentColor">
    <path d="M10 12l-4-4h8l-4 4z"/>
  </svg>
  <span class="vertex-btn__text">With Icon</span>
</button>

<!-- Loading Button -->
<button class="vertex-btn vertex-btn--primary vertex-btn--loading" disabled>
  <div class="vertex-btn__spinner"></div>
  <span class="vertex-btn__text">Loading...</span>
</button>

<!-- Size Variants -->
<button class="vertex-btn vertex-btn--primary vertex-btn--sm">Small</button>
<button class="vertex-btn vertex-btn--primary vertex-btn--lg">Large</button>

<!-- Block Button -->
<button class="vertex-btn vertex-btn--primary vertex-btn--block">Block Button</button>

<!-- Disabled State -->
<button class="vertex-btn vertex-btn--primary" disabled>Disabled</button>`;

const buttonCss = `/* Enhanced Button Component with Modern Design */
.vertex-btn {
  /* Base Styles */
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border: 2px solid transparent;
  border-radius: 0.5rem;
  font-family: inherit;
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1;
  text-decoration: none;
  cursor: pointer;
  user-select: none;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  
  /* Focus Ring */
  &:focus-visible {
    outline: 2px solid var(--vertex-primary-500);
    outline-offset: 2px;
  }
  
  /* Disabled State */
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none !important;
  }
}

/* Button Text */
.vertex-btn__text {
  position: relative;
  z-index: 2;
}

/* Button Icon */
.vertex-btn__icon {
  width: 1rem;
  height: 1rem;
  flex-shrink: 0;
}

/* Loading Spinner */
.vertex-btn__spinner {
  width: 1rem;
  height: 1rem;
  border: 2px solid transparent;
  border-top: 2px solid currentColor;
  border-radius: 50%;
  animation: vertex-spin 1s linear infinite;
}

@keyframes vertex-spin {
  to { transform: rotate(360deg); }
}

/* Primary Variant */
.vertex-btn--primary {
  background: linear-gradient(135deg, #4f46e5 0%, #6366f1 100%);
  color: white;
  box-shadow: 0 4px 14px 0 rgba(79, 70, 229, 0.25);
  
  &:hover:not(:disabled) {
    background: linear-gradient(135deg, #4338ca 0%, #5b21b6 100%);
    box-shadow: 0 6px 20px 0 rgba(79, 70, 229, 0.35);
    transform: translateY(-2px);
  }
  
  &:active:not(:disabled) {
    transform: translateY(0);
    box-shadow: 0 2px 8px 0 rgba(79, 70, 229, 0.3);
  }
}

/* Secondary Variant */
.vertex-btn--secondary {
  background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
  color: #475569;
  box-shadow: 0 2px 8px 0 rgba(15, 23, 42, 0.08);
  
  &:hover:not(:disabled) {
    background: linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%);
    box-shadow: 0 4px 12px 0 rgba(15, 23, 42, 0.12);
    transform: translateY(-1px);
  }
}

/* Outline Variant */
.vertex-btn--outline {
  background: transparent;
  color: #4f46e5;
  border-color: #4f46e5;
  
  &:hover:not(:disabled) {
    background: rgba(79, 70, 229, 0.05);
    border-color: #4338ca;
    transform: translateY(-1px);
  }
}

/* Ghost Variant */
.vertex-btn--ghost {
  background: transparent;
  color: #6b7280;
  
  &:hover:not(:disabled) {
    background: rgba(107, 114, 128, 0.1);
    color: #374151;
  }
}

/* Size Variants */
.vertex-btn--sm {
  padding: 0.5rem 1rem;
  font-size: 0.75rem;
  
  .vertex-btn__icon {
    width: 0.875rem;
    height: 0.875rem;
  }
}

.vertex-btn--lg {
  padding: 1rem 2rem;
  font-size: 1rem;
  
  .vertex-btn__icon {
    width: 1.25rem;
    height: 1.25rem;
  }
}

/* Block Variant */
.vertex-btn--block {
  width: 100%;
}

/* Icon Button */
.vertex-btn--icon-only {
  padding: 0.75rem;
  
  &.vertex-btn--sm {
    padding: 0.5rem;
  }
  
  &.vertex-btn--lg {
    padding: 1rem;
  }
}

/* Loading State */
.vertex-btn--loading {
  pointer-events: none;
  
  .vertex-btn__text {
    opacity: 0.7;
  }
}`;

const buttonJs = `// Enhanced Button with React Hook for Interactive States
import React, { useState } from 'react';

const InteractiveButton = ({ 
  children, 
  variant = 'primary', 
  size = 'md',
  loading = false,
  disabled = false,
  icon,
  onClick,
  ...props 
}) => {
  const [isPressed, setIsPressed] = useState(false);
  
  const handleMouseDown = () => setIsPressed(true);
  const handleMouseUp = () => setIsPressed(false);
  const handleMouseLeave = () => setIsPressed(false);
  
  const classes = [
    'vertex-btn',
    \`vertex-btn--\${variant}\`,
    \`vertex-btn--\${size}\`,
    loading && 'vertex-btn--loading',
    isPressed && 'vertex-btn--pressed'
  ].filter(Boolean).join(' ');
  
  return (
    <button
      className={classes}
      disabled={disabled || loading}
      onClick={onClick}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {loading && <div className="vertex-btn__spinner" />}
      {icon && <span className="vertex-btn__icon">{icon}</span>}
      <span className="vertex-btn__text">{children}</span>
    </button>
  );
};`;

const codeTabs = [
  { label: 'HTML', code: buttonHtml, lang: 'html' },
  { label: 'CSS', code: buttonCss, lang: 'css' },
  { label: 'JS', code: buttonJs, lang: 'js' },
];

const Button = () => {
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
    <div className="vertex-component-block" aria-label="Button component demo">
      <h2>Enhanced Button Component</h2>
      
      {/* Basic Variants */}
      <div className="vertex-preview" style={{ marginBottom: '1.5rem' }}>
        <h3 style={{ fontSize: '1rem', marginBottom: '0.75rem', color: '#374151' }}>Basic Variants</h3>
        <button className="vertex-btn vertex-btn--primary">
          <span className="vertex-btn__text">Primary</span>
        </button>
        <button className="vertex-btn vertex-btn--secondary">
          <span className="vertex-btn__text">Secondary</span>
        </button>
        <button className="vertex-btn vertex-btn--outline">
          <span className="vertex-btn__text">Outline</span>
        </button>
        <button className="vertex-btn vertex-btn--ghost">
          <span className="vertex-btn__text">Ghost</span>
        </button>
      </div>

      {/* Semantic Variants */}
      <div className="vertex-preview" style={{ marginBottom: '1.5rem' }}>
        <h3 style={{ fontSize: '1rem', marginBottom: '0.75rem', color: '#374151' }}>Semantic Variants</h3>
        <button className="vertex-btn vertex-btn--success">
          <span className="vertex-btn__text">Success</span>
        </button>
        <button className="vertex-btn vertex-btn--warning">
          <span className="vertex-btn__text">Warning</span>
        </button>
        <button className="vertex-btn vertex-btn--danger">
          <span className="vertex-btn__text">Danger</span>
        </button>
      </div>

      {/* Buttons with Icons */}
      <div className="vertex-preview" style={{ marginBottom: '1.5rem' }}>
        <h3 style={{ fontSize: '1rem', marginBottom: '0.75rem', color: '#374151' }}>With Icons</h3>
        <button className="vertex-btn vertex-btn--primary">
          <svg className="vertex-btn__icon" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          <span className="vertex-btn__text">Add Item</span>
        </button>
        <button className="vertex-btn vertex-btn--outline">
          <svg className="vertex-btn__icon" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
          <span className="vertex-btn__text">Download</span>
        </button>
      </div>

      {/* Loading States */}
      <div className="vertex-preview" style={{ marginBottom: '1.5rem' }}>
        <h3 style={{ fontSize: '1rem', marginBottom: '0.75rem', color: '#374151' }}>Loading States</h3>
        <button className="vertex-btn vertex-btn--primary vertex-btn--loading" disabled>
          <div className="vertex-btn__spinner"></div>
          <span className="vertex-btn__text">Loading...</span>
        </button>
        <button className="vertex-btn vertex-btn--secondary vertex-btn--loading" disabled>
          <div className="vertex-btn__spinner"></div>
          <span className="vertex-btn__text">Processing...</span>
        </button>
      </div>

      {/* Size Variants */}
      <div className="vertex-preview" style={{ marginBottom: '1.5rem' }}>
        <h3 style={{ fontSize: '1rem', marginBottom: '0.75rem', color: '#374151' }}>Size Variants</h3>
        <button className="vertex-btn vertex-btn--primary vertex-btn--sm">
          <span className="vertex-btn__text">Small</span>
        </button>
        <button className="vertex-btn vertex-btn--primary">
          <span className="vertex-btn__text">Medium</span>
        </button>
        <button className="vertex-btn vertex-btn--primary vertex-btn--lg">
          <span className="vertex-btn__text">Large</span>
        </button>
      </div>

      {/* Block Button */}
      <div className="vertex-preview" style={{ marginBottom: '1.5rem' }}>
        <h3 style={{ fontSize: '1rem', marginBottom: '0.75rem', color: '#374151' }}>Block Button</h3>
        <button className="vertex-btn vertex-btn--primary vertex-btn--block">
          <span className="vertex-btn__text">Full Width Button</span>
        </button>
      </div>

      {/* Floating Action Button */}
      <div className="vertex-preview" style={{ marginBottom: '1.5rem' }}>
        <h3 style={{ fontSize: '1rem', marginBottom: '0.75rem', color: '#374151' }}>Floating Action Button</h3>
        <button className="vertex-btn vertex-btn--primary vertex-btn--fab">
          <svg className="vertex-btn__icon" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
        </button>
        <button className="vertex-btn vertex-btn--secondary vertex-btn--fab vertex-btn--sm">
          <svg className="vertex-btn__icon" viewBox="0 0 20 20" fill="currentColor">
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
          </svg>
        </button>
      </div>

      {/* Disabled State */}
      <div className="vertex-preview" style={{ marginBottom: '1.5rem' }}>
        <h3 style={{ fontSize: '1rem', marginBottom: '0.75rem', color: '#374151' }}>Disabled State</h3>
        <button className="vertex-btn vertex-btn--primary" disabled>
          <span className="vertex-btn__text">Disabled</span>
        </button>
        <button className="vertex-btn vertex-btn--outline" disabled>
          <span className="vertex-btn__text">Disabled</span>
        </button>
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

export default Button; 