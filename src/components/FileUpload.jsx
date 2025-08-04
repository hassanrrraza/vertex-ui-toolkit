import React, { useState, useRef } from 'react';
import './FileUpload.module.scss';

const fileUploadHtml = `<div class="vertex-file-upload">
  <div class="vertex-file-drop-zone">
    <div class="vertex-file-icon">📁</div>
    <p class="vertex-file-text">
      <strong>Click to upload</strong> or drag and drop
    </p>
    <p class="vertex-file-hint">PNG, JPG, PDF up to 10MB</p>
    <input type="file" class="vertex-file-input" multiple accept="image/*,.pdf">
  </div>
</div>

<div class="vertex-file-list">
  <div class="vertex-file-item">
    <div class="vertex-file-info">
      <span class="vertex-file-name">document.pdf</span>
      <span class="vertex-file-size">2.4 MB</span>
    </div>
    <button class="vertex-file-remove">×</button>
  </div>
</div>`;

const fileUploadCss = `.vertex-file-upload {
  width: 100%;
}

.vertex-file-drop-zone {
  border: 2px dashed #e0e6ed;
  border-radius: 0.5rem;
  padding: 2rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
}

.vertex-file-drop-zone:hover,
.vertex-file-drop-zone--dragover {
  border-color: #8BBEB2;
  background: #f8fffe;
}

.vertex-file-drop-zone--dragover {
  border-color: #384E77;
  background: #f5f7ff;
}

.vertex-file-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
  opacity: 0.6;
}

.vertex-file-text {
  margin: 0 0 0.5rem 0;
  color: #0D0630;
  font-size: 1rem;
}

.vertex-file-text strong {
  color: #384E77;
}

.vertex-file-hint {
  margin: 0;
  color: #666;
  font-size: 0.875rem;
}

.vertex-file-input {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
}

.vertex-file-list {
  margin-top: 1rem;
}

.vertex-file-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem;
  border: 1px solid #e0e6ed;
  border-radius: 0.375rem;
  margin-bottom: 0.5rem;
  background: #fff;
}

.vertex-file-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.vertex-file-name {
  font-weight: 500;
  color: #0D0630;
}

.vertex-file-size {
  font-size: 0.875rem;
  color: #666;
}

.vertex-file-remove {
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
  font-size: 1.25rem;
  padding: 0.25rem;
  border-radius: 0.25rem;
  transition: background 0.2s ease;
}

.vertex-file-remove:hover {
  background: #f8f9fa;
  color: #dc3545;
}`;

const fileUploadReact = `import React, { useState, useRef } from 'react';

const FileUpload = ({ 
  accept = '*',
  multiple = true,
  maxSize = 10 * 1024 * 1024, // 10MB
  onFilesChange,
  className = '' 
}) => {
  const [files, setFiles] = useState([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const handleFiles = (newFiles) => {
    const validFiles = Array.from(newFiles).filter(file => {
      if (file.size > maxSize) {
        alert(\`File \${file.name} is too large. Maximum size is \${maxSize / 1024 / 1024}MB\`);
        return false;
      }
      return true;
    });

    const updatedFiles = multiple ? [...files, ...validFiles] : validFiles.slice(0, 1);
    setFiles(updatedFiles);
    onFilesChange?.(updatedFiles);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const removeFile = (index) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
    onFilesChange?.(updatedFiles);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className={\`vertex-file-upload \${className}\`}>
      <div 
        className={\`vertex-file-drop-zone \${isDragOver ? 'vertex-file-drop-zone--dragover' : ''}\`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => fileInputRef.current?.click()}
      >
        <div className="vertex-file-icon">📁</div>
        <p className="vertex-file-text">
          <strong>Click to upload</strong> or drag and drop
        </p>
        <p className="vertex-file-hint">
          {accept === '*' ? 'Any file type' : accept} up to {maxSize / 1024 / 1024}MB
        </p>
        <input
          ref={fileInputRef}
          type="file"
          className="vertex-file-input"
          multiple={multiple}
          accept={accept}
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>
      
      {files.length > 0 && (
        <div className="vertex-file-list">
          {files.map((file, index) => (
            <div key={index} className="vertex-file-item">
              <div className="vertex-file-info">
                <span className="vertex-file-name">{file.name}</span>
                <span className="vertex-file-size">{formatFileSize(file.size)}</span>
              </div>
              <button 
                className="vertex-file-remove"
                onClick={() => removeFile(index)}
                aria-label={\`Remove \${file.name}\`}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileUpload;`;

const codeTabs = [
  { label: 'HTML', code: fileUploadHtml, lang: 'html' },
  { label: 'CSS', code: fileUploadCss, lang: 'css' },
  { label: 'React', code: fileUploadReact, lang: 'jsx' }
];

const FileUpload = () => {
  const [activeTab, setActiveTab] = useState('HTML');
  const [copied, setCopied] = useState(false);
  const [files, setFiles] = useState([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);

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

  const handleFiles = (newFiles) => {
    const validFiles = Array.from(newFiles).filter(file => {
      if (file.size > 10 * 1024 * 1024) {
        alert(`File ${file.name} is too large. Maximum size is 10MB`);
        return false;
      }
      return true;
    });

    setFiles([...files, ...validFiles]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const removeFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="vertex-component-block" aria-label="File Upload component demo">
      <h2>File Upload</h2>
      <p className="vertex-component-description">
        Drag and drop file upload component with file validation and preview.
      </p>
      <div className="vertex-preview" style={{ marginBottom: '1rem' }}>
        <div className="vertex-file-upload">
          <div 
            className={`vertex-file-drop-zone ${isDragOver ? 'vertex-file-drop-zone--dragover' : ''}`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={() => fileInputRef.current?.click()}
          >
            <div className="vertex-file-icon">📁</div>
            <p className="vertex-file-text">
              <strong>Click to upload</strong> or drag and drop
            </p>
            <p className="vertex-file-hint">PNG, JPG, PDF up to 10MB</p>
            <input
              ref={fileInputRef}
              type="file"
              className="vertex-file-input"
              multiple
              accept="image/*,.pdf"
              onChange={(e) => handleFiles(e.target.files)}
            />
          </div>
          
          {files.length > 0 && (
            <div className="vertex-file-list">
              {files.map((file, index) => (
                <div key={index} className="vertex-file-item">
                  <div className="vertex-file-info">
                    <span className="vertex-file-name">{file.name}</span>
                    <span className="vertex-file-size">{formatFileSize(file.size)}</span>
                  </div>
                  <button 
                    className="vertex-file-remove"
                    onClick={() => removeFile(index)}
                    aria-label={`Remove ${file.name}`}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
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

export default FileUpload;
