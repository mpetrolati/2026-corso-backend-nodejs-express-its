// =====================================================
// authValidators — regole di validazione per /register e /login
// =====================================================
// Ogni validatore e' una lista di middleware in catena.
// Sono solo regole: la risposta 400 in caso di errori
// viene gestita dal middleware 'validate' separato.

import { body } from 'express-validator';

export const registerValidator = [
  body('email')
    .isEmail().withMessage('Email non valida')
    .normalizeEmail(),

  body('password')
    .isString().withMessage('Password obbligatoria')
    .isLength({ min: 8 }).withMessage('Password di almeno 8 caratteri')
    .custom((value) => {
      if (!/[A-Z]/.test(value)) throw new Error('Serve almeno una maiuscola');
      if (!/[0-9]/.test(value)) throw new Error('Serve almeno un numero');
      return true;
    }),

  body('name')
    .optional()
    .isString()
    .trim()
    .isLength({ min: 2, max: 50 }).withMessage('Nome tra 2 e 50 caratteri'),

  body('role')
    .optional()
    .isIn(['user', 'admin']).withMessage('role deve essere "user" o "admin"')
];

export const loginValidator = [
  body('email').isEmail().normalizeEmail(),
  body('password').isString().notEmpty()
];
