window.serviciosController = function(servicio) {
    return {
        listaServicios: [],
        estado: 'cargando', 
        mensajeError: '',
        formulario: { computador: '', servicio: '', cantidad: 1 },

        async init() {
            await this.cargarDatos();
        },

        async cargarDatos() {
            this.estado = 'cargando';
            try {
                this.listaServicios = await servicio.obtenerServicios();
                this.estado = this.listaServicios.length === 0 ? 'vacio' : 'normal';
            } catch (error) {
                this.estado = 'error';
                this.mensajeError = "No se pudieron cargar los servicios.";
            }
        },

        async guardarNuevo() {
            try {
                await servicio.agregarServicio(this.formulario);
                this.formulario = { computador: '', servicio: '', cantidad: 1 };
                await this.cargarDatos();
            } catch (error) {
                alert(error.message);
            }
        },

        async borrar(id) {
            await servicio.borrarServicio(id);
            await this.cargarDatos();
        }
    };
};