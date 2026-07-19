// ai.js — rules-based stand-in for the real AI proposal engine.
//
// This is deliberately NOT a call to an LLM. It's a small heuristic that
// reads mock calendar free/busy data + stated preferences and picks a time
// and place, so the full Start a Plan -> Proposed Plan -> Confirmed Plan
// flow can be built and demoed before any real model call is wired in.
// Swap the body of `propose()` for a real API call later; the shape of the
// return value is the contract the rest of the app depends on.

const PLACE_POOL = {
  dinner: ["Farmhouse Kitchen", "Ronaldo's Pizza", "The Yellow Deli"],
  outdoors: ["Riverside Park", "Overlook Trailhead", "the community garden"],
  "low-key": ["someone's place", "Corner Cafe", "the game store lounge"],
  default: ["Farmhouse Kitchen", "someone's place", "Riverside Park"],
};

const SLOT_START_HOUR = 9;
const SLOT_END_HOUR = 21;
const SLOT_STEP_MIN = 30;
const DURATION_MIN = 120;

function overlaps(aStart, aEnd, bStart, bEnd) {
  return aStart < bEnd && bStart < aEnd;
}

function isFreeAt(user, start, end) {
  if (!user.calendarConnected) return null; // unknown, not false
  return !(user.freeBusy || []).some((block) =>
    overlaps(start, end, new Date(block.start), new Date(block.end))
  );
}

function pickPlace(users) {
  const counts = {};
  users.forEach((u) =>
    (u.preferences || []).forEach((p) => {
      counts[p] = (counts[p] || 0) + 1;
    })
  );
  const top = Object.entries(counts).sort((a, b) => b[1] - a[1])[0];
  const pool = top ? PLACE_POOL[top[0]] || PLACE_POOL.default : PLACE_POOL.default;
  return { place: pool[0], tag: top ? top[0] : null };
}

function fmtTime(date) {
  return date.toLocaleString(undefined, {
    weekday: "long",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

/**
 * users: full user objects for everyone in plan.participantIds who is NOT
 *   in optionalIds (required attendees) — plus optional ones passed
 *   separately so we can still mention them.
 * excludeSlots: previously-proposed / flagged windows to skip this round
 *   (each {start, end} as Date), so re-proposing doesn't just repeat itself.
 */
export function propose({ requiredUsers, optionalUsers = [], excludeSlots = [], round = 0 }) {
  const connected = requiredUsers.filter((u) => u.calendarConnected);
  if (connected.length === 0) {
    return {
      ok: false,
      reason:
        "None of the required people have connected a calendar yet, so there's nothing to propose from. Connect at least one calendar to get a plan.",
    };
  }

  const now = new Date();
  for (let day = 0; day < 7; day++) {
    for (
      let minutesFromStart = 0;
      minutesFromStart <= (SLOT_END_HOUR - SLOT_START_HOUR) * 60 - DURATION_MIN;
      minutesFromStart += SLOT_STEP_MIN
    ) {
      const start = new Date(now);
      start.setDate(start.getDate() + day);
      start.setHours(SLOT_START_HOUR, 0, 0, 0);
      start.setMinutes(start.getMinutes() + minutesFromStart);
      if (start < now) continue;
      const end = new Date(start.getTime() + DURATION_MIN * 60 * 1000);

      const clashesExcluded = excludeSlots.some((s) =>
        overlaps(start, end, s.start, s.end)
      );
      if (clashesExcluded) continue;

      const freeChecks = requiredUsers.map((u) => isFreeAt(u, start, end));
      // null (unknown) is treated as available-but-uncertain; false blocks it.
      const allFree = freeChecks.every((f) => f !== false);
      if (!allFree) continue;

      const unknownCount = freeChecks.filter((f) => f === null).length;
      const { place, tag } = pickPlace([...requiredUsers, ...optionalUsers]);

      let reason = `Everyone required is free ${fmtTime(start)}`;
      if (tag) reason += `, and the group leans toward ${tag} plans, so ${place} fits.`;
      else reason += `, so ${place} is a solid default.`;
      if (unknownCount > 0) {
        reason += ` (${unknownCount} of ${requiredUsers.length} required people haven't connected a calendar, so this is a best guess for them.)`;
      }
      if (round > 0) {
        reason = `Found a new time after the last one didn't work. ${reason}`;
      }

      return {
        ok: true,
        start,
        end,
        place,
        reason,
        round,
      };
    }
  }

  return {
    ok: false,
    reason:
      "Couldn't find a time in the next week that works for everyone required. Try marking someone as optional, or check back after schedules open up.",
  };
}
