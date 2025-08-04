import React, { useState } from 'react';
import styles from './CheckboxRadioGroup.module.scss';

// Checkbox Group Code
const checkboxHtml = `<fieldset class="vertex-checkbox-group">
  <legend>Choose your fruits</legend>
  <label><input type="checkbox" checked /> Apple</label>
  <label><input type="checkbox" /> Banana</label>
  <label><input type="checkbox" disabled /> Orange (disabled)</label>
</fieldset>`;

const checkboxCss = `.vertex-checkbox-group {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  border: none;
  margin: 0;
  padding: 0;
}
.vertex-checkbox-group label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
  color: #e0e7ef;
  cursor: pointer;
  user-select: none;
}
.vertex-checkbox-group input[type="checkbox"] {
  accent-color: #3b82f6;
  width: 1.1em;
  height: 1.1em;
  border-radius: 0.25em;
  margin-right: 0.5em;
}
.vertex-checkbox-group input[type="checkbox"]:disabled + span {
  color: #6b7280;
  cursor: not-allowed;
}
`;

const checkboxJs = `// React controlled checkbox group
const [checked, setChecked] = useState(['apple']);
const handleChange = fruit => {
  setChecked(prev =>
    prev.includes(fruit)
      ? prev.filter(f => f !== fruit)
      : [...prev, fruit]
  );
};

['apple', 'banana', 'orange'].map(fruit => (
  <label key={fruit}>
    <input
      type="checkbox"
      checked={checked.includes(fruit)}
      onChange={() => handleChange(fruit)}
      disabled={fruit === 'orange'}
    />
    {fruit.charAt(0).toUpperCase() + fruit.slice(1)}
  </label>
));`;

// Radio Group Code
const radioHtml = `<fieldset class="vertex-radio-group">
  <legend>Pick a color</legend>
  <label><input type="radio" name="color" checked /> Red</label>
  <label><input type="radio" name="color" /> Blue</label>
  <label><input type="radio" name="color" disabled /> Green (disabled)</label>
</fieldset>`;

const radioCss = `.vertex-radio-group {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  border: none;
  margin: 0;
  padding: 0;
}
.vertex-radio-group label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
  color: #e0e7ef;
  cursor: pointer;
  user-select: none;
}
.vertex-radio-group input[type="radio"] {
  accent-color: #3b82f6;
  width: 1.1em;
  height: 1.1em;
  border-radius: 50%;
  margin-right: 0.5em;
}
.vertex-radio-group input[type="radio"]:disabled + span {
  color: #6b7280;
  cursor: not-allowed;
}
`;

const radioJs = `// React controlled radio group with keyboard navigation
const [selected, setSelected] = useState('red');
const options = ['red', 'blue', 'green'];

const handleKeyDown = (e, idx) => {
  if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
    setSelected(options[(idx + 1) % options.length]);
  } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
    setSelected(options[(idx - 1 + options.length) % options.length]);
  }
};

options.map((color, idx) => (
  <label key={color}>
    <input
      type="radio"
      name="color"
      checked={selected === color}
      onChange={() => setSelected(color)}
      onKeyDown={e => handleKeyDown(e, idx)}
      disabled={color === 'green'}
    />
    {color.charAt(0).toUpperCase() + color.slice(1)}
  </label>
));`;

const codeTabs = [
  { label: 'Checkbox HTML', code: checkboxHtml, lang: 'html' },
  { label: 'Checkbox CSS', code: checkboxCss, lang: 'css' },
  { label: 'Checkbox JS/React', code: checkboxJs, lang: 'js' },
  { label: 'Radio HTML', code: radioHtml, lang: 'html' },
  { label: 'Radio CSS', code: radioCss, lang: 'css' },
  { label: 'Radio JS/React', code: radioJs, lang: 'js' },
];

const fruits = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'orange', label: 'Orange', disabled: true },
];
const colors = [
  { value: 'red', label: 'Red' },
  { value: 'blue', label: 'Blue' },
  { value: 'green', label: 'Green', disabled: true },
];

const CheckboxRadioGroup = () => {
  // Checkbox state
  const [checked, setChecked] = useState(['apple']);
  // Radio state
  const [selected, setSelected] = useState('red');
  // Tabs
  const [activeTab, setActiveTab] = useState('Checkbox HTML');
  const [copied, setCopied] = useState(false);

  // Keyboard navigation for radio
  const handleRadioKeyDown = (e, idx) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      const next = (idx + 1) % colors.length;
      if (!colors[next].disabled) setSelected(colors[next].value);
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      const prev = (idx - 1 + colors.length) % colors.length;
      if (!colors[prev].disabled) setSelected(colors[prev].value);
    }
  };

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
    <div className={styles['group-demo-block']}>
      <div className={styles['group-preview']}>
        <fieldset className={styles['vertex-checkbox-group']}>
          <legend>Choose your fruits</legend>
          {fruits.map(fruit => (
            <label key={fruit.value}>
              <input
                type="checkbox"
                checked={checked.includes(fruit.value)}
                onChange={() =>
                  setChecked(prev =>
                    prev.includes(fruit.value)
                      ? prev.filter(f => f !== fruit.value)
                      : [...prev, fruit.value]
                  )
                }
                disabled={fruit.disabled}
                aria-checked={checked.includes(fruit.value)}
                aria-disabled={fruit.disabled}
              />
              <span>{fruit.label}{fruit.disabled ? ' (disabled)' : ''}</span>
            </label>
          ))}
        </fieldset>
        <fieldset className={styles['vertex-radio-group']} style={{ marginTop: '2rem' }}>
          <legend>Pick a color</legend>
          {colors.map((color, idx) => (
            <label key={color.value}>
              <input
                type="radio"
                name="color"
                checked={selected === color.value}
                onChange={() => setSelected(color.value)}
                onKeyDown={e => handleRadioKeyDown(e, idx)}
                disabled={color.disabled}
                aria-checked={selected === color.value}
                aria-disabled={color.disabled}
              />
              <span>{color.label}{color.disabled ? ' (disabled)' : ''}</span>
            </label>
          ))}
        </fieldset>
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

export default CheckboxRadioGroup; 