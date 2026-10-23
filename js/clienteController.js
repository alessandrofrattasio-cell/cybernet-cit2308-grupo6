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