window.historialController = function() {
    return {
        estado: 'cargando',
        mensajeError: '',
        listaHistorial: [],

        async init() {
            await this.cargarHistorial();
        },

        async cargarHistorial() {
            this.estado = 'cargando';
            this.mensajeError = '';

            try {
                let datos = null;
                const srv = window.servicioSesiones;

                if (srv) {
                    if (typeof srv.obtenerTodos === 'function') {
                        datos = await srv.obtenerTodos();
                    } else if (typeof srv.listar === 'function') {
                        datos = await srv.listar();
                    }
                }

                if (!datos || !Array.isArray(datos) || datos.length === 0) {
                    const local = localStorage.getItem('cybernet_sesiones') || localStorage.getItem('sesiones');
                    datos = local ? JSON.parse(local) : [];
                }

                if (!Array.isArray(datos)) datos = [];

                
                const unicos = [];
                const idsVistas = new Set();
                for (const item of datos) {
                    if (!item) continue;
                    const idStr = item.id ? String(item.id) : JSON.stringify(item);
                    if (!idsVistas.has(idStr)) {
                        idsVistas.add(idStr);
                        unicos.push(item);
                    }
                }

                this.listaHistorial = unicos;
                this.estado = 'normal';
            } catch (error) {
                console.error("Error al cargar historial:", error);
                this.mensajeError = "No se pudo cargar el historial de sesiones.";
                this.estado = 'error';
            }
        }
    };
};