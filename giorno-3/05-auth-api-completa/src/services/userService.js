// =====================================================
// userService — gestione del profilo utente
// =====================================================
// getProfile / updateProfile / deleteAccount.
// Filtra SOLO i campi pubblici (no email, no role da update).

import * as userRepository from '../repositories/userRepository.js';
import { hashPassword } from '../utils/hashPassword.js';
import { AppError } from '../utils/AppError.js';

function toSafeUser(user) {
  const { password_hash, ...safe } = user;
  return safe;
}

export async function getProfile(userId) {
  const user = await userRepository.findById(userId);
  if (!user) throw new AppError('Utente non trovato', 404);
  return toSafeUser(user);
}

export async function updateProfile(userId, data) {
  // Filtro esplicito: SOLO name e password sono permessi
  const patch = {};
  if (data.name !== undefined) patch.name = data.name;
  if (data.password) patch.passwordHash = await hashPassword(data.password);
  // data.email e data.role vengono IGNORATI (anti parameter pollution)

  const user = await userRepository.update(userId, patch);
  if (!user) throw new AppError('Utente non trovato', 404);
  return toSafeUser(user);
}

export async function deleteAccount(userId) {
  const ok = await userRepository.deleteById(userId);
  if (!ok) throw new AppError('Utente non trovato', 404);
}
