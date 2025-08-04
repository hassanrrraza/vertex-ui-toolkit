import React, { useState } from 'react';
import './AccordionNew.module.scss';

const accordionHtml = `<div class="vertex-accordion">
  <div class="vertex-accordion-item">
    <button class="vertex-accordion-header vertex-accordion-header--active">
      <span>What is Vertex UI?</span>
      <span class="vertex-accordion-icon">−</span>
    </button>
    <div class="vertex-accordion-content vertex-accordion-content--open">
      <div class="vertex-accordion-body">
        Vertex UI is a modern, accessible React component library designed for rapid development with beautiful, consistent styling.
      </div>
    </div>
  </div>
  <div class="vertex-accordion-item">
    <button class="vertex-accordion-header">
      <span>How do I get started?</span>
      <span class="vertex-accordion-icon">+</span>
    </button>
    <div class="vertex-accordion-content">
      <div class="vertex-accordion-body">
        Simply copy the component code and styles into your project, or install via npm when available.
      </div>
    </div>
  </div>
</div>`;

const accordionCss = `.vertex-accordion {
  border: 1px solid #e0e6ed;
  border-radius: 0.5rem;
  overflow: hidden;
}

.vertex-accordion-item {
  border-bottom: 1px solid #e0e6ed;
}

.vertex-accordion-item:last-child {
  border-bottom: none;
}

.vertex-accordion-header {
  width: 100%;
  padding: 1rem 1.25rem;
  background: #fff;
  border: none;
  text-align: left;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1rem;
  font-weight: 500;
  color: #0D0630;
  transition: background 0.2s ease;
}

.vertex-accordion-header:hover {
  background: #f8f9fa;
}

.vertex-accordion-header--active {
  background: #f5f7ff;
  color: #384E77;
}

.vertex-accordion-header:focus {
  outline: 2px solid #8BBEB2;
  outline-offset: -2px;
}

.vertex-accordion-icon {
  font-size: 1.25rem;
  font-weight: 300;
  color: #666;
  transition: transform 0.2s ease;
}

.vertex-accordion-header--active .vertex-accordion-icon {
  transform: rotate(180deg);
  color: #384E77;
}

.vertex-accordion-content {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;
}

.vertex-accordion-content--open {
  max-height: 200px;
}

.vertex-accordion-body {
  padding: 1rem 1.25rem;
  color: #666;
  line-height: 1.6;
  background: #fafbfc;
}`;

const accordionReact = `import React, { useState } from 'react';

const AccordionItem = ({ title, children, isOpen, onToggle }) => {
  return (
    <div className="vertex-accordion-item">
      <button 
        className={\`vertex-accordion-header \${isOpen ? 'vertex-accordion-header--active' : ''}\`}
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span>{title}</span>
        <span className="vertex-accordion-icon">{isOpen ? '−' : '+'}</span>
      </button>
      <div className={\`vertex-accordion-content \${isOpen ? 'vertex-accordion-content--open' : ''}\`}>
        <div className="vertex-accordion-body">
          {children}
        </div>
      </div>
    </div>
  );
};

const Accordion = ({ items, allowMultiple = false, className = '' }) => {
  const [openItems, setOpenItems] = useState(new Set([0]));

  const toggleItem = (index) => {
    const newOpenItems = new Set(openItems);
    
    if (allowMultiple) {
      if (newOpenItems.has(index)) {
        newOpenItems.delete(index);
      } else {
        newOpenItems.add(index);
      }
    } else {
      newOpenItems.clear();
      if (!openItems.has(index)) {
        newOpenItems.add(index);
      }
    }
    
    setOpenItems(newOpenItems);
  };

  return (
    <div className={\`vertex-accordion \${className}\`}>
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          title={item.title}
          isOpen={openItems.has(index)}
          onToggle={() => toggleItem(index)}
        >
          {item.content}
        </AccordionItem>
      ))}
    </div>
  );
};

export default Accordion;`;

const codeTabs = [
  { label: 'HTML', code: accordionHtml, lang: 'html' },
  { label: 'CSS', code: accordionCss, lang: 'css' },
  { label: 'React', code: accordionReact, lang: 'jsx' }
];

const AccordionNew = () => {
  const [activeTab, setActiveTab] = useState('HTML');
  const [copied, setCopied] = useState(false);
  const [openItems, setOpenItems] = useState(new Set([0]));

  const accordionItems = [
    {
      title: 'What is Vertex UI?',
      content: 'Vertex UI is a modern, accessible React component library designed for rapid development with beautiful, consistent styling.'
    },
    {
      title: 'How do I get started?',
      content: 'Simply copy the component code and styles into your project, or install via npm when available.'
    },
    {
      title: 'Is it accessible?',
      content: 'Yes! All components follow WCAG guidelines with proper ARIA attributes, keyboard navigation, and focus management.'
    },
    {
      title: 'Can I customize the styling?',
      content: 'Absolutely! The SCSS modules are designed to be easily customizable while maintaining consistency.'
    }
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

  const toggleItem = (index) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index);
    } else {
      newOpenItems.clear();
      newOpenItems.add(index);
    }
    setOpenItems(newOpenItems);
  };

  const AccordionItem = ({ title, children, isOpen, onToggle }) => {
    return (
      <div className="vertex-accordion-item">
        <button 
          className={`vertex-accordion-header ${isOpen ? 'vertex-accordion-header--active' : ''}`}
          onClick={onToggle}
          aria-expanded={isOpen}
        >
          <span>{title}</span>
          <span className="vertex-accordion-icon">{isOpen ? '−' : '+'}</span>
        </button>
        <div className={`vertex-accordion-content ${isOpen ? 'vertex-accordion-content--open' : ''}`}>
          <div className="vertex-accordion-body">
            {children}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="vertex-component-block" aria-label="Accordion component demo">
      <h2>Accordion</h2>
      <p className="vertex-component-description">
        Collapsible content sections for organizing information in a space-efficient way.
      </p>
      <div className="vertex-preview" style={{ marginBottom: '1rem' }}>
        <div className="vertex-accordion">
          {accordionItems.map((item, index) => (
            <AccordionItem
              key={index}
              title={item.title}
              isOpen={openItems.has(index)}
              onToggle={() => toggleItem(index)}
            >
              {item.content}
            </AccordionItem>
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

export default AccordionNew;
