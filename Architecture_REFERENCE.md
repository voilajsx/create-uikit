# 📋 **create-uikit CLI Architecture Document**

## 🎯 **Project Overview**

Restructured `create-uikit` CLI to support multiple project types with a clean, modular template system.

## 📁 **Complete File Structure**

### **Root Files (4 files)**

```
create-uikit/
├── index.js                    # Main CLI orchestrator
├── package.json               # Package metadata
├── README.md                  # Documentation
└── .gitignore                 # Git ignore rules
```

### **Template Files (26 files)**

```
templates/
├── uikit/                     # Basic React app templates (8 files)
│   ├── package.json.template
│   ├── vite.config.template
│   ├── index.html.template
│   ├── gitignore.template
│   ├── App.jsx.template
│   ├── App.tsx.template
│   ├── main.jsx.template
│   └── main.tsx.template
│
└── extension/                 # Chrome extension templates (18 files)
    ├── manifest.json.template
    ├── package.json.template
    ├── vite.config.template
    ├── gitignore.template
    ├── README.md.template
    └── src/
        ├── popup/
        │   ├── index.html.template
        │   ├── popup.jsx.template
        │   ├── popup.tsx.template
        │   ├── PopupApp.jsx.template
        │   └── PopupApp.tsx.template
        ├── options/
        │   ├── index.html.template
        │   ├── options.jsx.template
        │   ├── options.tsx.template
        │   ├── OptionsApp.jsx.template
        │   └── OptionsApp.tsx.template
        ├── content/
        │   └── content.js.template
        ├── background/
        │   └── background.js.template
        └── shared/
            ├── config.js.template
            ├── utils.js.template
            └── api.js.template
```

## 🔢 **File Count Summary**

| Category                | Count  | Details                      |
| ----------------------- | ------ | ---------------------------- |
| **Root Files**          | 4      | CLI core, docs, config       |
| **UIKit Templates**     | 8      | Basic React app scaffolding  |
| **Extension Templates** | 18     | Chrome extension scaffolding |
| **TOTAL FILES**         | **30** | Complete CLI package         |

## 📝 **File Header Comments & Documentation Standards**

### **1. Root Files Documentation**

#### **index.js**

```javascript
#!/usr/bin/env node

/**
 * create-uikit - CLI for scaffolding UIKit projects and Chrome extensions
 * Supports multiple project types with modular template system
 * @module create-uikit
 * @file index.js
 * @version 2.0.0
 * @author VoilaJSX
 */
```

**Function Documentation Standards:**

- **parseArguments()** - Parse CLI arguments and flags
- **generateProjectName()** - Convert path to valid package name
- **createUIKitProject()** - Generate React app from UIKit templates
- **createExtensionProject()** - Generate Chrome extension from templates
- **processTemplate()** - Replace placeholders in template files
- **installDependencies()** - Install npm packages with error handling
- **showSuccess()** - Display completion message with next steps

### **2. UIKit Template Documentation**

#### **App.jsx.template / App.tsx.template**

```javascript
/**
 * Main App component with beautiful UIKit landing page
 * Showcases themes, components, and responsive design
 * @module {{PROJECT_NAME}}
 * @file src/App.{{EXTENSION}}
 * @generated create-uikit v2.0.0
 */
```

#### **main.jsx.template / main.tsx.template**

```javascript
/**
 * Application entry point with ThemeProvider setup
 * Initializes React app with UIKit theme system
 * @module {{PROJECT_NAME}}
 * @file src/main.{{EXTENSION}}
 * @generated create-uikit v2.0.0
 */
```

#### **vite.config.template**

```javascript
/**
 * Vite configuration for UIKit React application
 * Configured with React plugin and Tailwind CSS v4
 * @file vite.config.{{EXTENSION}}
 * @generated create-uikit v2.0.0
 */
```

**Function Documentation in Templates:**

- **ThemeSelector()** - Interactive theme switching component
- **HeroSection()** - Main landing page hero area
- **FeatureGrid()** - Feature showcase grid layout
- **StatsSection()** - Animated statistics display

### **3. Extension Template Documentation**

#### **PopupApp.jsx.template / PopupApp.tsx.template**

