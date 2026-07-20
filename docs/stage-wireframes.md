---
title: "Stage 3: Wireframes"
---

# Stage 3: Wireframes ✓ Complete

Part of [the process](process.md).

## What this step was

A specification reads fine on paper but can still hide dead ends and gaps
that only show up once a screen has to actually hand off to the next one.
So every screen from the [specification](stage-specification.md) got built
as a low-fidelity, deliberately hand-drawn wireframe — hand-drawn on
purpose, so a reviewer reacts to whether the screen does what's needed,
not to colors or polish. Then, instead of just eyeballing the screens
individually, both Stage 2 scenarios were walked through the actual click
path, the way a real user would move through them.

## Results

**All 11 screens are built and fully navigable**, one Astro page per
screen, using [wired-elements](https://wiredjs.com/) for the hand-drawn
look. Both Stage 2 scenarios were walked end-to-end and pass:

- **Scenario 1.1 (dinner plan, schedule change):** Home → Start a Plan →
  Proposed Plan → Flag a Conflict → Proposed Plan (updated) → Confirmed
  Plan.
- **Scenario 2.1 (birthday, non-installed friend):** Home → Start a Plan →
  Friend Groups → Proposed Plan → Quick Response (for the friend who
  never installed) → Flag a Conflict → Proposed Plan (updated) → Confirmed
  Plan.

The walkthrough earned its keep: it caught a real navigation bug that the
spec alone hadn't surfaced. Flagging a conflict from a no-account Quick
Response link was routing back into the full app's Proposed Plan screen —
which would have exposed full group navigation and data to someone
without an account. Fixed in the wireframe (it now tracks where the
visitor came from) and in the specification's screen description for
Flag a Conflict, so the two stay in sync.

Source: [`wireframes/`](../wireframes/) at the repo root (an Astro
project, kept outside the Jekyll site since it's an interactive app, not
a document). Run it locally with `npm install && npm run dev` from that
directory — see [wireframes/README.md](../wireframes/README.md) for the
full screen list and how to walk a scenario yourself.
