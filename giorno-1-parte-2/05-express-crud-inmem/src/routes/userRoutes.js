// =====================================================
// Router /api/users: il CRUD completo
// =====================================================
// Non sa nulla del DB: parla solo con il "userStore".
// È l'anteprima della struttura controller -> service -> repository
// che vedremo nel Giorno 2.

import { Router } from 'express';
import * as store from '../data/userStore.js';

const router = Router();

// -----------------------------------------------------
// IMPORTANTE: le route con path "fisso" come /search
// vanno dichiarate PRIMA di quelle con :id, altrimenti
// Express le tratta come /:id (con id='search').
// -----------------------------------------------------
router.get('/search', (req, res) => {
  res.json(store.search(req.query.nome));
});

// GET /api/users  → lista
router.get('/', (req, res) => {
  res.json(store.findAll());
});

// GET /api/users/:id  → singolo utente o 404
router.get('/:id', (req, res) => {
  const user = store.findById(req.params.id);
  if (!user) {
    return res.status(404).json({ errore: 'Utente non trovato' });
  }
  res.json(user);
});

// POST /api/users  → crea (201) o 400 se input invalido
router.post('/', (req, res) => {
  const { name, email } = req.body ?? {};
  if (!name || !email) {
    return res.status(400).json({
      errore: 'I campi name e email sono obbligatori'
    });
  }
  const user = store.create({ name, email });
  res.status(201).json(user);
});

// PUT /api/users/:id  → aggiorna o 404
router.put('/:id', (req, res) => {
  const user = store.update(req.params.id, req.body ?? {});
  if (!user) {
    return res.status(404).json({ errore: 'Utente non trovato' });
  }
  res.json(user);
});

// DELETE /api/users/:id  → 204 No Content o 404
router.delete('/:id', (req, res) => {
  const ok = store.remove(req.params.id);
  if (!ok) {
    return res.status(404).json({ errore: 'Utente non trovato' });
  }
  res.sendStatus(204);
});

export default router;
