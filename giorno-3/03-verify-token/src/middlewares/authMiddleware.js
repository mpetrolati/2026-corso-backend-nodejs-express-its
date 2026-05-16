// =====================================================
// verifyToken — il cuore della sicurezza
// =====================================================
// I 5 passi:
//   1. Leggo l'header Authorization
//   2. Estraggo il token dal formato "Bearer <token>"
//   3. jwt.verify (firma + scadenza) — lancia se invalido
//   4. Attacco il payload a req.user
//   5. next()
//
// Tutti i casi di errore vengono mappati a 401 con messaggio
// generico (non rivelo all'attaccante COSA non funziona).

import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { AppError } from '../utils/AppError.js';

export function verifyToken(req, res, next) {
  try {
    // 1. Header presente?
    const header = req.headers['authorization'];
    if (!header) {
      throw new AppError('Token mancante', 401);
    }

    // 2. Formato "Bearer <token>"?
    const [scheme, token] = header.split(' ');
    if (scheme !== 'Bearer' || !token) {
      throw new AppError('Formato header non valido', 401);
    }

    // 3. Verifica firma + scadenza
    //    Whitelist HS256 → no "none algorithm attack"
    const payload = jwt.verify(token, env.jwtSecret, {
      algorithms: ['HS256']
    });

    // 4. Espongo il payload ai controller successivi
    req.user = payload;

    // 5. Avanti
    next();
  } catch (err) {
    // Mappo i due tipi di errore di jsonwebtoken a 401
    if (err.name === 'TokenExpiredError') {
      return next(new AppError('Token scaduto', 401));
    }
    if (err.name === 'JsonWebTokenError') {
      return next(new AppError('Token non valido', 401));
    }
    next(err);   // qualunque altro (AppError dai check espliciti, etc.)
  }
}
