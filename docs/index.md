---
title: Link Up
layout: home
last_updated: 2026-07-20
---

Link Up is a group scheduling app for friend groups who want to actually
get together but keep losing plans to scheduling back-and-forth. Instead
of a group text where everyone manually checks their own calendar and
haggles over a time, Link Up reads each connected member's calendar and
stated activity preferences and proposes a plan directly — a time, a
place, done — with a lightweight way for anyone, installed or not, to
flag a conflict if the first proposal doesn't work.

This site is the published record of the research that led to that
product: a structured, evidence-driven process (the [ua-framework][ua])
that turned a personal, firsthand frustration into a validated
positioning statement, a competitive and stakeholder analysis, a full
screen-by-screen specification, and finally a working prototype.

[ua]: https://github.com/league-infrastructure/claude-plugin-marketplace/tree/master/plugins/ua-framework

## 🖼️ The wireframes are done

Every one of the 11 screens in the specification has a built, navigable
wireframe, and both core user scenarios have been walked through the
actual click path end-to-end and pass. Walking the wireframes even caught
and fixed a real navigation bug the written spec alone had missed.

**[→ See what's in the wireframes](stage-wireframes.md)** · source at
[`wireframes/`](../wireframes/)

## Project status

- **Current stage:** Done (planning) — build in progress
- **Current pass / activity:** Building the v1 prototype under `app/`
- **Last status update:** 2026-07-19
- **Most recent checkpoint:** v1 prototype built — a dependency-free static PWA implementing all 11 spec screens, with calendar connection and the AI proposal engine mocked so the full flow works end-to-end. See [UA0 — Project status](UA0-PROJECT-STATUS.md) for full history.

## How we got here

The research followed a structured, evidence-driven process rather than
guesswork — **[read the full process overview](process.md)**, or jump
straight to any stage below:

| Stage | Page | What it produced |
|---|---|---|
| 0 | [Opportunity discovery](stage-opportunity.md) | Two firsthand friction stories and the pattern behind them |
| 1 | [Positioning statement](stage-positioning.md) | A validated, seven-clause positioning statement |
| 1 | [Desk research](stage-research.md) | Category, audience, and name-collision checks |
| 1 | [Interviews](stage-interviews.md) | Falsification-tested evidence from three interviews |
| 2 | [Discovery analysis](stage-discovery-analysis.md) | Competitive landscape, stakeholders, jobs-to-be-done |
| 3 | [Specification](stage-specification.md) | An 11-screen, build-ready spec |
| 3 | [Wireframes](stage-wireframes.md) ✓ | A fully navigable, scenario-tested click-through |
| — | [Build](stage-build.md) | A working v1 prototype |

## Source documents

The canonical documents behind each stage summary above, produced
directly by the `ua-framework` process:

- [ua1 — Opportunity notes](ua1-opportunity-notes.md)
- [ua2 — Positioning statement](ua2-positioning-statement.md)
- [ua3 — Research plan](ua3-research-plan.md)
- [ua4 — Interview plan](ua4-interview-plan.md)
- [ua5 — Stage 2 analysis](ua5-stage-2-analysis.md)
- [ua6 — Specification](ua6-specification.md)
- [UA0 — Project status](UA0-PROJECT-STATUS.md) — agent-maintained checkpoint history from opportunity discovery through the current build

## Build

- [`app/`](../app/README.md) — v1 prototype. Static HTML/CSS/JS PWA (no build step, no backend), installable on phone and usable in a desktop browser from the same code. Calendar connection and the AI proposal engine are mocked/rules-based stand-ins — see [Build](stage-build.md) or `app/README.md` for what's real vs. mocked.

---

*Maintained by the `update-jekyll-index` skill. Last updated: 2026-07-20.*
