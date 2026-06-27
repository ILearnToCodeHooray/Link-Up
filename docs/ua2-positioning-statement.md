# UA2 — Positioning Statement

The deliverable of Stage 1. Drafted in Pass 1 from current belief, revised across Passes 2–4 as research and interview evidence comes in. Every clause must be defensible by the time Stage 1 exits.

The statement at the top is the public-facing artifact — short, clean, one paragraph. The evidence record below it is the working document where the student's thinking lives. The messiness in the evidence record is the point. Cleaning it up to look polished destroys the record of learning. This is a living document; its git history is part of the deliverable.

---

## Statement

> For *friend groups with busy, clashing schedules*
> who *want to make plans together but get stuck in the back-and-forth until the plan falls apart*,
> *Link Up* is a *group scheduling app*
> that *turns "we should hang out" into plans that actually happen*.
> Unlike *coordinating by hand in a group text*,
> our product *uses an AI assistant to juggle everyone's availability and preferences and propose a plan that works*.

---

## Status

Per-clause status. Mirrors the per-clause status in `UA0-PROJECT-STATUS.md`.

- **Target customer:** refined by research
- **Need or opportunity:** refined by research
- **Product name:** refined by research
- **Product category:** refined by research
- **Key benefit:** drafted-unconfirmed
- **Primary competitive alternative:** refined by research
- **Primary differentiation:** refined by research

Status values: `not started` | `drafted from belief` | `drafted-unconfirmed` | `refined by research` | `evidenced by interview` | `stable`.

---

## Evidence

One subsection per clause. Updated continuously across all five passes.

### Target customer

- **Current belief:** Groups of friends (roughly 3–10 people) trying to make social plans together when everyone has busy, separate schedules.
- **Basis for the belief:** My own direct experience — the last-minute movie-plan scramble (one-on-one) and skipping the last couple of birthdays entirely because coordinating a group felt too hard (see `ua1-opportunity-notes.md`).
- **Evidence found:**
  - 2026-06-21: clause drafted from belief; not yet confirmed with anyone other than myself.
  - 2026-06-27 (research): a whole product category targets this audience (Howbout, Flaky, Partiful, etc.), reachable via app stores — the audience is real and reachable. The specific human and pain intensity still come from interviews.
- **Alternatives considered:** "Anyone who has trouble scheduling with large groups" — dropped because it defines the customer by the need rather than by who they are, and lumps together very different people (office managers, coaches, wedding planners) who want different things and are reached differently. Picked friend groups making social plans as the beachhead because that is the friction I understand from the inside.
- **What would change my mind:** If I interview several people and group social planning turns out not to be a real pain for them — annoying, but not annoying enough to want a tool for it.

### Need or opportunity

- **Current belief:** They want to turn a loose "we should hang out" into an actual plan, but so often get stuck in the back-and-forth that the plan — sometimes the whole event — gets abandoned.
- **Basis for the belief:** My own experience — most painfully, skipping the last couple of birthdays entirely because coordinating the group felt too hard to even attempt. The failure mode is abandonment, not just friction.
- **Evidence found:**
  - 2026-06-21: clause drafted from belief; not yet confirmed with anyone other than myself.
  - 2026-06-27 (research): multiple apps market against "group chats that never turn into plans" (Howbout, the existing Link Up) — the need is real and widely recognized. Intensity (does it kill plans?) still best tested in interviews.
- **Alternatives considered:** Framing the need as "planning is exhausting/annoying" — set aside in favor of the stronger framing that plans actually fail to happen. Annoyance is tolerated; abandonment is the real cost.
- **What would change my mind:** If I interview people and find that when group plans fall through they don't actually care much — they shrug it off and it wasn't important to them anyway.

### Product name

- **Current belief:** Link Up.
- **Basis for the belief:** My own choice. The name is meant to suggest connecting people. Switched from "Link-Up" to "Link Up" (no hyphen) as a stylistic preference.
- **Evidence found:**
  - 2026-06-21: working name chosen by me; internal, no external validation needed yet.
  - 2026-06-27 (research): there is already a live app called "Link Up" doing nearly the same thing (App Store id6758226034; Google Play com.linkupmeet), plus a separate "Link Up Calendar." Name collision is real. Decision: keep "Link Up" as the working name for now, change before any launch.
- **Alternatives considered:** "Link-Up" (hyphenated) — dropped in favor of the un-hyphenated form.
- **What would change my mind:** A naming conflict (existing app/trademark) or interview feedback that the name actively confuses people about what the product does.

### Product category

