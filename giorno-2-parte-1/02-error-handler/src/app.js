// =====================================================
// Esempio 02 — Error handler centralizzato
// =====================================================
// Mostra tre scenari di errore in tre route diverse:
//  - 404 lanciato esplicitamente con AppError
//  - 400 lanciato per input invalido
//  - 500 simulato con un'eccezione async non gestita
//    (catturata da asyncHandler + errorHandler)
//
// Tutti restituiscono lo STESSO formato JSON al client.

import express from 'express';

import { AppError } from './utils/AppError.js';
import { asyncHandler } from './utils/asyncHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';

const app = express();
app.use(express.json());

// Finto store in memoria per gli esempi
const store = [
  { id: 1, name: 'Mario' },
  { id: 2, name: 'Lucia' }
];

// 1) Errore esplicito: 404 quando non trovato
app.get('/users/:id', (req, res, next) => {
  const id = Number(req.params.id);
  const user = store.find(u => u.id === id);
  if (!user) {
    return next(new AppError('Utente non trovato', 404));
  }
  res.json(user);
});

// 2) Errore esplicito: 400 quando input invalido
app.post('/users', (req, res, next) => {
  const { name } = req.body ?? {};
  if (!name) {
    return next(new AppError('Il campo name e obbligatorio', 400));
  }
  const newUser = { id: store.length + 1, name };
  store.push(newUser);
  res.status(201).json(newUser);
});

// 3) Eccezione async non gestita: asyncHandler la cattura
//    e la passa all'errorHandler. Senza wrapper, Express
//    risponderebbe con HTML "Cannot ..." brutto da vedere.
app.get('/boom', asyncHandler(async (req, res) => {
  // simulo un'operazione asincrona che fallisce
  await new Promise((_, reject) =>
    setTimeout(() => reject(new Error('Qualcosa è esploso')), 50)
  );
  res.send('mai raggiunto');
}));

// 4) Eccezione sincrona dentro async (ugualmente catturata)
app.get('/throw', asyncHandler(async (req, res) => {
  throw new AppError('Errore di test', 418);  // I'm a teapot
}));

// catch-all 404 per route non gestite
app.use((req, res) => {
  res.status(404).json({ errore: 'Route non trovata' });
});

// Error handler: ULTIMO, dopo tutte le route
app.use(errorHandler);

export default app;
