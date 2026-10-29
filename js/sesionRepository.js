
class SesionRepository extends BaseRepository {
    constructor() {
        super();
        this.storageKey = 'cybernet_sesiones';
    }

    async listar() {
        const data = localStorage.getItem(this.storageKey) || localStorage.getItem('sesiones');
        return data ? JSON.parse(data) : [];
    }

    async obtenerTodos() {
        return await this.listar();
    }

    async obtenerPorId(id) {
        const lista = await this.listar();
        return lista.find(item => String(item.id) === String(id)) || null;
    }

    async crear(sesion) {
        const lista = await this.listar();
        lista.push(sesion);
        localStorage.setItem(this.storageKey, JSON.stringify(lista));
        return sesion;
    }

    async eliminar(id) {
        let lista = await this.listar();
        lista = lista.filter(item => String(item.id) !== String(id));
        localStorage.setItem(this.storageKey, JSON.stringify(lista));
        return true;
    }
}

window.SesionRepository = SesionRepository;