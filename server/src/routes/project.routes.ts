import { Router } from 'express';
import { authenticate } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validation.middleware';
import { createProjectSchema, updateProjectSchema, addMemberSchema, updateMemberSchema } from '../validators/project.validator';
import { ProjectController } from '../controllers/project.controller';
import { ProjectService } from '../services/project.service';
import { ProjectRepository } from '../repositories/project.repository';
import { ActivityRepository } from '../repositories/activity.repository';

const router = Router();

const projectRepo = new ProjectRepository();
const activityRepo = new ActivityRepository();
const service = new ProjectService(projectRepo, activityRepo);
const controller = new ProjectController(service);

router.post('/', authenticate, validate(createProjectSchema), controller.create);
router.get('/', authenticate, controller.list);
router.get('/:id', authenticate, controller.get);
router.patch('/:id', authenticate, validate(updateProjectSchema), controller.update);
router.delete('/:id', authenticate, controller.remove);

router.post('/:id/members', authenticate, validate(addMemberSchema), controller.addMember);
router.patch('/:id/members/:userId', authenticate, validate(updateMemberSchema), controller.updateMember);
router.delete('/:id/members/:userId', authenticate, controller.removeMember);

router.get('/:id/activity', authenticate, controller.activity);

export default router;
