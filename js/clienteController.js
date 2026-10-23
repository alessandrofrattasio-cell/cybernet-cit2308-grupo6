function formularioClienteController(servicio) {
    return {
        nombre: "",
        rut: "",
        computador: "",
        error: "",
        async agregar() {
            this.error = "";
            try {
                let cliente = {
                    nombre: this.nombre,
                    rut: this.rut,
                    computador: this.computador
                };
                await servicio.agregar(cliente);
                this.nombre = "";
                this.rut = "";
                this.computador = "";
                this.$dispatch("clientes-cambiaron");
            } catch (fallo) {
                this.showError(fallo.message);
            }
        },
        showError(mensaje) {
            this.error = mensaje;
        }
    };
}

function listaClientesController(servicio) {
    return {
        clientes: [],
        cargando: false,
        error: "",
        async cargar() {
            this.error = "";
            this.showLoading(true);
            try {
                this.clientes = await servicio.listar();
            } catch (fallo) {
                this.showError(fallo.message);
            }
            this.showLoading(false);
        },
        estaVacia() {
            return this.cargando === false && this.error === "" && this.clientes.length === 0;
        },
        showLoading(valor) {
            this.cargando = valor;
        },
        showError(mensaje) {
            this.error = mensaje;
        }
    };
}