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
| App store platforms (Apple, Google) | Distribution, policy compliance, revenue cut | App follows guidelines (esp. data-use disclosure), doesn't get flagged or pulled |
| Calendar API providers (Google Calendar, Apple EventKit) | API terms of use, consent flows | Proper OAuth consent, no scraping/abuse of calendar data |
| Underlying AI/LLM provider | Usage complies with their policies | No misuse; usage patterns stay within intended scope |
| Non-installing friends pulled into a plan | Their availability/preferences get read or referenced even if they never installed the app | Their data is handled with real consent, not just implied because a friend added them |

### Users (recap from Stage 1, with Stage 2 updates)

- **Primary user type:** Adult members of friend groups (roughly 3–10 people) trying to make social plans together, who feel the coordination pain as participants — not necessarily as the person organizing.
- **Secondary user types:** None named — Stage 1 explicitly decided not to split into an "organizer" vs. "participant" type, since Link Up is a whole-group tool and Mom felt the pain as a participant, not an organizer.
- **What's been added since Stage 1:** The landscape/stakeholder work surfaced a real open question — whether every group member needs to install and authorize Link Up for the AI to see their real availability, or whether the system needs to work with partial participation (some friends never installing). This wasn't visible from the interviews alone. Logged below under Open from this stage.

### Compliance and accessibility considerations

- **PII / calendar data:** Calendar data is personal and often sensitive — it can reveal where someone is, who they're with, and behavioral patterns. Since Link Up's core mechanism *requires* reading real calendars, this isn't a peripheral concern; consent and data handling need to be designed deliberately, not bolted on later.
- **COPPA (users under 13):** Confirmed in scope — the student's call is that younger siblings' / kids' friend groups could plausibly use Link Up too, so this isn't a hypothetical. That means real COPPA obligations apply: verifiable parental consent before collecting data from under-13 users, restrictions on what data can be collected/retained/shared for that age group, and no behavioral targeting/ads directed at them. None of the interviews (Mom, Dad) tested this population, so it's untested territory going into Stage 3 — worth deciding whether v1 launches adult/teen-only and expands later, or builds COPPA handling in from the start. Logged under Open from this stage.
- **Accessibility (WCAG):** No specific population flagged yet; standard mobile accessibility practice applies. Nothing in the interviews suggests a need to go beyond that, but noting it here so it isn't silently skipped.

---

## Jobs-to-be-done and scenarios

### Job 1 — Getting a hangout to actually come together

- **JTBD statement:** When my friend group is trying to get together for something like dinner, I want the plan to just come together, so I can spend time with them without the back-and-forth wearing me out.
- **How do we know it's a real job:** Mom's interview (2026-07-04): described last week's dinner with friends as "an elaborate back-and-forth" with people's plans changing last-minute; she ended up dropping out when her own plans changed, and the group rescheduled to a different day. Interview 3 (2026-07-05): when asked what mattered more, she said the hassle itself was the *more* annoying part, even though the dinner ultimately happened (rescheduled).
- **What people do today:** Coordination happens entirely in a group text. Someone proposes a time, others check their own calendar (which no one else can see) and reply, plans shift as people's schedules change, and the group repeats this until something lands — or it doesn't, and the plan quietly reschedules, shrinks, or drops.
- **Why has the current way persisted:** Group text is free, requires no setup, and is where the conversation already lives — everyone already has it, so it's the path of least resistance even though it's manual and slow (matches the "primary competitive alternative" clause).

#### Scenario 1.1 — Dinner plan under a schedule change

> Mom's friend group starts talking about getting dinner together. In Link Up, the group opens a plan; the AI reads everyone's connected calendars and stated preferences and proposes "Friday, 7pm, the usual Thai place." Most of the group is fine with it. **Something goes wrong:** one friend's schedule changes at the last minute (exactly what happened in the real interview) and she can no longer make Friday. Instead of the plan dying in a group-text scramble, she flags it in Link Up; the AI re-reads availability and re-proposes Saturday at the same time, keeping the rest of the group's existing yeses intact. The dinner happens Saturday instead of Friday — rescheduled, not abandoned.

