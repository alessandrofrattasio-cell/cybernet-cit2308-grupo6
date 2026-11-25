require("dotenv").config();

const mongoose = require("mongoose");
const app = require("./app");

const requiredVariables = ["MONGODB_URI", "JWT_SECRET", "PORT"];
const missingVariables = requiredVariables.filter((name) => !process.env[name]);

if (missingVariables.length > 0) {
  console.error(`Faltan variables de entorno: ${missingVariables.join(", ")}`);
  process.exit(1);
}

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`API escuchando en el puerto ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.error("No se pudo conectar a MongoDB", error.message);
    process.exit(1);
  });
