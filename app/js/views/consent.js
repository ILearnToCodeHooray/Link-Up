import * as store from "../store.js";
import { shell } from "../ui.js";

// Placeholder screen for the under-13 parental consent flow. Spec's Stage 3
// open question: "What does the under-13 parental consent flow actually
// look like?" — not designed yet. This screen exists so the signup branch
// has somewhere real to land instead of silently failing, and names the
// gap explicitly rather than pretending it's handled.
export function render(root) {
  root.innerHTML = shell({ title: "Parental consent needed", showNav: false });
  const view = root.querySelector("#view");
  const user = store.getCurrentUser();
  view.innerHTML = `
    <div class="banner banner-info">
      Because this account is registered under 13, Link Up needs a
      parent or guardian's consent before collecting any calendar or
      preference data (COPPA). That flow isn't designed yet — this is a
      placeholder so the signup path doesn't dead-end.
    </div>
    <p>Hi ${user ? user.name : ""}! We've saved your account, but it's on
    hold until a parent or guardian approves it.</p>
    <p class="muted small">Open question carried from the spec: what
    exactly this consent flow looks like (email to a parent? in-app code?)
    is still unresolved.</p>
    <a href="#/login" class="btn btn-secondary" id="signout-btn">Sign out</a>
  `;
  view.querySelector("#signout-btn").addEventListener("click", () => {
    store.logout();
  });
}
