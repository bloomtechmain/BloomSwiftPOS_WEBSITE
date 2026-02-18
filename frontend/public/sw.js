// Enhanced Service Worker for Asset Caching
const CACHE_NAME = 'bloomswift-pos-v2';
const RUNTIME_CACHE = 'bloomswift-runtime-v2';
const IMAGE_CACHE = 'bloomswift-images-v2';

const ASSETS_TO_CACHE = [
  '/',
  '/BLOOM_SWIFT_POS_LOGO_XS_T.png',
];

// Cache duration in milliseconds
const CACHE_DURATION = {
  images: 30 * 24 * 60 * 60 * 1000, // 30 days
  assets: 7 * 24 * 60 * 60 * 1000,  // 7 days
  pages: 24 * 60 * 60 * 1000,       // 1 day
};

// Install event - cache essential assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  const currentCaches = [CACHE_NAME, RUNTIME_CACHE, IMAGE_CACHE];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => !currentCaches.includes(name))
          .map((name) => caches.delete(name))
      );
    })
  );
  self.clients.claim();
});

// Helper function to check if cached response is still valid
function isCacheValid(response, maxAge) {
  if (!response) return false;
  const cachedDate = response.headers.get('sw-cache-date');
  if (!cachedDate) return false;
  const age = Date.now() - new Date(cachedDate).getTime();
  return age < maxAge;
}

// Helper function to add cache date to response
function addCacheDate(response) {
  const headers = new Headers(response.headers);
  headers.set('sw-cache-date', new Date().toISOString());
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: headers
  });
}

// Fetch event - Stale-While-Revalidate with smart caching
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip cross-origin requests except for fonts
  if (url.origin !== self.location.origin && !url.hostname.includes('fonts')) {
    return;
  }

  // Images - Cache first with long expiry
  if (request.destination === 'image' || request.url.match(/\.(png|jpg|jpeg|webp|avif|svg|ico)$/i)) {
    event.respondWith(
      caches.open(IMAGE_CACHE).then(async (cache) => {
        const cached = await cache.match(request);
        
        // Return cached if valid
        if (cached && isCacheValid(cached, CACHE_DURATION.images)) {
          return cached;
        }

        // Fetch and cache new image
        try {
          const response = await fetch(request);
          if (response && response.status === 200) {
            cache.put(request, addCacheDate(response.clone()));
          }
          return response;
        } catch (error) {
          // Return stale cache on network failure
          if (cached) return cached;
          throw error;
        }
      })
    );
    return;
  }

  // JS, CSS, Fonts - Cache first with medium expiry
  if (request.url.match(/\.(js|css|woff2|woff|ttf|otf)$/i) || request.url.includes('/assets/')) {
    event.respondWith(
      caches.open(CACHE_NAME).then(async (cache) => {
        const cached = await cache.match(request);
        
        // Return cached if valid
        if (cached && isCacheValid(cached, CACHE_DURATION.assets)) {
          // Update in background
          fetch(request).then((response) => {
            if (response && response.status === 200) {
              cache.put(request, addCacheDate(response.clone()));
            }
          }).catch(() => {});
          return cached;
        }

        // Fetch and cache
        try {
          const response = await fetch(request);
          if (response && response.status === 200) {
            cache.put(request, addCacheDate(response.clone()));
          }
          return response;
        } catch (error) {
          if (cached) return cached;
          throw error;
        }
      })
    );
    return;
  }

  // HTML pages - Network first, fallback to cache
  if (request.mode === 'navigate' || request.destination === 'document') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response && response.status === 200) {
            caches.open(RUNTIME_CACHE).then((cache) => {
              cache.put(request, addCacheDate(response.clone()));
            });
          }
          return response;
        })
        .catch(() => {
          return caches.match(request).then((cached) => {
            if (cached) return cached;
            return caches.match('/');
          });
        })
    );
    return;
  }

  // API calls and other requests - Network first
  event.respondWith(
    fetch(request)
      .then((response) => {
        if (response && response.status === 200 && request.method === 'GET') {
          caches.open(RUNTIME_CACHE).then((cache) => {
            cache.put(request, addCacheDate(response.clone()));
          });
        }
        return response;
      })
      .catch(() => {
        return caches.match(request);
      })
  );
});
