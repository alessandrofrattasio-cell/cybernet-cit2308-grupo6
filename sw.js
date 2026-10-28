const CACHE_NAME = "cybernet-shell-v1";
const ALPINE_URL = "https://cdn.jsdelivr.net/npm/alpinejs@3.14.9/dist/cdn.min.js";
const ARCHIVOS = [
   "./login.html",
   "./register.html",
   "./computadores.html",
   "./clientes.html",
   "./servicios.html",
   "./historial.html",
   "./resumen.html",
   "./style.css",
   "./computadores.css",
   "./clientes.css",
   "./resumen.css",
   "./script.js",
   "./servicios.js",
   "./js/repositorio.js",
   "./js/clienteRepository.js",
   "./js/clienteService.js",
   "./js/clienteController.js",
   "./js/computadores-repositorio.js",
   "./js/computadores-servicio.js",
   "./js/computadores-controlador.js",
   "./js/usuarioRepository.js",
   "./js/usuarioService.js",
   "./js/usuarioController.js",
   "./js/app.js",
   "./js/conexionController.js",
   "./js/registrarServiceWorker.js"
];

self.addEventListener("install", function (evento) {
   evento.waitUntil(
      caches.open(CACHE_NAME).then(function (cache) {
         return cache.addAll(ARCHIVOS.concat(ALPINE_URL));
      }).then(function () {
         return self.skipWaiting();
      })
   );
});

self.addEventListener("activate", function (evento) {
   evento.waitUntil(
      caches.keys().then(function (nombres) {
         return Promise.all(nombres.map(function (nombre) {
            if (nombre.startsWith("cybernet-shell-") && nombre !== CACHE_NAME) {
               return caches.delete(nombre);
            }
         }));
      }).then(function () {
         return self.clients.claim();
      })
   );
});

self.addEventListener("fetch", function (evento) {
   if (evento.request.method !== "GET") {
      return;
   }

   let url = new URL(evento.request.url);
   let esArchivoLocal = url.origin === self.location.origin;
   let esAlpine = evento.request.url === ALPINE_URL;

   if (!esArchivoLocal && !esAlpine) {
      return;
   }

   evento.respondWith(
      caches.match(evento.request).then(function (respuestaGuardada) {
         if (respuestaGuardada) {
            return respuestaGuardada;
         }

         return fetch(evento.request).catch(function () {
            if (evento.request.mode === "navigate") {
               return caches.match("./login.html");
            }

            return Response.error();
         });
      })
   );
});
