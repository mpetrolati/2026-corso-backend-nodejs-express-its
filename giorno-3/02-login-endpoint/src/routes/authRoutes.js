import { Router } from 'express';

import { registerValidator, loginValidator } from '../validators/authValidators.js';
import { validate } from '../middlewares/validate.js';
import * as authController from '../controllers/authController.js';

const router = Router();

router.post('/register', registerValidator, validate, authController.register);
router.post('/login',    loginValidator,    validate, authController.login);

export default router;
