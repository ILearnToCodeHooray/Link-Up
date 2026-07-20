---
title: "Stage 3: Specification"
---

# Stage 3: Specification

Part of [the process](process.md).

## What this step was

The specification pulls Stages 1 and 2 into a single build-ready
document, centered on a screen inventory. In a project this size, the
screens *are* the functional requirements — each one is described in
terms a user would recognize: its purpose, who lands there, what's shown,
what they can do, and exactly where each action goes next. Deliberately
absent: an MVP-scoping section — which screens get built first was left
to emerge during wireframing, under real deadline pressure, rather than
being decided on paper in advance.

## Results

An **11-screen inventory**: Home, Account Creation, Connect Calendar &
Preferences, Start a Plan, Friend Groups, Proposed Plan, Flag a Conflict,
Quick Response (no-account link), Confirmed Plan / Event Page, Login, and
Settings. Proposed Plan and Confirmed Plan are load-bearing — every
scenario passes through them.

Both Stage 2 scenarios were walked through the screen flows on paper and
passed, delivering the key benefit in each case. Requirements, constraints,
and open questions were written down explicitly rather than left implicit:

- Calendar data must be handled with explicit consent, not retained
  beyond generating proposals.
- Under-13 accounts require a parental consent step before any data
  collection — the flow itself is named as an open question, not yet
  designed.
- No-account (Quick Response) participants must only ever see the single
  plan they were invited to.
- Open questions carried into wireframing: what happens if a
  non-installing friend never responds at all, and whether a plan needs a
  minimum number of connected calendars to produce a trustworthy proposal.

Full document, with every screen's complete description and the full
requirements/constraints list: [ua6 — Specification](ua6-specification.md).
