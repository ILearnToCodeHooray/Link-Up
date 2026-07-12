# UA6 — Specification

The Stage 3 deliverable. Pulls everything from Stages 1 and 2 into a single document that a developer — human or AI — can build from.

The screens are the spine. In a small project the screens are the functional requirements: each screen names what the system does in terms a user would recognize.

MVP scoping is not a section in this document. Which screens get built first emerges during wireframing as the deadline forces choices, not from a planning artifact written before the work begins.

---

## Overview

### Positioning statement

> For *friend groups with busy, clashing schedules*
> who *want to make plans together but keep getting derailed in the back-and-forth — plans get rescheduled, downsized, or dropped, and sometimes fall through entirely*,
> *Link Up* is a *group scheduling app*
> that *turns "we should hang out" into plans that actually happen, without the back-and-forth*.
> Unlike *coordinating by hand in a group text*,
> our product *uses an AI assistant to juggle everyone's availability and preferences and propose a plan that works*.

### Summary

Link Up is a mobile app for friend groups (roughly 3–10 people) who want to actually get together but keep losing plans to scheduling back-and-forth. Instead of a group text where everyone manually checks their own calendar and haggles over a time, Link Up reads each connected member's calendar and stated preferences and proposes a plan directly — a time, a place, done — with a lightweight way for anyone (installed or not) to flag a conflict if the first proposal doesn't work.

---

## Screen inventory

| # | Screen | Purpose (one sentence) | Scenarios that pass through it |
|---|--------|------------------------|--------------------------------|
| 1 | Home | Shows the user's plans in progress and past, and is where every session starts. | Scenario 1.1, Scenario 2.1 |
| 2 | Account Creation | Lets a new user create an identity on Link Up. | Not scenario-driven — standard first-run screen |
| 3 | Connect Calendar & Preferences | Lets a user authorize their calendar and set activity preferences so the AI has real data to propose from. | Scenario 1.1 (already connected), Scenario 2.1 (the friend who *hasn't* done this is the scenario's failure branch) |
| 4 | Start a Plan | Lets a user name a get-together and choose who's invited. | Scenario 1.1, Scenario 2.1 |
| 5 | Friend Groups | Lets a user manage the groups of friends they plan with. | Scenario 2.1 |
| 6 | Proposed Plan | Shows the AI's proposed time and place to the group and lets them respond. | Scenario 1.1, Scenario 2.1 — load-bearing, appears in both |
| 7 | Flag a Conflict | Lets someone who can't make the proposed plan say so, without restarting the whole conversation. | Scenario 1.1, Scenario 2.1 |
| 8 | Quick Response (no-account link) | Lets a friend who hasn't installed Link Up view a proposed plan and flag availability from a shared link. | Scenario 2.1 |
| 9 | Confirmed Plan / Event Page | Shows the final, agreed plan and who's in. | Scenario 1.1, Scenario 2.1 |
| 10 | Login | Lets a returning user get back into their account. | Not scenario-driven — standard entry screen |
| 11 | Settings | Lets a user manage connected calendars, notifications, preferences, and (for under-13 accounts) parental consent status. | Not scenario-driven — standard inclusion |

---

## Screen descriptions

### 1. Home

- **Purpose:** Show the user what's happening across their plans right now and let them start something new.
- **Who lands here:** Any logged-in user, immediately after login or opening the app.
- **What's shown:** A list of active plans (with status: "proposed," "waiting on you," "confirmed"), and if there are none yet, an empty state inviting them to start one.
- **What they can do:**
  - Open an existing plan
  - Start a new plan
  - Go to Friend Groups
  - Go to Settings
- **Where each action goes:**
  - Open an existing plan → Proposed Plan or Confirmed Plan, depending on its status
  - Start a new plan → Start a Plan
  - Go to Friend Groups → Friend Groups
  - Go to Settings → Settings

### 2. Account Creation

- **Purpose:** Create a new user's identity on Link Up.
- **Who lands here:** A new user, from a "Sign up" action on Login, or from opening a Quick Response link and choosing to install the full app.
- **What's shown:** A minimal signup form (name, email or social login, birth year — needed to route under-13 accounts into parental consent handling per Stage 2's COPPA decision).
- **What they can do:**
  - Submit signup info
  - Go back to Login
