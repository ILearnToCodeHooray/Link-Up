// store.js — localStorage-backed mock data layer for Link Up.
// No backend. Everything here simulates what a real API + DB + calendar
// integration would do, so the full user flow can be built and tested
// before any real OAuth/LLM wiring happens.

const KEY = "linkup:v1";

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (e) {
    console.error("linkup: failed to parse store", e);
    return null;
  }
}

function save(db) {
  localStorage.setItem(KEY, JSON.stringify(db));
}

function emptyDb() {
  return {
    users: {}, // id -> user
    groups: {}, // id -> group
    plans: {}, // id -> plan
    invites: {}, // token -> { planId, userId }
    currentUserId: null,
  };
}

let db = load() || emptyDb();

function persist() {
  save(db);
}

function uid(prefix) {
  return (
    prefix +
    "_" +
    Date.now().toString(36) +
    Math.random().toString(36).slice(2, 8)
  );
}

// --- deterministic-ish mock calendar generation -------------------------

function hashSeed(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h << 5) - h + str.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

function mulberry32(seed) {
  let a = seed;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Generates busy blocks for the next 7 days for a user, seeded off their id
// so the same mock user always has the "same" calendar during a session.
function mockFreeBusy(userId) {
  const rand = mulberry32(hashSeed(userId));
  const blocks = [];
  const now = new Date();
  now.setMinutes(0, 0, 0);
  for (let day = 0; day < 7; day++) {
    const dayStart = new Date(now);
    dayStart.setDate(dayStart.getDate() + day);
    dayStart.setHours(8, 0, 0, 0);
    // 2-4 busy blocks per day between 8am and 10pm
    const numBlocks = 2 + Math.floor(rand() * 3);
    for (let b = 0; b < numBlocks; b++) {
      const startHour = 8 + Math.floor(rand() * 13); // 8am-9pm
      const durationHours = 1 + Math.floor(rand() * 2); // 1-2 hrs
      const start = new Date(dayStart);
      start.setHours(startHour, rand() < 0.5 ? 0 : 30, 0, 0);
      const end = new Date(start.getTime() + durationHours * 60 * 60 * 1000);
      blocks.push({ start: start.toISOString(), end: end.toISOString() });
    }
  }
  return blocks;
}

// --- users ----------------------------------------------------------------

export function getCurrentUser() {
  if (!db.currentUserId) return null;
  return db.users[db.currentUserId] || null;
}

export function setCurrentUser(id) {
  db.currentUserId = id;
  persist();
}

export function logout() {
  db.currentUserId = null;
  persist();
}

export function findUserByEmail(email) {
  return Object.values(db.users).find(
    (u) => u.email && u.email.toLowerCase() === email.toLowerCase()
  );
}

export function getUser(id) {
  return db.users[id] || null;
}

export function listUsers() {
  return Object.values(db.users);
}

export function createUser({ name, email, birthYear, installed = true }) {
  const id = uid("user");
  const currentYear = new Date().getFullYear();
  const age = birthYear ? currentYear - Number(birthYear) : null;
  const user = {
    id,
    name,
    email: email || null,
    birthYear: birthYear || null,
    isMinor: age !== null && age < 13,
    installed,
    calendarConnected: false,
    preferences: [],
    freeBusy: installed ? [] : mockFreeBusy(id),
    parentalConsent: age !== null && age < 13 ? "pending" : "not_required",
    createdAt: new Date().toISOString(),
  };
  db.users[id] = user;
  persist();
  return user;
}

export function updateUser(id, patch) {
  const user = db.users[id];
  if (!user) return null;
  Object.assign(user, patch);
  db.users[id] = user;
  persist();
  return user;
}

export function connectCalendar(id) {
  const user = db.users[id];
  if (!user) return null;
  user.calendarConnected = true;
  user.freeBusy = mockFreeBusy(id);
  persist();
  return user;
}

// Creates a lightweight "ghost" user for a friend who isn't on Link Up yet
// (added to a group by phone/contact, or invited ad hoc). They get mock
// calendar data (as if we could see general busy patterns) but are not
// "installed" and never log in — they only interact via invite tokens.
export function createGhostUser({ name, phone }) {
  const id = uid("ghost");
  const user = {
    id,
    name,
    phone: phone || null,
    email: null,
    installed: false,
    calendarConnected: false,
    preferences: [],
    freeBusy: mockFreeBusy(id),
    isMinor: false,
    parentalConsent: "not_required",
    createdAt: new Date().toISOString(),
  };
  db.users[id] = user;
  persist();
  return user;
}

// --- groups -----------------------------------------------------------------

export function listGroupsForUser(userId) {
  return Object.values(db.groups).filter((g) => g.memberIds.includes(userId));
}

export function getGroup(id) {
  return db.groups[id] || null;
}

export function createGroup(ownerId, name, memberIds = []) {
  const id = uid("group");
  const group = {
    id,
    name,
    ownerId,
    memberIds: Array.from(new Set([ownerId, ...memberIds])),
    createdAt: new Date().toISOString(),
  };
  db.groups[id] = group;
  persist();
  return group;
}

export function addMemberToGroup(groupId, userId) {
  const group = db.groups[groupId];
  if (!group) return null;
  if (!group.memberIds.includes(userId)) group.memberIds.push(userId);
  persist();
  return group;
}

export function removeMemberFromGroup(groupId, userId) {
  const group = db.groups[groupId];
  if (!group) return null;
  group.memberIds = group.memberIds.filter((id) => id !== userId);
  persist();
  return group;
}

// --- plans ------------------------------------------------------------------

export function listPlansForUser(userId) {
  return Object.values(db.plans)
    .filter((p) => p.participantIds.includes(userId))
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
}

export function getPlan(id) {
  return db.plans[id] || null;
}

export function createPlan({ name, ownerId, participantIds }) {
  const id = uid("plan");
  const allIds = Array.from(new Set([ownerId, ...participantIds]));
  const responses = {};
  allIds.forEach((pid) => {
    responses[pid] = pid === ownerId ? "accepted" : "pending";
  });
  const plan = {
    id,
    name,
    ownerId,
    participantIds: allIds,
    optionalIds: [],
    status: "proposing", // proposing -> proposed -> confirmed
    proposal: null, // { start, end, place, reason, round }
    responses, // userId -> 'pending' | 'accepted' | 'flagged' | 'left'
    conflictNotes: {}, // userId -> note
    round: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  db.plans[id] = plan;
  persist();
  return plan;
}

export function updatePlan(id, patch) {
  const plan = db.plans[id];
  if (!plan) return null;
  Object.assign(plan, patch, { updatedAt: new Date().toISOString() });
  db.plans[id] = plan;
  persist();
  return plan;
}

export function setResponse(planId, userId, status, note) {
  const plan = db.plans[planId];
  if (!plan) return null;
  plan.responses[userId] = status;
  if (note) plan.conflictNotes[userId] = note;
  plan.updatedAt = new Date().toISOString();
  persist();
  return plan;
}

// --- invite tokens (Quick Response, no-account links) ------------------------

export function createInvite(planId, userId) {
  // Reuse an existing token for this plan+user if one already exists.
  const existing = Object.entries(db.invites).find(
    ([, v]) => v.planId === planId && v.userId === userId
  );
  if (existing) return existing[0];
  const token = uid("tok").replace("tok_", "");
  db.invites[token] = { planId, userId };
  persist();
  return token;
}

export function resolveInvite(token) {
  const entry = db.invites[token];
  if (!entry) return null;
  const plan = db.plans[entry.planId];
  const user = db.users[entry.userId];
  if (!plan || !user) return null;
  return { plan, user, token };
}

// --- demo seed data -----------------------------------------------------------

export function seedDemoData() {
  if (Object.keys(db.users).length > 0) return; // already seeded (or user data exists)

  const riley = createUser({
    name: "Riley",
    email: "demo@linkup.app",
    birthYear: String(new Date().getFullYear() - 24),
  });
  connectCalendar(riley.id);
  updateUser(riley.id, { preferences: ["dinner", "low-key"] });

  const alex = createGhostUser({ name: "Alex" });
  updateUser(alex.id, {
    installed: true,
    calendarConnected: true,
    preferences: ["dinner", "outdoors"],
  });
  const sam = createGhostUser({ name: "Sam" });
  updateUser(sam.id, {
    installed: true,
    calendarConnected: true,
    preferences: ["low-key", "dinner"],
  });
  // Jordan represents the common real-world case: hasn't connected a
  // calendar yet, so the AI has incomplete data for them.
  const jordan = createGhostUser({ name: "Jordan" });
  updateUser(jordan.id, { installed: true, calendarConnected: false });

  createGroup(riley.id, "Weekend Crew", [alex.id, sam.id, jordan.id]);

  persist();
}

export function resetAll() {
  db = emptyDb();
  persist();
}
