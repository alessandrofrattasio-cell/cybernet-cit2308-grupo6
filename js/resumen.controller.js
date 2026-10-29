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
                const obtenerLista = async (servicioObj) => {
                    if (!servicioObj) return [];
                    let datos = [];
                    if (typeof servicioObj.obtenerTodos === 'function') {
                        datos = await servicioObj.obtenerTodos();
                    } else if (typeof servicioObj.listar === 'function') {
                        datos = await servicioObj.listar();
                    }
                    return Array.isArray(datos) ? datos : [];
                };

                
                const [servicios, computadores, clientes, sesiones] = await Promise.all([
                    obtenerLista(window.serviciosService || window.servicioServicios),
                    obtenerLista(window.servicioComputadores),
                    obtenerLista(window.servicioClientes),
                    obtenerLista(window.servicioSesiones)
                ]);

                
                const contarUnicos = (lista) => {
                    const vistos = new Set();
                    return lista.filter(item => {
                        if (!item || !item.id) return true;
                        const idStr = String(item.id);
                        if (vistos.has(idStr)) return false;
                        vistos.add(idStr);
                        return true;
                    }).length;
                };

                this.totales.servicios = contarUnicos(servicios);
                this.totales.computadores = contarUnicos(computadores);
                this.totales.clientes = contarUnicos(clientes);
                this.totales.sesiones = contarUnicos(sesiones);

                this.estado = 'normal';
            } catch (error) {
                console.error("Error al consolidar resumen:", error);
                this.mensajeError = "No se pudo actualizar la información del resumen.";
                this.estado = 'error';
            }
        }
    };
};