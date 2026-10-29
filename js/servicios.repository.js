class ServiciosRepository {
    constructor() {
        this.storageKey = 'cybernet_servicios';
    }

    obtenerTodos() {
        const datos = localStorage.getItem(this.storageKey);
        return datos ? JSON.parse(datos) : [];
    }

    listar() {
        return this.obtenerTodos();
    }

    guardar(item) {
        const servicios = this.obtenerTodos();
        servicios.push(item);
        localStorage.setItem(this.storageKey, JSON.stringify(servicios));
        return item;
    }

    crear(item) {
        return this.guardar(item);
    }

    eliminar(id) {
        let servicios = this.obtenerTodos();
        servicios = servicios.filter(s => String(s.id) !== String(id));
        localStorage.setItem(this.storageKey, JSON.stringify(servicios));
    }
}