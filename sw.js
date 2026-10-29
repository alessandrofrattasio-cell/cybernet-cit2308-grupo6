const CACHE_NAME = 'cybernet-cache-v1';

const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './servicios.html',
    './historial.html',
    './resumen.html',
    './computadores.html',
    './clientes.html',
    './login.html',
    './register.html',
    './style.css',
    './manifest.json',

    
    './js/app.js',
    './js/repositorio.js',
    './js/servicios.repository.js',
    './js/servicios.service.js',
    './js/servicios.controller.js',
    './js/sesionRepository.js',
    './js/sesionService.js',
    './js/historial.controller.js',
    './js/resumen.controller.js',
    './js/registrarServiceWorker.js',

    
    'https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js'
];


self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('[Service Worker] Caching app shell and CDN resources');
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
    self.skipWaiting();
});


self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.map((key) => {
                    if (key !== CACHE_NAME) {
                        console.log('[Service Worker] Removing old cache', key);
                        return caches.delete(key);
                    }
                })
            );
        })
    );
    self.clients.claim();
});


self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            if (cachedResponse) {
                return cachedResponse;
            }
            return fetch(event.request).catch(() => {
                
                if (event.request.mode === 'navigate') {
                    return caches.match('./resumen.html');
                }
            });
        })
    );
});