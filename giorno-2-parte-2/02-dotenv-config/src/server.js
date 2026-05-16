// =====================================================
// Esempio 02 — Uso di config/env.js
// =====================================================
// Server minimale che usa env per la porta e mostra
// la configurazione attiva all'utente (info sensibili escluse).

import express from 'express';
import { env } from './config/env.js';

const app = express();

app.get('/', (req, res) => {
  res.json({
    ambiente: env.nodeEnv,
    porta: env.port,
    bcryptRounds: env.bcryptRounds,
    jwtSecretLength: env.jwtSecret.length,  // lunghezza, non valore
    nota: 'JWT_SECRET non viene esposto, ne mostro solo la lunghezza'
  });
});

app.listen(env.port, () => {
  console.log(`Server in ascolto su http://localhost:${env.port}`);
});
