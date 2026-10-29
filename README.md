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

