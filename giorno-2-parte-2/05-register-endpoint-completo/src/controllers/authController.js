// =====================================================
// authController — orchestra HTTP per /api/auth
// =====================================================
// Il controller e' SOTTILE per costruzione:
// - estrae i dati da req.body
// - chiama il service
// - scrive la risposta
// Tutta la logica e' nel service.

import * as authService from '../services/authService.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const register = asyncHandler(async (req, res) => {
  const user = await authService.register(req.body);
  res.status(201).json(user);
});
