import React, { useState } from 'react';
import './Modal.module.scss';

const modalHtml = `<!-- Basic Modal -->
<div class="vertex-modal vertex-modal--open" role="dialog" aria-labelledby="modal-title" aria-describedby="modal-description">
  <div class="vertex-modal-backdrop" aria-hidden="true"></div>
  <div class="vertex-modal-container">
    <div class="vertex-modal-content">
      <div class="vertex-modal-header">
        <h2 id="modal-title" class="vertex-modal-title">Modal Title</h2>
        <button class="vertex-modal-close" aria-label="Close modal">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>
      <div class="vertex-modal-body">
        <p id="modal-description">This is an enhanced modal dialog with modern styling and accessibility features.</p>
      </div>
      <div class="vertex-modal-footer">
        <button class="vertex-btn vertex-btn--ghost">Cancel</button>
        <button class="vertex-btn vertex-btn--primary">Confirm</button>
      </div>
    </div>
  </div>
</div>

<!-- Confirmation Modal -->
<div class="vertex-modal vertex-modal--confirmation vertex-modal--open">
  <div class="vertex-modal-backdrop"></div>
  <div class="vertex-modal-container">
    <div class="vertex-modal-content">
      <div class="vertex-modal-header">
        <div class="vertex-modal-icon vertex-modal-icon--warning">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"/>
          </svg>
        </div>
        <h2 class="vertex-modal-title">Delete Item</h2>
        <button class="vertex-modal-close" aria-label="Close modal">×</button>
      </div>
      <div class="vertex-modal-body">
        <p>Are you sure you want to delete this item? This action cannot be undone.</p>
      </div>
      <div class="vertex-modal-footer">
        <button class="vertex-btn vertex-btn--ghost">Cancel</button>
        <button class="vertex-btn vertex-btn--danger">Delete</button>
      </div>
    </div>
  </div>
</div>

<!-- Full Screen Modal -->
<div class="vertex-modal vertex-modal--fullscreen vertex-modal--open">
  <div class="vertex-modal-container">
    <div class="vertex-modal-content">
      <div class="vertex-modal-header">
        <h2 class="vertex-modal-title">Full Screen Modal</h2>
        <button class="vertex-modal-close">×</button>
      </div>
      <div class="vertex-modal-body">
        <p>This modal takes up the full screen on mobile devices.</p>
      </div>
      <div class="vertex-modal-footer">
        <button class="vertex-btn vertex-btn--primary">Save Changes</button>
      </div>
    </div>
  </div>
</div>`;

const modalCss = `/* Enhanced Modal Component */
.vertex-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1050;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.vertex-modal--open {
  opacity: 1;
  visibility: visible;
}

/* Modal Backdrop */
.vertex-modal-backdrop {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  animation: vertex-fade-in 0.3s ease-out;
}

/* Modal Container */
.vertex-modal-container {
  position: relative;
  width: 100%;
  max-width: 500px;
  margin: 1rem;
  max-height: calc(100vh - 2rem);
  overflow-y: auto;
  animation: vertex-modal-slide-up 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Modal Content */
.vertex-modal-content {
  background: #ffffff;
  border-radius: 1rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  overflow: hidden;
  position: relative;
}

/* Modal Header */
.vertex-modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 1.5rem 0;
  gap: 1rem;
}

.vertex-modal-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
  flex: 1;
}

.vertex-modal-close {
  background: none;
  border: none;
  color: #6b7280;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 0.5rem;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  
  svg {
    width: 1.25rem;
    height: 1.25rem;
  }
  
  &:hover {
    background: #f3f4f6;
    color: #374151;
  }
}

/* Modal Icon */
.vertex-modal-icon {
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
  
  svg {
    width: 1.5rem;
    height: 1.5rem;
  }
  
  &--success {
    background: #dcfce7;
    color: #16a34a;
  }
  
  &--warning {
    background: #fef3c7;
    color: #d97706;
  }
  
  &--danger {
    background: #fee2e2;
    color: #dc2626;
  }
  
  &--info {
    background: #dbeafe;
    color: #2563eb;
  }
}

/* Modal Body */
.vertex-modal-body {
  padding: 1.5rem;
  color: #4b5563;
  line-height: 1.6;
}

/* Modal Footer */
.vertex-modal-footer {
  padding: 0 1.5rem 1.5rem;
  display: flex;
  gap: 0.75rem;
  justify-content: flex-end;
  
  .vertex-btn {
    margin: 0;
  }
}

/* Modal Variants */
.vertex-modal--small .vertex-modal-container {
  max-width: 400px;
}

.vertex-modal--large .vertex-modal-container {
  max-width: 800px;
}

.vertex-modal--fullscreen {
  .vertex-modal-container {
    max-width: none;
    margin: 0;
    max-height: 100vh;
    height: 100vh;
  }
  
  .vertex-modal-content {
    border-radius: 0;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  
  .vertex-modal-body {
    flex: 1;
    overflow-y: auto;
  }
}

.vertex-modal--confirmation {
  .vertex-modal-header {
    align-items: flex-start;
  }
  
  .vertex-modal-title {
    font-size: 1.125rem;
  }
}

/* Animations */
@keyframes vertex-fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes vertex-modal-slide-up {
  from {
    opacity: 0;
    transform: translateY(1rem) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* Responsive Design */
@media (max-width: 640px) {
  .vertex-modal-container {
    margin: 0;
    max-height: 100vh;
    height: 100vh;
  }
  
  .vertex-modal-content {
    border-radius: 0;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  
  .vertex-modal-body {
    flex: 1;
    overflow-y: auto;
  }
  
  .vertex-modal-footer {
    flex-direction: column-reverse;
    
    .vertex-btn {
      width: 100%;
    }
  }
}`;

