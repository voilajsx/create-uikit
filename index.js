#!/usr/bin/env node

/**
 * create-uikit - Ultra-simple CLI for UIKit projects
 * Usage: npm create uikit
 * @module create-uikit
 * @file index.js
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// ANSI color codes for terminal output
const colors = {
  green: '\x1b[32m',
  blue: '\x1b[34m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  reset: '\x1b[0m',
  bold: '\x1b[1m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function createProject() {
  const projectName = process.argv[2] || 'voilajs-uikit-app';
  const projectPath = path.join(process.cwd(), projectName);

  log('\n🚀 Creating UIKit project...', 'blue');
  log(`📁 Project: ${projectName}`, 'green');

  // Check if directory exists
  if (fs.existsSync(projectPath)) {
    log(`❌ Directory ${projectName} already exists!`, 'red');
    process.exit(1);
  }

  // Create project directory
  fs.mkdirSync(projectPath, { recursive: true });
  process.chdir(projectPath);

  // Create package.json
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
      react: '^18.2.0',
      'react-dom': '^18.2.0',
      '@voilajsx/uikit': 'latest',
      'lucide-react': '^0.263.1',
    },
    devDependencies: {
      '@types/react': '^18.2.15',
      '@types/react-dom': '^18.2.7',
      '@vitejs/plugin-react': '^4.0.3',
      '@tailwindcss/vite': '^4.0.0-alpha.20',
      typescript: '^5.0.2',
      vite: '^4.4.5',
    },
  };

  fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2));

  // Create vite.config.ts with Tailwind v4 setup
  log('⚡ Setting up Vite config...', 'yellow');
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

  fs.writeFileSync('vite.config.ts', viteConfig);

  // Create tsconfig.json
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
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>`;

  fs.writeFileSync('index.html', indexHtml);

  // Create main.tsx
  log('⚛️ Creating React app...', 'yellow');
  const mainTsx = `/**
 * Main application entry point
 * @module ${projectName}
 * @file src/main.tsx
 */

import React from 'react'
import ReactDOM from 'react-dom/client'
import { ThemeProvider } from '@voilajsx/uikit/theme-provider'
import '@voilajsx/uikit/styles'
import './index.css'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme="default" variant="light" detectSystem={true}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
)`;

  fs.writeFileSync('src/main.tsx', mainTsx);

  // Create App.tsx with UIKit example
  const appTsx = `/**
 * Main App component with UIKit example
 * @module ${projectName}
 * @file src/App.tsx
 */

import { Button } from '@voilajsx/uikit/button'
import { Card, CardHeader, CardTitle, CardContent } from '@voilajsx/uikit/card'
import { Badge } from '@voilajsx/uikit/badge'
import { useTheme } from '@voilajsx/uikit/theme-provider'
import { Sun, Moon, Palette } from 'lucide-react'

function App() {
  const { theme, variant, setTheme, toggleVariant } = useTheme()

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-foreground">
            Welcome to UIKit! 🎉
          </h1>
          <p className="text-xl text-muted-foreground">
            Your project is ready to build amazing React applications
          </p>
          <Badge variant="secondary" className="text-lg px-4 py-2">
            Project: ${projectName}
          </Badge>
        </div>

        {/* Theme Controls */}
        <Card className="bg-card text-card-foreground border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Palette className="h-5 w-5" />
              Theme Controls
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <Button 
                variant={theme === 'default' ? 'default' : 'outline'} 
                onClick={() => setTheme('default')}
              >
                Default
              </Button>
              <Button 
                variant={theme === 'aurora' ? 'default' : 'outline'} 
                onClick={() => setTheme('aurora')}
              >
                Aurora
              </Button>
              <Button 
                variant={theme === 'metro' ? 'default' : 'outline'} 
                onClick={() => setTheme('metro')}
              >
                Metro
              </Button>
              <Button 
                variant={theme === 'neon' ? 'default' : 'outline'} 
                onClick={() => setTheme('neon')}
              >
                Neon
              </Button>
              <Button 
                variant={theme === 'ruby' ? 'default' : 'outline'} 
                onClick={() => setTheme('ruby')}
              >
                Ruby
              </Button>
              <Button 
                variant={theme === 'studio' ? 'default' : 'outline'} 
                onClick={() => setTheme('studio')}
              >
                Studio
              </Button>
            </div>
            
            <div className="flex items-center gap-4">
              <Button variant="outline" onClick={toggleVariant}>
                {variant === 'light' ? (
                  <>
                    <Moon className="mr-2 h-4 w-4" />
                    Switch to Dark
                  </>
                ) : (
                  <>
                    <Sun className="mr-2 h-4 w-4" />
                    Switch to Light
                  </>
                )}
              </Button>
              <span className="text-sm text-muted-foreground">
                Current: {theme} ({variant})
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Sample Components */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="bg-card text-card-foreground border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Next Steps</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-muted-foreground">
                Start building your application with UIKit components:
              </p>
              <div className="space-y-2 text-sm">
                <div>• Edit <code className="bg-muted px-2 py-1 rounded">src/App.tsx</code> to get started</div>
                <div>• Import components from <code className="bg-muted px-2 py-1 rounded">@voilajsx/uikit</code></div>
                <div>• Use semantic colors for theme compatibility</div>
              </div>
              <Button size="sm" asChild>
                <a 
                  href="https://uikit.voilajsx.com/docs" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  View Documentation
                </a>
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-card text-card-foreground border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Development</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-muted-foreground">
                Development commands for your project:
              </p>
              <div className="space-y-2 text-sm font-mono bg-muted p-3 rounded">
                <div>npm run dev     # Start dev server</div>
                <div>npm run build   # Build for production</div>
                <div>npm run preview # Preview build</div>
              </div>
              <p className="text-xs text-muted-foreground">
                The dev server runs on http://localhost:5173
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default App`;

  fs.writeFileSync('src/App.tsx', appTsx);

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
    execSync('npm install', { stdio: 'inherit' });
  } catch (error) {
    log('❌ Failed to install dependencies', 'red');
    log('Run "npm install" manually in the project directory', 'yellow');
  }

  // Success message
  log('\n✅ Project created successfully!', 'green');
  log('\n🚀 Get started with:', 'bold');
  log(`   cd ${projectName}`, 'blue');
  log('   npm run dev', 'blue');
  log('\n📖 Documentation: https://uikit.voilajsx.com', 'green');
  log('🎨 Themes: 6 professional themes included', 'green');
  log('🧱 Components: 35+ shadcn/ui components enhanced', 'green');
}

// Run the CLI
createProject();
