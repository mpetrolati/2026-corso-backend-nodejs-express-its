// =====================================================
// Middleware custom: misura il tempo di risposta
// =====================================================
// Si aggancia all'evento 'finish' di res, che scatta
// quando la risposta e' stata mandata al client.
// Non blocca la pipeline: chiama next() subito.

export function durata(req, res, next) {
  const inizio = Date.now();

  res.on('finish', () => {
    const ms = Date.now() - inizio;
    console.log(`${req.method} ${req.url} -> ${res.statusCode} (${ms}ms)`);
  });

  next();
}
