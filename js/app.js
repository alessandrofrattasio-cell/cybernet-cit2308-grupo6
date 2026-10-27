let repositorioClientes = new LocalStorageClienteRepository();
let servicioClientes = new ClienteService(repositorioClientes);
let repositorioSesiones = new LocalStorageSesionRepository();
let servicioSesiones = new SesionService(repositorioSesiones);
function crearFormularioCliente() {
    return formularioClienteController(servicioClientes);
}
function crearListaClientes() {
    return listaClientesController(servicioClientes);
}
function crearListaSesiones() {
    return listaSesionesController(servicioSesiones);
}
document.addEventListener("alpine:init", function () {
    Alpine.data("formularioCliente", crearFormularioCliente);
    Alpine.data("listaClientes", crearListaClientes);
    Alpine.data("listaSesiones", crearListaSesiones);
});