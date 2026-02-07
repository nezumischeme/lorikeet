const VERSION = "v2";
const CACHE_NAME = `lorikeet-${VERSION}`;
const APP_STATIC_RESOURCES = [
  "/",
  "/index.html",  
  "/app.js",
  "/data/colorindex.json",
  "/data/data.json",
  "/sakura.css",
  "/icon-144.png",
  "/icon-512.png",
  "/icon-192.png",
  "/lorikeet.json"
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      cache.addAll(APP_STATIC_RESOURCES);
    })(),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const names = await caches.keys();
      await Promise.all(
        names.map((name) => {
          if (name !== CACHE_NAME) {
            return caches.delete(name);
          }
          return undefined;
        }),
      );
      await clients.claim()
    })()
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.mode == "navigate") {
    event.respondWith(caches.match("/"));
    return;
  }

  event.respondWith(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      const cachedResponse = await cache.match(event.request.url);
      if (cachedResponse) {
        return cachedResponse;
      }
      return new Response(null, { status: 404 })
    })(),
  );
});
