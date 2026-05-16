import { Router } from 'express';

import { verifyToken } from '../middlewares/authMiddleware.js';
import { validate } from '../middlewares/validate.js';
import { updateMeValidator } from '../validators/userValidators.js';
import * as userController from '../controllers/userController.js';

const router = Router();

// Tutte le route di /api/users richiedono autenticazione
router.use(verifyToken);

router.get('/me', userController.getMe);

router.put('/me',
  updateMeValidator,
  validate,
  userController.updateMe
);

router.delete('/me', userController.deleteMe);

export default router;
