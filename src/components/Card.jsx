import React, { useState } from 'react';
import './Card.module.scss';

const cardHtml = `<!-- Basic Card -->
<div class="vertex-card">
  <div class="vertex-card__header">
    <h3 class="vertex-card__title">Card Title</h3>
    <p class="vertex-card__subtitle">Card subtitle</p>
  </div>
  <div class="vertex-card__content">
    <p>This is a modern card component with enhanced styling and features.</p>
  </div>
  <div class="vertex-card__actions">
    <button class="vertex-btn vertex-btn--primary">Primary</button>
    <button class="vertex-btn vertex-btn--ghost">Secondary</button>
  </div>
</div>

<!-- Card with Image -->
<div class="vertex-card vertex-card--elevated">
  <div class="vertex-card__media">
    <img src="https://via.placeholder.com/300x200" alt="Card image" class="vertex-card__image">
    <div class="vertex-card__overlay">
      <span class="vertex-card__badge">Featured</span>
    </div>
  </div>
  <div class="vertex-card__header">
    <h3 class="vertex-card__title">Image Card</h3>
    <p class="vertex-card__subtitle">With overlay and badge</p>
  </div>
  <div class="vertex-card__content">
    <p>Cards can include images with overlays and badges for enhanced visual appeal.</p>
  </div>
  <div class="vertex-card__actions">
    <button class="vertex-btn vertex-btn--primary">Learn More</button>
  </div>
</div>

<!-- Interactive Card -->
<div class="vertex-card vertex-card--interactive">
  <div class="vertex-card__header">
    <div class="vertex-card__avatar">
      <img src="https://via.placeholder.com/40x40" alt="User avatar">
    </div>
    <div class="vertex-card__meta">
      <h4 class="vertex-card__title">Interactive Card</h4>
      <p class="vertex-card__subtitle">Hover for effects</p>
    </div>
    <div class="vertex-card__actions--header">
      <button class="vertex-card__menu-btn">⋯</button>
    </div>
  </div>
  <div class="vertex-card__content">
    <p>This card responds to user interactions with smooth animations.</p>
  </div>
</div>`;

const cardCss = `/* Enhanced Card Component */
.vertex-card {
  background: #ffffff;
  border-radius: 1rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  border: 1px solid rgba(0, 0, 0, 0.05);
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  max-width: 400px;
  margin-bottom: 1.5rem;
}

/* Card Variants */
.vertex-card--elevated {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.vertex-card--interactive {
  cursor: pointer;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  }
}

/* Card Header */
.vertex-card__header {
  padding: 1.5rem 1.5rem 0;
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}

.vertex-card__title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 0.25rem 0;
  line-height: 1.4;
}

.vertex-card__subtitle {
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0;
  line-height: 1.4;
}

/* Card Media */
.vertex-card__media {
  position: relative;
  overflow: hidden;
}

.vertex-card__image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.vertex-card:hover .vertex-card__image {
  transform: scale(1.05);
}

.vertex-card__overlay {
  position: absolute;
  top: 1rem;
  right: 1rem;
}

.vertex-card__badge {
  background: linear-gradient(135deg, #4f46e5 0%, #6366f1 100%);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* Card Content */
.vertex-card__content {
  padding: 1rem 1.5rem;
}

.vertex-card__content p {
  color: #4b5563;
  line-height: 1.6;
  margin: 0;
}

/* Card Actions */
.vertex-card__actions {
  padding: 0 1.5rem 1.5rem;
  display: flex;
  gap: 0.75rem;
  align-items: center;
}

.vertex-card__actions--header {
  margin-left: auto;
}

/* Card Avatar and Meta */
.vertex-card__avatar {
  flex-shrink: 0;
}

.vertex-card__avatar img {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  object-fit: cover;
}

.vertex-card__meta {
  flex: 1;
  min-width: 0;
}

.vertex-card__menu-btn {
  background: none;
  border: none;
  color: #6b7280;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 0.375rem;
  transition: all 0.2s ease;
  
  &:hover {
    background: #f3f4f6;
    color: #374151;
  }
}`;

const cardJs = `// Enhanced Card with React Hooks
import React, { useState } from 'react';

const InteractiveCard = ({ 
  title, 
  subtitle, 
  content, 
  image, 
  badge,
  actions,
  variant = 'default',
  onClick 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const cardClasses = [
    'vertex-card',
    variant === 'elevated' && 'vertex-card--elevated',
    variant === 'interactive' && 'vertex-card--interactive',
    onClick && 'vertex-card--clickable'
  ].filter(Boolean).join(' ');
  
  return (
    <div 
      className={cardClasses}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {image && (
        <div className="vertex-card__media">
          <img src={image} alt="" className="vertex-card__image" />
          {badge && (
            <div className="vertex-card__overlay">
              <span className="vertex-card__badge">{badge}</span>
            </div>
          )}
        </div>
      )}
      
      <div className="vertex-card__header">
        <div>
          <h3 className="vertex-card__title">{title}</h3>
          {subtitle && <p className="vertex-card__subtitle">{subtitle}</p>}
        </div>
      </div>
      
      {content && (
        <div className="vertex-card__content">
          <p>{content}</p>
        </div>
      )}
      
      {actions && (
        <div className="vertex-card__actions">
          {actions}
        </div>
      )}
    </div>
  );
};`;

