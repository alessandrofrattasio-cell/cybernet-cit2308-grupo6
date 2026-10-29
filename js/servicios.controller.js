window.serviciosController = function(servicio) {
    return {
        listaServicios: [],
        estado: 'cargando', 
        mensajeError: '',
        formulario: { computador: '', servicio: '', cantidad: 1 },

        
        getService() {
            return servicio || window.serviciosService;
        },

        async init() {
            await this.cargarDatos();
        },

        async cargarDatos() {
            this.estado = 'cargando';
            const srv = this.getService();
            
            if (!srv) {
                this.estado = 'error';
                this.mensajeError = "Servicio no disponible.";
                return;
            }

            try {
                this.listaServicios = await srv.obtenerServicios();
                this.estado = this.listaServicios.length === 0 ? 'vacio' : 'normal';
            } catch (error) {
                this.estado = 'error';
                this.mensajeError = "No se pudieron cargar los servicios.";
            }
        },

        async guardarNuevo() {
            const srv = this.getService();
            if (!srv) return;

            try {
                await srv.agregarServicio(this.formulario);
                this.formulario = { computador: '', servicio: '', cantidad: 1 };
                await this.cargarDatos();
            } catch (error) {
                alert(error.message);
            }
        },

        async borrar(id) {
            const srv = this.getService();
            if (!srv) return;

            await srv.borrarServicio(id);
            await this.cargarDatos();
        }
    };
};