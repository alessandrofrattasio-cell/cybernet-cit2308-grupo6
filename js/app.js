document.addEventListener("alpine:init", () => {
  
    const serviciosRepo = new ServiciosRepository();
    const serviciosService = new ServiciosService(serviciosRepo);
    window.serviciosService = serviciosService;
    
    const style = document.createElement('style');
    style.innerHTML = '[x-cloak] { display: none !important; }';
    document.head.appendChild(style);

    if (typeof LocalStorageClienteRepository !== "undefined") {
        let repositorioClientes = new LocalStorageClienteRepository();
        let servicioClientes = new ClienteService(repositorioClientes);
        Alpine.data("formularioCliente", function () {
            return formularioClienteController(servicioClientes);
        });
        Alpine.data("listaClientes", function () {
            return listaClientesController(servicioClientes);
        });
    }

    if (typeof ComputadoresRepository !== "undefined") {
        let repositorioComputadores = new ComputadoresRepository();
        let servicioComputadores = new ComputadoresService(repositorioComputadores);
        registrarComputadores(Alpine, servicioComputadores);
    }

    if (typeof LocalStorageUsuarioRepository !== "undefined") {
        let repositorioUsuarios = new LocalStorageUsuarioRepository();
        let servicioUsuarios = new UsuariosService(repositorioUsuarios);
        Alpine.data("formularioRegistroUsuarios", function () {
            return crearFormularioRegistroUsuarios(servicioUsuarios);
        });
        Alpine.data("formularioLoginUsuarios", function () {
            return crearFormularioLoginUsuarios(servicioUsuarios);
        });
    }

    if (typeof crearEstadoConexion !== "undefined") {
        Alpine.data("estadoConexion", crearEstadoConexion);
    }
});