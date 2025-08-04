import React, { useState } from 'react';
import styles from './InputField.module.scss';

const inputHtml = `<!-- Basic Input Field -->
<div class="vertex-input-group">
  <label for="vertex-input-basic" class="vertex-input-label">Basic Input</label>
  <input 
    id="vertex-input-basic" 
    type="text" 
    placeholder="Enter text..." 
    class="vertex-input" 
  />
  <span class="vertex-input-helper">Helper text goes here.</span>
</div>

<!-- Floating Label Input -->
<div class="vertex-input-group vertex-input-group--floating">
  <input 
    id="vertex-input-floating" 
    type="text" 
    class="vertex-input vertex-input--floating" 
    placeholder=" "
  />
  <label for="vertex-input-floating" class="vertex-input-label--floating">Floating Label</label>
</div>

<!-- Input with Icon -->
<div class="vertex-input-group vertex-input-group--with-icon">
  <div class="vertex-input-icon vertex-input-icon--left">
    <svg viewBox="0 0 20 20" fill="currentColor">
      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
    </svg>
  </div>
  <input 
    type="email" 
    placeholder="Enter email..." 
    class="vertex-input vertex-input--with-icon-left" 
  />
</div>

<!-- Search Input -->
<div class="vertex-input-group vertex-input-group--search">
  <div class="vertex-input-icon vertex-input-icon--left">
    <svg viewBox="0 0 20 20" fill="currentColor">
      <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"/>
    </svg>
  </div>
  <input 
    type="search" 
    placeholder="Search..." 
    class="vertex-input vertex-input--search vertex-input--with-icon-left" 
  />
  <button class="vertex-input-clear" type="button">×</button>
</div>

<!-- Password Input -->
<div class="vertex-input-group vertex-input-group--password">
  <input 
    type="password" 
    placeholder="Enter password..." 
    class="vertex-input vertex-input--password" 
  />
  <button class="vertex-input-toggle" type="button">
    <svg class="vertex-input-toggle-icon" viewBox="0 0 20 20" fill="currentColor">
      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
      <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd"/>
    </svg>
  </button>
</div>

<!-- Textarea -->
<div class="vertex-input-group">
  <label for="vertex-textarea" class="vertex-input-label">Message</label>
  <textarea 
    id="vertex-textarea" 
    placeholder="Enter your message..." 
    class="vertex-input vertex-input--textarea"
    rows="4"
  ></textarea>
  <span class="vertex-input-helper">Maximum 500 characters</span>
</div>`;

