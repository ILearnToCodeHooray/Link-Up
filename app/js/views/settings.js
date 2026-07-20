import * as store from "../store.js";
import { shell, escapeHtml } from "../ui.js";

export function render(root) {
  const user = store.getCurrentUser();
  root.innerHTML = shell({ title: "Settings", activeTab: "settings" });
  const view = root.querySelector("#view");

  view.innerHTML = `
    <div class="section-title">Account</div>
    <div class="card">
      <div class="row"><span>Name</span><span class="muted">${escapeHtml(user.name)}</span></div>
      <div class="row"><span>Email</span><span class="muted">${escapeHtml(user.email || "—")}</span></div>
      ${
        user.isMinor
          ? `<div class="row"><span>Parental consent</span><span class="badge ${user.parentalConsent === "approved" ? "badge-green" : "badge-amber"}">${escapeHtml(user.parentalConsent)}</span></div>`
          : ""
      }
    </div>

    <div class="section-title">Calendar & preferences</div>
    <div class="card">
      <div class="row">
        <span>Calendar</span>
        <span class="${user.calendarConnected ? "" : "muted"}">${user.calendarConnected ? "Connected" : "Not connected"}</span>
      </div>
      <div class="row">
        <span>Preferences</span>
        <span class="muted">${user.preferences && user.preferences.length ? escapeHtml(user.preferences.join(", ")) : "None set"}</span>
      </div>
      <a href="#/connect-calendar?from=settings" class="btn btn-secondary btn-sm" style="margin-top:10px">Manage</a>
    </div>

    <div class="section-title">Notifications</div>
    <div class="card">
      <div class="row">
        <span>Plan updates</span>
        <label style="display:flex;align-items:center;gap:6px">
          <input type="checkbox" id="notif-toggle" ${user.notifications !== false ? "checked" : ""} />
        </label>
      </div>
    </div>

    <button class="btn btn-secondary" id="signout-btn" style="margin-top:20px">Sign out</button>
  `;

  view.querySelector("#notif-toggle").addEventListener("change", (e) => {
    store.updateUser(user.id, { notifications: e.target.checked });
  });

  view.querySelector("#signout-btn").addEventListener("click", () => {
    store.logout();
    location.hash = "#/login";
  });
}
