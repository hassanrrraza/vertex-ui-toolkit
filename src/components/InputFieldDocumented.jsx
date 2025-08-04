import React from 'react';
import { DocumentedComponent } from '../documentation';
import InputField from './InputField';

// Enhanced InputField component with comprehensive documentation
// This wraps the existing InputField component without modifying it
const InputFieldDocumented = () => {
  return (
    <DocumentedComponent 
      componentName="InputField"
      description="Accessible text input with label, validation, and helper/error text."
      showTabs={['preview', 'props', 'examples', 'accessibility', 'dependencies']}
    >
      {/* Render the existing InputField component exactly as it appears in the main app */}
      <InputField />
    </DocumentedComponent>
  );
};

export default InputFieldDocumented;