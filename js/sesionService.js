class SesionService {
    constructor(repositorio) {
        this.repositorio = repositorio;
        this.tarifaPorHora = 1000;
    }
    async listar() {
        return await this.repositorio.listar();
    }
        async iniciar(cliente) {
        let sesiones = await this.repositorio.listar();
        for (let i = 0; i < sesiones.length; i++) {
            if (sesiones[i].computador === cliente.computador && sesiones[i].estado === "activa") {
                throw new Error("El computador " + cliente.computador + " ya tiene una sesión activa");
            }
        }
        let sesion = {
            clienteId: cliente.id,
            clienteNombre: cliente.nombre,
            computador: cliente.computador,
            horaInicio: Date.now(),
            horaFin: null,
            tarifa: this.tarifaPorHora,
            estado: "activa",
            monto: 0
        };
        return await this.repositorio.crear(sesion);
    }
}