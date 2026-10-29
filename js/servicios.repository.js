
class ServiciosRepository extends BaseRepository {
    constructor() {
        super();
        this.storageKey = 'cybernet_servicios';
    }

    async listar() {
        const data = localStorage.getItem(this.storageKey);
        return data ? JSON.parse(data) : [];
    }

    async obtenerTodos() {
        return await this.listar();
    }

    async obtenerPorId(id) {
        const lista = await this.listar();
        return lista.find(item => String(item.id) === String(id)) || null;
    }

    async crear(item) {
        const lista = await this.listar();
        
        
        const existe = lista.some(i => String(i.id) === String(item.id));
        if (!existe) {
            lista.push(item);
            localStorage.setItem(this.storageKey, JSON.stringify(lista));
        }
        return item;
    }

    async guardar(item) {
        return await this.crear(item);
    }

    async eliminar(id) {
        let lista = await this.listar();
        lista = lista.filter(item => String(item.id) !== String(id));
        localStorage.setItem(this.storageKey, JSON.stringify(lista));
        return true;
    }

    async borrar(id) {
        return await this.eliminar(id);
    }
}

window.ServiciosRepository = ServiciosRepository;