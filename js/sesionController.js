function listaSesionesController(servicio) {
    return {
        sesiones: [],
        cargando: false,
        error: "",
        async cargar() {
            this.error = "";
            this.showLoading(true);
            try {
                this.sesiones = await servicio.listar();
            } catch (fallo) {
                this.showError(fallo.message);
            }
            this.showLoading(false);
        },
        estaVacia() {
            return this.cargando === false && this.error === "" && this.sesiones.length === 0;
        },
        async iniciar(cliente) {
            this.error = "";
            try {
                await servicio.iniciar(cliente);
                await this.cargar();
            } catch (fallo) {
                this.showError(fallo.message);
            }
        },
        async finalizar(id) {
            this.error = "";
            try {
                await servicio.finalizar(id);
                await this.cargar();
            } catch (fallo) {
                this.showError(fallo.message);
            }
        },
        showLoading(valor) {
            this.cargando = valor;
        },
        showError(mensaje) {
            this.error = mensaje;
        }
    };
}