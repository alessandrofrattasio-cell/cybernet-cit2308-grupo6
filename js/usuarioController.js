function crearFormularioRegistroUsuarios(servicio) {
   return {
      usuario: {
         nombre: "",
         rut: "",
         correo: "",
         usuario: "",
         contrasena: ""
      },
      cargando: false,
      error: "",
      mensaje: "",

      async registrar() {
         this.cargando = true;
         this.error = "";
         this.mensaje = "";

         try {
            await servicio.registrar(this.usuario);
            this.mensaje = "Cuenta creada correctamente";
            this.usuario = {
               nombre: "",
               rut: "",
               correo: "",
               usuario: "",
               contrasena: ""
            };
         } catch (error) {
            this.error = error.message;
         } finally {
            this.cargando = false;
         }
      }
   };
}

function crearFormularioLoginUsuarios(servicio) {
   return {
      nombreUsuario: "",
      contrasena: "",
      usuarioActivo: null,
      cargando: false,
      error: "",
      mensaje: "",

      async iniciarSesion() {
         this.cargando = true;
         this.error = "";
         this.mensaje = "";
         this.usuarioActivo = null;

         try {
            this.usuarioActivo = await servicio.iniciarSesion(
               this.nombreUsuario,
               this.contrasena
            );
            this.mensaje = "Inicio de sesión correcto";
         } catch (error) {
            this.error = error.message;
         } finally {
            this.cargando = false;
         }
      }
   };
}
