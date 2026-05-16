// =====================================================
// Router "utility": piccole route di servizio
// =====================================================
// Montato sotto /util: ad esempio router.get('/saluta')
// risponderà su GET /util/saluta.

import { Router } from 'express';

const router = Router();

router.get('/saluta', (req, res) => {
  const nome = req.query.nome ?? 'sconosciuto';
  res.send(`Ciao ${nome}!`);
});

router.post('/echo', (req, res) => {
  res.json({ ricevuto: req.body });
});

router.get('/healthz', (req, res) => {
  res.sendStatus(200);
});

export default router;
