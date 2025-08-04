import React from 'react';
import { DocumentedComponent } from '../documentation';
import Button from './Button';

// Enhanced Button component with comprehensive documentation
// This wraps the existing Button component without modifying it
const ButtonDocumented = () => {
  return (
    <DocumentedComponent 
      componentName="Button"
      description="Versatile buttons for actions, forms, and navigation with full accessibility support."
      showTabs={['preview', 'props', 'examples', 'accessibility', 'dependencies']}
    >
      {/* Render the existing Button component exactly as it appears in the main app */}
      <Button />
    </DocumentedComponent>
  );
};

export default ButtonDocumented;