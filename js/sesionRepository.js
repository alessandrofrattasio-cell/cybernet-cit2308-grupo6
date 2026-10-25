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
}