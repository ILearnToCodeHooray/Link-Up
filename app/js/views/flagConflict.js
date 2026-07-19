import * as store from "../store.js";
import { navigate } from "../router.js";
import { shell, escapeHtml, fmtRange } from "../ui.js";
import { generateProposal } from "./startPlan.js";

// Shared screen, reached from two different origins (surfaced during the
// wireframe scenario walkthrough): a logged-in member coming from
// Proposed Plan, or a non-installed friend coming from Quick Response.
// Confirming always routes back to whichever origin sent it — never to
// Proposed Plan for the Quick Response case, since that would expose full
// group navigation to someone without an account.

function renderCommon(root, { title, backHref, plan, userId, onConfirm }) {
  root.innerHTML = shell({ title, back: backHref, showNav: false });
  const view = root.querySelector("#view");
  const proposal = plan.proposal;

  view.innerHTML = `
    <div class="card">
      <h3>${escapeHtml(proposal.place)}</h3>
      <p class="muted small">${escapeHtml(fmtRange(proposal.start, proposal.end))}</p>
    </div>
    <p>Let the group know this time doesn't work for you.</p>
    <div class="field">
      <label for="note">Note (optional)</label>
      <textarea id="note" placeholder="e.g. I've got a work thing that evening"></textarea>
    </div>
    <button class="btn btn-danger" id="confirm-btn">Confirm conflict</button>
    <a href="${backHref}" class="btn btn-secondary">Cancel</a>
  `;

  view.querySelector("#confirm-btn").addEventListener("click", () => {
    const note = view.querySelector("#note").value.trim();
    store.setResponse(plan.id, userId, "flagged", note);
    const excludeSlots = [
      { start: new Date(proposal.start), end: new Date(proposal.end) },
    ];
    const p = store.getPlan(plan.id);
    store.updatePlan(plan.id, { round: p.round + 1 });
    generateProposal(plan.id, excludeSlots);
    // Reset responses for the new round so everyone re-confirms.
    const fresh = store.getPlan(plan.id);
    fresh.participantIds.forEach((id) => {
      if (id !== fresh.ownerId) store.setResponse(plan.id, id, "pending");
    });
    onConfirm();
  });
}

// /plan/:id/flag-conflict — logged-in member
export function renderFromPlan(root, ctx) {
  const user = store.getCurrentUser();
  const plan = store.getPlan(ctx.params.id);
  renderCommon(root, {
    title: "Flag a conflict",
    backHref: `#/plan/${plan.id}`,
    plan,
    userId: user.id,
    onConfirm: () => navigate(`/plan/${plan.id}`),
  });
}

// /invite/:token/flag-conflict — non-installed friend, no account
export function renderFromInvite(root, ctx) {
  const resolved = store.resolveInvite(ctx.params.token);
  if (!resolved) {
    root.innerHTML = `<div class="view"><p>This link isn't valid anymore.</p></div>`;
    return;
  }
  const { plan, user } = resolved;
  renderCommon(root, {
    title: "Flag a conflict",
    backHref: `#/invite/${ctx.params.token}`,
    plan,
    userId: user.id,
    onConfirm: () => navigate(`/invite/${ctx.params.token}`),
  });
}
