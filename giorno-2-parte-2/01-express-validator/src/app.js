// =====================================================
// Esempio 01 — Validazione con express-validator
// =====================================================
// Mostra la pipeline completa:
//   validators -> validate -> handler
// Tre endpoint per provare i tre tipi di scenario:
//   POST /register   con validatori complessi
//   POST /login      con validatori semplici
//   POST /echo       senza validazione (per confronto)

import express from 'express';

import { registerValidator, loginValidator } from './validators/authValidators.js';
import { validate } from './middlewares/validate.js';

const app = express();
app.use(express.json());

// Endpoint con validatori + middleware validate
app.post('/register', registerValidator, validate, (req, res) => {
  // Il body arriva qui SOLO se la validazione e' passata.
  // express-validator ha gia' applicato i sanitizer (es. normalizeEmail).
  res.json({
    messaggio: 'Validazione passata, sarei stato registrato',
    bodyDopoValidazione: req.body
  });
});

app.post('/login', loginValidator, validate, (req, res) => {
  res.json({
    messaggio: 'Login valido, sarei stato autenticato',
    bodyDopoValidazione: req.body
  });
});

// Endpoint SENZA validazione (per confronto)
app.post('/echo', (req, res) => {
  res.json({ ricevuto: req.body });
});

app.get('/', (req, res) => {
  res.send('Esempio di validazione con express-validator. Prova POST /register');
});

export default app;
