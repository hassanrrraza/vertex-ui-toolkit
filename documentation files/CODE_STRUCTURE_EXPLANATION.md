# Vertex UI Toolkit - Code Structure & Functionality Explanation

## Project File Structure Overview

```
vertex/
├── src/
│   ├── components/              # 30+ UI Components
│   │   ├── Button.jsx          # Button component with variants
│   │   ├── Button.module.scss  # Button-specific styles
│   │   ├── InputField.jsx      # Input field with validation
│   │   ├── InputField.module.scss
│   │   ├── Modal.jsx           # Modal dialog component
│   │   ├── Modal.module.scss
│   │   └── [28+ more components...]
│   ├── styles/                 # Global styling system
│   │   ├── _variables.scss     # Design system tokens
│   │   ├── _mixins.scss        # Reusable SCSS mixins
│   │   ├── _base.scss          # Base styles and resets
│   │   ├── animations.scss     # Animation definitions
│   │   └── main.scss           # Main stylesheet
│   ├── App.jsx                 # Main application component
│   ├── App.css                 # App-specific styles
│   └── main.jsx                # Application entry point
├── public/                     # Static assets
├── package.json                # Dependencies and scripts
└── vite.config.js             # Build configuration
```

## Core Application Architecture

### 1. Main Application Component (`src/App.jsx`)

This is the heart of your application that orchestrates all functionality:

#### **Component Categories Definition**
```javascript
const COMPONENT_CATEGORIES = [
  {
    name: 'Inputs',
    components: [
      { id: 'input', name: 'Input Field', description: '...', Component: InputField },
      { id: 'select', name: 'Select / Dropdown', description: '...', Component: SelectDropdown },
      // ... 8 total input components
    ]
  },
  {
    name: 'Feedback',
    components: [
      { id: 'alert', name: 'Alert', description: '...', Component: Alert },
      // ... 7 total feedback components
    ]
  },
  {
    name: 'Navigation',
    components: [
      { id: 'navbar', name: 'Navbar', description: '...', Component: Navbar },
      // ... 6 total navigation components
    ]
  },
  {
    name: 'Layout',
    components: [
      { id: 'button', name: 'Button', description: '...', Component: Button },
      // ... 9 total layout components
    ]
  }
];
```

#### **Search Functionality Implementation**
```javascript
// State management for search
const [search, setSearch] = useState('');

// Real-time filtering logic
const filteredCategories = COMPONENT_CATEGORIES.map(cat => ({
  ...cat,
  components: cat.components.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase())
  )
})).filter(cat => cat.components.length > 0);

// Search input in the header
<input
  type="text"
  placeholder="Search components..."
  value={search}
  onChange={e => setSearch(e.target.value)}
  aria-label="Search components"
/>
```

#### **Navigation & Browsing Categories**
```javascript
// Active component tracking
const [activeId, setActiveId] = useState(ALL_COMPONENTS[0].id);

// Smooth scroll navigation
const handleNavClick = (id) => {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'start',
      inline: 'nearest'
    });
    setActiveId(id);
  }
};

// Scroll spy for active state
React.useEffect(() => {
  const handleScroll = () => {
    let found = activeId;
    for (const c of ALL_COMPONENTS) {
      const el = document.getElementById(c.id);
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= 120) {
          found = c.id;
        }
      }
    }
    setActiveId(found);
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  return () => window.removeEventListener('scroll', handleScroll);
}, []);
```

#### **Category Icons System**
```javascript
const getCategoryIcon = (categoryName) => {
  switch (categoryName) {
    case 'Inputs': return '📝';
    case 'Feedback': return '💬';
    case 'Navigation': return '🧭';
    case 'Layout': return '📐';
    default: return '📦';
  }
};
```

### 2. UI Layout Structure

#### **Header Section** (`vertex-top-section`)
- **Logo & Branding**: Animated logo with glow effects
- **Search Box**: Real-time component filtering
- **Hero Content**: Title and description

#### **Sidebar Navigation** (`vertex-sidebar`)
- **Category Grouping**: Components organized by type
- **Active State Tracking**: Visual indication of current component
- **Keyboard Navigation**: Full accessibility support
- **Responsive Behavior**: Transforms to horizontal on mobile

#### **Main Content Area** (`vertex-main-area`)
- **Component Showcase**: Live demos of each component
- **Code Tabs**: HTML, CSS, and JavaScript examples
- **Copy Functionality**: One-click code copying

## Individual Component Structure

### Component File Pattern
Each component follows this consistent structure:

```javascript
// Example: Button.jsx
import React, { useState } from 'react';
import './Button.module.scss';

// 1. Code examples for documentation
const buttonHtml = `<button class="vertex-btn vertex-btn--primary">Primary</button>`;
const buttonCss = `.vertex-btn { /* styles */ }`;
const buttonJs = `// JavaScript implementation`;

