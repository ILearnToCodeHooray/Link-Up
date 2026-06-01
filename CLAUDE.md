# Project: User Research

This repository is a structured user-research workspace built around the
[`ua-framework`](https://github.com/league-infrastructure/claude-plugin-marketplace/tree/master/plugins/ua-framework)
plugin. The plugin's instructions describe a three-stage process that
produces a set of markdown documents; this file overrides where those
documents live and adds a Jekyll site obligation on top.

## File-location override (IMPORTANT)

The `ua-framework` plugin's own SKILL.md files refer to project files by
bare name — `UA0-PROJECT-STATUS.md`, `ua1-opportunity-notes.md`,
`ua2-positioning-statement.md`, and so on. **In this repository, every one
of those files lives under `docs/`.** Treat every bare reference to a
`UA0-*.md` or `ua[1-6]-*.md` filename in any plugin skill, command, or
template as if it were prefixed with `docs/`.

Concretely:

| Plugin says | You read/write |
|---|---|
| `UA0-PROJECT-STATUS.md` | `docs/UA0-PROJECT-STATUS.md` |
| `ua1-opportunity-notes.md` | `docs/ua1-opportunity-notes.md` |
| `ua2-positioning-statement.md` | `docs/ua2-positioning-statement.md` |
| `ua3-research-plan.md` | `docs/ua3-research-plan.md` |
| `ua4-interview-plan.md` | `docs/ua4-interview-plan.md` |
| `ua5-stage-2-analysis.md` | `docs/ua5-stage-2-analysis.md` |
| `ua6-specification.md` | `docs/ua6-specification.md` |
| `wireframes/` | `wireframes/` (stays at repo root — it's an Astro project, not Jekyll content) |

When a plugin skill says to "create the file from `templates/<x>-template.md`",
that template path is relative to the skill inside the plugin install — that
part is unchanged. Only the *output* path moves into `docs/`.

If `docs/` does not exist when you first need to write one of these files,
create it.

## Jekyll site obligation

The `docs/` directory is the source for a Jekyll site published via GitHub
Pages. Two consequences:

1. **Every UA document must live in `docs/`** so the site can render it.
2. **`docs/index.md` is the human-facing front page** and you maintain it.

### Maintaining `docs/index.md`

Whenever you create, rename, or delete any `UA0-*.md` or `ua[1-6]-*.md`
file under `docs/`, you also update `docs/index.md`. Specifically:

- Add a link to the new file in the appropriate stage section.
- Write a one-line description of what the file contains *as it stands
  right now* — not a placeholder, not a copy of the plugin's generic
  description. Read the file you just created/modified and summarize it.
- Update the "Project status" snippet at the top of `docs/index.md` to
  match the current `Current stage` / `Current pass or activity` lines in
  `docs/UA0-PROJECT-STATUS.md`.
- Update the "Last updated" date on `index.md` to today's date.

Commit `docs/index.md` in the same commit as the UA file that triggered
the update. The Jekyll site is part of the deliverable; its history should
mirror the project's history.

The `update-jekyll-index` skill in `.claude/skills/` codifies this. Invoke
it (or follow its instructions inline) anytime a UA document is created or
materially revised.

### What the site looks like

- `docs/index.md` — curated front page (you maintain this)
- `docs/UA0-PROJECT-STATUS.md` and `docs/ua[1-6]-*.md` — rendered as
  standalone pages by Jekyll, linked from the index
- `docs/_config.yml` — Jekyll config (do not modify casually)
- `docs/assets/` — any images, screenshots, or supporting media a UA
  document references. Save media here and link with relative paths.
- `wireframes/` (repo root) — Astro project from Stage 3. Linked from the
  index but not rendered by Jekyll.

## Plugin discipline (reminder — these come from the plugin itself)

These rules are in the plugin's `AGENTS.md` and several SKILL.md files.
Restated here so they are not forgotten:

- The agent maintains `docs/UA0-PROJECT-STATUS.md` and
  `docs/ua1-opportunity-notes.md`. The student does not edit them.
- The student maintains `docs/ua2-positioning-statement.md` through
  `docs/ua6-specification.md`. The agent coaches and proposes drafts; the
  student types or accepts them. The agent does not silently edit the
  student's positioning statement during research synthesis.
- One question at a time in coaching conversations. Never stack questions.
- Falsification commitments are mandatory before any user interview.
  Refuse to skip them.
- Commit to git at every meaningful revision. The history is part of the
  deliverable. Do not squash or "clean up" the history.

## Conventions specific to this repo

- All UA documents under `docs/` should carry Jekyll front-matter so the
  site renders them with titles. Minimum:

  ```yaml
  ---
  title: <human-readable title>
  ---
  ```

  When you create a UA file from the plugin's template, prepend this
  front-matter block. Pick a title from the document's H1.

- The site is published from the `docs/` directory of the default branch
  via GitHub Pages. Pushing to the default branch is sufficient to deploy.

- Do not put generated files, drafts, or scratch notes in `docs/` — only
  the canonical UA documents and the index. Scratch work goes elsewhere or
  is `.gitignore`d.
