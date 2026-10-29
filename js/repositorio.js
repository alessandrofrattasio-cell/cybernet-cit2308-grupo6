
class BaseRepository {
    async listar() {
        throw new Error('No implementado');
    }

    async obtenerPorId(id) {
        throw new Error('No implementado');
    }

    async crear(entidad) {
        throw new Error('No implementado');
    }

    async editar(entidad) {
        throw new Error('No implementado');
    }

    async eliminar(id) {
        throw new Error('No implementado');
    }
}

window.BaseRepository = BaseRepository;