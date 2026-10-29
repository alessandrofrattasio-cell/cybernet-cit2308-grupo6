class LocalStorageUsuarioRepository extends Repository {
   async listar() {
      let usuarios = JSON.parse(localStorage.getItem("usuarios"));
      return usuarios || [];
   }

   async crear(usuario) {
      let usuarios = await this.listar();
      usuarios.push(usuario);
      localStorage.setItem("usuarios", JSON.stringify(usuarios));
      return usuario;
   }

   async editar(usuarioActualizado) {
      let usuarios = await this.listar();
      let posicion = usuarios.findIndex(function (usuario) {
         return usuario.id === usuarioActualizado.id;
      });

      if (posicion === -1) {
         throw new Error("No se encontró el usuario");
      }

      usuarios[posicion] = usuarioActualizado;
      localStorage.setItem("usuarios", JSON.stringify(usuarios));
      return usuarioActualizado;
   }

   async eliminar(id) {
      let usuarios = await this.listar();
      let usuariosActualizados = usuarios.filter(function (usuario) {
         return usuario.id !== id;
      });

      localStorage.setItem("usuarios", JSON.stringify(usuariosActualizados));
      return usuariosActualizados;
   }
}