const codeTabs = [
  { label: 'HTML', code: cardHtml, lang: 'html' },
  { label: 'CSS', code: cardCss, lang: 'css' },
  { label: 'JS', code: cardJs, lang: 'js' },
];

const Card = () => {
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
    <div className="vertex-component-block" aria-label="Card component demo">
      <h2>Enhanced Card Component</h2>
      
      {/* Basic Card */}
      <div className="vertex-preview" style={{ marginBottom: '1.5rem' }}>
        <h3 style={{ fontSize: '1rem', marginBottom: '0.75rem', color: '#374151' }}>Basic Card</h3>
        <div className="vertex-card">
          <div className="vertex-card__header">
            <div>
              <h3 className="vertex-card__title">Modern Card Design</h3>
              <p className="vertex-card__subtitle">Enhanced with better styling</p>
            </div>
          </div>
          <div className="vertex-card__content">
            <p>This is an enhanced card component with modern styling, better typography, and improved visual hierarchy.</p>
          </div>
          <div className="vertex-card__actions">
            <button className="vertex-btn vertex-btn--primary">
              <span className="vertex-btn__text">Primary Action</span>
            </button>
            <button className="vertex-btn vertex-btn--ghost">
              <span className="vertex-btn__text">Secondary</span>
            </button>
          </div>
        </div>
      </div>

      {/* Card with Image */}
      <div className="vertex-preview" style={{ marginBottom: '1.5rem' }}>
        <h3 style={{ fontSize: '1rem', marginBottom: '0.75rem', color: '#374151' }}>Card with Image</h3>
        <div className="vertex-card vertex-card--elevated">
          <div className="vertex-card__media">
            <img 
              src="https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200&q=80" 
              alt="Modern office workspace" 
              className="vertex-card__image"
            />
            <div className="vertex-card__overlay">
              <span className="vertex-card__badge">Featured</span>
            </div>
          </div>
          <div className="vertex-card__header">
            <div>
              <h3 className="vertex-card__title">Image Card</h3>
              <p className="vertex-card__subtitle">With overlay and badge</p>
            </div>
          </div>
          <div className="vertex-card__content">
            <p>Cards can include images with overlays, badges, and hover effects for enhanced visual appeal.</p>
          </div>
          <div className="vertex-card__actions">
            <button className="vertex-btn vertex-btn--primary">
              <span className="vertex-btn__text">Learn More</span>
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Card */}
      <div className="vertex-preview" style={{ marginBottom: '1.5rem' }}>
        <h3 style={{ fontSize: '1rem', marginBottom: '0.75rem', color: '#374151' }}>Interactive Card</h3>
        <div className="vertex-card vertex-card--interactive">
          <div className="vertex-card__header">
            <div className="vertex-card__avatar">
              <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=40&h=40&q=80" alt="User avatar" />
            </div>
            <div className="vertex-card__meta">
              <h4 className="vertex-card__title">Interactive Card</h4>
              <p className="vertex-card__subtitle">Hover for smooth animations</p>
            </div>
            <div className="vertex-card__actions--header">
              <button className="vertex-card__menu-btn">⋯</button>
            </div>
          </div>
          <div className="vertex-card__content">
            <p>This card responds to user interactions with smooth animations and hover effects.</p>
          </div>
        </div>
      </div>

      {/* Card Variants */}
      <div className="vertex-preview" style={{ marginBottom: '1.5rem' }}>
        <h3 style={{ fontSize: '1rem', marginBottom: '0.75rem', color: '#374151' }}>Card Variants</h3>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <div className="vertex-card vertex-card--outlined" style={{ maxWidth: '180px' }}>
            <div className="vertex-card__header">
              <div>
                <h4 className="vertex-card__title" style={{ fontSize: '1rem' }}>Outlined</h4>
              </div>
            </div>
            <div className="vertex-card__content">
              <p style={{ fontSize: '0.875rem' }}>Card with border styling</p>
            </div>
          </div>
          
          <div className="vertex-card vertex-card--elevated" style={{ maxWidth: '180px' }}>
            <div className="vertex-card__header">
              <div>
                <h4 className="vertex-card__title" style={{ fontSize: '1rem' }}>Elevated</h4>
              </div>
            </div>
            <div className="vertex-card__content">
              <p style={{ fontSize: '0.875rem' }}>Card with enhanced shadow</p>
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

export default Card; 