const modalJs = `// Enhanced Modal with React Hooks and Accessibility
import React, { useState, useEffect, useRef } from 'react';

const EnhancedModal = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  size = 'medium',
  variant = 'default',
  showCloseButton = true,
  closeOnBackdrop = true,
  closeOnEscape = true,
  actions
}) => {
  const modalRef = useRef(null);
  const previousFocusRef = useRef(null);
  
  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && closeOnEscape && isOpen) {
        onClose();
      }
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, closeOnEscape, onClose]);
  
  // Focus management
  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement;
      modalRef.current?.focus();
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      previousFocusRef.current?.focus();
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);
  
  // Focus trap
  const handleKeyDown = (e) => {
    if (e.key === 'Tab') {
      const focusableElements = modalRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      
      if (focusableElements?.length) {
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    }
  };
  
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget && closeOnBackdrop) {
      onClose();
    }
  };
  
  if (!isOpen) return null;
  
  const modalClasses = [
    'vertex-modal',
    'vertex-modal--open',
    \`vertex-modal--\${size}\`,
    variant !== 'default' && \`vertex-modal--\${variant}\`
  ].filter(Boolean).join(' ');
  
  return (
    <div 
      className={modalClasses}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={handleBackdropClick}
      onKeyDown={handleKeyDown}
      ref={modalRef}
      tabIndex={-1}
    >
      <div className="vertex-modal-backdrop" aria-hidden="true" />
      <div className="vertex-modal-container">
        <div className="vertex-modal-content">
          <div className="vertex-modal-header">
            <h2 id="modal-title" className="vertex-modal-title">
              {title}
            </h2>
            {showCloseButton && (
              <button 
                className="vertex-modal-close"
                onClick={onClose}
                aria-label="Close modal"
              >
                ×
              </button>
            )}
          </div>
          <div className="vertex-modal-body">
            {children}
          </div>
          {actions && (
            <div className="vertex-modal-footer">
              {actions}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};`;

const codeTabs = [
  { label: 'HTML', code: modalHtml, lang: 'html' },
  { label: 'CSS', code: modalCss, lang: 'css' },
  { label: 'JS', code: modalJs, lang: 'js' },
];

