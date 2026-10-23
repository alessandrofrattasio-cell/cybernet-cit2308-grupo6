class ClienteService {
    constructor(repositorio) {
        this.repositorio = repositorio;
    }

    async listar() {
        return await this.repositorio.listar();
    }

    async agregar(cliente) {
        return await this.repositorio.crear(cliente);
    }

    async editar(cliente) {
        return await this.repositorio.editar(cliente);
    }

    async eliminar(id) {
        await this.repositorio.eliminar(id);
    }
}