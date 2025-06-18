#!/usr/bin/env node

/**
 * create-uikit - Ultra-simple CLI for UIKit projects with JSX option and path-based naming
 * Usage: npm create uikit [path] [--jsx]
 * @module create-uikit
 * @file index.js
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
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function parseArguments() {
  const args = process.argv.slice(2);
  let projectPath = 'voilajs-uikit-app';
  let useJsx = false;

  // Parse arguments
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    
    if (arg === '--jsx' || arg === '-j') {
      useJsx = true;
    } else if (!arg.startsWith('-')) {
      projectPath = arg;
    }
  }

  return { projectPath, useJsx };
}

function generateProjectName(projectPath) {
  // Convert path to package name format
  // /apps/auth/core -> apps-auth-core
  // auth/dashboard -> auth-dashboard
  // my-app -> my-app
  
  const normalizedPath = projectPath
    .replace(/^\/+|\/+$/g, '') // Remove leading/trailing slashes
    .replace(/\/+/g, '-') // Replace slashes with dashes
    .toLowerCase() // Convert to lowercase
    .replace(/[^a-z0-9-]/g, '') // Remove invalid characters
    .replace(/-+/g, '-') // Collapse multiple dashes
    .replace(/^-|-$/g, ''); // Remove leading/trailing dashes

  return normalizedPath || 'voilajs-uikit-app';
}

function createProject() {
  const { projectPath, useJsx } = parseArguments();
  const projectName = generateProjectName(projectPath);
  const fullProjectPath = path.join(process.cwd(), projectPath);
  const fileExtension = useJsx ? 'jsx' : 'tsx';
  const mainFile = useJsx ? 'main.jsx' : 'main.tsx';
  const appFile = useJsx ? 'App.jsx' : 'App.tsx';

  log('\n🚀 Creating UIKit project...', 'blue');
  log(`📁 Project path: ${projectPath}`, 'green');
  log(`📦 Project name: ${projectName}`, 'green');
  log(`⚛️  File type: ${useJsx ? 'JSX' : 'TypeScript'}`, 'cyan');

  // Check if directory exists
  if (fs.existsSync(fullProjectPath)) {
    log(`❌ Directory ${projectPath} already exists!`, 'red');
    process.exit(1);
  }

  // Create project directory
  fs.mkdirSync(fullProjectPath, { recursive: true });
  process.chdir(fullProjectPath);

  // Create package.json with dynamic name
  log('📦 Creating package.json...', 'yellow');
  const packageJson = {
    name: projectName,
    private: true,
    version: '0.0.0',
    type: 'module',
    scripts: {
      dev: 'vite',
      build: 'vite build',
      preview: 'vite preview',
    },
    dependencies: {
      react: '^18.3.1',
      'react-dom': '^18.3.1',
      '@voilajsx/uikit': 'latest',
      'lucide-react': '^0.515.0',
    },
    devDependencies: {
      '@vitejs/plugin-react': '^4.5.2',
      '@tailwindcss/vite': '^4.1.10',
      vite: '^6.3.5',
      ...(useJsx ? {} : {
        '@types/react': '^18.3.12',
        '@types/react-dom': '^18.3.1',
        typescript: '^5.8.3',
      }),
    },
  };

  fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2));

  // Create vite.config with appropriate extension
  log('⚡ Setting up Vite config...', 'yellow');
  const viteConfigFile = useJsx ? 'vite.config.js' : 'vite.config.ts';
  const viteConfig = `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
})`;

  fs.writeFileSync(viteConfigFile, viteConfig);

  // Create TypeScript config only if not using JSX
  if (!useJsx) {
    log('📝 Setting up TypeScript...', 'yellow');
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

    // Create tsconfig.node.json
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

    fs.writeFileSync('tsconfig.node.json', JSON.stringify(tsConfigNode, null, 2));
  }

  // Create Tailwind CSS v4 config
  log('🎨 Setting up Tailwind CSS v4...', 'yellow');
  const tailwindConfig = `@import "tailwindcss";`;

  fs.mkdirSync('src', { recursive: true });
  fs.writeFileSync('src/index.css', tailwindConfig);

  // Create index.html
  log('🌐 Creating HTML template...', 'yellow');
  const indexHtml = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${projectName}</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/${mainFile}"></script>
  </body>
</html>`;

  fs.writeFileSync('index.html', indexHtml);

  // Create main file (JSX or TSX)
  log(`⚛️ Creating React app (${fileExtension.toUpperCase()})...`, 'yellow');
  const mainContent = `/**
 * Main application entry point
 * @module ${projectName}
 * @file src/${mainFile}
 */

import React from 'react'
import ReactDOM from 'react-dom/client'
import { ThemeProvider } from '@voilajsx/uikit/theme-provider'
import '@voilajsx/uikit/styles'
import './index.css'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')${useJsx ? '' : '!'}).render(
  <React.StrictMode>
    <ThemeProvider theme="default" variant="light" detectSystem={true}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
)`;

  fs.writeFileSync(`src/${mainFile}`, mainContent);

  // Create App file (JSX or TSX)
  const appContent = `/**
 * Main App component with beautiful UIKit landing page
 * @module ${projectName}
 * @file src/${appFile}
 */

import { useState } from 'react';
import { ThemeProvider, useTheme } from '@voilajsx/uikit/theme-provider';

// Import components
import { Button } from '@voilajsx/uikit/button';
import { Badge } from '@voilajsx/uikit/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@voilajsx/uikit/select';
import { Switch } from '@voilajsx/uikit/switch';

