import { Router } from 'express';

import { registerValidator } from '../validators/authValidators.js';
import { validate } from '../middlewares/validate.js';
import * as authController from '../controllers/authController.js';

const router = Router();

router.post('/register',
  registerValidator,        // 1) regole di validazione
  validate,                 // 2) se errori, risponde 400
  authController.register   // 3) altrimenti, chiama il controller
);

export default router;
