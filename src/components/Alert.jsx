import React, { useState } from 'react';
import './Alert.module.scss';

const alertHtml = `<!-- Basic Alerts -->
<div class="vertex-alert vertex-alert--info" role="alert">
  <div class="vertex-alert-icon">
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z" clip-rule="evenodd"/>
    </svg>
  </div>
  <div class="vertex-alert-content">
    <div class="vertex-alert-title">Information</div>
    <div class="vertex-alert-message">This is an informational alert with additional context.</div>
  </div>
</div>

<div class="vertex-alert vertex-alert--success" role="alert">
  <div class="vertex-alert-icon">
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clip-rule="evenodd"/>
    </svg>
  </div>
  <div class="vertex-alert-content">
    <div class="vertex-alert-title">Success</div>
    <div class="vertex-alert-message">Your changes have been saved successfully.</div>
  </div>
</div>

<div class="vertex-alert vertex-alert--warning" role="alert">
  <div class="vertex-alert-icon">
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path fill-rule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clip-rule="evenodd"/>
    </svg>
  </div>
  <div class="vertex-alert-content">
    <div class="vertex-alert-title">Warning</div>
    <div class="vertex-alert-message">Please review your input before proceeding.</div>
  </div>
</div>

<div class="vertex-alert vertex-alert--danger" role="alert">
  <div class="vertex-alert-icon">
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clip-rule="evenodd"/>
    </svg>
  </div>
  <div class="vertex-alert-content">
    <div class="vertex-alert-title">Error</div>
    <div class="vertex-alert-message">There was an error processing your request.</div>
  </div>
</div>

<!-- Dismissible Alert -->
<div class="vertex-alert vertex-alert--info vertex-alert--dismissible" role="alert">
  <div class="vertex-alert-icon">
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z" clip-rule="evenodd"/>
    </svg>
  </div>
  <div class="vertex-alert-content">
    <div class="vertex-alert-title">Dismissible Alert</div>
    <div class="vertex-alert-message">This alert can be dismissed by clicking the close button.</div>
  </div>
  <button class="vertex-alert-close" aria-label="Dismiss alert">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
    </svg>
  </button>
</div>

<!-- Alert with Actions -->
<div class="vertex-alert vertex-alert--warning vertex-alert--with-actions" role="alert">
  <div class="vertex-alert-icon">
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path fill-rule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clip-rule="evenodd"/>
    </svg>
  </div>
  <div class="vertex-alert-content">
    <div class="vertex-alert-title">Update Available</div>
    <div class="vertex-alert-message">A new version is available. Would you like to update now?</div>
    <div class="vertex-alert-actions">
      <button class="vertex-alert-action vertex-alert-action--primary">Update Now</button>
      <button class="vertex-alert-action vertex-alert-action--secondary">Later</button>
    </div>
  </div>
</div>`;

const alertCss = `/* Enhanced Alert Component */
.vertex-alert {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 1rem;
  border-radius: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid transparent;
  position: relative;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  
  /* Subtle animation on mount */
  animation: vertex-alert-slide-in 0.3s ease-out;
}

/* Alert Icon */
.vertex-alert-icon {
  flex-shrink: 0;
  width: 1.25rem;
  height: 1.25rem;
  margin-top: 0.125rem;
  
  svg {
    width: 100%;
    height: 100%;
  }
}

/* Alert Content */
.vertex-alert-content {
  flex: 1;
  min-width: 0;
}

.vertex-alert-title {
  font-weight: 600;
  font-size: 0.875rem;
  margin-bottom: 0.25rem;
  line-height: 1.4;
}

.vertex-alert-message {
  font-size: 0.875rem;
  line-height: 1.5;
  opacity: 0.9;
}

/* Alert Close Button */
.vertex-alert-close {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 0.375rem;
  transition: all 0.2s ease;
  margin-left: 0.5rem;
  flex-shrink: 0;
  
  svg {
    width: 1rem;
    height: 1rem;
  }
  
  &:hover {
    background: rgba(0, 0, 0, 0.1);
  }
  
  &:focus-visible {
    outline: 2px solid currentColor;
    outline-offset: 2px;
  }
}

/* Alert Actions */
.vertex-alert-actions {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.75rem;
}

.vertex-alert-action {
  background: none;
  border: 1px solid currentColor;
  color: inherit;
  cursor: pointer;
  padding: 0.375rem 0.75rem;
  border-radius: 0.375rem;
  font-size: 0.75rem;
  font-weight: 600;
  transition: all 0.2s ease;
  
  &--primary {
    background: currentColor;
    color: white;
    
    &:hover {
      opacity: 0.9;
      transform: translateY(-1px);
    }
  }
  
  &--secondary {
    background: transparent;
    
    &:hover {
      background: rgba(0, 0, 0, 0.05);
    }
  }
}

/* Alert Variants */
.vertex-alert--info {
  background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
  color: #1e40af;
  border-color: rgba(30, 64, 175, 0.2);
  
  .vertex-alert-close:hover {
    background: rgba(30, 64, 175, 0.1);
  }
}

.vertex-alert--success {
  background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
  color: #166534;
  border-color: rgba(22, 101, 52, 0.2);
  
  .vertex-alert-close:hover {
    background: rgba(22, 101, 52, 0.1);
  }
}

.vertex-alert--warning {
  background: linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%);
  color: #92400e;
  border-color: rgba(146, 64, 14, 0.2);
  
  .vertex-alert-close:hover {
    background: rgba(146, 64, 14, 0.1);
  }
}

.vertex-alert--danger {
  background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%);
  color: #991b1b;
  border-color: rgba(153, 27, 27, 0.2);
  
  .vertex-alert-close:hover {
    background: rgba(153, 27, 27, 0.1);
  }
}

/* Alert Sizes */
.vertex-alert--sm {
  padding: 0.75rem;
  gap: 0.5rem;
  
  .vertex-alert-icon {
    width: 1rem;
    height: 1rem;
  }
  
  .vertex-alert-title {
    font-size: 0.75rem;
  }
  
  .vertex-alert-message {
    font-size: 0.75rem;
  }
}

.vertex-alert--lg {
  padding: 1.25rem;
  gap: 1rem;
  
  .vertex-alert-icon {
    width: 1.5rem;
    height: 1.5rem;
  }
  
  .vertex-alert-title {
    font-size: 1rem;
  }
  
  .vertex-alert-message {
    font-size: 1rem;
  }
}

/* Alert States */
.vertex-alert--dismissible {
  padding-right: 2.5rem;
  
  .vertex-alert-close {
    position: absolute;
    top: 0.75rem;
    right: 0.75rem;
  }
}

.vertex-alert--with-actions {
  .vertex-alert-content {
    padding-bottom: 0.25rem;
  }
}

/* Animations */
@keyframes vertex-alert-slide-in {
  from {
    opacity: 0;
    transform: translateY(-0.5rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes vertex-alert-slide-out {
  from {
    opacity: 1;
    transform: translateY(0);
    max-height: 200px;
  }
  to {
    opacity: 0;
    transform: translateY(-0.5rem);
    max-height: 0;
    margin-bottom: 0;
    padding-top: 0;
    padding-bottom: 0;
  }
}

.vertex-alert--dismissing {
  animation: vertex-alert-slide-out 0.3s ease-in forwards;
}

/* Responsive Design */
@media (max-width: 640px) {
  .vertex-alert {
    padding: 0.875rem;
    gap: 0.625rem;
  }
  
  .vertex-alert-actions {
    flex-direction: column;
    gap: 0.375rem;
    
    .vertex-alert-action {
      width: 100%;
      justify-content: center;
    }
  }
  
  .vertex-alert--dismissible {
    padding-right: 2.25rem;
    
    .vertex-alert-close {
      top: 0.625rem;
      right: 0.625rem;
    }
  }
}`;

