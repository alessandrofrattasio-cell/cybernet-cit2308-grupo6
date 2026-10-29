class ServiciosService {
    constructor(repositorio) {
        this.repositorio = repositorio;
    }

    async obtenerServicios() {
        return await this.repositorio.listar();
    }

    async agregarServicio(servicio) {
        if (!servicio.computador || !servicio.servicio || servicio.cantidad <= 0) {
            throw new Error("Los datos del servicio son inválidos");
        }
        return await this.repositorio.crear(servicio);
    }

    async modificarServicio(id, datosActualizados) {
        return await this.repositorio.editar(id, datosActualizados);
    }

    async borrarServicio(id) {
        await this.repositorio.eliminar(id);
    }
}