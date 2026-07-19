import * as store from "../store.js";
import { navigate } from "../router.js";
import { shell, escapeHtml, fmtRange, responseBadge } from "../ui.js";
import { generateProposal } from "./startPlan.js";

export function render(root, ctx) {
  const user = store.getCurrentUser();
  const plan = store.getPlan(ctx.params.id);
  root.innerHTML = shell({ title: plan.name, back: "#/home" });
  const view = root.querySelector("#view");

  function renderBody() {
    const p = store.getPlan(plan.id);

    if (p.status === "error") {
      view.innerHTML = `
        <div class="banner banner-error">
          <strong>Couldn't find a plan that works for everyone yet.</strong><br/>
          ${escapeHtml(p.proposal ? p.proposal.reason : "")}
        </div>
        <div class="section-title">Required people</div>
        ${p.participantIds
          .filter((id) => !p.optionalIds.includes(id))
          .map((id) => renderPersonRow(id, p))
          .join("")}
        <p class="small muted" style="margin-top:10px">Mark someone optional to widen the search, or check back once schedules open up.</p>
      `;
      wirePersonActions();
      return;
    }

    const proposal = p.proposal;
    const isConfirmedForMe = p.responses[user.id] === "accepted";

    view.innerHTML = `
      <div class="card">
        <h3>${escapeHtml(proposal.place)}</h3>
        <p class="muted small" style="margin:0 0 8px">${escapeHtml(fmtRange(proposal.start, proposal.end))}</p>
        <p class="small">${escapeHtml(proposal.reason)}</p>
      </div>

      <div class="section-title">Who's in</div>
      <div class="card">
        ${p.participantIds.map((id) => renderPersonRow(id, p)).join("")}
      </div>

      ${
        isConfirmedForMe
          ? `<p class="small center-text muted">You're in. Waiting on everyone else.</p>`
          : `<button class="btn btn-primary" id="accept-btn">Accept</button>`
      }
      <button class="btn btn-secondary" id="flag-btn">Flag a conflict</button>
    `;

    const acceptBtn = view.querySelector("#accept-btn");
    if (acceptBtn) {
      acceptBtn.addEventListener("click", () => {
        store.setResponse(plan.id, user.id, "accepted");
        checkAllAccepted();
        renderBody();
      });
    }
    view.querySelector("#flag-btn").addEventListener("click", () => {
      navigate(`/plan/${plan.id}/flag-conflict`);
    });
    wirePersonActions();
  }

  function renderPersonRow(id, p) {
    const person = store.getUser(id);
    const status = p.optionalIds.includes(id)
      ? "optional"
      : p.responses[id] || "pending";
    const showInviteLink = !person.installed && status !== "accepted";
    return `
      <div class="row" style="flex-wrap:wrap">
        <div style="display:flex;align-items:center;gap:10px">
          <div class="avatar">${escapeHtml(person.name[0] || "?")}</div>
          <div>
            <div>${escapeHtml(person.name)}${id === user.id ? " (you)" : ""}</div>
            ${!person.installed ? `<div class="small muted">Not on Link Up</div>` : ""}
          </div>
        </div>
        ${
          status === "optional"
            ? `<span class="badge badge-muted">Optional</span>`
            : responseBadge(status)
        }
        ${
          p.status === "error" && id !== plan.ownerId
            ? `<button class="btn btn-ghost btn-sm" data-toggle-optional="${id}">${p.optionalIds.includes(id) ? "Make required" : "Make optional"}</button>`
            : ""
        }
        ${
          showInviteLink
            ? `<button class="btn btn-secondary btn-sm" data-invite="${id}" style="width:100%;margin-top:6px">Copy invite link</button>
               <span class="small muted" data-invite-link="${id}" style="width:100%"></span>`
            : ""
        }
      </div>
    `;
  }

  function wirePersonActions() {
    view.querySelectorAll("[data-toggle-optional]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.toggleOptional;
        const p = store.getPlan(plan.id);
        const optionalIds = p.optionalIds.includes(id)
          ? p.optionalIds.filter((x) => x !== id)
          : [...p.optionalIds, id];
        store.updatePlan(plan.id, { optionalIds });
        generateProposal(plan.id);
        renderBody();
      });
    });
    view.querySelectorAll("[data-invite]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.invite;
        const token = store.createInvite(plan.id, id);
        const url = `${location.origin}${location.pathname}#/invite/${token}`;
        const label = view.querySelector(`[data-invite-link="${id}"]`);
        if (navigator.clipboard) {
          navigator.clipboard.writeText(url).catch(() => {});
        }
        if (label) label.textContent = `Copied: ${url}`;
      });
    });
  }

  function checkAllAccepted() {
    const p = store.getPlan(plan.id);
    const required = p.participantIds.filter((id) => !p.optionalIds.includes(id));
    const allAccepted = required.every((id) => p.responses[id] === "accepted");
    if (allAccepted) {
      store.updatePlan(plan.id, { status: "confirmed" });
      navigate(`/plan/${plan.id}`);
    }
  }

  renderBody();
}