- **Where each action goes:**
  - Submit (age 13+) → Connect Calendar & Preferences
  - Submit (under 13) → parental consent flow (flagged as an open question below — not yet designed)
  - Go back to Login → Login

### 3. Connect Calendar & Preferences

- **Purpose:** Get the real availability and preference data the AI needs to propose an actual plan.
- **Who lands here:** A new user, right after Account Creation, or an existing user who skipped this and is revisiting it from Settings.
- **What's shown:** A calendar-connection prompt (Google/Apple), and a short set of activity-preference questions (kinds of things they like doing, e.g. dinner, outdoors, low-key).
- **What they can do:**
  - Connect a calendar (OAuth)
  - Set activity preferences
  - Skip for now
- **Where each action goes:**
  - Connect a calendar → confirmation state on this screen, then Home
  - Set activity preferences → confirmation state on this screen, then Home
  - Skip for now → Home (but the user will show up as an incomplete-data case the next time the AI proposes a plan involving them — this is the same gap Scenario 2.1 surfaces for non-installing friends)

### 4. Start a Plan

- **Purpose:** Let a user kick off a new get-together and say who's invited.
- **Who lands here:** A user who tapped "Start a new plan" from Home.
- **What's shown:** A name/description field for the plan, and a picker to choose a Friend Group or hand-pick people.
- **What they can do:**
  - Name the plan
  - Choose who's invited (existing group or new selection)
  - Submit to generate a proposal
- **Where each action goes:**
  - Submit → Proposed Plan (AI generates the first proposal)
  - Choose who's invited → Friend Groups if the user wants to create a new group first

### 5. Friend Groups

- **Purpose:** Let a user manage who's in the groups they make plans with.
- **Who lands here:** From Home, or from Start a Plan when creating a new group on the fly.
- **What's shown:** Existing groups and their members; an option to create a new group.
- **What they can do:**
  - Create a new group
  - Add a friend to a group (by contact, phone number, or invite link)
  - Remove a friend from a group
- **Where each action goes:**
  - Create a new group → confirmation state on this screen
  - Add a friend → sends a Quick Response-style invite link if that friend isn't on Link Up yet; confirmation state on this screen
  - Remove a friend → confirmation state on this screen

### 6. Proposed Plan

- **Purpose:** Show the group the AI's proposed time and place, and collect responses.
- **Who lands here:** Any invited group member, from Home (existing plan) or immediately after submitting Start a Plan; a non-installed friend arrives at the Quick Response version instead.
- **What's shown:** The proposed time, place, and a short reason drawn from the group's calendars/preferences; each group member's response status so far (accepted / flagged conflict / no response yet).
- **What they can do:**
  - Accept the proposal
  - Flag a conflict
  - View plan details (who's invited, what's been said so far)
- **Where each action goes:**
  - Accept → state change on this screen (marks the user as accepted); when everyone's accepted, moves the plan to Confirmed Plan / Event Page
  - Flag a conflict → Flag a Conflict
  - **Error state:** if the AI can't find a time/place that works for enough of the group, this screen shows that plainly ("couldn't find a plan that works for everyone yet") with an option to adjust who's required vs. optional, rather than silently failing

### 7. Flag a Conflict

- **Purpose:** Let someone who can't make the proposed plan say so quickly, so the AI can re-propose.
- **Who lands here:** A group member who tapped "Flag a conflict" on Proposed Plan, **or** a non-installed friend who tapped "Flag a conflict" on Quick Response. (Surfaced during wireframe scenario walkthrough — this screen is shared by both entry points, and needs to know which one sent it.)
- **What's shown:** The window they're flagging as unavailable, and an optional note.
- **What they can do:**
  - Confirm the conflict
  - Cancel and go back
- **Where each action goes:**
  - Confirm the conflict → back to wherever they came from (Proposed Plan for a logged-in member; Quick Response for a non-installed friend), reflecting the new constraint. **Not** to Proposed Plan in the Quick Response case — that would expose full group navigation and data to someone without an account, violating the no-account scoping requirement.
  - Cancel → back to the same origin screen, no change

### 8. Quick Response (no-account link)

