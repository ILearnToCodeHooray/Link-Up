---
title: User Research Project
layout: home
last_updated: 2026-07-19
---

# User Research Project

This site is the published record of an in-progress user-research project
following the [ua-framework][ua] three-stage process — opportunity
discovery, discovery (positioning), analysis, and specification. The
documents below are produced as the project moves through those stages.
Planning is now complete; the project has moved into building the app
itself (see "Build" below).

[ua]: https://github.com/league-infrastructure/claude-plugin-marketplace/tree/master/plugins/ua-framework

## Project status

- **Current stage:** Done (planning) — build in progress
- **Current pass / activity:** Building the v1 prototype under `app/`
- **Last status update:** 2026-07-19
- **Most recent checkpoint:** v1 prototype built — a dependency-free static PWA implementing all 11 spec screens, with calendar connection and the AI proposal engine mocked so the full flow works end-to-end. See [UA0 — Project status](UA0-PROJECT-STATUS.md) for full history.

## Documents

### Opportunity discovery

- [ua1 — Opportunity notes](ua1-opportunity-notes.md) — Two friction stories: last-minute one-on-one movie planning over text, and group birthday parties skipped entirely because group scheduling felt too hard; includes an early, untested candidate idea for an AI-assisted shared calendar that factors in existing events and activity preferences.

### Stage 1 — Discovery

- [ua2 — Positioning statement](ua2-positioning-statement.md) — Complete. All seven Moore positioning clauses, each evidenced by interview or refined by research.
- [ua3 — Research plan](ua3-research-plan.md) — Complete. Desk research that refined six of the seven positioning clauses.
- [ua4 — Interview plan](ua4-interview-plan.md) — Complete. Recruiting, question areas, and falsification commitments for three interviews.

### Stage 2 — Analysis

- [ua5 — Stage 2 analysis](ua5-stage-2-analysis.md) — Complete. Landscape survey (Howbout, Doodle, Partiful, GroupMe, When2meet, and the existing "Link Up" app), stakeholders, and two jobs-to-be-done with scenarios.

### Stage 3 — Specification

- [ua6 — Specification](ua6-specification.md) — Complete. 11-screen inventory with full descriptions, requirements, constraints, and open questions.
- [Wireframes](../wireframes/) — Complete. Astro + wired-elements, one page per screen; both Stage 2 scenarios walked through and pass.

### Build

- [`app/`](../app/README.md) — v1 prototype. Static HTML/CSS/JS PWA (no build step, no backend), installable on phone and usable in a desktop browser from the same code. Calendar connection and the AI proposal engine are mocked/rules-based stand-ins — see `app/README.md` for what's real vs. mocked and the exact swap points for real OAuth and a real model call.

### Project status file

- [UA0 — Project status](UA0-PROJECT-STATUS.md) — agent-maintained record of where the project is; full checkpoint history from opportunity discovery through the current build.

---

*Maintained by the `update-jekyll-index` skill. Last updated: 2026-07-19.*
