// =====================================================
// Router /api/users — CRUD su SQLite via repository
// =====================================================
// Nota: il repository ritorna anche password_hash, che
// NON va esposto al client. Lo togliamo con una piccola
// helper. Nel pomeriggio sposteremo questa logica in un
// userService dedicato.

import { Router } from 'express';

import * as userRepository from '../repositories/userRepository.js';
import { AppError } from '../utils/AppError.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const router = Router();

function toSafeUser(user) {
  if (!user) return user;
  const { password_hash, ...safe } = user;
  return safe;
}

// GET /api/users → lista
router.get('/', asyncHandler(async (req, res) => {
  const users = (await userRepository.findAll()).map(toSafeUser);
  res.json(users);
}));

// GET /api/users/:id → singolo
router.get('/:id', asyncHandler(async (req, res) => {
  const user = await userRepository.findById(req.params.id);
  if (!user) throw new AppError('Utente non trovato', 404);
  res.json(toSafeUser(user));
}));

// POST /api/users → crea
router.post('/', asyncHandler(async (req, res) => {
  const { email, password, name } = req.body ?? {};
  if (!email || !password) {
    throw new AppError('email e password sono obbligatori', 400);
  }

  // ATTENZIONE: qui passiamo la password come "passwordHash"
  // ma in realta' NON e' ancora hashata. L'hashing arriva
  // questo pomeriggio con bcrypt. Per ora simuliamo.
  const fakePasswordHash = `not-bcrypt-yet:${password}`;

  const user = await userRepository.create({
    email,
    passwordHash: fakePasswordHash,
    name: name ?? null
  });
  res.status(201).json(toSafeUser(user));
}));

// PUT /api/users/:id → aggiorna
router.put('/:id', asyncHandler(async (req, res) => {
  const user = await userRepository.update(req.params.id, req.body ?? {});
  if (!user) throw new AppError('Utente non trovato', 404);
  res.json(toSafeUser(user));
}));

// DELETE /api/users/:id → cancella
router.delete('/:id', asyncHandler(async (req, res) => {
  const ok = await userRepository.deleteById(req.params.id);
  if (!ok) throw new AppError('Utente non trovato', 404);
  res.sendStatus(204);
}));

export default router;
