function errorHandler(error, req, res, next) {
  console.error(error);

  const status = error.status || 500;
  const message = status === 500 ? "Error interno del servidor" : error.message;

  res.status(status).json({ error: message });
}

module.exports = errorHandler;
