import * as store from "./store.js";
import { initRouter, route, notFound, beforeEach, render } from "./router.js";

import * as login from "./views/login.js";
import * as signup from "./views/signup.js";
import * as consent from "./views/consent.js";
import * as connectCalendar from "./views/connectCalendar.js";
import * as home from "./views/home.js";
import * as friendGroups from "./views/friendGroups.js";
import * as startPlan from "./views/startPlan.js";
import * as proposedPlan from "./views/proposedPlan.js";
import * as confirmedPlan from "./views/confirmedPlan.js";
import * as flagConflict from "./views/flagConflict.js";
import * as quickResponse from "./views/quickResponse.js";
import * as settings from "./views/settings.js";

store.seedDemoData();

const PUBLIC_PATHS = [/^\/login$/, /^\/signup$/, /^\/invite\/[^/]+$/, /^\/invite\/[^/]+\/flag-conflict$/];

beforeEach((ctx) => {
  const isPublic = PUBLIC_PATHS.some((re) => re.test(ctx.path));
  const user = store.getCurrentUser();
  if (!isPublic && !user) return "/login";
  if ((ctx.path === "/login" || ctx.path === "/signup") && user) return "/home";
  return null;
});

route("/login", login.render);
route("/signup", signup.render);
route("/consent-needed", consent.render);
route("/connect-calendar", connectCalendar.render);
route("/home", home.render);
route("/friend-groups", friendGroups.render);
route("/start-a-plan", startPlan.render);
route("/plan/:id", (root, ctx) => {
  const plan = store.getPlan(ctx.params.id);
  if (!plan) {
    root.innerHTML = `<div class="view"><p>Plan not found.</p></div>`;
    return;
  }
  if (plan.status === "confirmed") return confirmedPlan.render(root, ctx);
  return proposedPlan.render(root, ctx);
});
route("/plan/:id/flag-conflict", flagConflict.renderFromPlan);
route("/invite/:token", quickResponse.render);
route("/invite/:token/flag-conflict", flagConflict.renderFromInvite);
route("/settings", settings.render);

notFound((root) => {
  root.innerHTML = `<div class="view"><p>Page not found. <a href="#/home">Go home</a></p></div>`;
});

initRouter(document.getElementById("app"));
render();

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js").catch(() => {});
  });
}
