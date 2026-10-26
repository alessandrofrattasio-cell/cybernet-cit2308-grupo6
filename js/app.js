document.addEventListener("alpine:init", function () {
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
        let servicioUsuarios = new UsuarioService(repositorioUsuarios);

        Alpine.data("formularioRegistroUsuarios", function () {
            return crearFormularioRegistroUsuarios(servicioUsuarios);
        });
        Alpine.data("formularioLoginUsuarios", function () {
            return crearFormularioLoginUsuarios(servicioUsuarios);
        });
    }
});