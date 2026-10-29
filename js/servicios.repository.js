class ServiciosRepository extends Repository {
    constructor() {
        super();
        this.clave = 'servicios';
    }

    async listar() {
        const datos = localStorage.getItem(this.clave);
        return datos ? JSON.parse(datos) : [];
    }

    async crear(servicio) {
        const servicios = await this.listar();
        servicio.id = Date.now().toString(); 
        servicios.push(servicio);
        localStorage.setItem(this.clave, JSON.stringify(servicios));
        return servicio;
    }

    async editar(id, datosActualizados) {
        const servicios = await this.listar();
        const index = servicios.findIndex(s => s.id === id);
        
        if (index !== -1) {
           Object.assign(servicios[index], datosActualizados);
            localStorage.setItem(this.clave, JSON.stringify(servicios));
            return servicios[index];
        }
        throw new Error("Servicio no encontrado");
    }

    async eliminar(id) {
        let servicios = await this.listar();
        servicios = servicios.filter(s => s.id !== id);
        localStorage.setItem(this.clave, JSON.stringify(servicios));
    }
}