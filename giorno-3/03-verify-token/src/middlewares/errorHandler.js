export function errorHandler(err, req, res, next) {
  console.error(err.message);
  const status = err.statusCode || 500;
  res.status(status).json({ errore: err.message || 'Errore interno' });
}
