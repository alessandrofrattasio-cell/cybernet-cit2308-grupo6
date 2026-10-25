class LocalStorageSesionRepository extends Repository {
    constructor() {
        super();
        this.clave = "sesiones";
    }
    async listar() {
        let texto = localStorage.getItem(this.clave);
        if (texto === null) {
            return [];
        }
        return JSON.parse(texto);
    }
    async crear(sesion) {
        let sesiones = await this.listar();
        sesion.id = Date.now();
        sesiones.push(sesion);
        localStorage.setItem(this.clave, JSON.stringify(sesiones));
        return sesion;
    }
        async editar(sesion) {
        let sesiones = await this.listar();
        for (let i = 0; i < sesiones.length; i++) {
            if (sesiones[i].id === sesion.id) {
                sesiones[i] = sesion;
            }
        }
        localStorage.setItem(this.clave, JSON.stringify(sesiones));
        return sesion;
    }
    async eliminar(id) {
        let sesiones = await this.listar();
        let restantes = [];
        for (let i = 0; i < sesiones.length; i++) {
            if (sesiones[i].id !== id) {
                restantes.push(sesiones[i]);
            }
        }
        localStorage.setItem(this.clave, JSON.stringify(restantes));
    }
}