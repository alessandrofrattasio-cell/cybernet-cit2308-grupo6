# CyberNet

Plataforma web para administrar un cibercafé (CIT2308 — Desarrollo Web y Móvil, UDP 2026-2).

Esta segunda entrega corresponde al **frontend dinámico y aplicación web progresiva (PWA)**: todas las vistas están construidas con Alpine.js, organizadas por dominio en capas (vista, controlador, servicio y repositorio), con datos guardados en `localStorage` detrás de un repositorio asíncrono, y funcionan sin conexión gracias a un Service Worker.

## Integrantes

- **Alessandro Frattasio** — Usuarios (login y registro) + Computadores
- **Vicente Encina** — Clientes + Sesiones (iniciar y finalizar)
- **Kaled Quijón** — Servicios adicionales + Historial + Resumen

## Infraestructura

- Instancia EC2 (Ubuntu 24.04 LTS) en AWS Academy Learner Lab, región `us-east-1`
- Servidor web: nginx
- IP pública (elástica, fija): **34.204.130.78**
- Security Group: solo puertos 22 (SSH) y 80 (HTTP) habilitados

Aplicación en línea: `http://34.204.130.78` (también `http://34.204.130.78/login.html`).

## Cómo correr el proyecto

Es un sitio estático (HTML, CSS y JavaScript), no necesita compilar ni instalar dependencias. Alpine.js se carga desde un CDN, así que la primera vez se necesita conexión a internet.

1. Clonar el repositorio y entrar a la carpeta:
   ```bash
   git clone <url-del-repositorio>
   cd cybernet-cit2308-grupo6
   ```
2. Levantar un servidor local (cualquiera de las dos opciones):
   ```bash
   python -m http.server 8000
   ```
   o abrir la carpeta en VS Code y usar la extensión **Live Server**.
3. Abrir `http://localhost:8000/login.html` en el navegador.

Notas:

- El Service Worker solo se registra en `localhost` o en `https://`, por eso la prueba sin conexión se hace en local.
- Los datos se guardan en el `localStorage` del navegador. Para empezar de cero: F12 → Application → Local Storage → borrar.
- Si se cambian archivos y el navegador sigue mostrando la versión anterior, subir `CACHE_NAME` en `sw.js` y recargar con Ctrl+Shift+R.

## Rutas implementadas

| Ruta | Propósito |
|---|---|
| `/login.html` | Autenticación del Encargado/Administrador para acceder al sistema |
| `/register.html` | Registro de una nueva cuenta de Encargado/Administrador |
| `/computadores.html` | Gestión de computadores: crear, editar y eliminar, con su estado (disponible/ocupado/fuera de servicio) y precio por hora |
| `/clientes.html` | Registro de clientes, asignación a un computador e inicio/fin de sesiones de uso |
| `/servicios.html` | Registro de servicios adicionales (impresión, bebidas, snacks) |
| `/historial.html` | Historial de sesiones finalizadas, con cliente, computador, horario y monto cobrado |
| `/resumen.html` | Resumen de actividad diaria: sesiones finalizadas, equipos utilizados y recaudación total |

## Arquitectura

Cada dominio se divide en cuatro capas, con las dependencias apuntando siempre hacia la abstracción:

```
Vista  →  Controlador  →  Servicio  →  Repositorio (contrato)  ←  LocalStorage...Repository
```

| Capa | Responsabilidad |
|---|---|
| Vista | Plantilla HTML con Alpine.js (`x-data`, `x-for`, `x-model`). No lee datos ni valida. |
| Controlador | Componente Alpine. Traduce la interacción en una orden al servicio y maneja los estados de carga, error y lista vacía. |
| Servicio | Reglas de negocio. Recibe el repositorio por constructor, nunca lo construye ni nombra `localStorage`. |
| Repositorio | Contrato asíncrono (`js/repositorio.js`, clase base `Repository`). Cada dominio lo extiende con una implementación sobre `localStorage`, el único lugar donde se usa. |

Todos los métodos del repositorio son `async`, para poder cambiar `localStorage` por `fetch` sin modificar servicios, controladores ni vistas.

**Composition root:** `js/app.js` es el único archivo que crea las clases concretas (repositorios y servicios) y registra los componentes en Alpine.

## Mapa de dominios

| Dominio | Vista | Controlador | Servicio | Repositorio | Responsable |
|---|---|---|---|---|---|
| Usuarios | `login.html`, `register.html` | `js/usuarioController.js` | `js/usuarioService.js` | `js/usuarioRepository.js` | Alessandro |
| Computadores | `computadores.html` | `js/computadores-controlador.js` | `js/computadores-servicio.js` | `js/computadores-repositorio.js` | Alessandro |
| Clientes | `clientes.html` | `js/clienteController.js` | `js/clienteService.js` | `js/clienteRepository.js` | Vicente |
| Sesiones | `clientes.html` (sección Sesiones) | `js/sesionController.js` | `js/sesionService.js` | `js/sesionRepository.js` | Vicente |
| Servicios adicionales | `servicios.html` | `js/servicios.controller.js` | `js/servicios.service.js` | `js/servicios.repository.js` | Kaled |
| Historial | `historial.html` | `js/historial.controller.js` | `js/sesionService.js` | `js/sesionRepository.js` | Kaled |
| Resumen | `resumen.html` | `js/resumen.controller.js` | `js/sesionService.js` | `js/sesionRepository.js` | Kaled |

Historial y Resumen reutilizan el servicio y el repositorio de Sesiones, porque trabajan sobre los mismos datos.

### Archivos compartidos

| Archivo | Función |
|---|---|
| `js/repositorio.js` | Contrato: clase base `Repository` con métodos `async` que lanzan "No implementado" |
| `js/app.js` | Composition root: instancia repositorios y servicios y registra los componentes Alpine |
| `js/conexionController.js` | Componente que muestra el aviso "Sin conexión" |
| `js/registrarServiceWorker.js` | Registra el Service Worker |
| `sw.js` | Service Worker: cachea el shell de la aplicación y el bundle de Alpine del CDN, y responde desde la caché |
| `manifest.json` | Manifest de la PWA (nombre, `start_url`, íconos) |
| `style.css` | Estilos base compartidos y diseño responsivo (mobile first) |
| `computadores.css`, `clientes.css`, `resumen.css` | Estilos propios de cada página |

## Aplicación web progresiva (PWA)

- `manifest.json` enlazado desde todas las páginas, con íconos en `assets/`.
- `sw.js` guarda en caché las páginas, los estilos, los scripts y el bundle de Alpine al instalarse, y responde desde la caché en cada petición.
- Sin conexión, la aplicación abre y muestra el aviso "Sin conexión. La aplicación está usando los archivos guardados."

## Flujo de trabajo en Git

- `main`: estado final entregado. Solo recibe cambios mediante Pull Request desde `develop`.
- `develop`: rama de integración.
- `feature/*`: una rama por funcionalidad, integrada a `develop` mediante Pull Request.
