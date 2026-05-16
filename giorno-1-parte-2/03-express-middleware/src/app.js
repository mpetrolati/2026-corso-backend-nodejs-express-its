// =====================================================
// Esempio 03 — Middleware in Express
// =====================================================
// Mostra: built-in (express.json), terze parti (morgan),
// custom (durata) e factory (richiediHeader).
// L'ORDINE di registrazione è importante: middleware di
// parsing/logging in cima, route in fondo.

import express from 'express';
import morgan from 'morgan';

import { durata } from './middlewares/durata.js';
import { richiediHeader } from './middlewares/richiediHeader.js';

const app = express();

// 1) Built-in: parsing del body JSON
app.use(express.json());

// 2) Di terze parti: logger HTTP formattato (output colorato in dev)
app.use(morgan('dev'));

// 3) Custom: misura il tempo di ogni risposta
app.use(durata);

// 4) Factory: si applica solo alle route sotto /api
app.use('/api', richiediHeader('X-Client-Id'));

// -----------------------------------------------------
// Route di esempio
// -----------------------------------------------------
app.get('/', (req, res) => {
  res.send('Hello dal server con middleware!');
});

app.get('/api/info', (req, res) => {
  res.json({ versione: '1.0.0', clientId: req.headers['x-client-id'] });
});

app.post('/api/echo', (req, res) => {
  res.json({ ricevuto: req.body });
});

export default app;
