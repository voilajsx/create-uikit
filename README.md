# create-uikit

Create VoilaJS UIKit applications with one command.

## Quick Start

```bash
npm create uikit
```

## Usage

### Basic Usage

```bash
# Create with default name (voilajs-uikit-app)
npm create uikit

# Create with custom name
npm create uikit my-awesome-app

# Create with nested path (perfect for VoilaJS apps)
npm create uikit apps/auth/dashboard
```

### Options

```bash
# Use JSX instead of TypeScript
npm create uikit my-app --jsx

# Combine path and JSX option
npm create uikit apps/admin/panel --jsx

# Get help
npm create uikit --help
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
npm create uikit apps/main

# Create authentication app
npm create uikit apps/auth --jsx

# Create admin dashboard
npm create uikit apps/admin/dashboard

# Create user management
npm create uikit apps/user-management/core
```

### Standalone Applications

```bash
# Personal portfolio
npm create uikit portfolio

# Company website
npm create uikit company-site --jsx

# Documentation site
npm create uikit docs/website
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
npm create uikit apps/auth/frontend
npm create uikit apps/dashboard/frontend --jsx
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

### Path Issues on Windows

```bash
# Use forward slashes even on Windows:
npm create uikit apps/auth/core
```

### Existing Directory

```bash
# CLI will warn if directory exists
# Choose a different path or remove existing directory
```

## Support

- 📖 [UIKit Documentation](https://voilajsx.github.io/uikit/)
- 🐛 [Report Issues](https://github.com/voilajsx/uikit/issues)

## License

MIT © [VoilaJSX](https://github.com/voilajsx)

---

**Happy coding with VoilaJS UIKit! 🚀**
