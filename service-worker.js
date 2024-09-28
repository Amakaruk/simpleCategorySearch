const CACHE_NAME = 'product-category-search-cache-v1';
const urlsToCache = [
    '/simpleCategorySearch/',  // root directory
    '/simpleCategorySearch/index.html',
    '/simpleCategorySearch/styles.css',
    '/simpleCategorySearch/app.js',
    '/simpleCategorySearch/manifest.json',
    '/simpleCategorySearch/icon-192x192.png',
    '/simpleCategorySearch/icon-512x512.png'
];

// Install event - caching all necessary files
self.addEventListener('install', (event) => {
    console.log('Service Worker: Installed');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Service Worker: Caching Files');
                return cache.addAll(urlsToCache);
            })
    );
});

// Fetch event - serving cached content when offline
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // Return cached response if found, otherwise fetch from network
                return response || fetch(event.request);
            })
            .catch(() => {
                // Fallback content if necessary (optional)
            })
    );
});

// Activate event - clean up old caches if necessary
self.addEventListener('activate', (event) => {
    console.log('Service Worker: Activated');
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        console.log('Service Worker: Clearing Old Cache');
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});