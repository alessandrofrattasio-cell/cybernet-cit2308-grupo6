
(function inicializarCompositionRoot() {
    try {
        
        if (typeof window.ServiciosRepository === 'function' && typeof window.ServiciosService === 'function') {
            const serviciosRepo = new window.ServiciosRepository();
            const serviciosService = new window.ServiciosService(serviciosRepo);
            window.serviciosService = serviciosService;
            window.servicioServicios = serviciosService; // Alias de compatibilidad
        }

        
        if (typeof window.SesionRepository === 'function' && typeof window.SesionService === 'function') {
            const sesionRepo = new window.SesionRepository();
            const sesionService = new window.SesionService(sesionRepo);
            window.servicioSesiones = sesionService;
        }

        console.log('✅ Composition Root cargado correctamente.');
    } catch (error) {
        console.error('❌ Error al inicializar el Composition Root en app.js:', error);
    }
})();