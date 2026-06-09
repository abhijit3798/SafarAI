const CACHE_NAME = 'safar-ai-cache-v1';

// Assets to cache immediately on SW installation
const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/offline.html',
  '/pwa-icon-192.png',
  '/pwa-icon-512.png'
];

// SW Install Event - Pre-cache core structural assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[Service Worker] Pre-caching core files');
        return cache.addAll(PRECACHE_ASSETS);
      })
      .then(() => self.skipWaiting())
  );
});

// SW Activate Event - Clean up stale cache registries
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('[Service Worker] Deleting old cache storage:', cache);
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// SW Fetch Event - Handle offline requests with caching strategies
self.addEventListener('fetch', (event) => {
  const request = event.request;
  const url = new URL(request.url);

  // Skip non-GET requests (e.g. POST for AI generation)
  if (request.method !== 'GET') {
    return;
  }

  // Network-First strategy for HTML root to prevent cache staleness
  if (url.pathname === '/' || url.pathname === '/index.html' || url.pathname === '/manifest.json') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Clone response and save to cache
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseClone);
          });
          return response;
        })
        .catch(() => {
          // Fallback to cache when offline, or render offline.html on root requests
          return caches.match(request)
            .then((cachedResponse) => {
              return cachedResponse || caches.match('/offline.html');
            });
        })
    );
    return;
  }

  // Cache-First strategy for static assets (images, hashed JS/CSS files)
  event.respondWith(
    caches.match(request)
      .then((cachedResponse) => {
        if (cachedResponse) {
          // Fetch new version in background to update cache (stale-while-revalidate style)
          fetch(request).then((response) => {
            if (response.status === 200) {
              caches.open(CACHE_NAME).then((cache) => cache.put(request, response));
            }
          }).catch(() => {/* Ignore network failures when updating background caches */});
          
          return cachedResponse;
        }

        // Cache miss - retrieve from network and save to cache
        return fetch(request)
          .then((response) => {
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            const responseToCache = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseToCache);
            });
            return response;
          });
      })
  );
});
