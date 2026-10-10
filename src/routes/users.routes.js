import express from 'express';
import { userController } from '../controllers/userController.js';

const router = express.Router();
const handle = (handler) => (req, res, next) => {
  Promise.resolve(handler(req, res, next)).catch(next);
};

router.get('/', handle(userController.getAll));
router.get('/:id', handle(userController.getById));
router.post('/', handle(userController.create));
router.put('/:id', handle(userController.update));
router.delete('/:id', handle(userController.remove));

export default router;
