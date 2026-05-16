// =====================================================
// Esempio 06 — CRUD completo del Giorno 1 ora su SQLite
// =====================================================
// Mette insieme TUTTI i mattoncini del Giorno 2 Parte 1:
//  - tre tipi di middleware (parsing, logging, error handler)
//  - error handler centralizzato + AppError + asyncHandler
//  - SQLite via better-sqlite3
//  - schema users + indice email
//  - userRepository come unico punto col DB

import express from 'express';
import morgan from 'morgan';

import userRoutes from './routes/userRoutes.js';
import { errorHandler } from './middlewares/errorHandler.js';

const app = express();

// 1) Middleware di parsing/logging (in cima)
app.use(express.json());
app.use(morgan('dev'));

// 2) Route applicative
app.use('/api/users', userRoutes);

// 3) Catch-all 404 per route inesistenti
app.use((req, res) => {
  res.status(404).json({ errore: 'Route non trovata' });
});

// 4) Error handler (ultimo, sempre)
app.use(errorHandler);

export default app;
