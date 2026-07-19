// Minimal service worker: caches the app shell so the installed PWA opens
// instantly and works offline for the mocked (localStorage-only) data.
const CACHE = "linkup-v1";
const SHELL = [
  "./",
  "./index.html",
  "./css/style.css",
  "./js/app.js",
  "./js/store.js",
  "./js/ai.js",
  "./js/router.js",
  "./js/ui.js",
  "./js/views/login.js",
  "./js/views/signup.js",
  "./js/views/consent.js",
  "./js/views/connectCalendar.js",
  "./js/views/home.js",
  "./js/views/friendGroups.js",
  "./js/views/startPlan.js",
  "./js/views/proposedPlan.js",
  "./js/views/confirmedPlan.js",
  "./js/views/flagConflict.js",
  "./js/views/quickResponse.js",
  "./js/views/settings.js",
  "./manifest.json",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(SHELL)).catch(() => {})
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  event.respondWith(
    caches.match(event.request).then(
      (cached) =>
        cached ||
        fetch(event.request)
          .then((res) => {
            const copy = res.clone();
            caches.open(CACHE).then((cache) => cache.put(event.request, copy));
            return res;
          })
          .catch(() => cached)
    )
  );
});
