# OwnCoaching Frontend (React + Vite)

This folder contains the **React (Vite)** frontend for **OwnCoaching**.

The UI includes **two portals** inside the same application:

- **Client Portal** (`/client/*`): Dashboard, Training Plan, Nutrition Plan, Weekly Check-In, Progress History, Profile
- **Coach Portal** (`/coach/*`): Dashboard, Clients, Client Details (tabs), Check-Ins Inbox, Check-In review, Edit plans

## Prerequisites

- Node.js (LTS recommended)
- The backend running locally (see backend README)

## Environment variables

Create a `.env` file in this frontend folder (same level as `package.json`):

```env
# Backend base URL (recommended)
VITE_API_BASE=http://localhost:5000/api

# Optional (only if you use ExerciseDB in your UI)
VITE_RAPIDAPI_KEY=YOUR_KEY_HERE
VITE_EXERCISEDB_HOST=exercisedb.p.rapidapi.com
```

Notes:
- Do **not** commit real API keys.
- The app defaults to `http://localhost:5000/api` if `VITE_API_BASE` is missing.

## Install & run

```bash
npm install
npm run dev
```

Vite will print a local URL (for example `http://localhost:5173`).

## Routing & access control

Public routes:
- `/login`
- `/signup`

Protected routes:
- `/client/*` -> requires role `client`
- `/coach/*` -> requires role `coach`

Protection is handled by:
- `src/auth/RequireRole.jsx` (redirects to the correct dashboard if the role is wrong)
- `src/auth/session.js` (stores session in `localStorage`)

### Session shape (localStorage)

Key: `owncoaching_session_v1`

Stored object:

```js
{
  userId: "1",             // users.id from backend
  role: "coach" | "client",
  clientId: "c1" | null,   // clients.id for clients only
  email: "user@test.com"
}
```

Important:
- **Client pages use `clientId`, not `userId`.**
- `getClientId()` must return the `clients.id` value.

## Main pages

Client portal:
- `src/pages/client/Dashboard/ClientDashboard.jsx`
- `src/pages/client/TrainingPlan/TrainingPlan.jsx`
- `src/pages/client/NutritionPlan/NutritionPlan.jsx`
- `src/pages/client/WeeklyCheckIn/WeeklyCheckIn.jsx`
- `src/pages/client/ProgressHistory/ProgressHistory.jsx`
- `src/pages/client/ClientProfile/ClientProfile.jsx`

Coach portal:
- `src/pages/coach/Dashboard/CoachDashboard.jsx`
- `src/pages/coach/Clients/CoachClients.jsx`
- `src/pages/coach/Clients/CoachClientDetails.jsx` + tabs
- `src/pages/coach/CheckIns/CoachCheckInsInbox.jsx`
- `src/pages/coach/CheckIns/CoachCheckInDetails.jsx`

Auth:
- `src/pages/auth/Login.jsx`
- `src/pages/auth/Signup.jsx`

## API layer

Frontend API functions live in `src/api/*` and use the shared helpers in `src/api/http.js`.

Backend base URL is controlled by `VITE_API_BASE`.

## Quick end-to-end test (recommended)

1) Start backend
2) Start frontend
3) Login as coach -> open Clients -> open client -> check plans + check-ins
4) Signup a new client -> login as that client -> submit Weekly Check-In
5) Login as coach -> review the new check-in -> verify client sees coach notes

If all steps work, your routes + DB + UI are connected correctly.