```javascript
/**
 * Main popup component for Chrome extension
 * Provides extension UI with theme support and dummy functionality
 * @module {{PROJECT_NAME}}
 * @file src/popup/PopupApp.{{EXTENSION}}
 * @generated create-uikit v2.0.0
 */
```

**Function Documentation Standards:**

- **initializePopup()** - Load settings and current tab information
- **handleMainAction()** - Execute primary extension functionality
- **openOptions()** - Navigate to extension settings page
- **canPerformAction()** - Check if current page supports extension actions

#### **OptionsApp.jsx.template / OptionsApp.tsx.template**

```javascript
/**
 * Extension options/settings page component
 * Manages extension configuration with theme selection
 * @module {{PROJECT_NAME}}
 * @file src/options/OptionsApp.{{EXTENSION}}
 * @generated create-uikit v2.0.0
 */
```

**Function Documentation Standards:**

- **loadSettings()** - Retrieve settings from Chrome storage
- **saveSettings()** - Persist settings to Chrome storage
- **resetSettings()** - Restore default configuration
- **updateSetting()** - Update individual setting values

#### **content.js.template**

```javascript
/**
 * Content script for page interaction and data extraction
 * Communicates with popup via Chrome message passing API
 * @module {{PROJECT_NAME}}
 * @file src/content/content.js
 * @generated create-uikit v2.0.0
 */
```

**Function Documentation Standards:**

- **extractPageData()** - Analyze page content and extract relevant data
- **sendMessageToPopup()** - Communicate results to extension popup
- **handleMessage()** - Process messages from popup/background
- **isPageSupported()** - Check if current page type is supported

#### **background.js.template**

```javascript
/**
 * Background service worker for extension coordination
 * Handles installation, storage, and inter-component messaging
 * @module {{PROJECT_NAME}}
 * @file src/background/background.js
 * @generated create-uikit v2.0.0
 */
```

**Function Documentation Standards:**

- **handleInstallation()** - Setup default settings on first install
- **setupDefaultSettings()** - Initialize extension configuration
- **handleMessage()** - Route messages between extension components
- **migrateSettings()** - Update settings format for new versions

#### **Shared Utilities Documentation**

#### **config.js.template**

```javascript
/**
 * Extension configuration constants and default settings
 * Centralized configuration for consistent behavior
 * @module {{PROJECT_NAME}}
 * @file src/shared/config.js
 * @generated create-uikit v2.0.0
 */
```

#### **utils.js.template**

```javascript
/**
 * Utility functions for Chrome extension operations
 * Storage helpers, messaging utilities, and common functions
 * @module {{PROJECT_NAME}}
 * @file src/shared/utils.js
 * @generated create-uikit v2.0.0
 */
```

**Function Documentation Standards:**

- **storage.get()** - Retrieve data from Chrome storage with error handling
- **storage.set()** - Save data to Chrome storage with validation
- **messaging.sendToContent()** - Send message to content script
- **messaging.sendToBackground()** - Send message to background script
- **debug.log()** - Conditional logging for development

#### **api.js.template**

```javascript
/**
 * External API integration template and data fetching utilities
 * Provides foundation for third-party service integration
 * @module {{PROJECT_NAME}}
 * @file src/shared/api.js
 * @generated create-uikit v2.0.0
 */
```

**Function Documentation Standards:**

- **apiRequest()** - Generic HTTP request handler with timeout
- **exampleAPI.getData()** - Template for external API integration
- **handleAPIError()** - Standardized error handling for API calls
- **validateResponse()** - Response data validation and transformation

## 🎯 **Documentation Conventions**

### **File Header Standards**

Every generated file includes:

- ✅ **Purpose description** - What the file does
- ✅ **Module declaration** - Project namespace
- ✅ **File path** - Relative location in project
- ✅ **Generation note** - Created by create-uikit
- ✅ **Template placeholders** - {{PROJECT_NAME}}, {{EXTENSION}}

### **Function Documentation Standards**

All functions include:

