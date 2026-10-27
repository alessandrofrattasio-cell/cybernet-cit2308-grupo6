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
        showLoading(valor) {
            this.cargando = valor;
        },
        showError(mensaje) {
            this.error = mensaje;
        }
    };
}