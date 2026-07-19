import * as store from "../store.js";
import { navigate } from "../router.js";
import { shell } from "../ui.js";

export function render(root) {
  root.innerHTML = shell({ title: "Create account", back: "#/login", showNav: false });
  const view = root.querySelector("#view");
  const currentYear = new Date().getFullYear();
  view.innerHTML = `
    <form id="signup-form">
      <div class="field">
        <label for="name">Name</label>
        <input id="name" type="text" required placeholder="Your name" />
      </div>
      <div class="field">
        <label for="email">Email</label>
        <input id="email" type="email" required placeholder="you@example.com" />
      </div>
      <div class="field">
        <label for="birthYear">Birth year</label>
        <input id="birthYear" type="number" required min="1900" max="${currentYear}" placeholder="e.g. ${currentYear - 20}" />
        <p class="small muted" style="margin-top:6px">
          We ask this so we can route accounts under 13 through parental
          consent, per COPPA.
        </p>
      </div>
      <div id="signup-error"></div>
      <button class="btn btn-primary" type="submit">Create account</button>
    </form>
  `;

  view.querySelector("#signup-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const name = view.querySelector("#name").value.trim();
    const email = view.querySelector("#email").value.trim();
    const birthYear = view.querySelector("#birthYear").value;
    const errorEl = view.querySelector("#signup-error");

    if (store.findUserByEmail(email)) {
      errorEl.innerHTML = `<p class="small" style="color:var(--red)">An account already exists for that email. <a class="link-inline" href="#/login">Log in</a> instead.</p>`;
      return;
    }

    const user = store.createUser({ name, email, birthYear });
    store.setCurrentUser(user.id);
    if (user.isMinor) {
      navigate("/consent-needed");
    } else {
      navigate("/connect-calendar");
    }
  });
}
