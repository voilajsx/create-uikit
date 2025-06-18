# create-uikit

🚀 **Instantly scaffold beautiful React applications** with VoilaJS UIKit - a comprehensive component library featuring 6 professional themes, 35+ components, and cross-platform support.

Get a production-ready TypeScript + React + Tailwind CSS project in seconds, complete with theme switching, responsive design, and enterprise-grade components.

## Quick Start

**Method 1: npx (Recommended)**

```bash
npx create-uikit
```

**Method 2: npm**

```bash
npm create uikit
```

> **Note:** Method 1 supports all `--flags` (like `--jsx`, `--help`). Method 2 has limited flag support due to npm restrictions.

## Usage

### Basic Usage

```bash
# Create with default name (voilajs-uikit-app)
npx create-uikit

# Create with custom name
npx create-uikit my-awesome-app

# Create with nested path (perfect for VoilaJS apps)
npx create-uikit apps/auth/frontend
```

### Options

```bash
# Use JSX instead of TypeScript
npx create-uikit my-app --jsx

# Combine path and JSX option
npx create-uikit apps/admin/panel --jsx

# Get help
npx create-uikit --help
```

## Path-Based Naming

The CLI automatically converts folder paths to valid npm package names:

| Input Path                 | Generated Package Name     |
| -------------------------- | -------------------------- |
| `my-app`                   | `my-app`                   |
| `apps/auth/core`           | `apps-auth-core`           |
| `auth/dashboard`           | `auth-dashboard`           |
| `/admin/panel`             | `admin-panel`              |
| `user-management/settings` | `user-management-settings` |

## File Types

### TypeScript (Default)

- Modern development with type safety
- Full TypeScript configuration included
- Perfect for large applications

### JSX Option

- Lightweight JavaScript with JSX
- No TypeScript overhead
- Great for prototyping and simple apps

## What You Get

### 🏗️ Complete Project Structure

```
my-app/
├── src/
│   ├── App.tsx (or .jsx)
│   ├── main.tsx (or .jsx)
│   └── index.css
├── package.json
├── vite.config.ts (or .js)
├── index.html
└── .gitignore
```

### 📦 Pre-configured Stack

- **Vite** - Lightning fast development
- **React 18** - Latest React features
- **@voilajsx/uikit** - Complete component library
- **Tailwind CSS v4** - Modern styling
- **Lucide React** - Beautiful icons

### 🎨 Beautiful Landing Page

- Showcases all 6 UIKit themes
- Interactive theme selector
- Dark/light mode toggle
- Responsive design
- Ready to customize

## Examples

### VoilaJS Multi-App Setup

```bash
# Create main app
npx create-uikit apps/main

# Create authentication app
npx create-uikit apps/auth --jsx

# Create admin dashboard
npx create-uikit apps/admin/dashboard

# Create user management
npx create-uikit apps/user-management/core
```

### Standalone Applications

```bash
# Personal portfolio
npx create-uikit portfolio

# Company website
npx create-uikit company-site --jsx

# Documentation site
npx create-uikit docs/website
```

## Development Workflow

After creating your project:

```bash
cd my-app
npm run dev
```

Visit `http://localhost:5173` to see your application running with:

- ✅ Hot reload enabled
- ✅ Theme selector working
- ✅ All UIKit components available
- ✅ TypeScript (or JSX) ready

## Integration with VoilaJS

This CLI is perfect for creating frontend apps within the VoilaJS framework:

```bash
# In your VoilaJS project root
npx create-uikit apps/auth/frontend
npx create-uikit apps/dashboard/frontend --jsx
```

The generated apps work seamlessly with VoilaJS backend APIs and follow the framework's conventions.

## Available Commands

| Command           | Description              |
| ----------------- | ------------------------ |
| `npm run dev`     | Start development server |
| `npm run build`   | Build for production     |
| `npm run preview` | Preview production build |

## Features

### 🎨 6 Professional Themes

- **Default** - Ocean blue professional
- **Aurora** - Purple-green gradients
- **Metro** - Clean gray-blue design
- **Neon** - Cyberpunk magenta-cyan
- **Ruby** - Sophisticated red-gold
- **Studio** - Designer grays with amber

### 🧱 35+ Components

All shadcn/ui components enhanced with theming:

- Form controls (Button, Input, Select, etc.)
- Layout components (Card, Container, etc.)
- Navigation (Dropdown, Menu, etc.)
- Data display (Table, Badge, etc.)

### 📱 Cross-Platform Ready

- Web applications
- Desktop (Tauri)
- Mobile (Expo)

## Advanced Usage

### Custom Theme Selection

```bash
# The generated app includes a theme selector
# Users can switch between all 6 themes instantly
```

### TypeScript Configuration

```bash
# Strict TypeScript setup included
# Perfect for large applications
```

### Tailwind CSS v4

```bash
# Latest Tailwind CSS version
# Simplified configuration
# Built-in design tokens
```

## Troubleshooting

### Installation Issues

```bash
# If npm install fails, try:
npm install --legacy-peer-deps
```

### Alternative Installation Method

```bash
# You can also use npm create (less reliable with flags):
npm create uikit my-app

# For JSX with npm create, add jsx as a word:
npm create uikit my-app jsx
```

### Path Issues on Windows

```bash
# Use forward slashes even on Windows:
npx create-uikit apps/auth/core
```

### Existing Directory

```bash
# CLI will warn if directory exists
# Choose a different path or remove existing directory
```

## Why npx?

We recommend `npx create-uikit` over `npm create uikit` because:

- ✅ **Full flag support** (`--jsx`, `--help` work properly)
- ✅ **Always latest version** (npx downloads latest automatically)
- ✅ **No conflicts** with npm's built-in argument handling
- ✅ **Standard practice** (most modern CLIs use npx)

## Support

- 📖 [UIKit Documentation](https://voilajsx.github.io/uikit/)
- 🐛 [Report Issues](https://github.com/voilajsx/uikit/issues)
- 💬 [Community Discord](https://discord.gg/voilajsx)

## License

MIT © [VoilaJSX](https://github.com/voilajsx)

---

**Happy coding with VoilaJS UIKit! 🚀**