const alertJs = `// Enhanced Alert with React Hooks
import React, { useState, useEffect } from 'react';

const EnhancedAlert = ({ 
  type = 'info', 
  title, 
  message, 
  dismissible = false, 
  actions,
  size = 'medium',
  autoClose = false,
  autoCloseDelay = 5000,
  onClose,
  className = ''
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isDismissing, setIsDismissing] = useState(false);
  
  // Auto close functionality
  useEffect(() => {
    if (autoClose && autoCloseDelay > 0) {
      const timer = setTimeout(() => {
        handleDismiss();
      }, autoCloseDelay);
      
      return () => clearTimeout(timer);
    }
  }, [autoClose, autoCloseDelay]);
  
  const handleDismiss = () => {
    setIsDismissing(true);
    setTimeout(() => {
      setIsVisible(false);
      onClose?.();
    }, 300);
  };
  
  if (!isVisible) return null;
  
  const alertClasses = [
    'vertex-alert',
    \`vertex-alert--\${type}\`,
    size !== 'medium' && \`vertex-alert--\${size}\`,
    dismissible && 'vertex-alert--dismissible',
    actions && 'vertex-alert--with-actions',
    isDismissing && 'vertex-alert--dismissing',
    className
  ].filter(Boolean).join(' ');
  
  const getIcon = () => {
    const icons = {
      info: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd"/>
        </svg>
      ),
      success: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd"/>
        </svg>
      ),
      warning: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path fillRule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd"/>
        </svg>
      ),
      danger: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd"/>
        </svg>
      )
    };
    return icons[type] || icons.info;
  };
  
  return (
    <div className={alertClasses} role="alert">
      <div className="vertex-alert-icon">
        {getIcon()}
      </div>
      <div className="vertex-alert-content">
        {title && <div className="vertex-alert-title">{title}</div>}
        <div className="vertex-alert-message">{message}</div>
        {actions && (
          <div className="vertex-alert-actions">
            {actions}
          </div>
        )}
      </div>
      {dismissible && (
        <button 
          className="vertex-alert-close"
          onClick={handleDismiss}
          aria-label="Dismiss alert"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      )}
    </div>
  );
};`;

const codeTabs = [
  { label: 'HTML', code: alertHtml, lang: 'html' },
  { label: 'CSS', code: alertCss, lang: 'css' },
  { label: 'JS', code: alertJs, lang: 'js' },
];

const Alert = () => {
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
    <div className="vertex-component-block" aria-label="Alert component demo">
      <h2>Alert</h2>
      <div className="vertex-preview" style={{ marginBottom: '1rem' }}>
        <div className="vertex-alert vertex-alert--info">This is an info alert.</div>
        <div className="vertex-alert vertex-alert--success">This is a success alert.</div>
        <div className="vertex-alert vertex-alert--warning">This is a warning alert.</div>
        <div className="vertex-alert vertex-alert--danger">This is a danger alert.</div>
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

export default Alert; 