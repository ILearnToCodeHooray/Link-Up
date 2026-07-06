# UA5 — Stage 2 Analysis

The Stage 2 deliverable. Pulls together what exists in the space, who has a stake in the system beyond the users, who actually uses it, and what users are doing today when they need what the system would provide.

The sections are written in the order a reader would want to encounter them, but the student does not work on them in that order. Activities inform each other.

The positioning statement is revisited throughout. If any analysis contradicts a clause, the student revises `ua2-positioning-statement.md` — Stage 2 is the second pressure test on the statement.

---

## Landscape

A short survey of the space the system enters.

### Adjacent products

- **Howbout** — shared availability calendar for making plans with friends; positioned almost identically to Link Up ("group chats that never turn into plans"). Does well: familiar shared-calendar framing, direct positioning against the same pain. Complaints/gaps: sparsely reviewed; still requires people to manually check the calendar and agree on something — no assistant actually proposing or deciding. Overlaps almost entirely with Link Up's stated positioning; the AI-proposes-a-plan piece is the gap it leaves open.
- **Doodle** — the classic poll/vote scheduling tool. Does well: dead simple, widely known, zero learning curve. Complaints: "not designed for automation" (per Pass 2 research); manual vote-counting; no social/activity layer — feels like work software imported into a friend context. Gap: no AI proposal, no activity-preference matching, someone still has to read the poll and decide.
- **Partiful** — event pages and invites once a plan is decided. Does well: fun, social presentation of an event; strong RSVP flow. Complaints: privacy concerns, "over-the-top" design, character limits (per Pass 2 research). Gap: it assumes the plan already exists — doesn't help a group get there.
- **GroupMe / group text (iMessage, WhatsApp)** — the default "just do it in chat" approach. This is the **primary competitive alternative** already named in the positioning statement. Does well: zero setup, everyone already has it, no new app to learn. Gap: no memory of availability or preferences, no scheduling logic at all — exactly the pain Link Up targets.
- **When2meet / WhenAvailable** — manual overlap grids. Does well: simple visual "who's free when." Complaints/gaps: still requires everyone to fill in a grid by hand and then someone to interpret it and decide — same "who actually decides" gap as Doodle.
- **The existing "Link Up" app** (App Store id6758226034; also a separate "Link Up Calendar") — a near-identical concept already live, flagged in Pass 2 research as a name collision. **Not yet feature-audited** — flagged below as an open item since it's the single closest direct competitor and the name conflict is still unresolved.
- **AI calendar assistants (Clockwise, Dola, SkedPal, Morgen)** — real AI-driven scheduling exists and works, but for **personal/work** calendars, not group social plans across people on different calendars/apps. Confirms Pass 2's finding: the specific niche of "AI proposes a *group social* plan from availability + activity preferences" remains open.

### Open-source candidates

- **Rallly** ([github.com/lukevella/rallly](https://github.com/lukevella/rallly)) — open-source scheduling/poll tool: availability grid, comments, notifications, a "finalize the date" step. Not a fork candidate (poll-based, not AI-decides), but worth studying for conventions: shareable links with no account required, a human "finalize" action, notification patterns.
- **Timeful.app / schej.it** — open-source group meeting scheduler (Vue/Go/MongoDB) with calendar integration to find a time automatically. Closer in spirit to Link Up's calendar-sync needs; worth studying for how it handles importing/reading existing calendars (Google/Apple), since Link Up's AI will need the same real availability data.

### Category

- The category customers already shop in: **group scheduling app / shared calendar app** (confirmed in Pass 2 research — an established category with ranked players and "best of 2026" roundups).
- What that category brings with it: mostly free or freemium pricing (every named competitor is free/freemium); an expectation of calendar-grid UI; invite links; notifications/reminders; some way to see who's actually coming.
- Fit or misfit: good fit — Link Up doesn't need to invent or explain a new category, just compete inside one people already understand, with the AI-proposes angle as the differentiator layered on top.

### Inherited conventions

- **Availability grid the group fills in manually** (Doodle, When2meet, Rallly) — **break on purpose.** This is exactly the manual work Link Up's differentiation removes; showing a grid at all would undercut the "no back-and-forth" promise confirmed in interview 3.
- **Invite link, no account required to respond** (Doodle, Rallly) — **keep.** Low friction to join matches the hassle-relief benefit; no reason to add signup friction.
- **Calendar sync/import (Google/Apple Calendar)** (Timeful, Clockwise, Morgen) — **keep, likely required.** The AI can't propose a real plan without real availability data; this is probably load-bearing infrastructure, not optional polish.
- **Event/plan page with RSVP once a plan exists** (Partiful) — **keep.** A nice complement once the AI has proposed a plan — a clean place to confirm and see who's in.
- **Manual "finalize the date" step by a human organizer** (Rallly, Doodle) — **break, with an override.** This is the crux of the differentiation: interview 3 confirmed Mom was comfortable with the AI just deciding, no back-and-forth. Default should be the AI proposing (and effectively finalizing) the plan; a manual override affordance can exist for anyone who wants to intervene, but it shouldn't be the default flow the way it is for Doodle/Rallly.

---

## Stakeholders and users

### Stakeholders

Self-idea path — there's no client distinct from the users. The stakeholders beyond the direct user are mostly infrastructure/platform, plus one group worth naming explicitly: friends who get pulled into a plan without having installed anything themselves.

| Stakeholder | Stake | Their version of "success" |
|---|---|---|
| App store platforms (Apple