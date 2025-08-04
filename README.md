# 🎨 Vertex UI Toolkit

<div align="center">

![Vertex UI Toolkit](https://img.shields.io/badge/Vertex-UI%20Toolkit-4f46e5?style=for-the-badge&logo=react&logoColor=white)
![React](https://img.shields.io/badge/React-19.1.0-61dafb?style=for-the-badge&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7.0.4-646cff?style=for-the-badge&logo=vite&logoColor=white)
![SCSS](https://img.shields.io/badge/SCSS-Modular-cf649a?style=for-the-badge&logo=sass&logoColor=white)

**Modern, accessible, and copy-ready React components for rapid development**

[🚀 Live Demo](https://your-demo-url.com) • [📖 Documentation](https://your-docs-url.com) • [🎯 Examples](https://your-examples-url.com)

</div>

---

## ✨ Features

<table>
<tr>
<td width="50%">

### 🎯 **Developer Experience**

- **Copy-Paste Ready** - No installation required
- **Zero Configuration** - Works immediately
- **Modern React Patterns** - Hooks, composition, performance
- **TypeScript Support** - Full type definitions included
- **Comprehensive Examples** - HTML, CSS, and JavaScript

</td>
<td width="50%">

### 🎨 **Design Excellence**

- **30+ Premium Components** - Production-ready quality
- **Modern Design System** - Consistent tokens and patterns
- **Smooth Animations** - Micro-interactions and transitions
- **Responsive Design** - Mobile-first approach
- **Dark Mode Ready** - Built-in theme support

</td>
</tr>
<tr>
<td width="50%">

### ♿ **Accessibility First**

- **WCAG 2.1 AA Compliant** - Full accessibility support
- **Keyboard Navigation** - Complete keyboard accessibility
- **Screen Reader Optimized** - Proper ARIA implementation
- **Focus Management** - Logical focus flow
- **High Contrast Support** - Works with accessibility tools

</td>
<td width="50%">

### ⚡ **Performance Optimized**

- **Lightweight Bundle** - Minimal footprint
- **Tree Shakeable** - Import only what you need
- **CSS Modules** - Scoped styling, no conflicts
- **Modern Build Tools** - Vite for fast development
- **Optimized Assets** - Compressed and cached

</td>
</tr>
</table>

---

## 🚀 Quick Start

### Option 1: Copy & Paste (Recommended)

1. Find the component you need
2. Copy the HTML, CSS, and JavaScript code
3. Paste into your project - it works immediately!

### Option 2: Clone & Explore

```bash
# Clone the repository
git clone https://github.com/hassanrrraza/vertex-ui-toolkit.git

# Navigate to the project
cd vertex-ui-toolkit

# Install dependencies
npm install

# Start development server
npm run dev
```

---

## 📦 Component Library

<details>
<summary><strong>🔤 Input Components (8)</strong></summary>

| Component            | Description                           | Features                                  |
| -------------------- | ------------------------------------- | ----------------------------------------- |
| **Input Field**      | Enhanced text inputs with validation  | Floating labels, icons, validation states |
| **Select Dropdown**  | Searchable select with custom options | Multi-select, search, custom styling      |
| **Checkbox & Radio** | Grouped form controls                 | Indeterminate states, custom styling      |
| **Toggle Switch**    | Modern on/off controls                | Animated transitions, size variants       |
| **Date Picker**      | Native date input with styling        | Range selection, validation               |
| **File Upload**      | Drag & drop file handling             | Progress indicators, file preview         |
| **Rating**           | Interactive star ratings              | Half ratings, custom icons                |
| **Slider**           | Range input with marks                | Tooltips, custom styling                  |

</details>

<details>
<summary><strong>💬 Feedback Components (7)</strong></summary>

| Component    | Description                  | Features                                  |
| ------------ | ---------------------------- | ----------------------------------------- |
| **Alert**    | Contextual feedback messages | Icons, actions, auto-dismiss              |
| **Toast**    | Floating notifications       | Position management, stacking             |
| **Modal**    | Dialog overlays              | Multiple sizes, animations, accessibility |
| **Tooltip**  | Hover information            | Smart positioning, delays                 |
| **Loader**   | Loading state indicators     | Multiple styles, sizes                    |
| **Badge**    | Count and status indicators  | Variants, positioning                     |
| **Skeleton** | Loading placeholders         | Content-aware shapes                      |

</details>

<details>
<summary><strong>🧭 Navigation Components (6)</strong></summary>

| Component       | Description             | Features                     |
| --------------- | ----------------------- | ---------------------------- |
| **Navbar**      | Responsive navigation   | Mobile hamburger, dropdowns  |
| **Tabs**        | Content organization    | Keyboard navigation, dynamic |
| **Pagination**  | Page navigation         | Customizable, accessible     |
| **Breadcrumbs** | Hierarchical navigation | Auto-truncation, separators  |
| **Drawer**      | Slide-out panels        | Multiple positions, overlay  |
| **Accordion**   | Expandable content      | Single/multiple expand       |

</details>

<details>
<summary><strong>📐 Layout Components (9)</strong></summary>

| Component        | Description             | Features                           |
| ---------------- | ----------------------- | ---------------------------------- |
| **Button**       | Enhanced action buttons | 7+ variants, icons, loading states |
| **Card**         | Content containers      | Media support, interactive states  |
| **Table**        | Data display            | Sorting, filtering, responsive     |
| **Timeline**     | Chronological events    | Vertical/horizontal, icons         |
| **Stepper**      | Multi-step processes    | Progress indication, validation    |
| **Avatar**       | User profile images     | Fallbacks, status indicators       |
| **Chip**         | Tags and filters        | Removable, interactive             |
| **List Group**   | Organized content lists | Interactive, nested                |
| **Progress Bar** | Task completion         | Animated, labeled                  |

</details>

---

## 🎨 Design System

### Color Palette

```scss
// Primary Colors
$color-primary-500: #4f46e5; // Indigo
$color-success-500: #22c55e; // Green
$color-warning-500: #f59e0b; // Amber
$color-danger-500: #ef4444; // Red

// Neutral Colors
$color-neutral-50: #f8fafc; // Light
$color-neutral-900: #0f172a; // Dark
```

### Typography Scale

```scss
$text-xs: 0.75rem; // 12px
$text-sm: 0.875rem; // 14px
$text-base: 1rem; // 16px
$text-lg: 1.125rem; // 18px
$text-xl: 1.25rem; // 20px
```

### Spacing System

```scss
$space-1: 0.25rem; // 4px
$space-2: 0.5rem; // 8px
$space-4: 1rem; // 16px
$space-6: 1.5rem; // 24px
$space-8: 2rem; // 32px
```

---

## 💻 Usage Examples

### Basic Button

```jsx
// React Component
<button className="vertex-btn vertex-btn--primary">
  <span className="vertex-btn__text">Click me</span>
</button>
```

### Enhanced Input

```jsx
// With validation and icons
<div className="vertex-input-group">
  <label className="vertex-input-label">Email</label>
  <div className="vertex-input-icon vertex-input-icon--left">
    <MailIcon />
  </div>
  <input
    type="email"
    className="vertex-input vertex-input--with-icon-left"
    placeholder="Enter your email..."
  />
</div>
```

### Interactive Modal

```jsx
// Full-featured modal
<div className="vertex-modal vertex-modal--open">
  <div className="vertex-modal-backdrop"></div>
  <div className="vertex-modal-container">
    <div className="vertex-modal-content">
      <div className="vertex-modal-header">
        <h2 className="vertex-modal-title">Confirm Action</h2>
        <button className="vertex-modal-close">×</button>
      </div>
      <div className="vertex-modal-body">
        <p>Are you sure you want to proceed?</p>
      </div>
      <div className="vertex-modal-footer">
        <button className="vertex-btn vertex-btn--ghost">Cancel</button>
        <button className="vertex-btn vertex-btn--primary">Confirm</button>
      </div>
    </div>
  </div>
</div>
```

---

## 🛠️ Technical Stack

<div align="center">

| Technology      | Version | Purpose                 |
| --------------- | ------- | ----------------------- |
| **React**       | 19.1.0  | Component framework     |
| **Vite**        | 7.0.4   | Build tool & dev server |
| **SCSS**        | 1.89.2  | Styling & design system |
| **React Icons** | 5.5.0   | Icon library            |
| **PrismJS**     | 1.30.0  | Syntax highlighting     |

</div>

---

## 📱 Browser Support

<div align="center">

| Chrome | Firefox | Safari | Edge   | Mobile                  |
| ------ | ------- | ------ | ------ | ----------------------- |
| ✅ 90+ | ✅ 88+  | ✅ 14+ | ✅ 90+ | ✅ iOS 14+, Android 10+ |

</div>

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### 🐛 Bug Reports

- Use the [issue tracker](https://github.com/hassanrrraza/vertex-ui-toolkit/issues)
- Include browser, OS, and reproduction steps
- Provide minimal code examples

### 💡 Feature Requests

- Check existing [discussions](https://github.com/hassanrrraza/vertex-ui-toolkit/discussions)
- Describe the use case and expected behavior
- Consider accessibility and mobile implications

### 🔧 Development Setup

```bash
# Fork and clone the repo
git clone https://github.com/hassanrrraza/vertex-ui-toolkit.git

# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm test

# Build for production
npm run build
```

### 📋 Development Guidelines

- Follow the existing code style
- Add tests for new features
- Update documentation
- Ensure accessibility compliance
- Test on multiple browsers

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2024 Vertex UI Toolkit

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software...
```

---

## 🙏 Acknowledgments

- **React Team** - For the amazing framework
- **Vite Team** - For the lightning-fast build tool
- **Heroicons** - For beautiful SVG icons
- **Tailwind CSS** - For design system inspiration
- **Community** - For feedback and contributions

---

## 📊 Project Stats

<div align="center">

![GitHub stars](https://img.shields.io/github/stars/yourusername/vertex-ui-toolkit?style=social)
![GitHub forks](https://img.shields.io/github/forks/yourusername/vertex-ui-toolkit?style=social)
![GitHub issues](https://img.shields.io/github/issues/yourusername/vertex-ui-toolkit)
![GitHub pull requests](https://img.shields.io/github/issues-pr/yourusername/vertex-ui-toolkit)

**30+ Components** • **WCAG 2.1 AA** • **Mobile First** • **Zero Dependencies**

</div>

---

<div align="center">

**Made with ❤️ by developers, for developers**

[⭐ Star this repo](https://github.com/hassanrrraza/vertex-ui-toolkit) if you find it useful!

</div>
