# CyberNet
Esta primera entrega corresponde a la infraestructura de despliegue y las vistas estáticas (HTML/CSS/JS básico) que representan el flujo completo de ambos roles.

## Integrantes

- **Alessandro Frattasio** — Login + estado de computadores
- **Vicente Encina** — Clientes + iniciar/finalizar sesión
- **Kaled Quijón** — Servicios adicionales + historial + resumen

## Infraestructura

- Instancia EC2 (Ubuntu 24.04 LTS) en AWS Academy Learner Lab, región `us-east-1`
- Servidor web: nginx
- IP pública (elástica, fija): **34.204.130.78**
- Security Group: solo puertos 22 (SSH) y 80 (HTTP) habilitados

## Rutas implementadas

| Ruta | Propósito |
|---|---|
| `/login.html` | Autenticación del Encargado/Administrador para acceder al sistema |
| `/register.html` | Registro de una nueva cuenta de Encargado/Administrador |
| `/computadores.html` | Vista principal del Encargado/Administrador: estado de los computadores (disponible/ocupado/fuera de servicio) e inicio/fin de sesión de uso |
| `/clientes.html` | Registro de clientes y asignación a un computador disponible |
| `/servicios.html` | Registro de servicios adicionales (impresión, bebidas, snacks) asociados a una sesión |
| `/historial.html` | Historial de sesiones finalizadas, con cliente, computador, duración y monto cobrado |
| `/resumen.html` | Resumen de actividad diaria: sesiones finalizadas, equipos utilizados y recaudación total |

## Cómo acceder

Abrir `http://34.204.130.78` en el navegador, o directamente cualquiera de las rutas listadas (ej. `http://34.204.130.78/login.html`).
