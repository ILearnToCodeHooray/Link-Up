# UA4 — Interview Plan

Produced in Pass 3 of Stage 1. Names who the student is interviewing and why, the question areas for the open-ended phase, the prompts for the solution feedback phase, and a falsification commitment set per planned interview.

The plan format is bullet points of question areas, not a script. Scripts produce mechanical interviews.

---

## Recruiting

One subsection per planned interviewee.

### Mom (Interview 1 — strong)

- **Who:** My mom. In person, this week.
- **Why worth talking to:** She's a participant in group plans and visibly feels the pain — shows real frustration and anxiety around it. That emotional signal is exactly the kind of evidence the need clause rests on.
- **Clauses their input most affects:** Need or opportunity; Target customer; Key benefit; Primary differentiation (does she want an AI to handle it, or would that make the anxiety worse?).
- **Earlyvangelist filter (which apply):**
  - [x] Has the problem
  - [x] Knows they have the problem
  - [ ] Has tried to solve the problem (she's a participant, not usually the organizer)
  - [x] Is unhappy with their workaround (frustration + anxiety)

### Dad (Interview 2 — contrast case)

- **Who:** My dad. In person, this week.
- **Why worth talking to:** He's a participant who doesn't do much of this and shows no frustration. Valuable as a boundary/contrast case — if the pain really isn't there for him, he helps map who this problem is NOT for, sharpening the target customer.
- **Clauses their input most affects:** Target customer (where the boundary of the problem sits).
- **Earlyvangelist filter (which apply):**
  - [ ] Has the problem (unclear — possibly not)
  - [ ] Knows they have the problem
  - [ ] Has tried to solve the problem
  - [ ] Is unhappy with their workaround
  - *Note: meets few/none — treat as a negative/contrast data point, not a source of conclusions.*

### Mom (Interview 3 — revisit, sharper focus)

- **Who:** My mom, second conversation.
- **Why worth talking to:** Friends aren't responding/available, and she's already the one person confirmed to feel the need firsthand — best positioned to react honestly to the two clauses that are still open. This is a return visit, not a fresh recruit, so no earlyvangelist re-check needed.
- **Clauses their input most affects:** Primary differentiation (does she want the choice taken off her hands); Key benefit (does the plan happening matter more than the process of deciding).
- **Note:** A second interview with the same person is weaker evidence than a fresh target-user interview — treat her answers here as a data point to sharpen the clauses, not final confirmation. Still worth a friend/target-user check later if one becomes available.

---

## Open-ended phase guide

Question areas for the problem-discovery half of the interview. Ordered roughly broad to specific. Two or three example phrasings per area. **Bullet points, not a script.**

> Reminders:
>
> - Ask about past behavior, not hypothetical future behavior. "When was the last time…" beats "would you ever…".
> - Don't ask hypothetical, feature, or validation questions. They produce nodding, not learning.
> - Don't pitch your idea in this phase.
> - Let silence be okay.

- **The last group plan**
  - "Tell me about the last time you were trying to make a plan with a group — what was it?"
  - "Walk me through what happened, start to finish."
- **How the coordinating actually went**
  - "How'd you all figure out the when and where? Who did what?"
  - "Where did it get stuck?"
- **When a plan falls through**
  - "Tell me about a time a group plan just didn't end up happening. What happened there?"
  - "When it fell apart, what'd you do instead?"
- **What it cost / how it felt**
  - "What was going through your head during all the back-and-forth?"
  - "Did it bug you that it didn't happen — what did you feel like you missed?"
- **Wishing it were handled (differentiation probe — no pitching)**
  - "When it's dragging on, do you ever wish someone would just pick something?"
  - "Or do you kind of like figuring it out together?"
- **Interview 3 only — what mattered when the dinner finally happened (key benefit probe)**
  - "Thinking back on that dinner ending up rescheduled — what would it have meant if it had just happened as first planned?"
  - "What actually bugged you more: not knowing what was decided, or that you didn't get to see everyone?"
- **Interview 3 only — reaction to someone else deciding (differentiation probe, still no pitching)**
  - "If one person in the group had just picked the place and time without checking with everyone first, how would that have landed with you?"
  - "Would you have gone along with it, or wanted to weigh in first?"

---

## Solution feedback phase guide

Only entered after the user has confirmed the problem in their own words. If they have not, skip this phase — that interview was about confirming the problem.

> **Skipped for Interviews 1 & 2.** There was no prototype/wireframe yet (that comes in Stage 3), and those two conversations were about confirming the problem, not testing a solution.
>
> **Interview 3 (Mom, revisit) — light solution feedback, since she already confirmed the problem in Interview 1:**
> - Describe the mechanism plainly, without selling it: "Say something looked at everyone's calendars and what people tend to like, and just told the group 'here's the plan: Friday 7pm, this place' — no back-and-forth needed."
> - Then watch/listen, don't ask "would you use this": "What's your first reaction to that?" / "Would you want to double-check it, or just go with it?"
> - Still not a pitch — one plain description, then listen. Do not sell features or defend the idea if she pushes back.

---

## Closing

- Thank the user for their time
- "Is there anyone else you think I should talk to?"
- "Would it be okay to come back with a follow-up question if something comes up?"

---

## Falsification commitments

**One set per planned interview. Written before the interview happens. Reviewed and updated after.**

### Interview 1 — Mom (this week)

#### Need or opportunity

- **Current belief:** Friend groups want to make plans together but get stuck in the back-and-forth until the plan — sometimes the whole event — falls apart.
- **Confirms it if:** She brings up a specific recent time a group plan got stuck or died in the coordination, unprompted, with real frustration.
- **Refutes it if:** Her plans generally come together fine, or her frustration is really about something else (people flaking, money) rather than the scheduling itself.
- **Complicates it if:** Plans get stuck but rarely fully die — they happen late or smaller instead.
- **What actually happened:** 2026-07-04 interview. Mom described last week's dinner with friends — an elaborate back-and-forth, people's plans changing last-minute; she ended up dropping out because her own plans changed, and the group rescheduled to a different day. She also recalled the Yosemite family reunion: the plan wasn't fully known, the group got split up with no cell service, and it took a while to regroup (in-the-moment coordination, not scheduling). **VERDICT: CONFIRMED** the coordination back-and-forth is real and painful, but **COMPLICATED** the failure mode — the dinner was *derailed/rescheduled* and one person dropped, not *abandoned*. Clause revised: "abandoned" softened to "derailed," with full abandonment as the severe end.

#### Primary differentiation

- **Current belief:** People want the coordination taken off them — an AI that proposes a plan that works.
- **Confirms it if:** She wishes someone/something would "just handle it" or decide.
- **Refutes it if:** She likes staying in control of the choosing, or would distrust a plan she didn't shape.
- **Complicates it if:** She'd want help finding a time but still wants to pick the activity herself.
- **What actually happened:** Not tested. The conversation surfaced the mental load ("trying to coordinate and figure things out") but produced no evidence about whether Mom would *want* an AI to propose or decide plans, or whether that would ease or worsen her anxiety. **VERDICT: STILL OPEN** — the riskiest clause; must be probed directly in a future interview (ideally a friend).

### Interview 2 — Dad (this week)

#### Target customer

- **Current belief:** The target is friend groups with busy, clashing schedules who feel this pain.
- **Confirms it if:** Even as a low-key participant, he recognizes the pain or names people who feel it.
- **Refutes it if:** He never feels friction and doesn't see it around him — the problem is narrower than "friend groups" generally.
- **Complicates it if:** He doesn't feel it himself but clearly points to someone (like Mom) who does — real problem, concentrated in a certain type of person.
- **What actually happened:** 2026-07-04 interview. Dad had **no example** of a group plan that didn't happen — consistent with him not doing much group social planning. **VERDICT:** does not refute the target; confirms the pain isn't universal — it's felt by people *actively* making group plans, which Dad largely isn't. Student's judgment: keep the target as whole friend groups (not narrowed to a "coordinator" type), because Link Up is inherently a whole-group tool — everyone shares their schedule and the group works together; Mom felt the pain as a participant, not an organizer.

### Interview 3 — Mom, revisit (sharper focus)

#### Primary differentiation

- **Current belief:** Unlike a group text where people do all the coordination by hand, Link Up's AI assistant holds everyone's availability and preferences and proposes a plan that works — taking the back-and-forth off the group entirely.
- **Confirms it if:** She reacts with relief or enthusiasm to the plain description ("here's the plan, no back-and-forth needed") — wants to just go with it rather than double-check it.
- **Refutes it if:** She says she'd feel uneasy or distrustful going along with a plan she didn't have a hand in shaping, or that picking things together is part of what she likes about it.
- **Complicates it if:** She wants the AI to narrow it down to a couple of options but still wants final say herself — help, not full delegation.
- **What actually happened:** Mom was "definitely ok" with the AI doing everything — went along easily with the plain description, no hesitation about not having a hand in shaping it. **VERDICT: CONFIRMED.**

#### Key benefit

- **Current belief:** The benefit is the get-togethers you actually want to happen, happening — not the mechanism by which they were decided.
- **Confirms it if:** Unprompted, she says what mattered about the derailed dinner was that it didn't happen as planned / she didn't get the time with everyone — not how the decision-making went.
- **Refutes it if:** She says what actually bothered her was the effort/anxiety of the back-and-forth itself, regardless of whether the dinner ultimately happened — a process benefit, not an outcome benefit.
- **Complicates it if:** Both matter to her about equally — the outcome and the relief from coordinating.
- **What actually happened:** She said the hassle/back-and-forth was actually the *more* annoying part, but that the get-together still happening was also important to her. **VERDICT: COMPLICATED** — this isn't a pure outcome-only benefit like the clause currently states; relief from the coordination hassle carries real weight too, not just "the plan happening."
