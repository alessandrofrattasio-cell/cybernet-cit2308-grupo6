const express = require("express");
const logger = require("./src/middleware/logger");
const errorHandler = require("./src/middleware/errorHandler");

const app = express();

app.use(express.json());
app.use(logger);

app.get("/api", (req, res) => {
  res.json({ message: "CyberNet API" });
});

app.use((req, res) => {
  res.status(404).json({ error: "Recurso no encontrado" });
});

app.use(errorHandler);

module.exports = app;
