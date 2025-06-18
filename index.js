#!/usr/bin/env node

/**
 * create-uikit - CLI for scaffolding UIKit projects and Chrome extensions
 * Supports multiple project types with modular template system
 * @module create-uikit
 * @file index.js
 * @version 2.0.0
 * @author VoilaJSX
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ANSI color codes for terminal output
const colors = {
  green: '\x1b[32m',
  blue: '\x1b[34m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  cyan: '\x1b[36m',
  magenta: '\x1b[35m',
};

/**
 * Log colored message to console
 * @param {string} message - Message to display
 * @param {string} color - Color name from colors object
 */
function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

/**
 * Parse command line arguments and extract project configuration
 * @returns {Object} Parsed configuration
 * @returns {string} returns.projectPath - Target directory path
 * @returns {boolean} returns.useJsx - Use JSX instead of TypeScript
 * @returns {boolean} returns.isExtension - Generate Chrome extension
 */
function parseArguments() {
  const args = process.argv.slice(2);
  let projectPath = 'voilajs-uikit-app';
  let useJsx = false;
  let isExtension = false;

  // Parse arguments
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];

    if (arg === '--jsx' || arg === '-j') {
      useJsx = true;
    } else if (arg === '--extension' || arg === '-e') {
      isExtension = true;
    } else if (arg === '--help' || arg === '-h') {
      showHelp();
      process.exit(0);
    } else if (!arg.startsWith('-')) {
      projectPath = arg;
    }
  }

  // Update default project name for extensions
  if (isExtension && projectPath === 'voilajs-uikit-app') {
    projectPath = 'voilajs-uikit-extension';
  }

  return { projectPath, useJsx, isExtension };
}

/**
 * Convert file path to valid npm package name
 * @param {string} projectPath - Input path (may contain slashes)
 * @returns {string} Valid package name (kebab-case)
 * @example generateProjectName('apps/auth/core') → 'apps-auth-core'
 */
function generateProjectName(projectPath) {
  const normalizedPath = projectPath
    .replace(/^\/+|\/+$/g, '') // Remove leading/trailing slashes
    .replace(/\/+/g, '-') // Replace slashes with dashes
    .toLowerCase() // Convert to lowercase
    .replace(/[^a-z0-9-]/g, '') // Remove invalid characters
    .replace(/-+/g, '-') // Collapse multiple dashes
    .replace(/^-|-$/g, ''); // Remove leading/trailing dashes

  return normalizedPath || 'voilajs-uikit-app';
}

/**
 * Process template file and replace placeholders
 * @param {string} templatePath - Path to template file
 * @param {Object} variables - Replacement variables
 * @param {string} variables.PROJECT_NAME - Project name
 * @param {string} variables.PACKAGE_NAME - Package name
 * @param {string} variables.EXTENSION - File extension (jsx/tsx)
 * @param {string} variables.FILE_EXTENSION - JS file extension (js/ts)
 * @param {string} variables.DESCRIPTION - Project description
 * @param {string} variables.AUTHOR - Project author
 * @returns {string} Processed file content
 */
function processTemplate(templatePath, variables) {
  if (!fs.existsSync(templatePath)) {
    throw new Error(`Template file not found: ${templatePath}`);
  }

  let content = fs.readFileSync(templatePath, 'utf8');

  // Replace all template variables
  Object.entries(variables).forEach(([key, value]) => {
    const placeholder = new RegExp(`{{${key}}}`, 'g');
    content = content.replace(placeholder, value);
  });

  return content;
}

/**
 * Copy icon templates to extension project
 * @param {string} extensionPath - Extension project path
 */
function copyIconTemplates(extensionPath) {
  const iconsSourceDir = path.join(
    __dirname,
    'templates',
    'extension',
    'icons'
  );
  const iconsTargetDir = path.join(extensionPath, 'public', 'icons');

  // Create icons directory
  fs.mkdirSync(iconsTargetDir, { recursive: true });

  // Copy each icon file
  const iconFiles = [
    'icon-16.png',
    'icon-32.png',
    'icon-48.png',
    'icon-128.png',
  ];

  iconFiles.forEach((iconFile) => {
    const sourceFile = path.join(iconsSourceDir, iconFile);
    const targetFile = path.join(iconsTargetDir, iconFile);

    if (fs.existsSync(sourceFile)) {
      fs.copyFileSync(sourceFile, targetFile);
      log(`📋 Copied ${iconFile}`, 'blue');
    } else {
      log(`⚠️  Missing template: ${iconFile}`, 'yellow');
    }
  });
}

/**
 * Create UIKit React application from templates
 * @param {string} projectPath - Target directory
 * @param {boolean} useJsx - Use JSX instead of TypeScript
 * @returns {Promise<void>}
 * @throws {Error} When directory exists or creation fails
 */
