import { Router } from 'express';
import { authenticate } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validation.middleware';
import { createTaskSchema, updateTaskSchema } from '../validators/task.validator';
import { TaskController } from '../controllers/task.controller';
import { TaskService } from '../services/task.service';
import { TaskRepository } from '../repositories/task.repository';
import { ProjectRepository } from '../repositories/project.repository';

const router = Router();

const taskRepo = new TaskRepository();
const projectRepo = new ProjectRepository();
const service = new TaskService(taskRepo, projectRepo);
const controller = new TaskController(service);

// Project-scoped
router.post('/projects/:projectId/tasks', authenticate, validate(createTaskSchema), controller.create);
router.get('/projects/:projectId/tasks', authenticate, controller.listByProject);

// Task-scoped
router.get('/tasks/:id', authenticate, controller.get);
router.patch('/tasks/:id', authenticate, validate(updateTaskSchema), controller.update);
router.delete('/tasks/:id', authenticate, controller.remove);

export default router;
