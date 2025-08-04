import React, { useState } from 'react';
import './App.css';
import Alert from './components/Alert';
import Avatar from './components/Avatar';
import BackToTop from './components/BackToTop';
import Badge from './components/Badge';
import Button from './components/Button';
import Card from './components/Card';
import CheckboxRadioGroup from './components/CheckboxRadioGroup';
import InputField from './components/InputField';
import ListGroup from './components/ListGroup';
import Loader from './components/Loader';
import Modal from './components/Modal';
import Navbar from './components/Navbar.new';
import Pagination from './components/Pagination';
import ProgressBar from './components/ProgressBar';
import SelectDropdown from './components/SelectDropdown';
import Table from './components/Table';
import Toast from './components/Toast';
import ToggleSwitch from './components/ToggleSwitch';
import Tooltip from './components/Tooltip';
// New components
import AccordionNew from './components/AccordionNew';
import BreadcrumbsNew from './components/BreadcrumbsNew';
import Chip from './components/Chip';
import DatePicker from './components/DatePicker';
import Drawer from './components/Drawer';
import FileUpload from './components/FileUpload';
import Rating from './components/Rating';
import Skeleton from './components/Skeleton';
import SliderNew from './components/SliderNew';
import Stepper from './components/Stepper';
import TabsNew from './components/TabsNew';
import Timeline from './components/Timeline';

// Enhanced documented components (optional - for testing documentation features)

const COMPONENT_CATEGORIES = [
  {
    name: 'Inputs',
    components: [
      { id: 'input', name: 'Input Field', description: 'Accessible text input with label, validation, and helper/error text.', Component: InputField },
      { id: 'select', name: 'Select / Dropdown', description: 'Accessible select and searchable dropdown for option picking.', Component: SelectDropdown },
      { id: 'group', name: 'Checkbox & Radio Group', description: 'Grouped checkboxes and radios for multi/single selection, accessible and keyboard-friendly.', Component: CheckboxRadioGroup },
      { id: 'toggle', name: 'Toggle Switch', description: 'Accessible toggle switch for on/off states.', Component: ToggleSwitch },
      { id: 'datepicker', name: 'Date Picker', description: 'Native date input component with consistent styling and validation support.', Component: DatePicker },
      { id: 'fileupload', name: 'File Upload', description: 'Drag and drop file upload component with file validation and preview.', Component: FileUpload },
      { id: 'rating', name: 'Rating', description: 'Interactive star rating component for user feedback and reviews.', Component: Rating },
      { id: 'slider', name: 'Slider / Range', description: 'Customizable range input with smooth interaction and accessibility features.', Component: SliderNew },
    ]
  },
  {
    name: 'Feedback',
    components: [
      { id: 'alert', name: 'Alert', description: 'Contextual feedback messages for user actions.', Component: Alert },
      { id: 'tooltip', name: 'Tooltip', description: 'Accessible tooltip for hover/focus hints and labels.', Component: Tooltip },
      { id: 'loader', name: 'Loader / Spinner', description: 'Animated spinner for loading states.', Component: Loader },
      { id: 'badge', name: 'Badge', description: 'Small count or status indicator for UI elements.', Component: Badge },
      { id: 'toast', name: 'Toast / Notification', description: 'Floating, dismissible notification for feedback/messages.', Component: Toast },
      { id: 'skeleton', name: 'Skeleton', description: 'Loading placeholder component that mimics content structure while data is being fetched.', Component: Skeleton },
      { id: 'stepper', name: 'Stepper', description: 'Multi-step progress indicator for guiding users through processes and workflows.', Component: Stepper },
    ]
  },
  {
    name: 'Navigation',
    components: [
      { id: 'navbar', name: 'Navbar', description: 'Responsive navigation bars for site structure.', Component: Navbar },
      { id: 'pagination', name: 'Pagination', description: 'Page navigation for lists and tables.', Component: Pagination },
      { id: 'drawer', name: 'Drawer', description: 'Slide-out navigation panel that overlays content from the side of the screen.', Component: Drawer },
      { id: 'tabs', name: 'Tabs', description: 'Organize content into separate views within the same context with keyboard navigation.', Component: TabsNew },
      { id: 'accordion', name: 'Accordion', description: 'Vertically stacked expandable panels for showing and hiding content.', Component: AccordionNew },
      { id: 'breadcrumbs', name: 'Breadcrumbs', description: 'Navigation aid showing the user\'s location in a hierarchical structure.', Component: BreadcrumbsNew },
    ]
  },
  {
    name: 'Layout',
    components: [
      { id: 'button', name: 'Button', description: 'Versatile buttons for actions, forms, and navigation.', Component: Button },
      { id: 'card', name: 'Card', description: 'Flexible containers for grouping related content.', Component: Card },
      { id: 'modal', name: 'Modal', description: 'Accessible modal dialogs for focused tasks.', Component: Modal },
      { id: 'progress', name: 'Progress Bar', description: 'Visual indicator of task completion or loading.', Component: ProgressBar },
      { id: 'avatar', name: 'Avatar', description: 'User profile image or initials.', Component: Avatar },
      { id: 'listgroup', name: 'List Group', description: 'Flexible and accessible list group for navigation or content.', Component: ListGroup },
      { id: 'table', name: 'Table', description: 'Accessible, responsive table for data display.', Component: Table },
      { id: 'chip', name: 'Chip / Tag', description: 'Compact elements for labels, tags, filters, and removable selections.', Component: Chip },
      { id: 'timeline', name: 'Timeline', description: 'Vertical timeline component for displaying chronological events and activities.', Component: Timeline },
    ]
  }
];

