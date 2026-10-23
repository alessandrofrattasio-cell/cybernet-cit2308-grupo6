let repositorioClientes = new LocalStorageClienteRepository();
let servicioClientes = new ClienteService(repositorioClientes);
function crearFormularioCliente() {
    return formularioClienteController(servicioClientes);
}
function crearListaClientes() {
    return listaClientesController(servicioClientes);
}
document.addEventListener("alpine:init", function () {
    Alpine.data("formularioCliente", crearFormularioCliente);
    Alpine.data("listaClientes", crearListaClientes);
});