export function errorHandler(err, req, res, next) {
  console.error(err);

  // gestisco anche il caso UNIQUE constraint di SQLite
  // mappandolo a 409 Conflict (utile per email duplicate)
  if (err.code === 'SQLITE_CONSTRAINT_UNIQUE') {
    return res.status(409).json({ errore: 'Risorsa gia esistente (vincolo UNIQUE)' });
  }

  const status = err.statusCode || 500;
  const message = err.message || 'Errore interno';
  res.status(status).json({ errore: message });
}
