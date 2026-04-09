// Service Worker for cook_now PWA
const CACHE_NAME = "cook-now-v3";
const RUNTIME_CACHE = "cook-now-runtime-v3";
const URLS_TO_CACHE = ["/", "/test.html", "/manifest.json", "/news.js"];

// Install event - cache essential files
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Service Worker: Cache opened");
      return cache.addAll(URLS_TO_CACHE).catch(() => {
        console.log("Service Worker: Some files could not be cached");
      });
    }),
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME && cacheName !== RUNTIME_CACHE) {
            console.log("Service Worker: Deleting old cache:", cacheName);
            return caches.delete(cacheName);
          }
        }),
      );
    }),
  );
  self.clients.claim();
});

// Fetch event - serve from cache, fall back to network
self.addEventListener("fetch", (event) => {
  // Skip cross-origin requests and certain endpoints
  if (
    !event.request.url.startsWith(self.location.origin) ||
    event.request.url.includes("googleapis.com") ||
    event.request.url.includes("firestore")
  ) {
    return;
  }

  // Network first strategy for API calls and dynamic content
  if (
    event.request.url.includes("firebase") ||
    event.request.url.includes("news.js") ||
    event.request.method !== "GET"
  ) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const responseClone = response.clone();
          caches.open(RUNTIME_CACHE).then((cache) => {
            cache.put(event.request, responseClone);
          });
          return response;
        })
        .catch(() => {
          return caches.match(event.request).then((response) => {
            return (
              response ||
              new Response("Offline - Data not available", {
                status: 503,
                statusText: "Service Unavailable",
              })
            );
          });
        }),
    );
    return;
  }

  // Cache first strategy for static assets
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response;
      }

      return fetch(event.request)
        .then((response) => {
          if (
            !response ||
            response.status !== 200 ||
            response.type === "error"
          ) {
            return response;
          }

          const responseClone = response.clone();
          caches.open(RUNTIME_CACHE).then((cache) => {
            cache.put(event.request, responseClone);
          });

          return response;
        })
        .catch(() => {
          return new Response("Offline", {
            status: 503,
            statusText: "Service Unavailable",
          });
        });
    }),
  );
});

// Handle messages from the app
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});
