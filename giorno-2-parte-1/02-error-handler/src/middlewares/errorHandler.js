// =====================================================
// Error handler centralizzato
// =====================================================
// Si riconosce dalla FIRMA a 4 parametri.
// Va registrato ULTIMO in app.js, dopo tutte le route.
// Cattura qualsiasi next(err) e qualsiasi eccezione
// nei controller async (grazie a asyncHandler).

export function errorHandler(err, req, res, next) {
  // log per il docente / sviluppatore
  // (in produzione si usa un logger strutturato tipo pino)
  console.error(err);

  const status = err.statusCode || 500;
  const message = err.message || 'Errore interno';

  res.status(status).json({ errore: message });
}
