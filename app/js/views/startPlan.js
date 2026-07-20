import * as store from "../store.js";
import * as ai from "../ai.js";
import { navigate } from "../router.js";
import { shell, escapeHtml } from "../ui.js";

export function render(root) {
  const user = store.getCurrentUser();
  root.innerHTML = shell({ title: "Start a plan", back: "#/home", showNav: false });
  const view = root.querySelector("#view");

  const groups = store.listGroupsForUser(user.id);
  const knownPeople = new Map();
  groups.forEach((g) =>
    g.memberIds.forEach((id) => {
      if (id !== user.id) knownPeople.set(id, store.getUser(id));
    })
  );

  const selectedIds = new Set();

  function renderBody() {
    view.innerHTML = `
      <div class="field">
        <label for="plan-name">What's the plan?</label>
        <input id="plan-name" type="text" placeholder="e.g. Dinner this week" required />
      </div>

      <div class="section-title">Use a group</div>
      ${
        groups.length
          ? `<div class="chip-group">${groups
              .map(
                (g) => `<button type="button" class="chip" data-group="${g.id}">${escapeHtml(g.name)}</button>`
              )
              .join("")}</div>`
          : `<p class="small muted">No groups yet.</p>`
      }
      <a href="#/friend-groups?pick=1" class="link-inline small">+ Create a new group</a>

      <div class="section-title">Or hand-pick people</div>
      ${
        knownPeople.size
          ? `<div class="chip-group" id="people-chips">${Array.from(knownPeople.values())
              .map(
                (p) =>
                  `<button type="button" class="chip ${selectedIds.has(p.id) ? "selected" : ""}" data-person="${p.id}">${escapeHtml(p.name)}</button>`
              )
              .join("")}</div>`
          : `<p class="small muted">Add friends to a group first to pick from them here.</p>`
      }

      <div id="start-error"></div>
      <button class="btn btn-primary" id="submit-btn" style="margin-top:8px">Generate a proposal</button>
    `;

    view.querySelectorAll("[data-group]").forEach((chip) => {
      chip.addEventListener("click", () => {
        const g = store.getGroup(chip.dataset.group);
        g.memberIds.forEach((id) => {
          if (id !== user.id) selectedIds.add(id);
        });
        renderBody();
      });
    });
    view.querySelectorAll("[data-person]").forEach((chip) => {
      chip.addEventListener("click", () => {
        const id = chip.dataset.person;
        if (selectedIds.has(id)) selectedIds.delete(id);
        else selectedIds.add(id);
        renderBody();
      });
    });

    view.querySelector("#submit-btn").addEventListener("click", () => {
      const name = view.querySelector("#plan-name").value.trim();
      const errorEl = view.querySelector("#start-error");
      if (!name) {
        errorEl.innerHTML = `<p class="small" style="color:var(--red)">Give the plan a name first.</p>`;
        return;
      }
      if (selectedIds.size === 0) {
        errorEl.innerHTML = `<p class="small" style="color:var(--red)">Pick a group or at least one person.</p>`;
        return;
      }
      const plan = store.createPlan({
        name,
        ownerId: user.id,
        participantIds: Array.from(selectedIds),
      });
      generateProposal(plan.id);
      navigate(`/plan/${plan.id}`);
    });
  }

  renderBody();
}

export function generateProposal(planId, excludeSlots = []) {
  const plan = store.getPlan(planId);
  const requiredIds = plan.participantIds.filter(
    (id) => !plan.optionalIds.includes(id)
  );
  const optionalIds = plan.optionalIds;
  const requiredUsers = requiredIds.map((id) => store.getUser(id));
  const optionalUsers = optionalIds.map((id) => store.getUser(id));

  const result = ai.propose({
    requiredUsers,
    optionalUsers,
    excludeSlots,
    round: plan.round,
  });

  if (!result.ok) {
    store.updatePlan(planId, { status: "error", proposal: { reason: result.reason } });
    return;
  }

  store.updatePlan(planId, {
    status: "proposed",
    proposal: {
      start: result.start.toISOString(),
      end: result.end.toISOString(),
      place: result.place,
      reason: result.reason,
      round: result.round,
    },
  });
}
