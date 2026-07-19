import * as store from "../store.js";
import { shell, escapeHtml, emptyState } from "../ui.js";

export function render(root, ctx) {
  const user = store.getCurrentUser();
  const pickMode = ctx.query && ctx.query.pick === "1"; // arrived from Start a Plan
  root.innerHTML = shell({
    title: "Friend groups",
    back: pickMode ? "#/start-a-plan" : null,
    activeTab: "groups",
    showNav: !pickMode,
  });
  const view = root.querySelector("#view");

  function renderBody() {
    const groups = store.listGroupsForUser(user.id);
    view.innerHTML = `
      ${pickMode ? `<div class="banner banner-info">Create a group here, then head back to finish starting your plan.</div>` : ""}
      <div class="section-title">New group</div>
      <div class="card">
        <div class="field" style="margin-bottom:10px">
          <input id="new-group-name" type="text" placeholder="Group name (e.g. Weekend Crew)" />
        </div>
        <button class="btn btn-primary btn-sm" id="create-group-btn">Create group</button>
      </div>

      <div class="section-title">Your groups</div>
      ${
        groups.length
          ? groups
              .map((g) => {
                const members = g.memberIds
                  .map((id) => store.getUser(id))
                  .filter(Boolean);
                return `
              <div class="card" data-group="${g.id}">
                <h3>${escapeHtml(g.name)}</h3>
                ${members
                  .map(
                    (m) => `
                  <div class="row">
                    <div style="display:flex;align-items:center;gap:10px">
                      <div class="avatar">${escapeHtml(m.name[0] || "?")}</div>
                      <div>
                        <div>${escapeHtml(m.name)}${m.id === user.id ? " (you)" : ""}</div>
                        ${!m.installed ? `<div class="small muted">Not on Link Up yet</div>` : ""}
                      </div>
                    </div>
                    ${
                      m.id !== user.id
                        ? `<button class="btn btn-ghost btn-sm" data-remove="${g.id}:${m.id}">Remove</button>`
                        : ""
                    }
                  </div>
                `
                  )
                  .join("")}
                <div class="field" style="margin-top:10px;margin-bottom:8px">
                  <input type="text" placeholder="Add friend by name" data-add-name="${g.id}" />
                </div>
                <button class="btn btn-secondary btn-sm" data-add="${g.id}">Add friend</button>
              </div>
            `;
              })
              .join("")
          : emptyState("No groups yet. Create one above.")
      }
    `;

    view.querySelector("#create-group-btn").addEventListener("click", () => {
      const input = view.querySelector("#new-group-name");
      const name = input.value.trim();
      if (!name) return;
      store.createGroup(user.id, name, []);
      renderBody();
    });

    view.querySelectorAll("[data-remove]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const [groupId, userId] = btn.dataset.remove.split(":");
        store.removeMemberFromGroup(groupId, userId);
        renderBody();
      });
    });

    view.querySelectorAll("[data-add]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const groupId = btn.dataset.add;
        const nameInput = view.querySelector(`[data-add-name="${groupId}"]`);
        const name = nameInput.value.trim();
        if (!name) return;
        // Mocks "add by contact / phone / invite link": creates a ghost
        // user who isn't installed until they follow a Quick Response link.
        const existing = store
          .listUsers()
          .find((u) => u.name.toLowerCase() === name.toLowerCase());
        const friend = existing || store.createGhostUser({ name });
        store.addMemberToGroup(groupId, friend.id);
        renderBody();
      });
    });
  }

  renderBody();
}
