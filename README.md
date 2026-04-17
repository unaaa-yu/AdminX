# AdminX

A React + Vite admin dashboard template with Ant Design, featuring sidebar navigation, client-side routing, and global state management.

### Tech Stack

| Tech | Version | Description |
|------|---------|-------------|
| React | 19 | Core framework with React Compiler enabled |
| Vite | 8 | Build tool with HMR |
| Ant Design | 6 | UI component library |
| React Router | 7 | Client-side routing |
| Redux Toolkit | 2 | Global state management |
| Axios | 1 | HTTP client |

### Project Structure
```
src/
├── components/        # Shared components
│   ├── Aside.jsx      # Sidebar with collapse toggle
│   └── MainHeader.jsx # Top navigation bar
├── config/            # Menu configuration
├── pages/             # Page components
│   ├── home/          # Home page
│   ├── products/      # Products page
│   ├── user/          # User page
│   └── other/         # Other pages
├── router/            # Route config (lazy loading)
├── store/             # Redux store
│   └── reducer/tab.js # Sidebar collapse state
└── App.jsx            # Root layout
```

### Getting Started
```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Features
- **Sidebar**: Collapsible with dynamically loaded Ant Design icons; menu items are centrally configured in `src/config/index.js`
- **Routing**: Lazy-loaded routes via `React.lazy` and `createBrowserRouter`, keeping the initial bundle small
- **State Management**: Sidebar collapse state (`isCollapse`) is managed globally with Redux Toolkit
- **Layout**: Full-viewport Ant Design `Layout` composed of a Sider, Header, and Content area
