---
title: "Build: v1 Prototype"
---

# Build: v1 Prototype

Part of [the process](process.md), but beyond the ua-framework itself —
the natural next step once wireframes proved the flows out.

## What this step was

Turn the specification and wireframes into something a person can
actually install and use, end-to-end, before wiring up any real external
integrations. The approach: a dependency-free static PWA — plain
HTML/CSS/JS, no build step, no framework, no backend — with the pieces
that need real infrastructure (calendar OAuth, the AI proposal engine,
a backend) mocked behind the same interface a real implementation would
use, so swapping them in later shouldn't touch the rest of the app.

## Results

A working v1 prototype implementing **all 11 spec screens**, installable
on a phone and usable in a desktop browser from the same code:

- **Calendar connection** generates realistic mock free/busy data instead
  of real OAuth.
- **The AI proposal engine** (`js/ai.js`) is a rules-based stand-in with
  the same input/output shape a real model call would have.
- **Storage** persists to the browser's `localStorage` — no server, no
  accounts beyond one browser's data.
- **Auth** is mocked — signup creates a local record, login matches by
  email with no password.

Both open items called out in the spec were carried through faithfully
rather than papered over: under-13 signup lands on an explicit "parental
consent needed" placeholder instead of silently proceeding, and the
Quick Response → Flag a Conflict routing fix from the wireframe
walkthrough is implemented the same way here. Both Stage 2 scenarios were
verified with an automated smoke test against the store and AI logic.

Full document, including what's real vs. mocked and the exact swap points
for a real OAuth flow and a real model call: [`app/README.md`](../app/README.md).
