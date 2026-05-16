// =====================================================
// Middleware "factory": ritorna un middleware configurato
// =====================================================
// Pattern utilissimo quando il middleware ha bisogno di
// parametri (es. il nome dell'header da controllare).
// È lo stesso pattern che useremo nel Giorno 3 per il
// middleware verifyToken.

export function richiediHeader(nome) {
  return function (req, res, next) {
    if (!req.headers[nome.toLowerCase()]) {
      return res.status(400).json({ errore: `Manca header ${nome}` });
    }
    next();
  };
}
