import { Response, NextFunction } from 'express';
import { TaskService } from '../services/task.service';
import { AuthRequest } from '../middlewares/auth.middleware';

export class TaskController {
  constructor(private service: TaskService) {}

  create = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const task = await this.service.createTask(req.params.projectId, req.user._id.toString(), req.body);
      res.status(201).json({ success: true, data: task });
    } catch (err) {
      next(err as Error);
    }
  };

  listByProject = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const tasks = await this.service.listTasks(
        req.params.projectId,
        req.user._id.toString(),
        { status: req.query.status as string, assignee: req.query.assignee as string }
      );
      res.json({ success: true, data: tasks });
    } catch (err) {
      next(err as Error);
    }
  };

  get = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const task = await this.service.getTask(req.params.id, req.user._id.toString());
      res.json({ success: true, data: task });
    } catch (err) {
      next(err as Error);
    }
  };

  update = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const updated = await this.service.updateTask(req.params.id, req.user._id.toString(), req.body);
      res.json({ success: true, data: updated });
    } catch (err) {
      next(err as Error);
    }
  };

  remove = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const ok = await this.service.deleteTask(req.params.id, req.user._id.toString());
      res.json({ success: ok });
    } catch (err) {
      next(err as Error);
    }
  };
}
