// =====================================================
// Esempio 01 — Configurazione di Express
// =====================================================
// Questo file COSTRUISCE l'app: registra middleware e route,
// e la esporta. NON chiama mai app.listen(): se ne occupa server.js.

import express from 'express';

const app = express();

// Una sola route di esempio
app.get('/', (req, res) => {
  res.send('Hello Express!');
});

export default app;
