# User Research

A Codespace-ready starter for running structured user research with Claude
Code. Open the repo in GitHub Codespaces (or any Dev Containers–compatible
editor) and you get a fresh environment with Claude Code installed and the
[ua-framework] plugin enabled — the same three-stage process used in League
classes for taking a product from a vague idea to a specification and
wireframes.

[ua-framework]: https://github.com/league-infrastructure/claude-plugin-marketplace/tree/master/plugins/ua-framework

## What you get in the Codespace

- **Claude Code** installed via the official dev-container feature.
- **ua-framework plugin** auto-enabled at the project level. The first time
  you run `claude` and trust this folder, the plugin is installed from the
  League marketplace without any setup on your part.
- A **persistent volume** mounted at `~/.claude` so your login and history
  survive Codespace rebuilds.

## Quick start

1. Click **Code → Create codespace on master**, or open this repo in VS Code
   and choose **Reopen in Container**.
2. Wait for the container to finish building.
3. In the integrated terminal, run:

   ```bash
   claude
   ```

4. Sign in when prompted (a browser window opens for Claude.ai auth).
5. When Claude Code asks whether to trust this folder, answer **yes**. The
   ua-framework plugin installs automatically from
   `league-infrastructure/claude-plugin-marketplace`.
6. Start your research project:

   ```text
   /ua-framework:start
   ```

   The orchestrator will check `UA0-PROJECT-STATUS.md`, ask whether you have
   an idea yet, and route you to the right activity.

## How you work in this repo

Use it like a Claude project: the conversation is in the terminal, the
artifacts live in this directory as markdown files. **Every UA document
goes under [`docs/`](docs/)** so it can be published as a Jekyll site (see
below). The plugin writes its output in reading order:

| File | What it is |
|---|---|
| `docs/UA0-PROJECT-STATUS.md` | Where the project is in the process (maintained by Claude) |
| `docs/ua1-opportunity-notes.md` | Friction observed, conversations, candidate opportunity |
| `docs/ua2-positioning-statement.md` | Geoffrey Moore positioning paragraph + evidence |
| `docs/ua3-research-plan.md` | Desk research plan, sources, log |
| `docs/ua4-interview-plan.md` | Recruiting, question areas, falsification commitments |
| `docs/ua5-stage-2-analysis.md` | Landscape, stakeholders, JTBD and scenarios |
| `docs/ua6-specification.md` | Screen inventory and requirements |
| `docs/index.md` | Curated front page; Claude keeps it in sync as docs are added |
| `wireframes/` | Astro + wired-elements wireframes (Stage 3, repo root — not Jekyll) |

The `ua-framework` plugin's own instructions refer to these files at the
project root; [CLAUDE.md](CLAUDE.md) overrides that to put them under
`docs/`. The path override is the first thing Claude reads.

Commit as you go — the git history of these files is part of the learning
record.

## Published Jekyll site

`docs/` is published as a [GitHub Pages][gh-pages] Jekyll site so
stakeholders can read the work-in-progress without cloning the repo.

[gh-pages]: https://docs.github.com/en/pages/quickstart

- The site uses the `jekyll-theme-cayman` theme (configurable in
  [`docs/_config.yml`](docs/_config.yml)).
- [`docs/index.md`](docs/index.md) is the front page. Claude keeps it in
  sync via the `update-jekyll-index` local skill — every time a UA
  document is created or materially revised, the index gets a fresh
  one-line description of that file plus an updated "Project status"
  snippet pulled from `UA0-PROJECT-STATUS.md`.
- Every UA markdown file should carry a `title:` front-matter block; the
  plugin's templates don't include one, but Claude adds it when writing
  the file under `docs/`.

**To enable Pages on this repo:** Settings → Pages → Build from a branch
→ `master` / `docs`. Push to `master` and the site builds automatically.

## Useful commands

| Command | What it does |
|---|---|
| `/ua-framework:start` | Initialize a project and route to the right activity |
| `/ua-framework:status` | Show where the project is and the next step |
| `/ua-framework:advance` | Mark the current pass complete and move on |

## How the auto-install works

Three pieces do the work:

- [.devcontainer/devcontainer.json](.devcontainer/devcontainer.json) installs
  Claude Code in the container via the official Anthropic dev-container
  feature and mounts a persistent volume for `~/.claude`.
- [.claude/settings.json](.claude/settings.json) registers the League
  marketplace under `extraKnownMarketplaces` and force-enables the
  `ua-framework` plugin via `enabledPlugins`. When you trust the folder,
  Claude Code installs the plugin from the marketplace on first run.
- [CLAUDE.md](CLAUDE.md) is read on every session start. It tells Claude
  that every UA document goes under `docs/` (overriding the plugin's
  default of project root) and that `docs/index.md` must be kept in sync
  as documents are added.

[.devcontainer/post-create.sh](.devcontainer/post-create.sh) pre-clones the
marketplace into the plugin cache so the first `claude` start is fast, but
it is best-effort — Claude Code will fetch on demand if the pre-fetch fails.

The [`.claude/skills/update-jekyll-index/`](.claude/skills/update-jekyll-index/)
skill is a local (non-plugin) skill that codifies the index-maintenance
rule. The plugin doesn't know about Jekyll; this skill is how we layer it
on top.

## Running it outside a Codespace

You can also clone this repo locally:

```bash
git clone https://github.com/League-Examples/user-research.git
cd user-research
claude
```

Trust the folder on first launch and the same auto-install path runs. You
need a working Claude Code install on your machine (`brew install claude-code`
or see the [setup docs](https://code.claude.com/docs/en/setup)).
