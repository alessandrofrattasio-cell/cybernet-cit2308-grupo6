class ServiciosService {
    constructor(repository) {
        if (!repository) {
            throw new Error('ServiciosService requiere una instancia de repositorio.');
        }
        this.repository = repository;
    }

    async obtenerTodos() {
        return await this.repository.obtenerTodos();
    }

    async listar() {
        return await this.repository.listar();
    }

    async crear(item) {
        return await this.repository.crear(item);
    }

    async guardar(item) {
        return await this.repository.crear(item);
    }

    async eliminar(id) {
        return await this.repository.eliminar(id);
    }

    async borrar(id) {
        return await this.repository.eliminar(id);
    }
}

window.ServiciosService = ServiciosService;