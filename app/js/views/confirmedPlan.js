import * as store from "../store.js";
import { navigate } from "../router.js";
import { shell, escapeHtml, fmtRange } from "../ui.js";
import { generateProposal } from "./startPlan.js";

export function render(root, ctx) {
  const user = store.getCurrentUser();
  const plan = store.getPlan(ctx.params.id);
  root.innerHTML = shell({ title: plan.name, back: "#/home" });
  const view = root.querySelector("#view");
  const proposal = plan.proposal;

  const confirmedNames = plan.participantIds
    .filter((id) => plan.responses[id] === "accepted")
    .map((id) => store.getUser(id).name);

  view.innerHTML = `
    <div class="banner banner-success">It's happening — everyone required is in.</div>
    <div class="card">
      <h3>${escapeHtml(proposal.place)}</h3>
      <p class="muted small" style="margin:0 0 8px">${escapeHtml(fmtRange(proposal.start, proposal.end))}</p>
    </div>
    <div class="section-title">Who's confirmed</div>
    <div class="card">
      ${confirmedNames.map((n) => `<div class="row">${escapeHtml(n)}</div>`).join("")}
    </div>
    <button class="btn btn-danger" id="leave-btn">I can't make it anymore</button>
  `;

  view.querySelector("#leave-btn").addEventListener("click", () => {
    store.setResponse(plan.id, user.id, "left");
    const p = store.getPlan(plan.id);
    const stillRequired = p.participantIds.filter(
      (id) => id !== user.id && !p.optionalIds.includes(id)
    );
    store.updatePlan(plan.id, {
      status: "proposed",
      optionalIds: [...p.optionalIds, user.id],
    });
    generateProposal(plan.id, [
      { start: new Date(proposal.start), end: new Date(proposal.end) },
    ]);
    navigate(`/plan/${plan.id}`);
  });
}
