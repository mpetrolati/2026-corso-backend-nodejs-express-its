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

  body('name').optional().isString().trim()
    .isLength({ min: 2, max: 50 }).withMessage('Nome tra 2 e 50 caratteri'),
];

export const loginValidator = [
  body('email').isEmail().withMessage('Email non valida').normalizeEmail(),
  body('password').isString().notEmpty().withMessage('Password obbligatoria')
];
