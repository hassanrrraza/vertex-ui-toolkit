import React, { useState } from 'react';
import './SliderNew.module.scss';

const sliderHtml = `<div class="vertex-slider">
  <label class="vertex-slider-label">Volume: 50%</label>
  <input 
    type="range" 
    class="vertex-slider-input" 
    min="0" 
    max="100" 
    value="50"
  >
  <div class="vertex-slider-track">
    <div class="vertex-slider-progress" style="width: 50%"></div>
    <div class="vertex-slider-thumb" style="left: 50%"></div>
  </div>
</div>

<div class="vertex-slider vertex-slider--vertical">
  <label class="vertex-slider-label">Height</label>
  <input 
    type="range" 
    class="vertex-slider-input" 
    min="0" 
    max="100" 
    value="75"
    orient="vertical"
  >
</div>`;

const sliderCss = `.vertex-slider {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
  max-width: 300px;
}

.vertex-slider-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #0D0630;
  margin-bottom: 0.25rem;
}

.vertex-slider-input {
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 6px;
  border-radius: 3px;
  background: #e0e6ed;
  outline: none;
  cursor: pointer;
  transition: background 0.2s ease;
}

.vertex-slider-input:hover {
  background: #d1d9e0;
}

.vertex-slider-input:focus {
  outline: 2px solid #8BBEB2;
  outline-offset: 2px;
}

/* Webkit browsers (Chrome, Safari, Edge) */
.vertex-slider-input::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #384E77;
  cursor: pointer;
  border: 2px solid #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;
}

.vertex-slider-input::-webkit-slider-thumb:hover {
  background: #2d3e5f;
  transform: scale(1.1);
}

.vertex-slider-input::-webkit-slider-thumb:active {
  transform: scale(1.2);
}

/* Firefox */
.vertex-slider-input::-moz-range-thumb {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #384E77;
  cursor: pointer;
  border: 2px solid #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;
}

.vertex-slider-input::-moz-range-thumb:hover {
  background: #2d3e5f;
  transform: scale(1.1);
}

.vertex-slider-input::-moz-range-track {
  width: 100%;
  height: 6px;
  cursor: pointer;
  background: #e0e6ed;
  border-radius: 3px;
  border: none;
}

/* Progress indication */
.vertex-slider-input::-webkit-slider-runnable-track {
  background: linear-gradient(to right, #8BBEB2 0%, #8BBEB2 var(--progress, 50%), #e0e6ed var(--progress, 50%), #e0e6ed 100%);
}

/* Variants */
.vertex-slider--sm .vertex-slider-input {
  height: 4px;
}

.vertex-slider--sm .vertex-slider-input::-webkit-slider-thumb {
  width: 16px;
  height: 16px;
}

.vertex-slider--sm .vertex-slider-input::-moz-range-thumb {
  width: 16px;
  height: 16px;
}

.vertex-slider--lg .vertex-slider-input {
  height: 8px;
}

.vertex-slider--lg .vertex-slider-input::-webkit-slider-thumb {
  width: 24px;
  height: 24px;
}

.vertex-slider--lg .vertex-slider-input::-moz-range-thumb {
  width: 24px;
  height: 24px;
}

.vertex-slider--vertical {
  flex-direction: row;
  align-items: center;
  height: 200px;
  max-width: none;
  width: auto;
}

.vertex-slider--vertical .vertex-slider-input {
  writing-mode: bt-lr;
  -webkit-appearance: slider-vertical;
  width: 6px;
  height: 200px;
}

.vertex-slider--disabled .vertex-slider-input {
  cursor: not-allowed;
  opacity: 0.6;
}

.vertex-slider--disabled .vertex-slider-input::-webkit-slider-thumb {
  cursor: not-allowed;
  background: #999;
}

.vertex-slider--disabled .vertex-slider-input::-moz-range-thumb {
  cursor: not-allowed;
  background: #999;
}`;

