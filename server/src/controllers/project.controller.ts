import { Response, NextFunction } from 'express';
import { ProjectService } from '../services/project.service';
import { AuthRequest } from '../middlewares/auth.middleware';

export class ProjectController {
  constructor(private service: ProjectService) {}

  create = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const project = await this.service.createProject(req.user._id.toString(), req.body);
      res.status(201).json({ success: true, data: project });
    } catch (err) {
      next(err as Error);
    }
  };

  list = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const projects = await this.service.listForUser(req.user._id.toString());
      res.json({ success: true, data: projects });
    } catch (err) {
      next(err as Error);
    }
  };

  get = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const project = await this.service.getProjectForUser(req.params.id, req.user._id.toString());
      res.json({ success: true, data: project });
    } catch (err) {
      next(err as Error);
    }
  };

  update = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const updated = await this.service.updateProject(req.params.id, req.user._id.toString(), req.body);
      res.json({ success: true, data: updated });
    } catch (err) {
      next(err as Error);
    }
  };

  remove = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const ok = await this.service.deleteProject(req.params.id, req.user._id.toString());
      res.json({ success: ok });
    } catch (err) {
      next(err as Error);
    }
  };

  addMember = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const updated = await this.service.addMember(
        req.params.id,
        req.user._id.toString(),
        req.body.userId,
        req.body.role
      );
      res.json({ success: true, data: updated });
    } catch (err) {
      next(err as Error);
    }
  };

  updateMember = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const updated = await this.service.updateMember(
        req.params.id,
        req.user._id.toString(),
        req.params.userId,
        req.body.role
      );
      res.json({ success: true, data: updated });
    } catch (err) {
      next(err as Error);
    }
  };

  removeMember = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const updated = await this.service.removeMember(
        req.params.id,
        req.user._id.toString(),
        req.params.userId
      );
      res.json({ success: true, data: updated });
    } catch (err) {
      next(err as Error);
    }
  };

  activity = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const items = await this.service.listActivity(req.params.id, req.user._id.toString());
      res.json({ success: true, data: items });
    } catch (err) {
      next(err as Error);
    }
  };
}
