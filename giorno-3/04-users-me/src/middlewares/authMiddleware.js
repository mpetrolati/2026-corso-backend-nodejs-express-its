import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { AppError } from '../utils/AppError.js';

export function verifyToken(req, res, next) {
  try {
    const header = req.headers['authorization'];
    if (!header) throw new AppError('Token mancante', 401);

    const [scheme, token] = header.split(' ');
    if (scheme !== 'Bearer' || !token) {
      throw new AppError('Formato header non valido', 401);
    }

    const payload = jwt.verify(token, env.jwtSecret, { algorithms: ['HS256'] });
    req.user = payload;
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return next(new AppError('Token scaduto', 401));
    }
    if (err.name === 'JsonWebTokenError') {
      return next(new AppError('Token non valido', 401));
    }
    next(err);
  }
}
