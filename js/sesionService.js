class SesionService {
    constructor(repository) {
        if (!repository) {
            throw new Error('SesionService requiere una instancia de repositorio.');
        }
        this.repository = repository;
    }

    async obtenerTodos() {
        return await this.repository.obtenerTodos();
    }

    async listar() {
        return await this.repository.listar();
    }

    async crear(sesion) {
        return await this.repository.crear(sesion);
    }

    async eliminar(id) {
        return await this.repository.eliminar(id);
    }
}

window.SesionService = SesionService;