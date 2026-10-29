document.addEventListener('alpine:init', () => {
    Alpine.data('historialController', (sesionesService) => ({
        sesiones: [],
        estado: 'cargando',

        async init() {
            await this.cargarDatos();
        },

        async cargarDatos() {
            this.estado = 'cargando';
            try {
                this.sesiones = await sesionesService.obtenerHistorial();
                this.estado = this.sesiones.length === 0 ? 'vacio' : 'normal';
            } catch (error) {
                this.estado = 'error';
            }
        },

        formatearHora(milisegundos) {
            let fecha = new Date(milisegundos);
            let hora = fecha.getHours();
            let minutos = fecha.getMinutes();
            if (hora < 10) {
                hora = '0' + hora;
            }
            if (minutos < 10) {
                minutos = '0' + minutos;
            }
            return hora + ':' + minutos;
        },

        describir(sesion) {
            return sesion.clienteNombre + ' - ' + sesion.computador + ' - ' +
                this.formatearHora(sesion.horaInicio) + ' a ' +
                this.formatearHora(sesion.horaFin) + ' - $' + sesion.monto;
        }
    }));
});
