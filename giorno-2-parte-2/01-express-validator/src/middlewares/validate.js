// =====================================================
// validate — middleware unico per tutte le risposte 400
// =====================================================
// Va registrato SUBITO DOPO la catena di validatori.
// Legge i risultati con validationResult(req) e, se ci
// sono errori, risponde con un formato JSON uniforme.

import { validationResult } from 'express-validator';

export function validate(req, res, next) {
  const errors = validationResult(req);
  if (errors.isEmpty()) return next();

  return res.status(400).json({
    errore: 'Validazione fallita',
    dettagli: errors.array().map(e => ({
      campo: e.path,
      messaggio: e.msg
    }))
  });
}
