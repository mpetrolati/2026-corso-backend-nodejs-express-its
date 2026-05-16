export function errorHandler(err, req, res, next) {
  console.error(err);

  // UNIQUE constraint (es. email duplicata) → 409 Conflict
  if (err.code === 'SQLITE_CONSTRAINT_UNIQUE') {
    return res.status(409).json({ errore: 'Risorsa gia esistente (vincolo UNIQUE)' });
  }

  const status = err.statusCode || 500;
  const message = err.message || 'Errore interno';
  res.status(status).json({ errore: message });
}