const inputCss = `/* Enhanced Input Field Component */
.vertex-input-group {
  position: relative;
  margin-bottom: 1.5rem;
}

/* Input Label */
.vertex-input-label {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  margin-bottom: 0.5rem;
  transition: color 0.2s ease;
}

/* Base Input Styles */
.vertex-input {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 0.5rem;
  background: #ffffff;
  color: #1f2937;
  font-size: 1rem;
  line-height: 1.5;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  
  &::placeholder {
    color: #9ca3af;
  }
  
  &:focus {
    outline: none;
    border-color: #4f46e5;
    box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
    transform: translateY(-1px);
  }
  
  &:hover:not(:focus) {
    border-color: #d1d5db;
  }
}

/* Input States */
.vertex-input--success {
  border-color: #10b981;
  
  &:focus {
    border-color: #059669;
    box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
  }
}

.vertex-input--error {
  border-color: #ef4444;
  
  &:focus {
    border-color: #dc2626;
    box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
  }
}

.vertex-input--warning {
  border-color: #f59e0b;
  
  &:focus {
    border-color: #d97706;
    box-shadow: 0 0 0 3px rgba(245, 158, 11, 0.1);
  }
}

/* Floating Label */
.vertex-input-group--floating {
  position: relative;
}

.vertex-input--floating {
  padding-top: 1.5rem;
  padding-bottom: 0.5rem;
}

.vertex-input-label--floating {
  position: absolute;
  left: 1rem;
  top: 0.75rem;
  font-size: 1rem;
  color: #9ca3af;
  pointer-events: none;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  transform-origin: left top;
}

.vertex-input--floating:focus + .vertex-input-label--floating,
.vertex-input--floating:not(:placeholder-shown) + .vertex-input-label--floating {
  transform: translateY(-0.5rem) scale(0.75);
  color: #4f46e5;
}

/* Input with Icons */
.vertex-input-group--with-icon {
  position: relative;
}

.vertex-input-icon {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 1.25rem;
  height: 1.25rem;
  color: #9ca3af;
  pointer-events: none;
  z-index: 1;
}

.vertex-input-icon--left {
  left: 0.75rem;
}

.vertex-input-icon--right {
  right: 0.75rem;
}

.vertex-input--with-icon-left {
  padding-left: 2.75rem;
}

.vertex-input--with-icon-right {
  padding-right: 2.75rem;
}

/* Search Input */
.vertex-input--search {
  border-radius: 9999px;
  padding-left: 2.75rem;
  padding-right: 2.75rem;
}

.vertex-input-clear {
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #9ca3af;
  cursor: pointer;
  font-size: 1.25rem;
  padding: 0.25rem;
  border-radius: 50%;
  transition: all 0.2s ease;
  
  &:hover {
    background: #f3f4f6;
    color: #6b7280;
  }
}

/* Password Input */
.vertex-input-toggle {
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #9ca3af;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 0.25rem;
  transition: all 0.2s ease;
  
  &:hover {
    background: #f3f4f6;
    color: #6b7280;
  }
}

.vertex-input-toggle-icon {
  width: 1.25rem;
  height: 1.25rem;
}

/* Textarea */
.vertex-input--textarea {
  resize: vertical;
  min-height: 6rem;
  line-height: 1.6;
}

/* Helper Text */
.vertex-input-helper {
  display: block;
  margin-top: 0.5rem;
  font-size: 0.875rem;
  color: #6b7280;
  line-height: 1.4;
}

.vertex-input-helper--success {
  color: #059669;
}

.vertex-input-helper--error {
  color: #dc2626;
}

.vertex-input-helper--warning {
  color: #d97706;
}

/* Input Sizes */
.vertex-input--sm {
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
}

.vertex-input--lg {
  padding: 1rem 1.25rem;
  font-size: 1.125rem;
}

/* Disabled State */
.vertex-input:disabled {
  background: #f9fafb;
  color: #9ca3af;
  cursor: not-allowed;
  border-color: #e5e7eb;
}`;

const inputJs = `// Enhanced Input with React Hooks and Validation
import React, { useState, useRef, useEffect } from 'react';

const EnhancedInput = ({ 
  type = 'text',
  label,
  placeholder,
  helperText,
  error,
  success,
  warning,
  icon,
  floating = false,
  clearable = false,
  showPasswordToggle = false,
  autoResize = false,
  onChange,
  onFocus,
  onBlur,
  ...props 
}) => {
  const [value, setValue] = useState(props.value || '');
  const [focused, setFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const inputRef = useRef(null);
  
  // Auto-resize for textarea
  useEffect(() => {
    if (autoResize && inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = inputRef.current.scrollHeight + 'px';
    }
  }, [value, autoResize]);
  
  const handleChange = (e) => {
    setValue(e.target.value);
    onChange?.(e);
  };
  
  const handleFocus = (e) => {
    setFocused(true);
    onFocus?.(e);
  };
  
  const handleBlur = (e) => {
    setFocused(false);
    onBlur?.(e);
  };
  
  const clearInput = () => {
    setValue('');
    inputRef.current?.focus();
  };
  
  const togglePassword = () => {
    setShowPassword(!showPassword);
  };
  
  const inputClasses = [
    'vertex-input',
    floating && 'vertex-input--floating',
    icon && 'vertex-input--with-icon-left',
    error && 'vertex-input--error',
    success && 'vertex-input--success',
    warning && 'vertex-input--warning',
    type === 'search' && 'vertex-input--search'
  ].filter(Boolean).join(' ');
  
  const groupClasses = [
    'vertex-input-group',
    floating && 'vertex-input-group--floating',
    icon && 'vertex-input-group--with-icon'
  ].filter(Boolean).join(' ');
  
  return (
    <div className={groupClasses}>
      {label && !floating && (
        <label className="vertex-input-label">{label}</label>
      )}
      
      <div style={{ position: 'relative' }}>
        {icon && (
          <div className="vertex-input-icon vertex-input-icon--left">
            {icon}
          </div>
        )}
        
        <input
          ref={inputRef}
          type={showPasswordToggle && showPassword ? 'text' : type}
          className={inputClasses}
          placeholder={floating ? ' ' : placeholder}
          value={value}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...props}
        />
        
        {floating && label && (
          <label className="vertex-input-label--floating">{label}</label>
        )}
        
        {clearable && value && (
          <button 
            type="button" 
            className="vertex-input-clear"
            onClick={clearInput}
          >
            ×
          </button>
        )}
        
        {showPasswordToggle && (
          <button 
            type="button" 
            className="vertex-input-toggle"
            onClick={togglePassword}
          >
            {/* Eye icon */}
          </button>
        )}
      </div>
      
      {(helperText || error || success || warning) && (
        <span className={\`vertex-input-helper \${
          error ? 'vertex-input-helper--error' :
          success ? 'vertex-input-helper--success' :
          warning ? 'vertex-input-helper--warning' : ''
        }\`}>
          {error || success || warning || helperText}
        </span>
      )}
    </div>
  );
};`;