- **Current belief:** A group scheduling app.
- **Basis for the belief:** It's the bucket people already recognize for this problem (Doodle, When2meet, group-chat polls). Chose a familiar category so people instantly understand what kind of thing it is; the AI assistant is treated as the differentiation rather than part of the category.
- **Evidence found:**
  - 2026-06-21: clause drafted from belief; not yet confirmed with users.
  - 2026-06-27 (research): "group scheduling tools" / "shared calendar apps" are established categories with ranked players and "best of 2026" roundups (Zapier, usecarly) — Link Up competes in an existing category rather than inventing one.
- **Alternatives considered:** "Shared calendar with an AI" (from `ua1-opportunity-notes.md`) — set aside because "calendar" implies a grid the user has to maintain, which signals work; "group scheduling app" better matches what people search for. "AI assistant" as the category — moved to the differentiation clause instead.
- **What would change my mind:** If users consistently describe their workaround/desired tool as something other than a scheduling app (e.g., "I just want a better group chat"), the category may be wrong.

### Key benefit

- **Current belief:** It gets the get-togethers you actually want to happen to happen — so you spend time with your friends instead of losing the plan to coordination.
- **Basis for the belief:** Follows directly from the need: the cost of the problem is plans/events not happening, so the benefit is those plans actually happening. The benefit survives the "magic wand" test — if the coordination were handled by magic, the thing the group cares about is that they got to do the activity together, not that times were suggested.
- **Evidence found:**
  - 2026-06-21: clause drafted from belief; not yet confirmed with users.
- **Alternatives considered:** Feature-level framings like "automatically suggests times that work for everyone" — set aside because that describes the mechanism, not the outcome the customer cares about.
- **What would change my mind:** If coordination turns out not to be the real blocker — i.e., even when scheduling is solved, plans still don't happen for other reasons (money, nobody truly wanted to go) — then fixing coordination wouldn't deliver this benefit.

### Primary competitive alternative

- **Current belief:** Group texting apps like WhatsApp and iMessage — coordinating plans by hand in the group chat.
- **Basis for the belief:** My own experience (no scheduling tools used today; everything happens over texting, per `ua1-opportunity-notes.md`) and the fact that texting is the universal default. It wins because it's free, zero setup, everyone already has it, and it's where the conversation already lives.
- **Evidence found:**
  - 2026-06-21: clause drafted from belief; not yet confirmed with users.
  - 2026-06-27 (research): confirmed the group text is the default, AND found a crowded field of dedicated apps aimed at this exact pain — Howbout (almost identical positioning), Flaky, Hangs, Partiful, GroupMe, Doodle, When2meet. Existing tools still put the work on the people (vote/poll/manually check). Decision: keep group text as the PRIMARY alternative (what people actually default to); name Howbout & dedicated apps as a secondary tier.
- **Alternatives considered:** Dedicated poll/scheduling tools (Doodle, When2meet, Howbout) and "do nothing / give up" — all real alternatives. Considered naming Howbout as the primary alternative after research, but kept the group text since most friend groups still default to texting rather than a dedicated app.
- **What would change my mind:** If interviews show people already reach for a dedicated tool (Doodle, Partiful, etc.) rather than just texting, the primary alternative would shift.

### Primary differentiation

- **Current belief:** Unlike a group text where the people do all the coordination by hand, Link Up's AI assistant holds everyone's availability and preferences at once and proposes a plan that actually works — taking the back-and-forth off the group entirely.
- **Basis for the belief:** A group chat has no memory of anyone's calendar or preferences and can't compute across them; an AI can hold and process all of that and propose solutions a group hashing it out message-by-message can't. The differentiation is framed as an outcome (the labor is lifted off the group), not just an AI capability.
- **Evidence found:**
  - 2026-06-21: clause drafted from belief; not yet confirmed with users.
  - 2026-06-27 (research): no mainstream tool clearly does "AI proposes a group SOCIAL plan from everyone's availability + activity preferences." AI calendar assistants exist (Clockwise, Dola, SkedPal, Morgen) but are personal/work-calendar focused; group tools (Doodle, WhenAvailable) are still manual polls. So the specific niche is open. BUT research can only show the niche is open, not that people WANT an AI deciding their plans — that desirability is still untested and must be confirmed in interviews.
- **Alternatives considered:** Stating it as raw AI capability ("works faster, remembers more, finds solutions a human can't") — kept the substance but reframed around the outcome for the group, since a capability the customer wouldn't notice isn't differentiation.
- **What would change my mind:** If people don't want an AI deciding their plans — either they don't trust it, or the back-and-forth ("where should we go?") is part of the fun and they want to stay in control of the haggling — then automating it away could backfire rather than differentiate.
