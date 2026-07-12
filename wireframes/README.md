# Wireframes

Low-fidelity wireframes for Link Up. Built with [Astro](https://astro.build) and [wired-elements](https://wiredjs.com/) to keep the look hand-drawn on purpose.

The hand-drawn aesthetic exists so reviewers comment on whether the screen does what they need, not on colors. Don't polish these.

## Run locally

```
npm install
npm run dev
```

Astro will tell you which port. Open the URL it prints.

## Screens

Maps 1:1 to the screen inventory in `../docs/ua6-specification.md`:

- `/` — Home
- `/account-creation` — Account Creation
- `/connect-calendar` — Connect Calendar & Preferences
- `/start-a-plan` — Start a Plan
- `/friend-groups` — Friend Groups
- `/proposed-plan` — Proposed Plan
- `/flag-a-conflict` — Flag a Conflict
- `/quick-response` — Quick Response (no-account link)
- `/confirmed-plan` — Confirmed Plan / Event Page
- `/login` — Login
- `/settings` — Settings

## Walking a scenario

Open the wireframe in the browser. Start on the screen the scenario starts on. Click through the way a real user would. If you hit a dead end or a screen that's missing what the next step needs, the wireframe (or the screen description in `ua6-specification.md`) is wrong.
