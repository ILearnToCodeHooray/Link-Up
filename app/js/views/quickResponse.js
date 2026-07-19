import * as store from "../store.js";
import { navigate } from "../router.js";
import { escapeHtml, fmtRange } from "../ui.js";

// No-account entry point: a friend who hasn't installed Link Up follows a
// shared link and sees ONLY this one plan — never any other group data or
// navigation, per the spec's no-account scoping requirement.
export function render(root, ctx) {
  const resolved = store.resolveInvite(ctx.params.token);
  const view = document.createElement("div");
  view.className = "view";
  root.innerHTML = "";
  root.appendChild(view);

  if (!resolved) {
    view.innerHTML = `<p>This link isn't valid anymore.</p>`;
    return;
  }

  const { plan, user, token } = resolved;

  function renderBody() {
    const p = store.getPlan(plan.id);
    const myStatus = p.responses[user.id] || "pending";
    const proposal = p.proposal;

    if (p.status === "error" || !proposal || !proposal.start) {
      view.innerHTML = `
        <div style="padding-top:20vh" class="center-text">
          <h2>Link Up</h2>
          <p>The group is still working out a time — check back soon.</p>
        </div>
      `;
      return;
    }

    view.innerHTML = `
      <div style="padding:20px 4px 4px" class="center-text">
        <p class="small muted">You've been invited to</p>
        <h2>${escapeHtml(p.name)}</h2>
      </div>
      <div class="card">
        <h3>${escapeHtml(proposal.place)}</h3>
        <p class="muted small">${escapeHtml(fmtRange(proposal.start, proposal.end))}</p>
        <p class="small">${escapeHtml(proposal.reason)}</p>
      </div>
      ${
        myStatus === "accepted"
          ? `<div class="banner banner-success">You're in! The group can see you've accepted.</div>`
          : myStatus === "flagged"
          ? `<div class="banner banner-info">You flagged a conflict — the group is re-proposing.</div>`
          : `
        <button class="btn btn-primary" id="accept-btn">I'm in</button>
        <button class="btn btn-secondary" id="flag-btn">Flag a conflict</button>
      `
      }
      <button class="btn btn-ghost" id="install-btn">Install the full app</button>
    `;

    const acceptBtn = view.querySelector("#accept-btn");
    if (acceptBtn) {
      acceptBtn.addEventListener("click", () => {
        store.setResponse(plan.id, user.id, "accepted");
        renderBody();
      });
    }
    const flagBtn = view.querySelector("#flag-btn");
    if (flagBtn) {
      flagBtn.addEventListener("click", () => {
        navigate(`/invite/${token}/flag-conflict`);
      });
    }
    view.querySelector("#install-btn").addEventListener("click", () => {
      navigate("/signup");
    });
  }

  renderBody();
}
