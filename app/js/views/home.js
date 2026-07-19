import * as store from "../store.js";
import { shell, statusBadge, escapeHtml, emptyState, fmtRange } from "../ui.js";

export function render(root) {
  const user = store.getCurrentUser();
  root.innerHTML = shell({ title: "Link Up", activeTab: "home" });
  const view = root.querySelector("#view");
  const plans = store.listPlansForUser(user.id);

  const list = plans.length
    ? plans
        .map((p) => {
          const timeLine = p.proposal
            ? fmtRange(p.proposal.start, p.proposal.end)
            : "Working on a proposal…";
          return `
          <a class="card-link" href="#/plan/${p.id}">
            <div class="card">
              <div class="row" style="border:none;padding:0 0 6px">
                <h3>${escapeHtml(p.name)}</h3>
                ${statusBadge(p.status)}
              </div>
              <p class="small muted" style="margin:0">${escapeHtml(timeLine)}</p>
            </div>
          </a>
        `;
        })
        .join("")
    : emptyState(
        "No plans yet. Start one and let Link Up figure out the when and where.",
        `<a href="#/start-a-plan" class="btn btn-primary" style="margin-top:14px">Start a plan</a>`
      );

  view.innerHTML = `
    <div class="row" style="border:none;padding-bottom:14px">
      <div>
        <h2>Hey, ${escapeHtml(user.name)} 👋</h2>
        <p class="small muted" style="margin:2px 0 0">Here's what's in motion.</p>
      </div>
    </div>
    ${!user.calendarConnected ? `<div class="banner banner-info">Your calendar isn't connected yet, so plans that include you will be a best guess. <a class="link-inline" href="#/connect-calendar?from=settings">Connect it</a>.</div>` : ""}
    ${plans.length ? `<a href="#/start-a-plan" class="btn btn-primary">Start a new plan</a>` : ""}
    <div class="section-title">Your plans</div>
    ${list}
  `;
}
