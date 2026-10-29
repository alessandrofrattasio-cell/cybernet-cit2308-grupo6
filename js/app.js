

if (typeof ServiciosRepository !== "undefined") {
    const serviciosRepo = new ServiciosRepository();
    window.serviciosService = new ServiciosService(serviciosRepo);
}

if (typeof LocalStorageClienteRepository !== "undefined") {
    const repositorioClientes = new LocalStorageClienteRepository();
    window.servicioClientes = new ClienteService(repositorioClientes);
}

if (typeof LocalStorageSesionRepository !== "undefined") {
    const repositorioSesiones = new LocalStorageSesionRepository();
    window.servicioSesiones = new SesionService(repositorioSesiones);
}

if (typeof ComputadoresRepository !== "undefined") {
    const repositorioComputadores = new ComputadoresRepository();
    window.servicioComputadores = new ComputadoresService(repositorioComputadores);
}

if (typeof LocalStorageUsuarioRepository !== "undefined") {
    const repositorioUsuarios = new LocalStorageUsuarioRepository();
    window.servicioUsuarios = new UsuarioService(repositorioUsuarios);
}


document.addEventListener("alpine:init", () => {

    if (typeof window.serviciosController === "function") {
        Alpine.data("serviciosController", function () {
            return window.serviciosController(window.serviciosService);
        });
    }

    if (typeof window.servicioComputadores !== "undefined" && typeof registrarComputadores === "function") {
        registrarComputadores(Alpine, window.servicioComputadores);
    }

    if (typeof window.servicioUsuarios !== "undefined") {
        if (typeof crearFormularioRegistroUsuarios === "function") {
            Alpine.data("formularioRegistroUsuarios", function () {
                return crearFormularioRegistroUsuarios(window.servicioUsuarios);
            });
        }
        if (typeof crearFormularioLoginUsuarios === "function") {
            Alpine.data("formularioLoginUsuarios", function () {
                return crearFormularioLoginUsuarios(window.servicioUsuarios);
            });
        }
    }

    if (typeof crearEstadoConexion !== "undefined") {
        Alpine.data("estadoConexion", crearEstadoConexion);
    }

});