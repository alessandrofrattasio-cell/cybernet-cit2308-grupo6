let formulario = document.querySelector("form");
let listaServicios = document.querySelector("#lista-servicios");

formulario.addEventListener("submit", function (evento) {
   evento.preventDefault();

   let computador = document.querySelector("#computador").value;
   let servicio = document.querySelector("#servicio").value;
   let cantidad = document.querySelector("#cantidad").value;

   let servicioNuevo = document.createElement("li");
   servicioNuevo.textContent = computador + " - " + servicio + " - Cantidad: " + cantidad;
   listaServicios.appendChild(servicioNuevo);

   formulario.reset();
});
