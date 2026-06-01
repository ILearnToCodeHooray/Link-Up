---
name: update-jekyll-index
description: Update docs/index.md whenever a UA document is created, renamed, deleted, or materially revised. Use after creating any UA0-*.md or ua[1-6]-*.md file under docs/, after a stage transition, after the orchestrator updates docs/UA0-PROJECT-STATUS.md, or any time the set of UA documents in docs/ changes. Keeps the published Jekyll site in sync with project state.
---

# Update Jekyll Index

`docs/index.md` is the human-facing front page of the project's published
site. It must stay in sync with what is actually in `docs/`. Every time a
UA document is created, renamed, deleted, or materially revised, update
the index.

## When to run

Run this skill (or follow it inline) when:

- You just created a new `docs/UA0-*.md` or `docs/ua[1-6]-*.md` file.
- You just made a material revision to one of those files — the kind of
  revision that changes what a one-line description of the file should
  say. Typo fixes do not count. A new section or a rewritten paragraph
  does.
- The orchestrator just updated `docs/UA0-PROJECT-STATUS.md` (stage
  transition, pass completion, per-clause status change).
- A file was renamed or deleted.

## What to do

1. **Read `docs/UA0-PROJECT-STATUS.md`** and extract:
   - `Current stage`
   - `Current pass or activity`
   - `Last updated`
   - The most recent entry in `Completed checkpoints` (if any)

2. **List the UA documents that exist** under `docs/`:

   ```bash
   ls docs/UA0-*.md docs/ua[1-6]-*.md 2>/dev/null
   ```

3. **Read each existing UA document.** For each, draft a one-line
   description of what the file actually says right now. Do not invent —
   read the file. If a file is mostly empty (template placeholders only),
   say "drafted, not yet filled in" rather than describing what it will
   eventually contain.

4. **Open `docs/index.md`.** If it does not exist, create it from the
   template in the "Index template" section below.

5. **Rewrite the index** with:
   - A "Project status" block at the top showing current stage, current
     pass/activity, and last-updated date — taken from
     `docs/UA0-PROJECT-STATUS.md`.
   - A "Documents" section grouped by stage (Opportunity discovery,
     Stage 1, Stage 2, Stage 3). Inside each stage, link to every UA
     document that exists in `docs/` and includes the one-line description
     you drafted. Omit documents that do not exist yet.
   - A "Wireframes" entry if `wireframes/` exists at the repo root,
     linking to it.
   - Update the `last_updated` field in the front-matter to today's date.

6. **Commit `docs/index.md`** as part of the same commit that triggered
   this update. Do not commit the index on its own; bundle it with the
   underlying UA file change so the git history of the site mirrors the
   history of the project.

## Index template

When creating `docs/index.md` for the first time, use this structure.
Front-matter fields are Jekyll conventions; the body is rendered as the
home page.

```markdown
---
title: User Research Project
layout: home
last_updated: YYYY-MM-DD
---

# User Research Project

This site is the published record of an in-progress user-research project
following the [ua-framework](https://github.com/league-infrastructure/claude-plugin-marketplace/tree/master/plugins/ua-framework)
three-stage process. The documents below are produced as the project
moves from opportunity discovery through specification.

## Project status

- **Current stage:** <from UA0>
- **Current pass / activity:** <from UA0>
- **Last status update:** <from UA0 "Last updated">
- **Most recent checkpoint:** <last entry of UA0 "Completed checkpoints", or "—" if none>

## Documents

### Opportunity discovery

- [ua1 — Opportunity notes](ua1-opportunity-notes.md) — <one line>

### Stage 1 — Discovery

- [ua2 — Positioning statement](ua2-positioning-statement.md) — <one line>
- [ua3 — Research plan](ua3-research-plan.md) — <one line>
- [ua4 — Interview plan](ua4-interview-plan.md) — <one line>

### Stage 2 — Analysis

- [ua5 — Stage 2 analysis](ua5-stage-2-analysis.md) — <one line>

### Stage 3 — Specification

- [ua6 — Specification](ua6-specification.md) — <one line>
- [Wireframes](../wireframes/) — Astro + wired-elements project (link out)

### Project status file

- [UA0 — Project status](UA0-PROJECT-STATUS.md) — agent-maintained record of where the project is in the process

---

*Generated and maintained by the `update-jekyll-index` skill. Last
updated: YYYY-MM-DD.*
```

## Discipline

- Only include sections and links for files that **actually exist** in
  `docs/`. Do not list placeholders. As new files appear, new lines
  appear in the index.
- One-line descriptions must reflect what the file currently says. As the
  student fills in a file, the description gets sharper. The first time
  you mention `ua2-positioning-statement.md` it may say "drafted, target
  customer clause filled in". Three revisions later it may say "Moore
  paragraph drafted; four clauses defended by interview evidence".
- Never put scratch work, planning notes, or generated artifacts in the
  index. The index is the public face of the project.