- ✅ **Purpose description** - Clear, single-sentence explanation
- ✅ **Parameter documentation** - @param with types and descriptions
- ✅ **Return documentation** - @returns with type and description
- ✅ **Error handling notes** - Expected error conditions
- ✅ **Usage examples** - When helpful for complex functions

### **Template Placeholder System**

```javascript
// Placeholders replaced during generation:
{{PROJECT_NAME}}    → "my-awesome-app"
{{EXTENSION}}       → "jsx" or "tsx"
{{FILE_EXTENSION}}  → "js" or "ts"
{{PACKAGE_NAME}}    → "my-awesome-app"
{{DESCRIPTION}}     → Project description
{{AUTHOR}}          → Project author
```

### **JSDoc Standards for Generated Code**

```javascript
/**
 * Component description
 * @param {Object} props - Component props
 * @param {string} [props.className] - Additional CSS classes
 * @param {React.ReactNode} props.children - Child components
 * @returns {JSX.Element} Component element
 */
function MyComponent({ className, children }) {
  // Implementation
}

/**
 * Utility function description
 * @param {string} data - Input data to process
 * @param {Object} [options] - Optional configuration
 * @param {boolean} [options.validate=true] - Enable validation
 * @returns {Promise<Object>} Processed result
 * @throws {Error} When validation fails
 */
async function processData(data, options = {}) {
  // Implementation
}
```

## 🔧 **CLI Function Documentation**

### **Core CLI Functions**

```javascript
/**
 * Parse command line arguments and extract project configuration
 * @returns {Object} Parsed configuration
 * @returns {string} returns.projectPath - Target directory path
 * @returns {boolean} returns.useJsx - Use JSX instead of TypeScript
 * @returns {boolean} returns.isExtension - Generate Chrome extension
 */
function parseArguments() {}

/**
 * Convert file path to valid npm package name
 * @param {string} projectPath - Input path (may contain slashes)
 * @returns {string} Valid package name (kebab-case)
 * @example generateProjectName('apps/auth/core') → 'apps-auth-core'
 */
function generateProjectName(projectPath) {}

/**
 * Create UIKit React application from templates
 * @param {string} projectPath - Target directory
 * @param {boolean} useJsx - Use JSX instead of TypeScript
 * @returns {Promise<void>}
 * @throws {Error} When directory exists or creation fails
 */
async function createUIKitProject(projectPath, useJsx) {}

/**
 * Create Chrome extension from templates
 * @param {string} projectPath - Target directory
 * @param {boolean} useJsx - Use JSX instead of TypeScript
 * @returns {Promise<void>}
 * @throws {Error} When directory exists or creation fails
 */
async function createExtensionProject(projectPath, useJsx) {}

/**
 * Process template file and replace placeholders
 * @param {string} templatePath - Path to template file
 * @param {Object} variables - Replacement variables
 * @param {string} variables.PROJECT_NAME - Project name
 * @param {string} variables.EXTENSION - File extension (jsx/tsx)
 * @returns {string} Processed file content
 */
function processTemplate(templatePath, variables) {}
```

## 🎨 **Template Content Documentation Strategy**

### **UIKit Templates**

- **Educational comments** - Explain UIKit patterns and best practices
- **Feature callouts** - Highlight theme system and component usage
- **Customization hints** - Guide developers on extending functionality
- **Performance notes** - Document optimization opportunities

### **Extension Templates**

- **Chrome API explanations** - Document extension-specific patterns
- **Security considerations** - Highlight permission and CSP requirements
- **Development workflow** - Explain build and testing process
- **Extension architecture** - Document component communication patterns

## 🚀 **Generated Documentation Quality**

### **For Beginners**

- ✅ **Clear explanations** - Non-technical language where possible
- ✅ **Usage examples** - Practical code demonstrations
- ✅ **Common patterns** - Document established best practices
- ✅ **Troubleshooting** - Anticipated issues and solutions

### **For Experienced Developers**

- ✅ **Architecture decisions** - Why certain patterns were chosen
- ✅ **Extension points** - How to customize and extend functionality
- ✅ **Performance implications** - Optimization opportunities
- ✅ **Integration guidance** - How to add external services

---

**Total: 30 files** with comprehensive documentation standards ensuring generated projects are educational, maintainable, and production-ready.