- **Purpose:** Let a friend who hasn't installed Link Up still see a proposed plan and respond, from a shared link.
- **Who lands here:** A friend who received an invite link (via text) for a specific plan, without a Link Up account.
- **What's shown:** The same proposed time/place/reason shown on Proposed Plan, scoped to just this one plan.
- **What they can do:**
  - Accept
  - Flag a conflict (same lightweight flow as Flag a Conflict, no account needed)
  - Install the full app
- **Where each action goes:**
  - Accept → confirmation state on this screen; the group's Proposed Plan updates to reflect it
  - Flag a conflict → confirmation state on this screen; the group's Proposed Plan re-proposes
  - Install the full app → Account Creation

### 9. Confirmed Plan / Event Page

- **Purpose:** Show the final, agreed-on plan and who's actually in.
- **Who lands here:** Any group member, once everyone required has accepted on Proposed Plan (or the Quick Response equivalent).
- **What's shown:** Final time, place, and a list of who's confirmed.
- **What they can do:**
  - View details
  - Leave the plan (if they can no longer make it after confirming)
- **Where each action goes:**
  - Leave the plan → back to Proposed Plan for the rest of the group, with the AI re-evaluating whether the plan still holds without that person

### 10. Login

- **Purpose:** Let a returning user get back into their account.
- **Who lands here:** Anyone opening the app who isn't already logged in.
- **What's shown:** Login form (email/social login).
- **What they can do:**
  - Log in
  - Go to Account Creation
- **Where each action goes:**
  - Log in → Home
  - Go to Account Creation → Account Creation

### 11. Settings

- **Purpose:** Let a user manage their connected data and preferences.
- **Who lands here:** From Home.
- **What's shown:** Connected calendar status, activity preferences, notification settings, and — for accounts flagged under 13 — parental consent status.
- **What they can do:**
  - Manage connected calendars
  - Edit activity preferences
  - Manage notifications
- **Where each action goes:**
  - Manage connected calendars → Connect Calendar & Preferences
  - Edit activity preferences → confirmation state on this screen
  - Manage notifications → confirmation state on this screen

---

## Scenario walkthroughs

Walked both Stage 2 scenarios through the wireframes in `../wireframes/`.

- **Scenario 1.1 — Dinner plan under a schedule change:** Home → Start a Plan → Proposed Plan → (branch: Flag a Conflict) → Proposed Plan (updated) → Confirmed Plan. **Passes.** Delivers the key benefit — the plan still happens, and the group doesn't have to re-run the back-and-forth from scratch when a schedule changes.
- **Scenario 2.1 — Almost not bothering with a birthday:** Home → Start a Plan → Friend Groups (adding people) → Proposed Plan → (branch: Quick Response for the non-installed friend → Flag a Conflict) → Proposed Plan (updated) → Confirmed Plan. **Passes**, after a fix: the walkthrough caught that Flag a Conflict, when reached from Quick Response, was routing back to Proposed Plan — which would have exposed full group navigation and data to someone without an account. Fixed in both the wireframe (`flag-a-conflict.astro` now tracks its origin and routes back to Quick Response instead) and this document (Flag a Conflict's description above, updated to name both entry points).

---

## Requirements

- Calendar data (via Google/Apple calendar connection) must be handled with explicit consent and not retained or used beyond generating plan proposals — flagged as sensitive in Stage 2.
- Under-13 accounts require a parental consent step before any calendar/preference data is collected (COPPA) — the flow itself is an open question below, not yet designed.
- No-account (Quick Response) participants should only ever see the single plan they were invited to, never any other group data.

---

## Constraints and assumptions

- v1 assumes at least one connected calendar per plan is required to generate a proposal; plans with zero connected calendars fall back to a manual time-picker (not otherwise specified here).
- The existing "Link Up" app (App Store id6758226034) name collision, flagged in Stage 1/2 research, is unresolved — this spec assumes the name "Link Up" for now but it will likely change before launch.
- Out of scope for v1: live, in-person regrouping without connectivity (the Yosemite-style scenario) — this system is calendar/pre-planning based, not real-time location coordination.

---

## Open questions

- What does the under-13 parental consent flow actually look like? Not designed yet — flagged in Stage 2 as real compliance work, not yet resolved here.
- Does a plan need a minimum number of connected calendars to generate a trustworthy proposal, or can it work with just one or two out of a larger group?
- What happens if a non-installing friend (Quick Response) never responds at all — does the AI treat silence as availability, unavailability, or exclude them from the proposal entirely?
