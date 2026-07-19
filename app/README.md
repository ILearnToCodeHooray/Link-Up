# Link Up — app (v1 build)

A working prototype of the app specified in [`../docs/ua6-specification.md`](../docs/ua6-specification.md),
built from the wireframes in [`../wireframes/`](../wireframes/).

## What this is

A dependency-free static PWA: plain HTML/CSS/JS, no build step, no
framework, no backend server. It's designed to run identically on a phone
(installable, works offline) and in a desktop browser from the same code.

**Everything is mocked so the full user flow works end-to-end before any
real integrations are wired up:**

- **Calendar connection** — "Connect Google/Apple Calendar" generates
  realistic-looking mock free/busy data instead of doing real OAuth.
- **The AI proposal engine** (`js/ai.js`) — a rules-based stand-in that
  reads mock calendars + preferences and picks a time and place. It has
  the same input/output shape a real LLM call would have, so swapping it
  out later shouldn't touch the rest of the app.
- **Backend/database** — `js/store.js` persists everything to
  `localStorage` in the browser. No server, no accounts beyond what's in
  that one browser's storage.
- **Auth** — mocked. Signup just creates a local user record; login
  matches by email with no password.

This matches all 11 screens in the spec, including the two open items it
called out: the under-13 signup path lands on an explicit "parental
consent needed" placeholder (`js/views/consent.js`) rather than silently
proceeding, and the Quick Response / Flag a Conflict routing fix from the
wireframe scenario walkthrough (conflict flagged from a no-account invite
link routes back to the invite link, never into the full app's
navigation) is implemented the same way here.

## Running it

No install step. From this directory:

```bash
python3 -m http.server 8000
# or: npx serve .
```

Then open `http://localhost:8000`. On a phone, open the same URL and use
"Add to Home Screen" — the manifest and service worker make it installable
and usable offline (against the mocked local data).

## Try it

Log in as `demo@linkup.app` (any password/no password — auth is mocked)
to see a pre-seeded account: a demo user "Riley" with a calendar already
connected, and a "Weekend Crew" group with three friends (one of whom,
Jordan, deliberately hasn't connected a calendar — a good way to see the
"incomplete data" reasoning show up in a proposal). Or sign up fresh.

Both Stage 2 scenarios from the spec are walkable:

- **Scenario 1.1 (dinner plan, schedule change):** Home → Start a plan →
  pick the Weekend Crew group → Proposed Plan → Flag a conflict → new
  proposal → Accept → Confirmed.
- **Scenario 2.1 (birthday, non-installed friend):** Home → Start a plan →
  Friend Groups (add a new friend by name — creates a mock "not on Link
  Up yet" contact) → Proposed Plan → copy that friend's invite link →
  open it in a new tab/incognito window (no login) → Quick Response →
  Flag a conflict → back on Quick Response, not the full app.

## What's not real yet

- No real Google/Apple Calendar OAuth.
- No real AI/LLM call — `js/ai.js` is a documented, swappable stand-in.
- No backend, no multi-device sync — data lives in one browser's
  `localStorage`.
- Parental consent flow (COPPA) is a placeholder screen, not a real flow.
- The "Link Up" name collision with an existing app (noted in the spec)
  is still unresolved.

## Code layout

```
index.html          entry point, PWA meta tags
manifest.json        PWA manifest
sw.js                 service worker (offline app-shell caching)
css/style.css         mobile-first styles, phone-card layout on desktop
js/store.js            localStorage-backed data layer + mock calendar/demo seed
js/ai.js                rules-based proposal engine (swap for a real model later)
js/router.js            tiny hash router
js/ui.js                 shared render helpers (badges, formatting, app shell)
js/app.js                 route table + auth guard
js/views/*.js              one module per screen from the spec
```
