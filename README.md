# ccbp_cp

A **Create React App** workspace that bundles many small learning and demo apps into one runnable project—routing, shared layout, and real UI patterns you would use in production-style code.

**Author:** Jaya madhuri Ganjikunta

## Tech stack

| Area | Details |
|------|---------|
| **Runtime** | React **18** with **react-dom** |
| **Tooling** | `react-scripts` 5 (Create React App), ESLint (`react-app`) |
| **Routing** | **React Router v6** (`react-router-dom`) — nested routes, programmatic navigation |
| **Components** | **Class components** where legacy or exercise patterns call for them, and **function components** everywhere else—paired with **Hooks** (`useState`, `useEffect`, `useCallback`, `useMemo`, `useRef`, `useContext`, custom hooks) for state, side effects, and reuse |
| **Cross-cutting state** | **React Context** for shared data (e.g. auth / flow-specific providers) alongside local component state |
| **UI & data** | Recharts, React Slick, React Chrono, AOS, react-icons, react-player, QR codes, loaders, and more—wired as needed per feature |

## What this project demonstrates

- **Modern React patterns**: functional components, Hooks, and Context API for clear data flow and testable boundaries.
- **Legacy interoperability**: class-based components where appropriate, showing comfort across React eras.
- **Single-page app structure**: one shell (`BrowserRouter`), many feature routes—dashboards, forms, games, API-driven screens, and portfolio-style pages.
- **Practical dependencies**: routing, charts, carousels, timelines, cookies, UUIDs, and accessibility-minded testing libraries (`@testing-library/*`).

## Scripts

| Command | Purpose |
|---------|---------|
| `npm start` | Dev server (default: [http://localhost:3000](http://localhost:3000)) |
| `npm run build` | Production build to `build/` |
| `npm test` | Jest + React Testing Library |

## Requirements

- **Node.js** (LTS recommended) and **npm**

## Getting started

```bash
npm install
npm start
```

---

*Built with React—class and functional components, Hooks, Context, and a router-first SPA architecture.*
