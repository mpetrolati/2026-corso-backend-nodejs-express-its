// =====================================================
// authService — il cervello dell'autenticazione
// =====================================================
// Vive sopra al repository, sotto al controller.
// NON conosce Express: niente req, niente res.
// Si puo' testare in isolamento come una funzione pura.

import * as userRepository from '../repositories/userRepository.js';
import { hashPassword } from '../utils/hashPassword.js';
import { AppError } from '../utils/AppError.js';

export async function register({ email, password, name = null, role = 'user' }) {
  // 1. C'e' gia' un utente con questa email?
  //    Lo controlliamo PRIMA dell'hash (che e' lento)
  if (userRepository.findByEmail(email)) {
    throw new AppError('Email gia registrata', 409);
  }

  // 2. Hash della password
  const passwordHash = await hashPassword(password);

  // 3. Scrivo l'utente nel DB
  const user = userRepository.create({
    email,
    passwordHash,
    name,
    role
  });

  // 4. Ritorno l'utente "pulito" (senza password_hash)
  return toSafeUser(user);
}

function toSafeUser(user) {
  const { password_hash, ...safe } = user;
  return safe;
}
