const VERSION = "v1";
const CACHE_NAME = `period-tracker-${VERSION}`;
const APP_STATIC_RESOURCES = [
    "/",
    "/index.html",
    "/style.css",
    "/app.js",
    "/icon.png",
    "/mani.json"
];
self.addEventListener("install", (event) => {
  console.log("installed");
    event.waitUntil(
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
          }),
        );
        await clients.claim();
      })(),
    );
});
// On fetch, intercept server requests
// and respond with cached responses instead of going to network
/*self.addEventListener("fetch", (event) => {
    // As a single page app, direct app to always go to cached home page.
    if (event.request.mode === "navigate") {
      console.log("responded /");
      event.respondWith(caches.match("/")());
      return;
    }
  
    // For all other requests, go to the cache first, and then the network.
    event.respondWith(
      (async () => {
        const cache = await caches.open(CACHE_NAME);
        const cachedResponse = await cache.match(event.request.url);
        if (cachedResponse) {
          // Return the cached response if it's available.
          console.log("responded",cachedResponse)
          return cachedResponse;
        }
        // If resource isn't in the cache, return a 404.
        console.log("responded 404");
        return new Response(null, { status: 404 });
      })()
    );
}); */