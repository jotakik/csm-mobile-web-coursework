const CACHE_NAME = "hybrid-report-cache-v1";

const ASSETS_TO_CACHE = [
    "./",
    "./index.html",
    "./styles.css",
    "../CIS_128_Assignments.css"
];

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Opened cache');
                return cache.addAll(ASSETS_TO_CACHE);
            })
    );
});

self.addEventListener('activate', (event) => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames
                    .filter((cacheName) => !cacheWhitelist.includes(cacheName))
                    .map((cacheName) => caches.delete(cacheName))
            );
        })
    );
});

self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((cachedFile) => {
                return cachedFile || fetch(event.request);
            })
    );
});