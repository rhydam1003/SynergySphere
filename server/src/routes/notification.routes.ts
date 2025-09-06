import { Router } from 'express';
import { authenticate } from '../middlewares/auth.middleware';
import { NotificationController } from '../controllers/notification.controller';
import { NotificationService } from '../services/notification.service';
import { NotificationRepository } from '../repositories/notification.repository';

const router = Router();

const repo = new NotificationRepository();
const service = new NotificationService(repo);
const controller = new NotificationController(service);

router.get('/notifications', authenticate, controller.list);
router.patch('/notifications/:id/read', authenticate, controller.markRead);
router.patch('/notifications/read-all', authenticate, controller.markAllRead);

export default router;
