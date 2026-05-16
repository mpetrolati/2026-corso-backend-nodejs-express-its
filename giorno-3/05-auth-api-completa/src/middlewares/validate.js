import { validationResult } from 'express-validator';

export function validate(req, res, next) {
  const errors = validationResult(req);
  if (errors.isEmpty()) return next();
  return res.status(400).json({
    errore: 'Validazione fallita',
    dettagli: errors.array().map(e => ({ campo: e.path, messaggio: e.msg }))
  });
}
