window.resumenController = function() {
    return {
        estado: 'cargando',
        mensajeError: '',
        totales: {
            computadores: 0,
            clientes: 0,
            sesiones: 0,
            servicios: 0
        },

        async init() {
            await this.cargarResumen();
        },

        async cargarResumen() {
            this.estado = 'cargando';
            this.mensajeError = '';

            try {
                const obtenerListaLimpia = async (servicioObj, storageKey) => {
                    let datos = null;
                    if (servicioObj) {
                        if (typeof servicioObj.obtenerTodos === 'function') {
                            datos = await servicioObj.obtenerTodos();
                        } else if (typeof servicioObj.listar === 'function') {
                            datos = await servicioObj.listar();
                        }
                    }

                    if (!datos || !Array.isArray(datos)) {
                        const local = localStorage.getItem(storageKey);
                        datos = local ? JSON.parse(local) : [];
                    }

                    if (!Array.isArray(datos)) return [];

                    
                    const unicos = [];
                    const ids = new Set();
                    for (const item of datos) {
                        if (item && item.id) {
                            const idStr = String(item.id);
                            if (!ids.has(idStr)) {
                                ids.add(idStr);
                                unicos.push(item);
                            }
                        } else if (item) {
                            unicos.push(item);
                        }
                    }
                    return unicos;
                };

                const [servicios, computadores, clientes, sesiones] = await Promise.all([
                    obtenerListaLimpia(window.serviciosService || window.servicioServicios, 'cybernet_servicios'),
                    obtenerListaLimpia(window.servicioComputadores, 'cybernet_computadores'),
                    obtenerListaLimpia(window.servicioClientes, 'cybernet_clientes'),
                    obtenerListaLimpia(window.servicioSesiones, 'cybernet_sesiones')
                ]);

                this.totales.servicios = servicios.length;
                this.totales.computadores = computadores.length;
                this.totales.clientes = clientes.length;
                this.totales.sesiones = sesiones.length;

                this.estado = 'normal';
            } catch (error) {
                console.error("Error al consolidar resumen:", error);
                this.mensajeError = "No se pudo actualizar la información del resumen.";
                this.estado = 'error';
            }
        }
    };
};