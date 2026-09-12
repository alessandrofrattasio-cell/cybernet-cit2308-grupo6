let formulario = document.getElementById("formulario-clientes");
let listaClientes = document.getElementById("clientes");

formulario.addEventListener("submit", function (e) {
	e.preventDefault();

	let nombre = document.getElementById("nombre").value;
	let rut = document.getElementById("rut").value;
	let computador = document.getElementById("computador").value;

	let li = document.createElement("li");
	let textoCliente = document.createElement("span");
	textoCliente.textContent = nombre + " - " + rut + " - " + computador;

	li.appendChild(textoCliente);
	listaClientes.appendChild(li);

	formulario.reset();
});