// =====================================================
// Router "home": le pagine principali del sito
// =====================================================
// I path qui sono RELATIVI al base path su cui il router
// viene montato in app.js (in questo caso "/").

import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.send('Home');
});

router.get('/about', (req, res) => {
  res.send('About');
});

export default router;