async function createUIKitProject(projectPath, useJsx) {
  const projectName = generateProjectName(projectPath);
  const fullProjectPath = path.join(process.cwd(), projectPath);
  const templatesDir = path.join(__dirname, 'templates', 'uikit');

  const templateVars = {
    PROJECT_NAME: projectName,
    PACKAGE_NAME: projectName,
    EXTENSION: useJsx ? 'jsx' : 'tsx',
    FILE_EXTENSION: useJsx ? 'js' : 'ts',
    DESCRIPTION: `UIKit React application`,
    AUTHOR: 'VoilaJSX',
  };

  log('🚀 Creating UIKit React project...', 'blue');
  log(`📁 Project path: ${projectPath}`, 'green');
  log(`📦 Project name: ${projectName}`, 'green');
  log(`⚛️  File type: ${useJsx ? 'JSX' : 'TypeScript'}`, 'cyan');

  // Create project directory
  fs.mkdirSync(fullProjectPath, { recursive: true });
  process.chdir(fullProjectPath);

  // Create package.json
  log('📦 Creating package.json...', 'yellow');
  const packageContent = processTemplate(
    path.join(templatesDir, 'package.json.template'),
    templateVars
  );
  fs.writeFileSync('package.json', packageContent);

  // Create vite config
  log('⚡ Setting up Vite config...', 'yellow');
  const viteConfigFile = useJsx ? 'vite.config.js' : 'vite.config.ts';
  const viteContent = processTemplate(
    path.join(templatesDir, 'vite.config.template'),
    templateVars
  );
  fs.writeFileSync(viteConfigFile, viteContent);

  // Create TypeScript config (if not JSX)
  if (!useJsx) {
    log('📝 Setting up TypeScript...', 'yellow');
    // TypeScript configs are static, no template processing needed
    const tsConfig = {
      compilerOptions: {
        target: 'ES2020',
        useDefineForClassFields: true,
        lib: ['ES2020', 'DOM', 'DOM.Iterable'],
        module: 'ESNext',
        skipLibCheck: true,
        moduleResolution: 'bundler',
        allowImportingTsExtensions: true,
        resolveJsonModule: true,
        isolatedModules: true,
        noEmit: true,
        jsx: 'react-jsx',
        strict: true,
        noUnusedLocals: true,
        noUnusedParameters: true,
        noFallthroughCasesInSwitch: true,
      },
      include: ['src'],
      references: [{ path: './tsconfig.node.json' }],
    };
    fs.writeFileSync('tsconfig.json', JSON.stringify(tsConfig, null, 2));

    const tsConfigNode = {
      compilerOptions: {
        composite: true,
        skipLibCheck: true,
        module: 'ESNext',
        moduleResolution: 'bundler',
        allowSyntheticDefaultImports: true,
      },
      include: ['vite.config.ts'],
    };
    fs.writeFileSync(
      'tsconfig.node.json',
      JSON.stringify(tsConfigNode, null, 2)
    );
  }

  // Create source directory
  fs.mkdirSync('src', { recursive: true });

  // Create CSS file (static)
  fs.writeFileSync('src/index.css', '@import "tailwindcss";');

  // Create index.html
  log('🌐 Creating HTML template...', 'yellow');
  const htmlContent = processTemplate(
    path.join(templatesDir, 'index.html.template'),
    templateVars
  );
  fs.writeFileSync('index.html', htmlContent);

  // Create main file
  log(`⚛️ Creating React app (${useJsx ? 'JSX' : 'TypeScript'})...`, 'yellow');
  const mainFile = useJsx ? 'main.jsx' : 'main.tsx';
  const mainContent = processTemplate(
    path.join(templatesDir, `main.${templateVars.EXTENSION}.template`),
    templateVars
  );
  fs.writeFileSync(`src/${mainFile}`, mainContent);

  // Create App file
  const appFile = useJsx ? 'App.jsx' : 'App.tsx';
  const appContent = processTemplate(
    path.join(templatesDir, `App.${templateVars.EXTENSION}.template`),
    templateVars
  );
  fs.writeFileSync(`src/${appFile}`, appContent);

  // Create .gitignore
  const gitignoreContent = processTemplate(
    path.join(templatesDir, 'gitignore.template'),
    templateVars
  );
  fs.writeFileSync('.gitignore', gitignoreContent);
}

/**
 * Create Chrome extension from templates
 * @param {string} projectPath - Target directory
 * @param {boolean} useJsx - Use JSX instead of TypeScript
 * @returns {Promise<void>}
 * @throws {Error} When directory exists or creation fails
 */