**Reads back against positioning statement:** Delivers the key benefit — yes. The plan still happens (outcome), and the group is spared re-running the whole back-and-forth from scratch when the schedule changes (hassle-relief) — both halves of the revised Key benefit clause.

### Job 2 — Getting an event planned at all, when past attempts fizzled before they started

- **JTBD statement:** When I'm dreading the coordination effort based on past experience, I want a plan to form without me having to drive it, so I can avoid skipping the event entirely like I have before.
- **How do we know it's a real job:** Student's own opportunity notes (`ua1-opportunity-notes.md`): skipped the last couple of birthday parties entirely because coordinating the group's schedules felt too hard to even attempt — the failure mode here is giving up before trying, not a plan that started and fell apart.
- **What people do today:** Nothing — the person doesn't attempt to organize the event at all. There's no tool, no poll, no group text thread started; the anticipated effort itself is enough to make them opt out.
- **Why has the current way persisted:** Avoiding the attempt entirely feels lower-cost than starting a coordination process expected to be frustrating and likely to fail anyway — a rational response to how bad the current alternative (manual group-text coordination) has felt in the past.

#### Scenario 2.1 — Almost not bothering with a birthday this year

> It's nearly the student's birthday. Based on the last two years, they almost don't bother planning anything. This time they open Link Up instead, add their friend group, and the AI pulls in connected calendars and preferences to propose two or three windows without anyone needing to be individually polled. **Something goes wrong:** one friend hasn't connected their calendar to Link Up (they never installed it), so the AI's availability picture is incomplete and proposes a time that friend can't actually make. The friend flags their unavailability directly in the app without needing a full account; the AI re-proposes an adjusted plan that works for everyone who's responded. The event happens this year — unlike the two it replaced.

**Reads back against positioning statement:** Delivers the key benefit — yes, but conditionally: the scenario only works because there's a lightweight way for a non-installing friend to register unavailability. That's not yet a solved design problem (see Open from this stage) — it's a real requirement the scenario surfaced, not just a nice-to-have.

### Noted but out of scope — in-person regrouping without connectivity

The student's Yosemite family-reunion story (from `ua1-opportunity-notes.md` origin material) — a group splitting up with no cell service and struggling to regroup — surfaced during Mom's interview too. This is a different job (live, in-person, connectivity-dependent) than the calendar-based pre-planning Link Up is positioned to solve. Noting it explicitly as out of scope for this product rather than folding it in as a job the AI-proposes-a-plan mechanism doesn't address.

---

## Positioning statement revisited

Checked all seven clauses against Stage 2 findings. **No revision needed** — Stage 2 confirmed rather than contradicted Stage 1:

- The competitive landscape reconfirms group text as the primary alternative and Howbout as the closest dedicated competitor — no change from Pass 2 research.
- The AI-proposes-a-plan differentiation remains the open niche across both competitors and open-source projects surveyed — no existing tool does this for group social plans.
- The COPPA decision (under-13 in scope) doesn't require a target-customer clause change — "friend groups with busy, clashing schedules" was never age-restricted — but it does add real compliance work ahead of Stage 3 (see Open from this stage).

---

## Open from this stage

- The existing "Link Up" app (App Store id6758226034 / Link Up Calendar) hasn't been feature-audited beyond the name collision noted in Pass 2 research — worth a closer look before Stage 3, both for naming and for any features worth learning from or avoiding.
- Whether every group member needs to install/authorize Link Up for the AI to see their real availability, or whether the system needs to work with partial participation (some friends never installing) — not resolved by interviews so far.
- COPPA: under-13 users are plausibly in scope (student's call), which means real parental-consent and data-handling requirements apply. Needs a decision before Stage 3: launch adult/teen-only for v1 and expand later, or design COPPA handling in from the start.
