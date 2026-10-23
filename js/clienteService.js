class ClienteService {
    constructor(repositorio) {
        this.repositorio = repositorio;
    }

    async listar() {
        return await this.repositorio.listar();
    }

    async agregar(cliente) {
        this.validar(cliente);
        return await this.repositorio.crear(cliente);
    }

    async editar(cliente) {
        this.validar(cliente);
        return await this.repositorio.editar(cliente);
    }

    async eliminar(id) {
        await this.repositorio.eliminar(id);
    }

    validar(cliente) {
        if (cliente.nombre.trim().length < 3) {
            throw new Error("El nombre debe tener al menos 3 letras");
        }
        if (cliente.rut.trim() === "") {
            throw new Error("El RUT es obligatorio");
        }
        if (cliente.computador === "") {
            throw new Error("Debes elegir un computador");
        }
    }
}