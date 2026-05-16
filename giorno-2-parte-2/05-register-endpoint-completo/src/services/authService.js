import * as userRepository from '../repositories/userRepository.js';
import { hashPassword } from '../utils/hashPassword.js';
import { AppError } from '../utils/AppError.js';

export async function register({ email, password, name = null, role = 'user' }) {
  // 1. Email gia' usata?
  if (await userRepository.findByEmail(email)) {
    throw new AppError('Email gia registrata', 409);
  }

  // 2. Hash della password
  const passwordHash = await hashPassword(password);

  // 3. Crea l'utente
  const user = await userRepository.create({
    email,
    passwordHash,
    name,
    role
  });

  // 4. Ritorna utente pulito (senza password_hash)
  return toSafeUser(user);
}

function toSafeUser(user) {
  const { password_hash, ...safe } = user;
  return safe;
}
