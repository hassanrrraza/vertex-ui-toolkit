import React, { useState } from 'react';
import './DatePicker.module.scss';

const datePickerHtml = `<div class="vertex-date-picker">
  <label class="vertex-date-label">Select Date</label>
  <input type="date" class="vertex-date-input" value="2024-01-15">
</div>

<div class="vertex-date-range">
  <div class="vertex-date-picker">
    <label class="vertex-date-label">From Date</label>
    <input type="date" class="vertex-date-input" value="2024-01-01">
  </div>
  <div class="vertex-date-picker">
    <label class="vertex-date-label">To Date</label>
    <input type="date" class="vertex-date-input" value="2024-01-31">
  </div>
</div>`;

const datePickerCss = `.vertex-date-picker {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
  max-width: 300px;
}

.vertex-date-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #0D0630;
  margin-bottom: 0.25rem;
}

.vertex-date-input {
  padding: 0.75rem;
  border: 1px solid #e0e6ed;
  border-radius: 0.375rem;
  font-size: 1rem;
  background: #fff;
  color: #0D0630;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  width: 100%;
}

.vertex-date-input:focus {
  outline: none;
  border-color: #8BBEB2;
  box-shadow: 0 0 0 3px rgba(139, 190, 178, 0.1);
}

.vertex-date-input:hover {
  border-color: #8BBEB2;
}

.vertex-date-input:disabled {
  background: #f8f9fa;
  color: #666;
  cursor: not-allowed;
}

.vertex-date-range {
  display: flex;
  gap: 1rem;
  align-items: end;
  flex-wrap: wrap;
}

.vertex-date-picker--sm .vertex-date-input {
  padding: 0.5rem;
  font-size: 0.875rem;
}

.vertex-date-picker--lg .vertex-date-input {
  padding: 1rem;
  font-size: 1.125rem;
}

.vertex-date-picker--error .vertex-date-input {
  border-color: #dc3545;
}

.vertex-date-picker--error .vertex-date-input:focus {
  border-color: #dc3545;
  box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.1);
}

.vertex-date-error {
  font-size: 0.75rem;
  color: #dc3545;
  margin-top: 0.25rem;
}`;

const datePickerReact = `import React, { useState } from 'react';

const DatePicker = ({ 
  label,
  value = '',
  onChange,
  min,
  max,
  disabled = false,
  error,
  size = 'medium',
  className = '',
  ...props 
}) => {
  const [currentValue, setCurrentValue] = useState(value);

  const handleChange = (e) => {
    const newValue = e.target.value;
    setCurrentValue(newValue);
    if (onChange) onChange(newValue);
  };

  const pickerClasses = [
    'vertex-date-picker',
    size !== 'medium' ? \`vertex-date-picker--\${size === 'small' ? 'sm' : 'lg'}\` : '',
    error ? 'vertex-date-picker--error' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={pickerClasses}>
      {label && (
        <label className="vertex-date-label" htmlFor={props.id}>
          {label}
        </label>
      )}
      <input
        type="date"
        className="vertex-date-input"
        value={currentValue}
        onChange={handleChange}
        min={min}
        max={max}
        disabled={disabled}
        {...props}
      />
      {error && <div className="vertex-date-error">{error}</div>}
    </div>
  );
};

export default DatePicker;`;

const codeTabs = [
  { label: 'HTML', code: datePickerHtml, lang: 'html' },
  { label: 'CSS', code: datePickerCss, lang: 'css' },
  { label: 'React', code: datePickerReact, lang: 'jsx' }
];

const DatePicker = () => {
  const [activeTab, setActiveTab] = useState('HTML');
  const [copied, setCopied] = useState(false);
  const [singleDate, setSingleDate] = useState('2024-01-15');
  const [fromDate, setFromDate] = useState('2024-01-01');
  const [toDate, setToDate] = useState('2024-01-31');

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

  const DatePickerComponent = ({ label, value, onChange, ...props }) => {
    return (
      <div className="vertex-date-picker">
        {label && <label className="vertex-date-label">{label}</label>}
        <input
          type="date"
          className="vertex-date-input"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          {...props}
        />
      </div>
    );
  };

  return (
    <div className="vertex-component-block" aria-label="Date Picker component demo">
      <h2>Date Picker</h2>
      <p className="vertex-component-description">
        Native date input component with consistent styling and validation support.
      </p>
      <div className="vertex-preview" style={{ marginBottom: '1rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <h4 style={{ marginBottom: '0.5rem', color: '#384E77' }}>Single Date</h4>
            <DatePickerComponent
              label="Select Date"
              value={singleDate}
              onChange={setSingleDate}
            />
          </div>

          <div>
            <h4 style={{ marginBottom: '0.5rem', color: '#384E77' }}>Date Range</h4>
            <div className="vertex-date-range">
              <DatePickerComponent
                label="From Date"
                value={fromDate}
                onChange={setFromDate}
                max={toDate}
              />
              <DatePickerComponent
                label="To Date"
                value={toDate}
                onChange={setToDate}
                min={fromDate}
              />
            </div>
          </div>

          <div>
            <h4 style={{ marginBottom: '0.5rem', color: '#384E77' }}>Different States</h4>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <div className="vertex-date-picker vertex-date-picker--sm">
                <label className="vertex-date-label">Small</label>
                <input type="date" className="vertex-date-input" value="2024-01-15" />
              </div>
              <div className="vertex-date-picker">
                <label className="vertex-date-label">Medium</label>
                <input type="date" className="vertex-date-input" value="2024-01-15" />
              </div>
              <div className="vertex-date-picker vertex-date-picker--lg">
                <label className="vertex-date-label">Large</label>
                <input type="date" className="vertex-date-input" value="2024-01-15" />
              </div>
            </div>
          </div>

          <div>
            <div className="vertex-date-picker">
              <label className="vertex-date-label">Disabled</label>
              <input type="date" className="vertex-date-input" value="2024-01-15" disabled />
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

export default DatePicker;