async function createExtensionProject(projectPath, useJsx) {
  const projectName = generateProjectName(projectPath);
  const fullProjectPath = path.join(process.cwd(), projectPath);
  const templatesDir = path.join(__dirname, 'templates', 'extension');

  const templateVars = {
    PROJECT_NAME: projectName,
    PACKAGE_NAME: projectName,
    EXTENSION: useJsx ? 'jsx' : 'tsx',
    FILE_EXTENSION: useJsx ? 'js' : 'ts',
    DESCRIPTION: `Chrome extension built with UIKit`,
    AUTHOR: 'VoilaJSX',
  };

  log('🔌 Creating Chrome Extension project...', 'magenta');
  log(`📁 Project path: ${projectPath}`, 'green');
  log(`📦 Project name: ${projectName}`, 'green');
  log(`⚛️  File type: ${useJsx ? 'JSX' : 'TypeScript'}`, 'cyan');

  // Create project directory
  fs.mkdirSync(fullProjectPath, { recursive: true });
  process.chdir(fullProjectPath);

  // Create root files
  log('📦 Creating package.json...', 'yellow');
  const packageContent = processTemplate(
    path.join(templatesDir, 'package.json.template'),
    templateVars
  );
  fs.writeFileSync('package.json', packageContent);

  log('⚡ Setting up Vite config...', 'yellow');
  const viteContent = processTemplate(
    path.join(templatesDir, 'vite.config.template'),
    templateVars
  );
  fs.writeFileSync('vite.config.js', viteContent);

  log('🔧 Creating manifest.json...', 'yellow');
  const manifestContent = processTemplate(
    path.join(templatesDir, 'manifest.json.template'),
    templateVars
  );
  fs.writeFileSync('manifest.json', manifestContent);

  log('📖 Creating README...', 'yellow');
  const readmeContent = processTemplate(
    path.join(templatesDir, 'README.md.template'),
    templateVars
  );
  fs.writeFileSync('README.md', readmeContent);

  // Create .gitignore
  const gitignoreContent = processTemplate(
    path.join(templatesDir, 'gitignore.template'),
    templateVars
  );
  fs.writeFileSync('.gitignore', gitignoreContent);

  // Create source directory structure
  fs.mkdirSync('src', { recursive: true });
  fs.mkdirSync('src/popup', { recursive: true });
  fs.mkdirSync('src/options', { recursive: true });
  fs.mkdirSync('src/content', { recursive: true });
  fs.mkdirSync('src/background', { recursive: true });
  fs.mkdirSync('src/shared', { recursive: true });

  // Copy proper PNG icons
  log('🎨 Copying extension icons...', 'yellow');
  copyIconTemplates(fullProjectPath);

  // Create a note about icons
  const iconReadme = `# Extension Icons

These are template icons for your Chrome extension.

## Required Sizes:
- icon-16.png (16x16) - Extension toolbar icon
- icon-32.png (32x32) - Windows favicon  
- icon-48.png (48x48) - Extension management page
- icon-128.png (128x128) - Chrome Web Store

## Customizing Icons:
1. Replace these PNG files with your own designs
2. Keep the same file names and sizes
3. Use PNG format with transparent background
4. Test in Chrome to ensure they look good

Generated by create-uikit v2.0.0
`;
  fs.writeFileSync('public/icons/README.md', iconReadme);

  // Create popup files
  log('🎨 Creating popup interface...', 'yellow');
  const popupFiles = [
    'index.html.template',
    `popup.${templateVars.EXTENSION}.template`,
    `PopupApp.${templateVars.EXTENSION}.template`,
  ];

  popupFiles.forEach((file) => {
    const content = processTemplate(
      path.join(templatesDir, 'src', 'popup', file),
      templateVars
    );
    const outputFile = file.replace('.template', '');
    fs.writeFileSync(`src/popup/${outputFile}`, content);
  });

  // Create options files
  log('⚙️ Creating options page...', 'yellow');
  const optionsFiles = [
    'index.html.template',
    `options.${templateVars.EXTENSION}.template`,
    `OptionsApp.${templateVars.EXTENSION}.template`,
  ];

  optionsFiles.forEach((file) => {
    const content = processTemplate(
      path.join(templatesDir, 'src', 'options', file),
      templateVars
    );
    const outputFile = file.replace('.template', '');
    fs.writeFileSync(`src/options/${outputFile}`, content);
  });

  // Create content script
  log('📄 Creating content script...', 'yellow');
  const contentContent = processTemplate(
    path.join(templatesDir, 'src', 'content', 'content.js.template'),
    templateVars
  );
  fs.writeFileSync('src/content/content.js', contentContent);

  // Create background script
  log('🔄 Creating background script...', 'yellow');
  const backgroundContent = processTemplate(
    path.join(templatesDir, 'src', 'background', 'background.js.template'),
    templateVars
  );
  fs.writeFileSync('src/background/background.js', backgroundContent);

  // Create shared utilities
  log('🛠️ Creating shared utilities...', 'yellow');
  const sharedFiles = [
    'config.js.template',
    'utils.js.template',
    'api.js.template',
  ];

  sharedFiles.forEach((file) => {
    const content = processTemplate(
      path.join(templatesDir, 'src', 'shared', file),
      templateVars
    );
    const outputFile = file.replace('.template', '');
    fs.writeFileSync(`src/shared/${outputFile}`, content);
  });
}

