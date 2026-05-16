// =====================================================
// Esempio 05 — CRUD in-memory di utenti finti
// =====================================================
// Lo "scheletro" del progetto Auth API: stessa struttura,
// ma con un array al posto del DB e senza validazione
// né bcrypt (arrivano nel Giorno 2).

import express from 'express';
import morgan from 'morgan';

import userRoutes from './routes/userRoutes.js';

const app = express();

// Middleware in ordine sensato: parsing body in cima,
// logger subito dopo
app.use(express.json());
app.use(morgan('dev'));

// Monto il router degli utenti sotto /api/users
app.use('/api/users', userRoutes);

// Catch-all 404: per ultimo, dopo tutte le route
app.use((req, res) => {
  res.status(404).json({ errore: 'Route non trovata' });
});

export default app;
