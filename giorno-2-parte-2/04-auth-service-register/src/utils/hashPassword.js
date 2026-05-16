// =====================================================
// Wrapper su bcrypt
// =====================================================
// Centralizza l'hashing in un solo file. Il giorno che
// passiamo a bcryptjs o argon2, cambiamo qui e basta.

import bcrypt from 'bcrypt';
import { env } from '../config/env.js';

export async function hashPassword(plain) {
  return bcrypt.hash(plain, env.bcryptRounds);
}

export async function comparePassword(plain, hash) {
  return bcrypt.compare(plain, hash);
}
