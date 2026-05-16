// =====================================================
// Esempio 01 — I tre tipi di middleware
// =====================================================
// Mostra in pratica:
//  - application-level (app.use): durata, morgan, express.json
//  - router-level (router.use): logger specifico per /api
//  - factory: richiediHeader('X-Client-Id')
//
// L'ORDINE di registrazione e' importante: middleware di
// parsing/logging in cima, route in fondo.

import express from 'express';
import morgan from 'morgan';
import { Router } from 'express';

import { durata } from './middlewares/durata.js';
import { richiediHeader } from './middlewares/richiediHeader.js';

const app = express();

// === APPLICATION-LEVEL: vale per TUTTE le richieste ===
app.use(express.json());
app.use(morgan('dev'));
app.use(durata);

// === Router con middleware ROUTER-LEVEL ===
const apiRouter = Router();

// Questo logger vale SOLO per /api/*
apiRouter.use((req, res, next) => {
  console.log(`[api] ${req.method} ${req.url}`);
  next();
});

// Factory: tutte le route di apiRouter richiedono X-Client-Id
apiRouter.use(richiediHeader('X-Client-Id'));

apiRouter.get('/info', (req, res) => {
  res.json({
    versione: '1.0.0',
    clientId: req.headers['x-client-id']
  });
});

apiRouter.post('/echo', (req, res) => {
  res.json({ ricevuto: req.body });
});

// Monto il router sotto /api
app.use('/api', apiRouter);

// Route fuori da /api (niente logger api, niente header)
app.get('/', (req, res) => {
  res.send('Server con middleware di tre tipi!');
});

export default app;
