class ComputadoresRepository extends Repository {
   async listar() {
      let computadores = JSON.parse(localStorage.getItem("computadores"));
      return computadores || [];
   }

   async crear(computador) {
      let computadores = await this.listar();
      computadores.push(computador);
      localStorage.setItem("computadores", JSON.stringify(computadores));
      return computador;
   }

   async editar(computadorActualizado) {
      let computadores = await this.listar();
      let posicion = computadores.findIndex(function (computador) {
         return computador.id === computadorActualizado.id;
      });

      if (posicion === -1) {
         throw new Error("No se encontró el computador");
      }

      computadores[posicion] = computadorActualizado;
      localStorage.setItem("computadores", JSON.stringify(computadores));
      return computadorActualizado;
   }

   async eliminar(id) {
      let computadores = await this.listar();
      let computadoresActualizados = computadores.filter(function (computador) {
         return computador.id !== id;
      });

      localStorage.setItem("computadores", JSON.stringify(computadoresActualizados));
      return computadoresActualizados;
   }
}