const sliderReact = `import React, { useState } from 'react';

const Slider = ({ 
  min = 0,
  max = 100,
  value = 50,
  step = 1,
  label,
  showValue = true,
  size = 'medium',
  orientation = 'horizontal',
  disabled = false,
  onChange,
  className = '',
  ...props 
}) => {
  const [currentValue, setCurrentValue] = useState(value);

  const handleChange = (e) => {
    const newValue = parseFloat(e.target.value);
    setCurrentValue(newValue);
    if (onChange) onChange(newValue);
  };

  const percentage = ((currentValue - min) / (max - min)) * 100;

  const sliderClasses = [
    'vertex-slider',
    size !== 'medium' ? \`vertex-slider--\${size === 'small' ? 'sm' : 'lg'}\` : '',
    orientation === 'vertical' ? 'vertex-slider--vertical' : '',
    disabled ? 'vertex-slider--disabled' : '',
    className
  ].filter(Boolean).join(' ');

  const displayValue = showValue ? \` \${currentValue}\${props.unit || ''}\` : '';

  return (
    <div className={sliderClasses}>
      {label && (
        <label className="vertex-slider-label">
          {label}{displayValue}
        </label>
      )}
      <input
        type="range"
        className="vertex-slider-input"
        min={min}
        max={max}
        step={step}
        value={currentValue}
        onChange={handleChange}
        disabled={disabled}
        style={{
          '--progress': \`\${percentage}%\`
        }}
        {...props}
      />
    </div>
  );
};

export default Slider;`;

const codeTabs = [
  { label: 'HTML', code: sliderHtml, lang: 'html' },
  { label: 'CSS', code: sliderCss, lang: 'css' },
  { label: 'React', code: sliderReact, lang: 'jsx' }
];

const SliderNew = () => {
  const [activeTab, setActiveTab] = useState('HTML');
  const [copied, setCopied] = useState(false);
  const [volume, setVolume] = useState(50);
  const [brightness, setBrightness] = useState(75);
  const [temperature, setTemperature] = useState(22);
  const [opacity, setOpacity] = useState(0.8);

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

  const SliderComponent = ({ 
    min = 0,
    max = 100,
    value,
    step = 1,
    label,
    showValue = true,
    size = 'medium',
    orientation = 'horizontal',
    disabled = false,
    onChange,
    className = '',
    unit = '',
    ...props 
  }) => {
    const percentage = ((value - min) / (max - min)) * 100;

    const sliderClasses = [
      'vertex-slider',
      size !== 'medium' ? `vertex-slider--${size === 'small' ? 'sm' : 'lg'}` : '',
      orientation === 'vertical' ? 'vertex-slider--vertical' : '',
      disabled ? 'vertex-slider--disabled' : '',
      className
    ].filter(Boolean).join(' ');

    const displayValue = showValue ? ` ${value}${unit}` : '';

    return (
      <div className={sliderClasses}>
        {label && (
          <label className="vertex-slider-label">
            {label}{displayValue}
          </label>
        )}
        <input
          type="range"
          className="vertex-slider-input"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          disabled={disabled}
          style={{
            '--progress': `${percentage}%`
          }}
          {...props}
        />
      </div>
    );
  };

  return (
    <div className="vertex-component-block" aria-label="Slider component demo">
      <h2>Slider / Range</h2>
      <p className="vertex-component-description">
        Custom-styled range input slider for selecting numeric values within a specified range.
      </p>
      <div className="vertex-preview" style={{ marginBottom: '1rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <h4 style={{ marginBottom: '1rem', color: '#384E77' }}>Basic Sliders</h4>
            <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
              <SliderComponent
                label="Volume"
                value={volume}
                onChange={setVolume}
                unit="%"
              />
              <SliderComponent
                label="Brightness"
                value={brightness}
                onChange={setBrightness}
                unit="%"
              />
            </div>
          </div>

          <div>
            <h4 style={{ marginBottom: '1rem', color: '#384E77' }}>Different Ranges & Steps</h4>
            <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
              <SliderComponent
                label="Temperature"
                min={-10}
                max={40}
                value={temperature}
                onChange={setTemperature}
                unit="°C"
              />
              <SliderComponent
                label="Opacity"
                min={0}
                max={1}
                step={0.1}
                value={opacity}
                onChange={setOpacity}
              />
            </div>
          </div>

          <div>
            <h4 style={{ marginBottom: '1rem', color: '#384E77' }}>Sizes</h4>
            <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
              <SliderComponent
                label="Small"
                size="small"
                value={30}
                onChange={() => {}}
              />
              <SliderComponent
                label="Medium"
                size="medium"
                value={50}
                onChange={() => {}}
              />
              <SliderComponent
                label="Large"
                size="large"
                value={70}
                onChange={() => {}}
              />
            </div>
          </div>

          <div>
            <h4 style={{ marginBottom: '1rem', color: '#384E77' }}>States</h4>
            <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
              <SliderComponent
                label="Normal"
                value={60}
                onChange={() => {}}
              />
              <SliderComponent
                label="Disabled"
                value={40}
                disabled={true}
                onChange={() => {}}
              />
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

export default SliderNew;
