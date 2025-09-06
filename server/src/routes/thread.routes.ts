import { Router } from 'express';
import { authenticate } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validation.middleware';
import { createThreadSchema, createMessageSchema } from '../validators/thread.validator';
import { ThreadController } from '../controllers/thread.controller';
import { ThreadService } from '../services/thread.service';
import { ThreadRepository } from '../repositories/thread.repository';
import { MessageRepository } from '../repositories/message.repository';
import { ProjectRepository } from '../repositories/project.repository';

const router = Router();

const threadRepo = new ThreadRepository();
const messageRepo = new MessageRepository();
const projectRepo = new ProjectRepository();
const service = new ThreadService(threadRepo, messageRepo, projectRepo);
const controller = new ThreadController(service);

router.post('/projects/:projectId/threads', authenticate, validate(createThreadSchema), controller.create);
router.get('/projects/:projectId/threads', authenticate, controller.list);
router.get('/threads/:id', authenticate, controller.get);
router.post('/threads/:id/messages', authenticate, validate(createMessageSchema), controller.postMessage);
router.get('/threads/:id/messages', authenticate, controller.listMessages);

export default router;
