// =====================================================
// Wrapper su jsonwebtoken
// =====================================================
// Isola la libreria in un solo file. Il giorno che vuoi
// passare a un'altra (es. jose, fast-jwt), cambi qui.

import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

export function generateToken(payload) {
  return jwt.sign(payload, env.jwtSecret, {
    expiresIn: env.jwtExpiresIn
  });
}

export function verifyToken(token) {
  // Lancia TokenExpiredError o JsonWebTokenError se non valido.
  // White-list dell'algoritmo per evitare l'attacco "none algorithm".
  return jwt.verify(token, env.jwtSecret, { algorithms: ['HS256'] });
}
