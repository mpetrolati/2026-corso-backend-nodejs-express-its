// =====================================================
// authService — register + login
// =====================================================
// register: come ieri (Giorno 2 Parte 2)
// login:    verifica credenziali e genera token JWT

import * as userRepository from '../repositories/userRepository.js';
import { hashPassword, comparePassword } from '../utils/hashPassword.js';
import { generateToken } from '../utils/generateToken.js';
import { AppError } from '../utils/AppError.js';
import { env } from '../config/env.js';

function toSafeUser(user) {
  const { password_hash, ...safe } = user;
  return safe;
}

export async function register({ email, password, name = null, role = 'user' }) {
  if (userRepository.findByEmail(email)) {
    throw new AppError('Email gia registrata', 409);
  }
  const passwordHash = await hashPassword(password);
  const user = userRepository.create({ email, passwordHash, name, role });
  return toSafeUser(user);
}

export async function login({ email, password }) {
  // 1. Cerco l'utente per email
  const user = userRepository.findByEmail(email);

  // 2. Non esiste? 401 (NON 404, anti user enumeration)
  if (!user) {
    throw new AppError('Credenziali non valide', 401);
  }

  // 3. Verifico la password con bcrypt.compare
  const ok = await comparePassword(password, user.password_hash);

  // 4. Non matcha? stesso 401, stesso messaggio
  if (!ok) {
    throw new AppError('Credenziali non valide', 401);
  }

  // 5. Genero il token con payload minimale
  const token = generateToken({
    userId: user.id,
    email: user.email
  });

  return {
    token,
    expiresIn: env.jwtExpiresIn,
    user: toSafeUser(user)
  };
}
