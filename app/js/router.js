// router.js — tiny hash-based router. No framework, no build step.

let routes = [];
let rootEl = null;
let notFoundHandler = null;
let beforeEachHook = null;

function compile(pattern) {
  const paramNames = [];
  const regexStr = pattern
    .split("/")
    .map((seg) => {
      if (seg.startsWith(":")) {
        paramNames.push(seg.slice(1));
        return "([^/]+)";
      }
      return seg.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    })
    .join("/");
  return { regex: new RegExp("^" + regexStr + "$"), paramNames };
}

export function initRouter(el) {
  rootEl = el;
  window.addEventListener("hashchange", render);
}

export function beforeEach(fn) {
  beforeEachHook = fn;
}

export function route(pattern, handler) {
  routes.push({ ...compile(pattern), handler, pattern });
}

export function notFound(handler) {
  notFoundHandler = handler;
}

export function navigate(hash) {
  if (location.hash === "#" + hash) {
    render();
  } else {
    location.hash = hash;
  }
}

function parseHash() {
  let hash = location.hash.replace(/^#/, "");
  if (!hash) hash = "/login";
  const [path, queryStr] = hash.split("?");
  const query = Object.fromEntries(new URLSearchParams(queryStr || ""));
  return { path, query };
}

export async function render() {
  const { path, query } = parseHash();
  for (const r of routes) {
    const m = path.match(r.regex);
    if (m) {
      const params = {};
      r.paramNames.forEach((name, i) => (params[name] = decodeURIComponent(m[i + 1])));
      const ctx = { params, query, path };
      if (beforeEachHook) {
        const redirect = beforeEachHook(ctx);
        if (redirect) {
          navigate(redirect);
          return;
        }
      }
      rootEl.innerHTML = "";
      window.scrollTo(0, 0);
      await r.handler(rootEl, ctx);
      return;
    }
  }
  if (notFoundHandler) {
    rootEl.innerHTML = "";
    await notFoundHandler(rootEl, { path, query });
  }
}
