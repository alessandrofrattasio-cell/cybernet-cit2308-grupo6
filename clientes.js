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

	let botonSesion = document.createElement("button");
	botonSesion.textContent = "Iniciar sesión";
	botonSesion.addEventListener("click", function () {
		if (botonSesion.textContent === "Iniciar sesión") {
			let ahora = new Date();
			let hora = ahora.getHours();
			let minutos = ahora.getMinutes();

			if (hora < 10) {
				hora = "0" + hora;
			}
			if (minutos < 10) {
				minutos = "0" + minutos;
			}

			textoCliente.textContent += ", desde las " + hora + ":" + minutos;
			botonSesion.textContent = "Finalizar sesión";
		} else {
			botonSesion.textContent = "Sesión finalizada";
			botonSesion.disabled = true;
		}
	});

	li.appendChild(textoCliente);
	li.appendChild(botonSesion);
	listaClientes.appendChild(li);

	formulario.reset();
});