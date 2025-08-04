import React, { useState } from 'react';
import './Stepper.module.scss';

const stepperHtml = `<div class="vertex-stepper">
  <div class="vertex-step vertex-step--completed">
    <div class="vertex-step-indicator">
      <span class="vertex-step-number">1</span>
    </div>
    <div class="vertex-step-content">
      <h4 class="vertex-step-title">Account Setup</h4>
      <p class="vertex-step-description">Create your account</p>
    </div>
  </div>
  <div class="vertex-step vertex-step--active">
    <div class="vertex-step-indicator">
      <span class="vertex-step-number">2</span>
    </div>
    <div class="vertex-step-content">
      <h4 class="vertex-step-title">Profile Information</h4>
      <p class="vertex-step-description">Add your details</p>
    </div>
  </div>
  <div class="vertex-step">
    <div class="vertex-step-indicator">
      <span class="vertex-step-number">3</span>
    </div>
    <div class="vertex-step-content">
      <h4 class="vertex-step-title">Verification</h4>
      <p class="vertex-step-description">Verify your email</p>
    </div>
  </div>
</div>`;

const stepperCss = `.vertex-stepper {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.vertex-step {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  position: relative;
}

.vertex-step:not(:last-child)::after {
  content: '';
  position: absolute;
  left: 1.25rem;
  top: 2.5rem;
  width: 2px;
  height: calc(100% + 1rem);
  background: #e0e6ed;
}

.vertex-step--completed::after {
  background: #8BBEB2;
}

.vertex-step--active::after {
  background: linear-gradient(to bottom, #8BBEB2 50%, #e0e6ed 50%);
}

.vertex-step-indicator {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background: #e0e6ed;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  z-index: 1;
  position: relative;
}

.vertex-step--completed .vertex-step-indicator {
  background: #8BBEB2;
  color: #fff;
}

.vertex-step--active .vertex-step-indicator {
  background: #384E77;
  color: #fff;
}

.vertex-step-number {
  font-weight: 600;
  font-size: 0.875rem;
}

.vertex-step-content {
  flex: 1;
  padding-top: 0.25rem;
}

.vertex-step-title {
  margin: 0 0 0.25rem 0;
  font-size: 1rem;
  font-weight: 600;
  color: #0D0630;
}

.vertex-step--completed .vertex-step-title {
  color: #8BBEB2;
}

.vertex-step--active .vertex-step-title {
  color: #384E77;
}

.vertex-step-description {
  margin: 0;
  font-size: 0.875rem;
  color: #666;
}

@media (min-width: 768px) {
  .vertex-stepper {
    flex-direction: row;
    align-items: flex-start;
  }
  
  .vertex-step {
    flex: 1;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  
  .vertex-step:not(:last-child)::after {
    left: calc(50% + 1.25rem);
    top: 1.25rem;
    width: calc(100% - 2.5rem);
    height: 2px;
  }
  
  .vertex-step--active::after {
    background: linear-gradient(to right, #8BBEB2 50%, #e0e6ed 50%);
  }
}`;

const stepperReact = `import React, { useState } from 'react';

const Stepper = ({ steps, currentStep = 0 }) => {
  return (
    <div className="vertex-stepper">
      {steps.map((step, index) => (
        <div 
          key={index}
          className={\`vertex-step \${
            index < currentStep ? 'vertex-step--completed' : 
            index === currentStep ? 'vertex-step--active' : ''
          }\`}
        >
          <div className="vertex-step-indicator">
            <span className="vertex-step-number">{index + 1}</span>
          </div>
          <div className="vertex-step-content">
            <h4 className="vertex-step-title">{step.title}</h4>
            <p className="vertex-step-description">{step.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Stepper;`;

const codeTabs = [
  { label: 'HTML', code: stepperHtml, lang: 'html' },
  { label: 'CSS', code: stepperCss, lang: 'css' },
  { label: 'React', code: stepperReact, lang: 'jsx' }
];

const Stepper = () => {
  const [activeTab, setActiveTab] = useState('HTML');
  const [copied, setCopied] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const steps = [
    { title: 'Account Setup', description: 'Create your account' },
    { title: 'Profile Information', description: 'Add your details' },
    { title: 'Verification', description: 'Verify your email' },
    { title: 'Complete', description: 'All done!' }
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

  return (
    <div className="vertex-component-block" aria-label="Stepper component demo">
      <h2>Stepper</h2>
      <p className="vertex-component-description">
        Multi-step progress indicator for guiding users through processes and workflows.
      </p>
      <div className="vertex-preview" style={{ marginBottom: '1rem' }}>
        <div className="vertex-stepper">
          {steps.map((step, index) => (
            <div 
              key={index}
              className={`vertex-step ${
                index < currentStep ? 'vertex-step--completed' : 
                index === currentStep ? 'vertex-step--active' : ''
              }`}
            >
              <div className="vertex-step-indicator">
                <span className="vertex-step-number">{index + 1}</span>
              </div>
              <div className="vertex-step-content">
                <h4 className="vertex-step-title">{step.title}</h4>
                <p className="vertex-step-description">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
          <button 
            className="vertex-btn vertex-btn--outline vertex-btn--sm"
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
            aria-label="Previous step"
          >
            Previous
          </button>
          <button 
            className="vertex-btn vertex-btn--primary vertex-btn--sm"
            onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
            disabled={currentStep === steps.length - 1}
            aria-label="Next step"
          >
            Next
          </button>
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

export default Stepper;
