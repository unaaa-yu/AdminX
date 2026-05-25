# AdminX

A responsive admin dashboard built with React and Ant Design, targeting North American markets. Features role-based access control, ECharts data visualization, full user management CRUD, and Mock.js-simulated backend APIs.

---

### Tech Stack

| Tech | Version | Purpose |
|------|---------|---------|
| React | 19 | Core framework (React Compiler enabled) |
| Vite | 8 | Build tool with HMR |
| Ant Design | 6 | UI component library |
| React Router | 7 | Client-side routing with lazy loading |
| Redux Toolkit | 2 | Global state management |
| Axios | 1 | HTTP client with request/response interceptors |
| ECharts | 6 | Data visualization (line, bar, pie charts) |
| Mock.js | 1 | Backend API simulation |

---

### Features

- **Authentication** — Login page with JWT-style token stored in localStorage; unauthenticated routes redirect to `/login`
- **RBAC** — Permission-based sidebar: menu items are filtered per user role using the mock permission API (`admin` sees all routes; `jessica` sees a reduced set)
- **Data Visualization** — Home dashboard with three ECharts charts (7-day brand sales trend, weekly user stats bar chart, brand market share donut)
- **User Management** — Paginated table of 200 mock users with search, add, edit, and delete (with confirmation); modal form with name, address, age, birthday, and gender fields
- **Breadcrumb Navigation** — Auto-generated from the current route path
- **Collapsible Sidebar** — Toggle stored in Redux; icon-only mode when collapsed
- **North American Data** — Mock addresses follow a 70% Canadian / 20% US / 10% worldwide distribution; featured brands are Apple, Samsung, Google, Motorola, OnePlus, Sony

---

### Project Structure

```
src/
├── api/                   # Axios request functions
│   ├── auth.js            # Login (permission/getMenu)
│   └── user.jsx           # Home data + user CRUD
├── components/
│   ├── Aside.jsx          # Sidebar — RBAC-filtered, collapsible
│   └── MainHeader.jsx     # Header — breadcrumb + logout dropdown
├── config/
│   └── index.js           # Static menu config (labels, icons, paths)
├── mock/                  # Mock.js API intercepts
│   ├── home.js            # Dashboard stats and chart data
│   ├── user.js            # User list CRUD (200 records)
│   └── permission.js      # Login + role-based menu data
├── pages/
│   ├── home/              # Dashboard (stat cards + 3 charts + table)
│   ├── login/             # Login form
│   ├── user/              # User management CRUD table
│   ├── products/          # Products placeholder
│   └── other/             # Page One / Page Two placeholders
├── router/
│   └── index.jsx          # Routes with RequireAuth guard + lazy loading
├── store/
│   └── reducer/
│       ├── tab.js         # Sidebar collapse state
│       └── auth.js        # Token, username, menu (persisted to localStorage)
├── utils/
│   └── request.jsx        # Axios instance — baseURL + auth token interceptor
└── App.jsx                # Root layout (Sider + Header + Content)
```

---

### Getting Started

```bash
npm install
npm run dev        # http://localhost:5173
npm run build
npm run preview
```

**Test accounts:**

| Username | Password | Access |
|----------|----------|--------|
| `admin` | `admin` | Full access (Home, Products, Users, Other) |
| `jessica` | `jessica` | Limited access (Home, Products) |
