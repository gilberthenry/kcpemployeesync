Purpose
-------
This file gives actionable, repository-specific guidance for AI coding agents (Copilot-style) so they can be immediately productive in this Next.js codebase.

Quick start (developer workflows)
--------------------------------
- Dev server: `npm run dev` (Next.js app router under `app/`).
- Build: `npm run build` then `npm run start` for production. (Scripts in `package.json`.)
- Backend: most client code expects a local backend at `http://localhost:5000` (API base and socket).

High-level architecture (what to know)
------------------------------------
- Framework: Next.js (App Router) — primary app code lives in `app/` (e.g., `app/layout.js`, `app/page.js`).
- UI: components are under `app/components/*` and are composed into pages under `app/*` subfolders.
- State + auth: React Contexts are used for auth, notifications and toasts in `app/context/`.
- Services: client API wrappers live in `app/services/` (see `app/services/apiClient.js` and `app/services/api.js/page.js`). They use Axios and expect a backend at `http://localhost:5000/api`.
- Firebase: lightweight web SDK usage in `app/lib/firebase.js` and expects NEXT_PUBLIC_* env vars.

Critical integration points
---------------------------
- API base: Axios instances set `baseURL: 'http://localhost:5000/api'` and inject `Authorization: Bearer <accessToken>` from `localStorage`. See `app/services/apiClient.js` and `app/services/api.js/page.js` for the interceptor logic and refresh flow.
- Token refresh: when a 401 occurs Axios posts to `/api/auth/refresh` with the saved refresh token; the code stores tokens under `accessToken` and `refreshToken` in `localStorage`.
- Sockets: `app/context/NotificatoinContext.jsx` connects to `http://localhost:5000` using `socket.io` and listens on `notification:<userId>` channels.
- Firebase: `app/lib/firebase.js` reads config from `process.env.NEXT_PUBLIC_FIREBASE_*` keys and initializes `getFirestore()` and `getAnalytics()` (guarded by `typeof window !== 'undefined'`).

Key repo-specific patterns & conventions
--------------------------------------
- Token storage: `localStorage` keys used are `user`, `accessToken`, `refreshToken`.
- Context usage: providers live in `app/context/*` (e.g., `AuthProvider`, `NotificationProvider`, `ToastProvider`) and are composed in `app/layout.js`.
- API retry semantics: Axios interceptors perform automatic refresh + retry on access-token expiry (mark `_retry` on the request to avoid loops). Copy/paste pattern lives in two files: `app/services/apiClient.js` and `app/services/api.js/page.js`.
- Socket + toast interplay: incoming socket messages call `showToast()` via `ToastContext` — follow this pattern when adding real-time notifications.

Files to inspect for examples
----------------------------
- Auth context: [app/context/AuthContext.jsx](app/context/AuthContext.jsx)
- Notification context (socket): [app/context/NotificatoinContext.jsx](app/context/NotificatoinContext.jsx)
- Axios client + refresh flow: [app/services/apiClient.js](app/services/apiClient.js) and [app/services/api.js/page.js](app/services/api.js/page.js)
- Firebase init: [app/lib/firebase.js](app/lib/firebase.js)
- Protected route example (note: uses react-router-dom): [app/components/protectedroute/page.js](app/components/protectedroute/page.js)

Gotchas and notes for agents
---------------------------
- The frontend expects a separate backend at `localhost:5000`. Don't change API URLs unless you update all service files.
- There are a few inconsistencies (e.g., `ProtectedRoute` uses `react-router-dom`/`Navigate` which is atypical for Next.js App Router). If modifying routing/guards, prefer Next.js patterns (server/client components, `redirect`, or `useRouter`) unless there's an explicit reason not to.
- Some service folders contain `page.js` files (e.g., `app/services/api.js/page.js`) — these may be accidental and will create routes in Next.js if placed under `app/`. Be cautious when moving or renaming files.
- Environment variables: Firebase configuration values must be exposed with `NEXT_PUBLIC_` prefix to be read in browser code. Keep secrets out of the client.

What to do when you change API/Token behavior
---------------------------------------------
1. Update all axios wrappers in `app/services/` (there are two equivalent implementations).
2. Update `AuthContext.jsx` localStorage keys and any code reading them (search for `accessToken`/`refreshToken`/`user`).
3. Verify socket channels in `NotificatoinContext.jsx` still match backend events.

If you need more context
-----------------------
- Ask for the backend repo or API spec (client assumes `/api` paths and a refresh endpoint at `/api/auth/refresh`).
- Ask which parts are intended to be Next.js routes vs. utility modules (several `page.js` files under non-page folders suggest accidental placement).

Drafted by an AI agent — please review and tell me which sections need more detail.
