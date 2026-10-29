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
        async finalizar(id) {
        let sesiones = await this.repositorio.listar();
        for (let i = 0; i < sesiones.length; i++) {
            if (sesiones[i].id === id) {
                let sesion = sesiones[i];
                if (sesion.estado === "finalizada") {
                    throw new Error("La sesión ya está finalizada");
                }
                sesion.horaFin = Date.now();
                sesion.monto = this.calcularMonto(sesion.horaInicio, sesion.horaFin, sesion.tarifa);
                sesion.estado = "finalizada";
                return await this.repositorio.editar(sesion);
            }
        }
        throw new Error("No existe la sesión");
    }
    async obtenerHistorial() {
        let sesiones = await this.repositorio.listar();
        let finalizadas = [];
        for (let i = 0; i < sesiones.length; i++) {
            if (sesiones[i].estado === "finalizada") {
                finalizadas.push(sesiones[i]);
            }
        }
        return finalizadas;
    }
    async obtenerResumenDiario() {
        let finalizadas = await this.obtenerHistorial();
        let hoy = new Date().toDateString();
        let total = 0;
        let cantidad = 0;
        let equipos = [];
        for (let i = 0; i < finalizadas.length; i++) {
            if (new Date(finalizadas[i].horaFin).toDateString() === hoy) {
                cantidad = cantidad + 1;
                total = total + finalizadas[i].monto;
                if (equipos.indexOf(finalizadas[i].computador) === -1) {
                    equipos.push(finalizadas[i].computador);
                }
            }
        }
        if (cantidad === 0) {
            return null;
        }
        return {
            totalSesiones: cantidad,
            totalDinero: total,
            equiposUtilizados: equipos.length
        };
    }
    calcularMonto(horaInicio, horaFin, tarifa) {
        let minutos = Math.ceil((horaFin - horaInicio) / 60000);
        if (minutos < 0) {
            minutos = 0;
        }
        return Math.round(minutos * tarifa / 60);
    }
}