import React from 'react';
import { DocumentedComponent } from '../documentation';
import Modal from './Modal';

// Enhanced Modal component with comprehensive documentation
// This wraps the existing Modal component without modifying it
const ModalDocumented = () => {
  return (
    <DocumentedComponent 
      componentName="Modal"
      description="Accessible modal dialogs for focused tasks with proper focus management."
      showTabs={['preview', 'props', 'examples', 'accessibility', 'dependencies']}
    >
      {/* Render the existing Modal component exactly as it appears in the main app */}
      <Modal />
    </DocumentedComponent>
  );
};

export default ModalDocumented;