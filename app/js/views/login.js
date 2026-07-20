import * as store from "../store.js";
import { navigate } from "../router.js";
import { shell, escapeHtml } from "../ui.js";

export function render(root) {
  root.innerHTML = shell({ title: "Log in", showNav: false });
  const view = root.querySelector("#view");
  view.innerHTML = `
    <div class="banner banner-info">
      Prototype note: this is a mocked login — no password needed. Try
      <strong>demo@linkup.app</strong> to see a fully-seeded account, or
      sign up as anyone new.
    </div>
    <form id="login-form">
      <div class="field">
        <label for="email">Email</label>
        <input id="email" type="email" placeholder="you@example.com" required />
      </div>
      <div id="login-error"></div>
      <button class="btn btn-primary" type="submit">Log in</button>
    </form>
    <p class="center-text small muted">
      New here? <a class="link-inline" href="#/signup">Create an account</a>
    </p>
  `;

  view.querySelector("#login-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const email = view.querySelector("#email").value.trim();
    const user = store.findUserByEmail(email);
    const errorEl = view.querySelector("#login-error");
    if (!user) {
      errorEl.innerHTML = `<p class="small" style="color:var(--red)">No account found for that email. <a class="link-inline" href="#/signup">Sign up</a> instead.</p>`;
      return;
    }
    store.setCurrentUser(user.id);
    navigate("/home");
  });
}
