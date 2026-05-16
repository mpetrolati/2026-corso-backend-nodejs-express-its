// =====================================================
// Esempio 03 — Middleware verifyToken in azione
// =====================================================
// App minimale con due route:
//   POST /token         → genera un token finto (per testing)
//   GET  /protected     → protetta da verifyToken, ritorna req.user
//
// Permette di esercitare tutti i casi d'errore del middleware
// senza dover prima registrare/loggare un utente vero.

import express from 'express';
import jwt from 'jsonwebtoken';

import { env } from './config/env.js';
import { verifyToken } from './middlewares/authMiddleware.js';
import { errorHandler } from './middlewares/errorHandler.js';

const app = express();
app.use(express.json());

// Endpoint "demo" per generare token al volo (NON usare cosi' in produzione!)
app.post('/token', (req, res) => {
  const payload = req.body ?? { userId: 1, email: 'demo@example.com' };
  const token = jwt.sign(payload, env.jwtSecret, {
    expiresIn: env.jwtExpiresIn,
    algorithm: 'HS256'
  });
  res.json({ token, payload, expiresIn: env.jwtExpiresIn });
});

// Route PROTETTA — passa solo se il middleware accetta il token
app.get('/protected', verifyToken, (req, res) => {
  res.json({
    messaggio: 'Sei dentro!',
    sei: req.user
  });
});

// Route pubblica (per confronto)
app.get('/', (req, res) => {
  res.send('Pubblica: tutti possono leggere');
});

app.use(errorHandler);

export default app;
