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
                formatearHora(milisegundos) {
            let fecha = new Date(milisegundos);
            let hora = fecha.getHours();
            let minutos = fecha.getMinutes();
            if (hora < 10) {
                hora = "0" + hora;
            }
            if (minutos < 10) {
                minutos = "0" + minutos;
            }
            return hora + ":" + minutos;
        },
        describir(sesion) {
            let texto = sesion.clienteNombre + " - " + sesion.computador + " - desde las " + this.formatearHora(sesion.horaInicio);
            if (sesion.estado === "finalizada") {
                texto = texto + " - hasta las " + this.formatearHora(sesion.horaFin) + " - $" + sesion.monto;
            }
            return texto;
        },
        showLoading(valor) {
            this.cargando = valor;
        },
        showError(mensaje) {
            this.error = mensaje;
        }
    };
}