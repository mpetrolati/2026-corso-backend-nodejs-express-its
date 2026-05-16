// =====================================================
// Esempio 04 — express.Router() in azione
// =====================================================
// Mostra come dividere le route in più file ("router") e
// montarli su base path diversi. È la struttura che
// useremo per il progetto Auth API.

import express from 'express';

import homeRoutes from './routes/homeRoutes.js';
import utilityRoutes from './routes/utilityRoutes.js';

const app = express();
app.use(express.json());

// Monto i router su base path diversi
app.use('/',     homeRoutes);
app.use('/util', utilityRoutes);

// Catch-all 404: arriva qui se nessuna route ha risposto.
// VA REGISTRATO PER ULTIMO.
app.use((req, res) => {
  res.status(404).json({ errore: 'Route non trovata' });
});

export default app;
