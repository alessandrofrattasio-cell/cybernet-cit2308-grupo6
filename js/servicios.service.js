class ServiciosService {
    constructor(repository) {
        this.repository = repository;
    }

    async listar() {
        if (this.repository && typeof this.repository.listar === 'function') {
            return await this.repository.listar();
        }
        if (this.repository && typeof this.repository.obtenerTodos === 'function') {
            return await this.repository.obtenerTodos();
        }
        return [];
    }

    async crear(item) {
        if (this.repository && typeof this.repository.crear === 'function') {
            return await this.repository.crear(item);
        }
        if (this.repository && typeof this.repository.guardar === 'function') {
            return await this.repository.guardar(item);
        }
    }

    async eliminar(id) {
        if (this.repository && typeof this.repository.eliminar === 'function') {
            return await this.repository.eliminar(id);
        }
    }
}