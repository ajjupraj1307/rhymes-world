// This file lets your website work like an app: it saves a copy of your
// pages so they open instantly and even work without internet, after the
// first visit.

const CACHE_NAME = "rhymes-world-cache-v1";
const FILES_TO_SAVE = [
  "./",
  "./index.html",
  "./style.css",
  "./script.js",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png"
];

// When the app is installed, save the important files
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(FILES_TO_SAVE))
  );
  self.skipWaiting();
});

// Clean up old saved copies when a new version is installed
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((names) =>
      Promise.all(
        names.filter((n) => n !== CACHE_NAME).map((n) => caches.delete(n))
      )
    )
  );
  self.clients.claim();
});

// Serve saved files when offline, otherwise fetch from the internet
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
});
