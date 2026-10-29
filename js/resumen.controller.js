document.addEventListener('alpine:init', () => {
    Alpine.data('resumenController', (sesionesService) => ({
        resumen: null,
        estado: 'cargando',

        async init() {
            await this.cargarResumen();
        },

        async cargarResumen() {
            this.estado = 'cargando';
            try {
                this.resumen = await sesionesService.obtenerResumenDiario();
                this.estado = !this.resumen ? 'vacio' : 'normal';
            } catch (error) {
                this.estado = 'error';
            }
        }
    }));
});