/**
 * Install project dependencies with error handling
 * @returns {Promise<boolean>} Success status
 */
async function installDependencies() {
  log('📥 Installing dependencies...', 'yellow');
  log('   This may take a few minutes...', 'blue');

  try {
    execSync('npm install --legacy-peer-deps', { stdio: 'inherit' });
    return true;
  } catch (error) {
    log('❌ Failed to install dependencies', 'red');
    log(
      'Run "npm install --legacy-peer-deps" manually in the project directory',
      'yellow'
    );
    return false;
  }
}

/**
 * Display completion message with next steps
 * @param {string} projectPath - Project directory path
 * @param {boolean} isExtension - Whether project is Chrome extension
 * @param {boolean} useJsx - Whether using JSX
 */
function showSuccess(projectPath, isExtension, useJsx) {
  log('\n✅ Project created successfully!', 'green');

  if (isExtension) {
    log('\n🔌 Chrome Extension Commands:', 'bold');
    log(`   cd ${projectPath}`, 'blue');
    log('   npm run build', 'blue');
    log('   npm run package', 'blue');
    log('\n📖 Extension Setup:', 'bold');
    log('   1. Build the extension', 'cyan');
    log('   2. Open chrome://extensions/', 'cyan');
    log('   3. Enable "Developer mode"', 'cyan');
    log('   4. Click "Load unpacked" and select dist/ folder', 'cyan');
  } else {
    log('\n🚀 Get started with:', 'bold');
    log(`   cd ${projectPath}`, 'blue');
    log('   npm run dev', 'blue');
  }

  log('\n📖 Documentation: https://voilajsx.github.io/uikit/', 'green');
  log('🎨 Themes: 6 professional themes included', 'green');
  log('🧱 Components: 35+ shadcn/ui components enhanced', 'green');
  log(`⚛️  Files: ${useJsx ? 'JSX' : 'TypeScript'} format`, 'cyan');
}

/**
 * Display usage help and examples
 */
function showHelp() {
  log('\n📖 create-uikit v2.0.0 - UIKit Projects & Chrome Extensions', 'bold');
  log('\n🚀 Usage:', 'bold');
  log('   npx create-uikit [path] [options]', 'blue');

  log('\n📁 UIKit React App Examples:', 'bold');
  log('   npx create-uikit my-app', 'green');
  log('   npx create-uikit apps/auth/core --jsx', 'green');
  log('   npx create-uikit /dashboard/admin', 'green');

  log('\n🔌 Chrome Extension Examples:', 'bold');
  log('   npx create-uikit my-extension --extension', 'magenta');
  log('   npx create-uikit tools/page-analyzer --extension --jsx', 'magenta');
  log('   npx create-uikit extensions/word-scout --extension', 'magenta');

  log('\n🔧 Options:', 'bold');
  log('   --jsx, -j         Use JSX instead of TypeScript', 'yellow');
  log(
    '   --extension, -e   Create Chrome extension instead of React app',
    'yellow'
  );
  log('   --help, -h        Show this help message', 'yellow');

  log('\n📦 Path-based naming:', 'bold');
  log('   /apps/auth/core  →  apps-auth-core', 'cyan');
  log('   auth/dashboard   →  auth-dashboard', 'cyan');
  log('   my-app          →  my-app', 'cyan');

  log('\n🎯 Project Types:', 'bold');
  log('   React App:      Complete UIKit React application', 'green');
  log('   Extension:      Chrome Manifest V3 extension with UIKit', 'magenta');
}

/**
 * Main CLI execution function
 */
async function main() {
  try {
    const { projectPath, useJsx, isExtension } = parseArguments();
    const fullProjectPath = path.join(process.cwd(), projectPath);

    // Check if directory exists
    if (fs.existsSync(fullProjectPath)) {
      log(`❌ Directory ${projectPath} already exists!`, 'red');
      process.exit(1);
    }

    // Create appropriate project type
    if (isExtension) {
      await createExtensionProject(projectPath, useJsx);
    } else {
      await createUIKitProject(projectPath, useJsx);
    }

    // Install dependencies
    const installSuccess = await installDependencies();

    // Show success message
    showSuccess(projectPath, isExtension, useJsx);

    if (!installSuccess) {
      process.exit(1);
    }
  } catch (error) {
    log(`❌ Error: ${error.message}`, 'red');
    process.exit(1);
  }
}

// Run the CLI
main();
