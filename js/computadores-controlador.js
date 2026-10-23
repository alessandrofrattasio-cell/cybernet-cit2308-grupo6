class ComputadoresController {
   constructor(servicio) {
      this.servicio = servicio;
      this.computadores = [];
      this.computador = this.formularioVacio();
      this.idEditando = null;
      this.cargando = false;
      this.error = "";
   }

   formularioVacio() {
      return {
         nombre: "",
         estado: "Disponible",
         precioHora: 1000
      };
   }

   async init() {
      await this.cargar();
   }

   showLoading() {
      this.cargando = true;
      this.error = "";
   }

   showError(error) {
      this.error = error.message;
      this.cargando = false;
   }

   async cargar() {
      this.showLoading();

      try {
         this.computadores = await this.servicio.listar();
      } catch (error) {
         this.showError(error);
      } finally {
         this.cargando = false;
      }
   }

   async guardar() {
      this.showLoading();

      try {
         let computador = { ...this.computador };

         if (this.idEditando === null) {
            await this.servicio.crear(computador);
         } else {
            computador.id = this.idEditando;
            await this.servicio.editar(computador);
         }

         this.computadores = await this.servicio.listar();
         this.cancelarEdicion();
      } catch (error) {
         this.showError(error);
      } finally {
         this.cargando = false;
      }
   }

   editar(computador) {
      this.idEditando = computador.id;
      this.computador = { ...computador };
      this.error = "";
   }

   async eliminar(id) {
      this.showLoading();

      try {
         this.computadores = await this.servicio.eliminar(id);
      } catch (error) {
         this.showError(error);
      } finally {
         this.cargando = false;
      }
   }

   cancelarEdicion() {
      this.computador = this.formularioVacio();
      this.idEditando = null;
   }
}
