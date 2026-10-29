class ComputadoresService {
   constructor(repositorio) {
      this.repositorio = repositorio;
   }

   async listar() {
      return await this.repositorio.listar();
   }

   async crear(computador) {
      this.validar(computador);

      let nuevoComputador = {
         id: Date.now(),
         nombre: computador.nombre.trim(),
         estado: computador.estado,
         precioHora: Number(computador.precioHora)
      };

      return await this.repositorio.crear(nuevoComputador);
   }

   async editar(computador) {
      this.validar(computador);

      let computadorActualizado = {
         id: computador.id,
         nombre: computador.nombre.trim(),
         estado: computador.estado,
         precioHora: Number(computador.precioHora)
      };

      return await this.repositorio.editar(computadorActualizado);
   }

   async eliminar(id) {
      return await this.repositorio.eliminar(id);
   }

   validar(computador) {
      let estadosPermitidos = ["Disponible", "Ocupado", "Fuera de servicio"];

      if (!computador.nombre || !computador.nombre.trim()) {
         throw new Error("Escribe el nombre del computador");
      }

      if (!estadosPermitidos.includes(computador.estado)) {
         throw new Error("Selecciona un estado válido");
      }

      if (isNaN(computador.precioHora) || Number(computador.precioHora) <= 0) {
         throw new Error("El precio por hora debe ser mayor que cero");
      }
   }
}
