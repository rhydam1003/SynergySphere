import { Router } from 'express';
import { authenticate } from '../middlewares/auth.middleware';
import { UserController } from '../controllers/user.controller';
import { UserRepository } from '../repositories/user.repository';

const router = Router();

const repo = new UserRepository();
const controller = new UserController(repo);

router.get('/', authenticate, controller.list);

export default router;
