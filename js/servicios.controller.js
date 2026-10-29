window.serviciosController = function() {
    return {
        listaServicios: [],
        formulario: {
            computador: '',
            servicio: '',
            cantidad: 1
        },

        getService() {
            return window.serviciosService || window.servicioServicios;
        },

        async init() {
            await this.cargarDatos();
        },

        async cargarDatos() {
            try {
                const srv = this.getService();
                let datos = [];

                if (srv) {
                    if (typeof srv.obtenerTodos === 'function') {
                        datos = await srv.obtenerTodos();
                    } else if (typeof srv.listar === 'function') {
                        datos = await srv.listar();
                    }
                }

                this.listaServicios = Array.isArray(datos) ? datos : [];
            } catch (error) {
                console.error("Error al cargar servicios:", error);
                this.listaServicios = [];
            }
        },

        async guardarNuevo() {
            if (!this.formulario.computador || !this.formulario.servicio || !this.formulario.cantidad) {
                alert("Por favor completa todos los campos.");
                return;
            }

            const nuevoItem = {
                id: Date.now().toString(),
                computador: this.formulario.computador,
                servicio: this.formulario.servicio,
                cantidad: Number(this.formulario.cantidad)
            };

            try {
                const srv = this.getService();
                if (srv) {
                    if (typeof srv.crear === 'function') await srv.crear(nuevoItem);
                    else if (typeof srv.guardar === 'function') await srv.guardar(nuevoItem);
                }

                this.formulario = { computador: '', servicio: '', cantidad: 1 };
                await this.cargarDatos();
            } catch (error) {
                console.error("Error al guardar servicio:", error);
            }
        },

        async borrar(id) {
            try {
                const srv = this.getService();
                if (srv) {
                    if (typeof srv.eliminar === 'function') await srv.eliminar(id);
                    else if (typeof srv.borrar === 'function') await srv.borrar(id);
                }
                await this.cargarDatos();
            } catch (error) {
                console.error("Error al borrar servicio:", error);
            }
        }
    };
};