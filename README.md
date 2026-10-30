# CyberNet

Plataforma web para administrar un cibercafé. Segunda entrega: frontend dinámico con Alpine.js y aplicación web progresiva (PWA).

## Integrantes

- **Alessandro Frattasio**: Usuarios (login y registro) + Computadores
- **Vicente Encina**: Clientes + Sesiones
- **Kaled Quijón**: Servicios adicionales + Historial + Resumen

## IP elástica

La aplicación está en la instancia EC2 con IP elástica (fija): **34.204.130.78**

- `http://34.204.130.78/login.html`

## Cómo correr el proyecto

**En el servidor:** la aplicación está desplegada en la instancia EC2 de AWS con nginx, que sirve los archivos del proyecto. Se accede en `http://34.204.130.78/login.html`. Para actualizarla, se entra por SSH a la instancia y se trae la última versión de la rama `main`.

**En local (desarrollo y pruebas):** el proyecto es HTML, CSS y JavaScript, no necesita instalar nada. Alpine.js se carga desde un CDN, por lo que la primera vez se necesita internet.

1. Clonar el repositorio y abrir la carpeta.
2. Levantar un servidor local con `python -m http.server 8000` (o con la extensión Live Server de VS Code).
3. Abrir `http://localhost:8000/login.html` en el navegador.

Los datos se guardan en el `localStorage` del navegador.

## Mapa de dominios

| Dominio | Vista | Controlador | Servicio | Repositorio |
|---|---|---|---|---|
| Usuarios | `login.html`, `register.html` | `js/usuarioController.js` | `js/usuarioService.js` | `js/usuarioRepository.js` |
| Computadores | `computadores.html` | `js/computadores-controlador.js` | `js/computadores-servicio.js` | `js/computadores-repositorio.js` |
| Clientes | `clientes.html` | `js/clienteController.js` | `js/clienteService.js` | `js/clienteRepository.js` |
| Sesiones | `clientes.html` (sección Sesiones) | `js/sesionController.js` | `js/sesionService.js` | `js/sesionRepository.js` |
| Servicios adicionales | `servicios.html` | `js/servicios.controller.js` | `js/servicios.service.js` | `js/servicios.repository.js` |
| Historial | `historial.html` | `js/historial.controller.js` | `js/sesionService.js` | `js/sesionRepository.js` |
| Resumen | `resumen.html` | `js/resumen.controller.js` | `js/sesionService.js` | `js/sesionRepository.js` |

Archivos que usan todos los dominios:

- `js/repositorio.js`: clase base `Repository`, el contrato con los métodos `async`. Cada repositorio la extiende.
- `js/app.js`: único archivo que crea los repositorios y servicios y registra los componentes de Alpine.

- Link del video :
- https://drive.google.com/file/d/17F2pL6IROBTsJgPZI09WKjU7SGL3vvwS/view?usp=drivesdk