const codeTabs = [
  { label: 'HTML', code: inputHtml, lang: 'html' },
  { label: 'CSS', code: inputCss, lang: 'css' },
  { label: 'JS/React', code: inputJs, lang: 'js' },
];

const InputField = () => {
  const [value, setValue] = useState('');
  const [touched, setTouched] = useState(false);
  const [activeTab, setActiveTab] = useState('HTML');
  const [copied, setCopied] = useState(false);

  const error = touched && value.length < 3 ? 'At least 3 characters' : '';

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
    <div className={styles['input-demo-block']}>
      <h2>Enhanced Input Field Component</h2>
      
      <div className={styles['input-preview']}>
        {/* Basic Input */}
        <div>
          <h3 style={{ fontSize: '1rem', marginBottom: '0.75rem', color: '#374151' }}>Basic Input</h3>
          <div className={styles['vertex-input-group']}>
            <label htmlFor="vertex-input-basic" className={styles['vertex-input-label']}>
              Basic Input
            </label>
            <input
              id="vertex-input-basic"
              type="text"
              placeholder="Enter text..."
              className={styles['vertex-input']}
            />
            <span className={styles['vertex-input-helper']}>
              Helper text goes here.
            </span>
          </div>
        </div>

        {/* Floating Label Input */}
        <div>
          <h3 style={{ fontSize: '1rem', marginBottom: '0.75rem', color: '#374151' }}>Floating Label</h3>
          <div className={`${styles['vertex-input-group']} ${styles['vertex-input-group--floating']}`}>
            <input
              id="vertex-input-floating"
              type="text"
              className={`${styles['vertex-input']} ${styles['vertex-input--floating']}`}
              placeholder=" "
            />
            <label htmlFor="vertex-input-floating" className={styles['vertex-input-label--floating']}>
              Floating Label
            </label>
          </div>
        </div>

        {/* Input with Icon */}
        <div>
          <h3 style={{ fontSize: '1rem', marginBottom: '0.75rem', color: '#374151' }}>With Icon</h3>
          <div className={`${styles['vertex-input-group']} ${styles['vertex-input-group--with-icon']}`}>
            <div className={`${styles['vertex-input-icon']} ${styles['vertex-input-icon--left']}`}>
              <svg viewBox="0 0 20 20" fill="currentColor">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
              </svg>
            </div>
            <input
              type="email"
              placeholder="Enter email..."
              className={`${styles['vertex-input']} ${styles['vertex-input--with-icon-left']}`}
            />
          </div>
        </div>

        {/* Search Input */}
        <div>
          <h3 style={{ fontSize: '1rem', marginBottom: '0.75rem', color: '#374151' }}>Search Input</h3>
          <div className={`${styles['vertex-input-group']} ${styles['vertex-input-group--with-icon']}`}>
            <div className={`${styles['vertex-input-icon']} ${styles['vertex-input-icon--left']}`}>
              <svg viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"/>
              </svg>
            </div>
            <input
              type="search"
              placeholder="Search..."
              className={`${styles['vertex-input']} ${styles['vertex-input--search']} ${styles['vertex-input--with-icon-left']}`}
            />
            <button className={styles['vertex-input-clear']} type="button">×</button>
          </div>
        </div>

        {/* Password Input */}
        <div>
          <h3 style={{ fontSize: '1rem', marginBottom: '0.75rem', color: '#374151' }}>Password Input</h3>
          <div className={`${styles['vertex-input-group']} ${styles['vertex-input-group--password']}`}>
            <input
              type="password"
              placeholder="Enter password..."
              className={`${styles['vertex-input']} ${styles['vertex-input--password']}`}
            />
            <button className={styles['vertex-input-toggle']} type="button">
              <svg className={styles['vertex-input-toggle-icon']} viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Input States */}
        <div>
          <h3 style={{ fontSize: '1rem', marginBottom: '0.75rem', color: '#374151' }}>Input States</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div className={styles['vertex-input-group']}>
              <label className={styles['vertex-input-label']}>Success State</label>
              <input
                type="text"
                placeholder="Valid input..."
                className={`${styles['vertex-input']} ${styles['vertex-input--success']}`}
                defaultValue="Valid input"
              />
              <span className={`${styles['vertex-input-helper']} ${styles['vertex-input-helper--success']}`}>
                Input is valid!
              </span>
            </div>
            
            <div className={styles['vertex-input-group']}>
              <label className={styles['vertex-input-label']}>Error State</label>
              <input
                type="text"
                placeholder="Invalid input..."
                className={`${styles['vertex-input']} ${styles['vertex-input--error']}`}
                defaultValue="Invalid"
              />
              <span className={`${styles['vertex-input-helper']} ${styles['vertex-input-helper--error']}`}>
                This field is required.
              </span>
            </div>
            
            <div className={styles['vertex-input-group']}>
              <label className={styles['vertex-input-label']}>Warning State</label>
              <input
                type="text"
                placeholder="Warning input..."
                className={`${styles['vertex-input']} ${styles['vertex-input--warning']}`}
                defaultValue="Weak password"
              />
              <span className={`${styles['vertex-input-helper']} ${styles['vertex-input-helper--warning']}`}>
                Consider using a stronger password.
              </span>
            </div>
          </div>
        </div>

        {/* Textarea */}
        <div>
          <h3 style={{ fontSize: '1rem', marginBottom: '0.75rem', color: '#374151' }}>Textarea</h3>
          <div className={styles['vertex-input-group']}>
            <label htmlFor="vertex-textarea" className={styles['vertex-input-label']}>
              Message
            </label>
            <textarea
              id="vertex-textarea"
              placeholder="Enter your message..."
              className={`${styles['vertex-input']} ${styles['vertex-input--textarea']}`}
              rows="4"
            ></textarea>
            <span className={styles['vertex-input-helper']}>
              Maximum 500 characters
            </span>
          </div>
        </div>

        {/* Size Variants */}
        <div>
          <h3 style={{ fontSize: '1rem', marginBottom: '0.75rem', color: '#374151' }}>Size Variants</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div className={styles['vertex-input-group']}>
              <label className={styles['vertex-input-label']}>Small</label>
              <input
                type="text"
                placeholder="Small input..."
                className={`${styles['vertex-input']} ${styles['vertex-input--sm']}`}
              />
            </div>
            
            <div className={styles['vertex-input-group']}>
              <label className={styles['vertex-input-label']}>Medium (Default)</label>
              <input
                type="text"
                placeholder="Medium input..."
                className={styles['vertex-input']}
              />
            </div>
            
            <div className={styles['vertex-input-group']}>
              <label className={styles['vertex-input-label']}>Large</label>
              <input
                type="text"
                placeholder="Large input..."
                className={`${styles['vertex-input']} ${styles['vertex-input--lg']}`}
              />
            </div>
          </div>
        </div>

        {/* Interactive Demo */}
        <div>
          <h3 style={{ fontSize: '1rem', marginBottom: '0.75rem', color: '#374151' }}>Interactive Demo</h3>
          <div className={styles['vertex-input-group']}>
            <label htmlFor="vertex-input-demo" className={styles['vertex-input-label']}>
              Interactive Input
            </label>
            <input
              id="vertex-input-demo"
              type="text"
              placeholder="Type to see validation..."
              className={error ? `${styles['vertex-input']} ${styles['vertex-input--error']}` : styles['vertex-input']}
              value={value}
              onChange={e => setValue(e.target.value)}
              onBlur={() => setTouched(true)}
              aria-invalid={!!error}
              aria-describedby="vertex-input-helper"
            />
            <span
              id="vertex-input-helper"
              className={error ? `${styles['vertex-input-helper']} ${styles['vertex-input-helper--error']}` : styles['vertex-input-helper']}
            >
              {error || 'Type at least 3 characters to see success state.'}
            </span>
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

export default InputField; 