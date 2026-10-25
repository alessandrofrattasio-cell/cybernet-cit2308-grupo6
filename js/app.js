let repositorioClientes = new LocalStorageClienteRepository();
let servicioClientes = new ClienteService(repositorioClientes);
let repositorioComputadores = new ComputadoresRepository();
let servicioComputadores = new ComputadoresService(repositorioComputadores);
function crearFormularioCliente() {
    return formularioClienteController(servicioClientes);
}
function crearListaClientes() {
    return listaClientesController(servicioClientes);
}
document.addEventListener("alpine:init", function () {
    Alpine.data("formularioCliente", crearFormularioCliente);
    Alpine.data("listaClientes", crearListaClientes);
    registrarComputadores(Alpine, servicioComputadores);
});