// 2. Tab system for code display
const codeTabs = [
  { label: 'HTML', code: buttonHtml, lang: 'html' },
  { label: 'CSS', code: buttonCss, lang: 'css' },
  { label: 'JS', code: buttonJs, lang: 'js' },
];

// 3. Main component with demo and code tabs
const Button = () => {
  const [activeTab, setActiveTab] = useState('HTML');
  const [copied, setCopied] = useState(false);
  
  // Copy to clipboard functionality
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
    <div className="vertex-component-block">
      {/* Live component demo */}
      <div className="vertex-preview">
        <button className="vertex-btn vertex-btn--primary">Primary</button>
        <button className="vertex-btn vertex-btn--secondary">Secondary</button>
        {/* More variants... */}
      </div>
      
      {/* Code tabs interface */}
      <div className="vertex-code-tabs">
        <div className="vertex-tab-list">
          {codeTabs.map(tab => (
            <button
              key={tab.label}
              className={`vertex-tab${activeTab === tab.label ? ' active' : ''}`}
              onClick={() => setActiveTab(tab.label)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="vertex-tab-panel">
          <pre><code>{currentTab.code}</code></pre>
          <button className="vertex-copy-btn" onClick={handleCopy}>
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      </div>
    </div>
  );
};
```

## Key Functionalities Breakdown

### 1. **Search Functionality** 📝
**Location**: `src/App.jsx` (lines 89-93)
**How it works**:
- Real-time filtering as user types
- Searches component names (case-insensitive)
- Updates sidebar navigation dynamically
- Shows "No components found" when no matches

### 2. **Category Browsing** 🧭
**Location**: `src/App.jsx` (lines 34-85, 150-180)
**How it works**:
- Components organized into 4 categories
- Each category has an icon and component list
- Click navigation with smooth scrolling
- Active state tracking with scroll spy

### 3. **Component Showcase** 📐
**Location**: `src/App.jsx` (lines 181-195)
**How it works**:
- Each component renders in its own section
- Live interactive demos
- Component description and title
- Unique ID for navigation anchoring

### 4. **Code Display System** 💻
**Location**: Individual component files (e.g., `src/components/Button.jsx`)
**How it works**:
- Three tabs: HTML, CSS, JavaScript
- Syntax highlighting with PrismJS
- Copy-to-clipboard functionality
- Success feedback on copy

### 5. **Responsive Design** 📱
**Location**: `src/styles/main.scss` (lines 400+)
**How it works**:
- Mobile-first approach
- Sidebar becomes horizontal on mobile
- Touch-optimized interactions
- Flexible grid system

### 6. **Accessibility Features** ♿
**Location**: Throughout all components
**How it works**:
- ARIA labels and descriptions
- Keyboard navigation support
- Focus management
- Screen reader announcements

## Styling Architecture

### 1. **Global Styles** (`src/styles/`)
- **`_variables.scss`**: Design system tokens (colors, spacing, typography)
- **`_mixins.scss`**: Reusable SCSS patterns
- **`_base.scss`**: CSS reset and base element styles
- **`animations.scss`**: Keyframe animations and transitions
- **`main.scss`**: Main application layout and components

### 2. **Component Styles** (`src/components/*.module.scss`)
- **Scoped CSS Modules**: Prevents style conflicts
- **BEM Methodology**: Consistent naming conventions
- **Design Token Usage**: References global variables
- **Responsive Patterns**: Mobile-first media queries

## Data Flow Architecture

```
User Input (Search/Click)
        ↓
State Update (React useState)
        ↓
Component Re-render
        ↓
DOM Update (Virtual DOM)
        ↓
Visual Feedback (UI Change)
```

### State Management Pattern
```javascript
// Global app state
const [search, setSearch] = useState('');           // Search query
const [activeId, setActiveId] = useState('');       // Active component

// Component-level state
const [activeTab, setActiveTab] = useState('HTML'); // Code tab selection
const [copied, setCopied] = useState(false);        // Copy feedback
```

## Performance Optimizations

### 1. **Efficient Filtering**
```javascript
// Memoized filtering to prevent unnecessary re-renders
const filteredCategories = useMemo(() => 
  COMPONENT_CATEGORIES.map(cat => ({
    ...cat,
    components: cat.components.filter(c =>
      c.name.toLowerCase().includes(search.toLowerCase())
    )
  })).filter(cat => cat.components.length > 0),
  [search]
);
```

### 2. **Passive Event Listeners**
```javascript
// Optimized scroll handling
window.addEventListener('scroll', handleScroll, { passive: true });
```

### 3. **CSS Modules**
- Scoped styles prevent global CSS pollution
- Automatic class name generation
- Dead code elimination

## Build System Integration

### Vite Configuration
- **Fast Development**: Hot Module Replacement (HMR)
- **Optimized Production**: Tree shaking and minification
- **SCSS Processing**: Automatic compilation and optimization
- **Asset Handling**: Optimized images and fonts

This architecture creates a scalable, maintainable, and performant component library that serves both as a showcase and a practical development tool.