// Flatten for search
const ALL_COMPONENTS = COMPONENT_CATEGORIES.flatMap(cat => cat.components);

// Function to get category icons
const getCategoryIcon = (categoryName) => {
  switch (categoryName) {
    case 'Inputs':
      return '📝';
    case 'Feedback':
      return '💬';
    case 'Navigation':
      return '🧭';
    case 'Layout':
      return '📐';
    default:
      return '📦';
  }
};

function App() {
  const [search, setSearch] = useState('');
  const [activeId, setActiveId] = useState(ALL_COMPONENTS[0].id);
  
  // Autocomplete state
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const [autocompleteResults, setAutocompleteResults] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [debounceTimer, setDebounceTimer] = useState(null);

  // Filtered categories for search (existing functionality)
  const filteredCategories = COMPONENT_CATEGORIES.map(cat => ({
    ...cat,
    components: cat.components.filter(c =>
      c.name.toLowerCase().includes(search.toLowerCase())
    )
  })).filter(cat => cat.components.length > 0);

  // Enhanced search function for autocomplete
  const searchComponents = (query) => {
    if (query.length < 2) return [];
    
    const searchTerm = query.toLowerCase();
    const results = [];
    
    // Search through all components
    ALL_COMPONENTS.forEach(component => {
      const category = COMPONENT_CATEGORIES.find(cat => 
        cat.components.some(c => c.id === component.id)
      );
      
      const nameMatch = component.name.toLowerCase().includes(searchTerm);
      const descMatch = component.description.toLowerCase().includes(searchTerm);
      const categoryMatch = category?.name.toLowerCase().includes(searchTerm);
      
      if (nameMatch || descMatch || categoryMatch) {
        // Priority scoring: exact name match > name contains > description/category match
        let priority = 0;
        if (component.name.toLowerCase() === searchTerm) priority = 3;
        else if (component.name.toLowerCase().startsWith(searchTerm)) priority = 2;
        else if (nameMatch) priority = 1;
        else priority = 0;
        
        results.push({
          ...component,
          category: category?.name || '',
          categoryIcon: getCategoryIcon(category?.name || ''),
          priority
        });
      }
    });
    
    // Sort by priority, then alphabetically, limit to 4 results
    return results
      .sort((a, b) => {
        if (a.priority !== b.priority) return b.priority - a.priority;
        return a.name.localeCompare(b.name);
      })
      .slice(0, 4);
  };

  // Debounced autocomplete search
  const handleSearchChange = (value) => {
    setSearch(value);
    
    // Clear existing timer
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }
    
    // Set new timer for autocomplete
    if (value.length >= 2) {
      const timer = setTimeout(() => {
        const results = searchComponents(value);
        setAutocompleteResults(results);
        setShowAutocomplete(results.length > 0);
        setSelectedIndex(-1);
      }, 300);
      setDebounceTimer(timer);
    } else {
      setShowAutocomplete(false);
      setAutocompleteResults([]);
      setSelectedIndex(-1);
    }
  };

  // Enhanced scroll to anchor and set active
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

  // Handle autocomplete selection
  const handleAutocompleteSelect = (component) => {
    setSearch(component.name);
    setShowAutocomplete(false);
    setSelectedIndex(-1);
    handleNavClick(component.id);
  };

  // Handle keyboard navigation in autocomplete
  const handleKeyDown = (e) => {
    if (!showAutocomplete || autocompleteResults.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < autocompleteResults.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev > 0 ? prev - 1 : autocompleteResults.length - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < autocompleteResults.length) {
          handleAutocompleteSelect(autocompleteResults[selectedIndex]);
        }
        break;
      case 'Escape':
        setShowAutocomplete(false);
        setSelectedIndex(-1);
        break;
    }
  };

  // Close autocomplete when clicking outside
  const handleClickOutside = (e) => {
    if (!e.target.closest('.vertex-search-container')) {
      setShowAutocomplete(false);
      setSelectedIndex(-1);
    }
  };

  // Add click outside listener
  React.useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  // Listen for scroll to update active link
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

  return (
    <div className="vertex-root-layout">
      <div className="vertex-top-section">
        <div className="vertex-logo-header">
          <div className="vertex-logo-container">
            <span className="vertex-logo">V</span>
            <div className="vertex-logo-glow"></div>
          </div>
          <span className="vertex-brand">Vertex</span>
        </div>

        <div className="vertex-main-search">
          <div className="vertex-search-container">
            <div className="vertex-search-box vertex-search-box-top">
              <input
                type="text"
                placeholder="Search components..."
                value={search}
                onChange={e => handleSearchChange(e.target.value)}
                onKeyDown={handleKeyDown}
                aria-label="Search components"
                aria-expanded={showAutocomplete}
                aria-haspopup="listbox"
                role="combobox"
                aria-autocomplete="list"
              />
            </div>
            
            {/* Autocomplete Dropdown */}
            {showAutocomplete && (
              <div className="vertex-autocomplete-dropdown" role="listbox">
                {autocompleteResults.map((component, index) => (
                  <div
                    key={component.id}
                    className={`vertex-autocomplete-item ${
                      index === selectedIndex ? 'selected' : ''
                    }`}
                    onClick={() => handleAutocompleteSelect(component)}
                    role="option"
                    aria-selected={index === selectedIndex}
                  >
                    <div className="vertex-autocomplete-header">
                      <span className="vertex-autocomplete-icon">
                        {component.categoryIcon}
                      </span>
                      <span className="vertex-autocomplete-name">
                        {component.name}
                      </span>
                      <span className="vertex-autocomplete-category">
                        {component.category}
                      </span>
                    </div>
                    <div className="vertex-autocomplete-description">
                      {component.description}
                    </div>
                    <div className="vertex-autocomplete-code-types">
                      HTML/CSS/JS
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="vertex-main-component">
            <h1>Vertex UI Toolkit</h1>
            <p className="vertex-subtitle">Modern, copy-ready React components for rapid development</p>
          </div>
        </div>
      </div>

      <div className="vertex-content-layout">
        <aside className="vertex-sidebar">
          <nav className="vertex-nav-list" aria-label="Component navigation">
            {filteredCategories.length === 0 && (
              <ul><li className="vertex-nav-empty">No components found</li></ul>
            )}
            {filteredCategories.map(cat => (
              <div key={cat.name} className="vertex-nav-category">
                <div className="vertex-nav-category-label">
                  <span className="vertex-category-icon">{getCategoryIcon(cat.name)}</span>
                  {cat.name}
                </div>
                <ul>
                  {cat.components.map(c => (
                    <li
                      key={c.id}
                      className={activeId === c.id ? 'active' : ''}
                      onClick={() => handleNavClick(c.id)}
                      tabIndex={0}
                      onKeyDown={e => {
                        if (e.key === 'Enter' || e.key === ' ') handleNavClick(c.id);
                      }}
                      aria-current={activeId === c.id ? 'page' : undefined}
                    >
                      {c.name}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
          <div className="vertex-sidebar-footer">
            <div className="vertex-version">v1.2.0</div>
            <small>UI Toolkit</small>
          </div>
        </aside>
        <div className="vertex-main-area">
          <main className="vertex-main-content">
            {COMPONENT_CATEGORIES.map(cat =>
              cat.components.map(({ id, name, description, Component }) => (
                <section id={id} key={id} className="vertex-showcase-section">
                  <div className="vertex-showcase-card">
                    <div className="vertex-showcase-header">
                      <h2>{name}</h2>
                      {description && <p className="vertex-showcase-desc">{description}</p>}
                    </div>
                    <div className="vertex-showcase-body">
                      <Component />
                    </div>
                  </div>
                </section>
              ))
            )}
          </main>
          <BackToTop />
        </div>
      </div>
    </div>
  );
}

export default App;
