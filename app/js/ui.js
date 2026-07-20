// ui.js — small shared render helpers. No framework: views build HTML
// strings (escaping user data) and wire up listeners after insertion.

export function escapeHtml(str) {
  if (str === null || str === undefined) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function fmtRange(startIso, endIso) {
  const start = new Date(startIso);
  const end = new Date(endIso);
  const dateStr = start.toLocaleDateString(undefined, {
    weekday: "long",
    month: "short",
    day: "numeric",
  });
  const startStr = start.toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
  });
  const endStr = end.toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
  });
  return `${dateStr}, ${startStr}–${endStr}`;
}

export function statusBadge(status) {
  const map = {
    proposing: ["Thinking…", "badge-muted"],
    proposed: ["Waiting on responses", "badge-amber"],
    confirmed: ["Confirmed", "badge-green"],
    error: ["Needs attention", "badge-red"],
  };
  const [label, cls] = map[status] || [status, "badge-muted"];
  return `<span class="badge ${cls}">${escapeHtml(label)}</span>`;
}

export function responseBadge(status) {
  const map = {
    pending: ["No response yet", "badge-muted"],
    accepted: ["Accepted", "badge-green"],
    flagged: ["Flagged a conflict", "badge-red"],
    left: ["Left the plan", "badge-muted"],
  };
  const [label, cls] = map[status] || [status, "badge-muted"];
  return `<span class="badge ${cls}">${escapeHtml(label)}</span>`;
}

// App shell chrome: header with optional back button, and bottom tab bar
// for authenticated screens. Returns the HTML for the whole page including
// a <main id="view"> slot that the caller fills separately.
export function shell({ title, back, activeTab, showNav = true }) {
  const nav = showNav
    ? `
    <nav class="tabbar" aria-label="Primary">
      <a href="#/home" class="tab ${activeTab === "home" ? "active" : ""}">
        <span class="tab-icon">⌂</span><span>Home</span>
      </a>
      <a href="#/friend-groups" class="tab ${activeTab === "groups" ? "active" : ""}">
        <span class="tab-icon">◎</span><span>Groups</span>
      </a>
      <a href="#/settings" class="tab ${activeTab === "settings" ? "active" : ""}">
        <span class="tab-icon">⚙</span><span>Settings</span>
      </a>
    </nav>`
    : "";

  return `
    <header class="topbar">
      ${back ? `<a href="${back}" class="back-btn" aria-label="Back">←</a>` : `<span class="back-spacer"></span>`}
      <h1>${escapeHtml(title)}</h1>
      <span class="back-spacer"></span>
    </header>
    <main id="view" class="view ${showNav ? "with-nav" : ""}"></main>
    ${nav}
  `;
}

export function emptyState(message, actionHtml = "") {
  return `<div class="empty-state"><p>${escapeHtml(message)}</p>${actionHtml}</div>`;
}
