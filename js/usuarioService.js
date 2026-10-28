class UsuarioService {
   constructor(repositorio) {
      this.repositorio = repositorio;
   }

   async listar() {
      return await this.repositorio.listar();
   }

   async registrar(usuario) {
      let usuarios = await this.repositorio.listar();
      let usuarioExistente = usuarios.find(function (usuarioGuardado) {
         return usuarioGuardado.usuario === usuario.usuario;
      });

      if (usuarioExistente) {
         throw new Error("Ese nombre de usuario ya está registrado");
      }

      let usuarioNuevo = {
         id: Date.now(),
         nombre: usuario.nombre,
         rut: usuario.rut,
         correo: usuario.correo,
         usuario: usuario.usuario,
         contrasena: usuario.contrasena
      };

      return await this.repositorio.crear(usuarioNuevo);
   }

   async iniciarSesion(nombreUsuario, contrasena) {
      let usuarios = await this.repositorio.listar();
      let usuarioEncontrado = usuarios.find(function (usuario) {
         return usuario.usuario === nombreUsuario && usuario.contrasena === contrasena;
      });

      if (!usuarioEncontrado) {
         throw new Error("Usuario o contraseña incorrectos");
      }

      return {
         id: usuarioEncontrado.id,
         nombre: usuarioEncontrado.nombre,
         usuario: usuarioEncontrado.usuario
      };
   }

   async editar(usuario) {
      return await this.repositorio.editar(usuario);
   }

   async eliminar(id) {
      return await this.repositorio.eliminar(id);
   }
}
