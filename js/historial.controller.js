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
        }
    }));
});