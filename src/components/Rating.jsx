import React, { useState } from 'react';
import './Rating.module.scss';

const ratingHtml = `<div class="vertex-rating">
  <span class="vertex-star vertex-star--filled">★</span>
  <span class="vertex-star vertex-star--filled">★</span>
  <span class="vertex-star vertex-star--filled">★</span>
  <span class="vertex-star vertex-star--filled">★</span>
  <span class="vertex-star">★</span>
</div>

<div class="vertex-rating vertex-rating--sm">
  <span class="vertex-star vertex-star--filled">★</span>
  <span class="vertex-star vertex-star--filled">★</span>
  <span class="vertex-star vertex-star--filled">★</span>
  <span class="vertex-star">★</span>
  <span class="vertex-star">★</span>
</div>

<div class="vertex-rating vertex-rating--readonly">
  <span class="vertex-star vertex-star--filled">★</span>
  <span class="vertex-star vertex-star--filled">★</span>
  <span class="vertex-star vertex-star--half">★</span>
  <span class="vertex-star">★</span>
  <span class="vertex-star">★</span>
  <span class="vertex-rating-text">2.5 out of 5</span>
</div>`;

const ratingCss = `.vertex-rating {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
}

.vertex-star {
  font-size: 1.5rem;
  color: #e0e6ed;
  cursor: pointer;
  transition: color 0.2s ease;
  user-select: none;
}

.vertex-star:hover,
.vertex-star--hover {
  color: #ffc107;
}

.vertex-star--filled {
  color: #ffc107;
}

.vertex-star--half {
  background: linear-gradient(90deg, #ffc107 50%, #e0e6ed 50%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.vertex-rating--sm .vertex-star {
  font-size: 1rem;
}

.vertex-rating--lg .vertex-star {
  font-size: 2rem;
}

.vertex-rating--readonly .vertex-star {
  cursor: default;
}

.vertex-rating-text {
  margin-left: 0.5rem;
  font-size: 0.875rem;
  color: #666;
}

.vertex-rating:focus-within {
  outline: 2px solid #8BBEB2;
  outline-offset: 2px;
  border-radius: 0.25rem;
}`;

const ratingReact = `import React, { useState } from 'react';

const Rating = ({ 
  value = 0, 
  max = 5, 
  size = 'medium',
  readonly = false,
  showText = false,
  onChange,
  className = '' 
}) => {
  const [hoverValue, setHoverValue] = useState(0);
  const [currentValue, setCurrentValue] = useState(value);

  const handleClick = (rating) => {
    if (readonly) return;
    setCurrentValue(rating);
    if (onChange) onChange(rating);
  };

  const handleMouseEnter = (rating) => {
    if (readonly) return;
    setHoverValue(rating);
  };

  const handleMouseLeave = () => {
    if (readonly) return;
    setHoverValue(0);
  };

  const ratingClasses = [
    'vertex-rating',
    size !== 'medium' ? \`vertex-rating--\${size === 'small' ? 'sm' : 'lg'}\` : '',
    readonly ? 'vertex-rating--readonly' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={ratingClasses}>
      {Array.from({ length: max }, (_, index) => {
        const rating = index + 1;
        const isFilled = rating <= (hoverValue || currentValue);
        
        return (
          <span
            key={index}
            className={\`vertex-star \${isFilled ? 'vertex-star--filled' : ''}\`}
            onClick={() => handleClick(rating)}
            onMouseEnter={() => handleMouseEnter(rating)}
            onMouseLeave={handleMouseLeave}
            role={readonly ? 'img' : 'button'}
            aria-label={\`\${rating} star\${rating !== 1 ? 's' : ''}\`}
            tabIndex={readonly ? -1 : 0}
          >
            ★
          </span>
        );
      })}
      {showText && (
        <span className="vertex-rating-text">
          {currentValue} out of {max}
        </span>
      )}
    </div>
  );
};

export default Rating;`;

const codeTabs = [
  { label: 'HTML', code: ratingHtml, lang: 'html' },
  { label: 'CSS', code: ratingCss, lang: 'css' },
  { label: 'React', code: ratingReact, lang: 'jsx' }
];

const Rating = () => {
  const [activeTab, setActiveTab] = useState('HTML');
  const [copied, setCopied] = useState(false);
  const [rating1, setRating1] = useState(4);
  const [rating2, setRating2] = useState(3);

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
    <div className="vertex-component-block" aria-label="Rating component demo">
      <h2>Rating</h2>
      <p className="vertex-component-description">
        Interactive star rating component for user feedback and reviews.
      </p>
      <div className="vertex-preview" style={{ marginBottom: '1rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <h4 style={{ marginBottom: '0.5rem', color: '#384E77' }}>Interactive Rating</h4>
            <div className="vertex-rating">
              {Array.from({ length: 5 }, (_, index) => {
                const rating = index + 1;
                const isFilled = rating <= rating1;
                
                return (
                  <span
                    key={index}
                    className={`vertex-star ${isFilled ? 'vertex-star--filled' : ''}`}
                    onClick={() => setRating1(rating)}
                    role="button"
                    aria-label={`${rating} star${rating !== 1 ? 's' : ''}`}
                    tabIndex={0}
                  >
                    ★
                  </span>
                );
              })}
              <span className="vertex-rating-text">{rating1} out of 5</span>
            </div>
          </div>

          <div>
            <h4 style={{ marginBottom: '0.5rem', color: '#384E77' }}>Different Sizes</h4>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <div className="vertex-rating vertex-rating--sm">
                {Array.from({ length: 5 }, (_, index) => (
                  <span key={index} className={`vertex-star ${index < 3 ? 'vertex-star--filled' : ''}`}>★</span>
                ))}
              </div>
              <div className="vertex-rating">
                {Array.from({ length: 5 }, (_, index) => (
                  <span key={index} className={`vertex-star ${index < rating2 ? 'vertex-star--filled' : ''}`}>★</span>
                ))}
              </div>
              <div className="vertex-rating vertex-rating--lg">
                {Array.from({ length: 5 }, (_, index) => (
                  <span key={index} className={`vertex-star ${index < 4 ? 'vertex-star--filled' : ''}`}>★</span>
                ))}
              </div>
            </div>
          </div>

          <div>
            <h4 style={{ marginBottom: '0.5rem', color: '#384E77' }}>Readonly with Half Stars</h4>
            <div className="vertex-rating vertex-rating--readonly">
              <span className="vertex-star vertex-star--filled">★</span>
              <span className="vertex-star vertex-star--filled">★</span>
              <span className="vertex-star vertex-star--half">★</span>
              <span className="vertex-star">★</span>
              <span className="vertex-star">★</span>
              <span className="vertex-rating-text">2.5 out of 5</span>
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

export default Rating;
