class LocalStorageClienteRepository extends Repository {
    constructor() {
        super();
        this.clave = "clientes";
    }

    async listar() {
        let texto = localStorage.getItem(this.clave);
        if (texto === null) {
            return [];
        }
        return JSON.parse(texto);
    }

    async crear(cliente) {
        let clientes = await this.listar();
        cliente.id = Date.now();
        clientes.push(cliente);
        localStorage.setItem(this.clave, JSON.stringify(clientes));
        return cliente;
    }

    async editar(cliente) {
        let clientes = await this.listar();
        for (let i = 0; i < clientes.length; i++) {
            if (clientes[i].id === cliente.id) {
                clientes[i] = cliente;
            }
        }
        localStorage.setItem(this.clave, JSON.stringify(clientes));
        return cliente;
    }

    async eliminar(id) {
        let clientes = await this.listar();
        let restantes = [];
        for (let i = 0; i < clientes.length; i++) {
            if (clientes[i].id !== id) {
                restantes.push(clientes[i]);
            }
        }
        localStorage.setItem(this.clave, JSON.stringify(restantes));
    }
}