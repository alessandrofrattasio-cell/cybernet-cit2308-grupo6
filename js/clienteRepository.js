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
}