// Minimalist theme selector for actions area
function ThemeSelector() {
  const { theme, variant, setTheme, setVariant } = useTheme();
  
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
      <div className="flex items-center gap-3">
        <Select value={theme} onValueChange={setTheme}>
          <SelectTrigger className="w-32 h-10 border-0 bg-muted/50">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="default">Default</SelectItem>
            <SelectItem value="ruby">Ruby</SelectItem>
            <SelectItem value="aurora">Aurora</SelectItem>
            <SelectItem value="neon">Neon</SelectItem>
            <SelectItem value="studio">Studio</SelectItem>
            <SelectItem value="metro">Metro</SelectItem>
          </SelectContent>
        </Select>
        
        <Switch 
          checked={variant === 'dark'} 
          onCheckedChange={(checked) => setVariant(checked ? 'dark' : 'light')}
        />
      </div>
    </div>
  );
}

// Elegant hero section with perfect spacing
function HeroSection() {
  return (
    <section className="min-h-screen flex items-center justify-center">
      <div className="max-w-4xl mx-auto px-8 text-center">
        
        {/* Status badge */}
        <Badge 
          variant="secondary" 
          className="mb-8 text-xs px-3 py-1 bg-muted border-0"
        >
          @voilajsx/uikit
        </Badge>
        
        {/* Main heading */}
        <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-6">
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            UI
          </span>
          <span className="text-foreground">Kit</span>
        </h1>
        
        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
          Cross-platform React component library with builtin themes for modern development
        </p>
        
        {/* Theme Controls */}
        <div className="mb-16">
          <ThemeSelector />
        </div>
        
        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          <div className="text-center">
            <div className="text-4xl mb-4">🎨</div>
            <h3 className="font-semibold mb-2">Built-in Themes</h3>
            <p className="text-sm text-muted-foreground">
              Extensible theming with light/dark mode support
            </p>
          </div>
          
          <div className="text-center">
            <div className="text-4xl mb-4">📱</div>
            <h3 className="font-semibold mb-2">Cross-Platform</h3>
            <p className="text-sm text-muted-foreground">
              Web, Desktop (Tauri), Mobile (Expo) ready
            </p>
          </div>
          
          <div className="text-center">
            <div className="text-4xl mb-4">🏗️</div>
            <h3 className="font-semibold mb-2">Complete Library</h3>
            <p className="text-sm text-muted-foreground">
              Components, sections, and page layouts included
            </p>
          </div>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 max-w-md mx-auto text-center">
          <div className="group cursor-pointer">
            <div className="text-2xl font-bold text-primary group-hover:scale-110 transition-transform duration-300">
              Easy
            </div>
            <div className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
              Adoption
            </div>
          </div>
          <div className="group cursor-pointer">
            <div className="text-2xl font-bold text-primary group-hover:scale-110 transition-transform duration-300">
              Plug & Play
            </div>
            <div className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
              Ready
            </div>
          </div>
          <div className="group cursor-pointer">
            <div className="text-2xl font-bold text-primary group-hover:scale-110 transition-transform duration-300">
              Simple
            </div>
            <div className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
              Setup
            </div>
          </div>
        </div>
        
      </div>
    </section>
  );
}

// Main content
function AppContent() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <HeroSection />
    </div>
  );
}

// Main app
export default function App() {
  return (
    <ThemeProvider theme="default" variant="light" detectSystem={true}>
      <AppContent />
    </ThemeProvider>
  );
}`;

  fs.writeFileSync(`src/${appFile}`, appContent);

  // Create .gitignore
  const gitignore = `# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

node_modules
dist
dist-ssr
*.local

# Editor directories and files
.vscode/*
!.vscode/extensions.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?`;

  fs.writeFileSync('.gitignore', gitignore);

  // Install dependencies
  log('📥 Installing dependencies...', 'yellow');
  log('   This may take a few minutes...', 'blue');

  try {
    execSync('npm install --legacy-peer-deps', { stdio: 'inherit' });
  } catch (error) {
    log('❌ Failed to install dependencies', 'red');
    log(
      'Run "npm install --legacy-peer-deps" manually in the project directory',
      'yellow'
    );
  }

  // Success message
  log('\n✅ Project created successfully!', 'green');
  log('\n🚀 Get started with:', 'bold');
  log(`   cd ${projectPath}`, 'blue');
  log('   npm run dev', 'blue');
  log('\n📖 Documentation: https://voilajsx.github.io/uikit/', 'green');
  log('🎨 Themes: 6 professional themes included', 'green');
  log('🧱 Components: 35+ shadcn/ui components enhanced', 'green');
  log(`⚛️  Files: ${useJsx ? 'JSX' : 'TypeScript'} format`, 'cyan');
}

// Show usage help
function showHelp() {
  log('\n📖 Usage:', 'bold');
  log('   npm create uikit [path] [--jsx]', 'blue');
  log('\n📁 Examples:', 'bold');
  log('   npm create uikit my-app', 'green');
  log('   npm create uikit apps/auth/core --jsx', 'green');
  log('   npm create uikit /dashboard/admin', 'green');
  log('\n🔧 Options:', 'bold');
  log('   --jsx, -j    Use JSX instead of TypeScript', 'yellow');
  log('\n📦 Path-based naming:', 'bold');
  log('   /apps/auth/core  →  apps-auth-core', 'cyan');
  log('   auth/dashboard   →  auth-dashboard', 'cyan');
  log('   my-app          →  my-app', 'cyan');
}

// Check for help flag
if (process.argv.includes('--help') || process.argv.includes('-h')) {
  showHelp();
  process.exit(0);
}

// Run the CLI
createProject();