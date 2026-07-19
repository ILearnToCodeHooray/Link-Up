import * as store from "../store.js";
import { navigate } from "../router.js";
import { shell } from "../ui.js";

const PREF_OPTIONS = [
  { id: "dinner", label: "Dinner out" },
  { id: "outdoors", label: "Outdoors" },
  { id: "low-key", label: "Low-key hangs" },
  { id: "active", label: "Active / sporty" },
  { id: "events", label: "Shows & events" },
];

export function render(root, ctx) {
  const user = store.getCurrentUser();
  const fromSettings = ctx.query && ctx.query.from === "settings";
  root.innerHTML = shell({
    title: "Connect calendar",
    back: fromSettings ? "#/settings" : null,
    showNav: false,
  });
  const view = root.querySelector("#view");
  const selected = new Set(user.preferences || []);

  function renderBody() {
    view.innerHTML = `
      <p>Link Up reads your calendar to find times that actually work,
      and your preferences to suggest places you'll like. This data is
      only used to generate plan proposals — not stored or shared beyond
      that.</p>

      <div class="section-title">Calendar</div>
      <div class="card">
        ${
          user.calendarConnected
            ? `<p class="small" style="color:var(--green)">✓ Calendar connected (mock data)</p>`
            : `
          <button class="btn btn-secondary" id="connect-google">Connect Google Calendar</button>
          <button class="btn btn-secondary" id="connect-apple">Connect Apple Calendar</button>
        `
        }
      </div>

      <div class="section-title">Activity preferences</div>
      <div class="chip-group" id="pref-chips">
        ${PREF_OPTIONS.map(
          (p) =>
            `<button type="button" class="chip ${selected.has(p.id) ? "selected" : ""}" data-pref="${p.id}">${p.label}</button>`
        ).join("")}
      </div>

      <button class="btn btn-primary" id="done-btn">${fromSettings ? "Save" : "Continue"}</button>
      ${fromSettings ? "" : `<button class="btn btn-ghost" id="skip-btn">Skip for now</button>`}
    `;

    view.querySelectorAll("[data-pref]").forEach((chip) => {
      chip.addEventListener("click", () => {
        const id = chip.dataset.pref;
        if (selected.has(id)) selected.delete(id);
        else selected.add(id);
        store.updateUser(user.id, { preferences: Array.from(selected) });
        renderBody();
      });
    });

    const connectHandler = () => {
      store.connectCalendar(user.id);
      renderBody();
    };
    const gBtn = view.querySelector("#connect-google");
    const aBtn = view.querySelector("#connect-apple");
    if (gBtn) gBtn.addEventListener("click", connectHandler);
    if (aBtn) aBtn.addEventListener("click", connectHandler);

    view.querySelector("#done-btn").addEventListener("click", () => {
      navigate(fromSettings ? "/settings" : "/home");
    });
    const skipBtn = view.querySelector("#skip-btn");
    if (skipBtn) {
      skipBtn.addEventListener("click", () => navigate("/home"));
    }
  }

  renderBody();
}
