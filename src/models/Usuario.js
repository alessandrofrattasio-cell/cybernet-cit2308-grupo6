const mongoose = require("mongoose"); // aqui cargo la libreria mongoose para poder usarla en este archivo.

const usuarioSchema = new mongoose.Schema({ //aqui hago el contrato o esquema de como quiero que se guarden los datos.
  nombre: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 100
  },

  usuario: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    minlength: 3,
    maxlength: 30
  },

  correo: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  },

  contrasena: {
    type: String,
    required: true,
    minlength: 6
  },

  rol: {
    type: String,
    enum: ["usuario", "administrador"],
    default: "usuario"
  }
});

module.exports = mongoose.model("Usuario", usuarioSchema); // aqui creo el el modelo de usuario y lo exporto para poder usarlo.
