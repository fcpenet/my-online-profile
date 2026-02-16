# CLAUDE.md

## Project
kikOS — Personal portfolio styled as a macOS desktop. Next.js 16 + React 19 + TypeScript + CSS Modules.

## Commands
- `npm run dev` — local dev server
- `npm run build` — production build
- `npm test` — run all tests (Jest 30 + React Testing Library)
- `npm test -- --testPathPattern=<path>` — run a specific test file

## Architecture
- `app/page.tsx` — Desktop orchestrator (boot, menu bar, icons, dock, tour, terminal, todo)
- `app/components/` — All UI components (TodoList, Terminal, WelcomeTour, SpinningWheel, ErrorDialog, etc.)
- `app/services/TodoService/` — CRUD service for todos with auth headers
- Backend: `https://rag-pipeline-91ct.vercel.app` (Vercel, separate repo)

## Key Patterns
- **CSS Modules** for all component styling (`*.module.css`)
- **Batch save** in TodoList — toggles are local-only, Save button appears with pending changes
- **API key** stored in `localStorage` (`kikos-api-key`), sent as `X-API-Key` header on mutating calls
- **Boot sequence** persisted in `sessionStorage` (`kikos-booted`)
- **Welcome tour** completion saved in `localStorage` (`kikos-tour-completed`)
- **Terminal** is a secret feature activated by `Cmd+K`

## Testing
- Jest 30 with `jest.setup.js` (JS, not TS — Jest 30 quirk)
- Mocks use wrapper functions to avoid hoisting issues: `getAll: (...args: unknown[]) => mockGetAll(...args)`
- TS diagnostics for `toBeInTheDocument` in test files are expected (type issue, tests run fine)

## Deployment
- Frontend: GitHub Pages from `main` branch
- `dev` branch for development; merge to `main` for production
- Backend: Vercel (separate repo)

## Style
- No emojis in code unless requested
- Keep components focused and minimal
- Prefer editing existing files over creating new ones
