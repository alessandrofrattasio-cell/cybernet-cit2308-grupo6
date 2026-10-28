let formulario = document.querySelector("form");

if (formulario) {
   formulario.addEventListener("submit", function () {
      alert("Formulario enviado correctamente");
   });
}

let botonesEstado = document.querySelectorAll(".cambiar-estado");

botonesEstado.forEach(function (boton) {
   boton.addEventListener("click", function () {
      let estado = boton.parentElement.querySelector(".estado");

      if (estado.textContent === "Estado: Disponible") {
         estado.textContent = "Estado: Ocupado";
         boton.textContent = "Finalizar sesión";
      } else {
         estado.textContent = "Estado: Disponible";
         boton.textContent = "Iniciar sesión";
      }
   });
});