const Modal = () => {
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
    <div className="vertex-component-block" aria-label="Modal component demo">
      <h2>Enhanced Modal Component</h2>
      
      {/* Basic Modal */}
      <div className="vertex-preview" style={{ marginBottom: '1.5rem' }}>
        <h3 style={{ fontSize: '1rem', marginBottom: '0.75rem', color: '#374151' }}>Basic Modal</h3>
        <div style={{ minHeight: '250px', position: 'relative', background: '#f8fafc', borderRadius: '0.5rem', overflow: 'hidden' }}>
          <div className="vertex-modal vertex-modal--open" style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%'}}>
            <div className="vertex-modal-backdrop" aria-hidden="true"></div>
            <div className="vertex-modal-container">
              <div className="vertex-modal-content">
                <div className="vertex-modal-header">
                  <h2 className="vertex-modal-title">Enhanced Modal</h2>
                  <button className="vertex-modal-close" aria-label="Close modal">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                  </button>
                </div>
                <div className="vertex-modal-body">
                  <p>This is an enhanced modal dialog with modern styling, better accessibility, and smooth animations.</p>
                </div>
                <div className="vertex-modal-footer">
                  <button className="vertex-btn vertex-btn--ghost">
                    <span className="vertex-btn__text">Cancel</span>
                  </button>
                  <button className="vertex-btn vertex-btn--primary">
                    <span className="vertex-btn__text">Confirm</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <div className="vertex-preview" style={{ marginBottom: '1.5rem' }}>
        <h3 style={{ fontSize: '1rem', marginBottom: '0.75rem', color: '#374151' }}>Confirmation Modal</h3>
        <div style={{ minHeight: '250px', position: 'relative', background: '#f8fafc', borderRadius: '0.5rem', overflow: 'hidden' }}>
          <div className="vertex-modal vertex-modal--confirmation vertex-modal--open" style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%'}}>
            <div className="vertex-modal-backdrop"></div>
            <div className="vertex-modal-container">
              <div className="vertex-modal-content">
                <div className="vertex-modal-header">
                  <div className="vertex-modal-icon vertex-modal-icon--warning">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"/>
                    </svg>
                  </div>
                  <h2 className="vertex-modal-title">Delete Item</h2>
                  <button className="vertex-modal-close" aria-label="Close modal">×</button>
                </div>
                <div className="vertex-modal-body">
                  <p>Are you sure you want to delete this item? This action cannot be undone.</p>
                </div>
                <div className="vertex-modal-footer">
                  <button className="vertex-btn vertex-btn--ghost">
                    <span className="vertex-btn__text">Cancel</span>
                  </button>
                  <button className="vertex-btn vertex-btn--danger">
                    <span className="vertex-btn__text">Delete</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      <div className="vertex-preview" style={{ marginBottom: '1.5rem' }}>
        <h3 style={{ fontSize: '1rem', marginBottom: '0.75rem', color: '#374151' }}>Success Modal</h3>
        <div style={{ minHeight: '250px', position: 'relative', background: '#f8fafc', borderRadius: '0.5rem', overflow: 'hidden' }}>
          <div className="vertex-modal vertex-modal--success vertex-modal--open" style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%'}}>
            <div className="vertex-modal-backdrop"></div>
            <div className="vertex-modal-container">
              <div className="vertex-modal-content">
                <div className="vertex-modal-header">
                  <div className="vertex-modal-icon vertex-modal-icon--success">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <h2 className="vertex-modal-title">Success!</h2>
                  <button className="vertex-modal-close" aria-label="Close modal">×</button>
                </div>
                <div className="vertex-modal-body">
                  <p>Your changes have been saved successfully.</p>
                </div>
                <div className="vertex-modal-footer">
                  <button className="vertex-btn vertex-btn--success">
                    <span className="vertex-btn__text">Continue</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Sizes */}
      <div className="vertex-preview" style={{ marginBottom: '1.5rem' }}>
        <h3 style={{ fontSize: '1rem', marginBottom: '0.75rem', color: '#374151' }}>Modal Sizes</h3>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <div style={{ minHeight: '200px', width: '300px', position: 'relative', background: '#f8fafc', borderRadius: '0.5rem', overflow: 'hidden' }}>
            <div className="vertex-modal vertex-modal--small vertex-modal--open" style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%'}}>
              <div className="vertex-modal-backdrop"></div>
              <div className="vertex-modal-container">
                <div className="vertex-modal-content">
                  <div className="vertex-modal-header">
                    <h2 className="vertex-modal-title" style={{ fontSize: '1rem' }}>Small Modal</h2>
                    <button className="vertex-modal-close">×</button>
                  </div>
                  <div className="vertex-modal-body">
                    <p style={{ fontSize: '0.875rem' }}>Compact modal for simple messages.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div style={{ minHeight: '200px', width: '400px', position: 'relative', background: '#f8fafc', borderRadius: '0.5rem', overflow: 'hidden' }}>
            <div className="vertex-modal vertex-modal--large vertex-modal--open" style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%'}}>
              <div className="vertex-modal-backdrop"></div>
              <div className="vertex-modal-container">
                <div className="vertex-modal-content">
                  <div className="vertex-modal-header">
                    <h2 className="vertex-modal-title" style={{ fontSize: '1rem' }}>Large Modal</h2>
                    <button className="vertex-modal-close">×</button>
                  </div>
                  <div className="vertex-modal-body">
                    <p style={{ fontSize: '0.875rem' }}>Spacious modal for detailed content.</p>
                  </div>
                </div>
              </div>
            </div>
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

export default Modal; 