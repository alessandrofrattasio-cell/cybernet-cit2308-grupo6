function crearEstadoConexion() {
   return {
      sinConexion: !navigator.onLine,

      iniciar() {
         let estado = this;

         window.addEventListener("offline", function () {
            estado.sinConexion = true;
         });

         window.addEventListener("online", function () {
            estado.sinConexion = false;
         });
      }
   };
}
