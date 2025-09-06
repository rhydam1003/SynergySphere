import { Response, NextFunction } from 'express';
import { ThreadService } from '../services/thread.service';
import { AuthRequest } from '../middlewares/auth.middleware';

export class ThreadController {
  constructor(private service: ThreadService) {}

  create = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const thread = await this.service.createThread(req.params.projectId, req.user._id.toString(), req.body);
      res.status(201).json({ success: true, data: thread });
    } catch (err) {
      next(err as Error);
    }
  };

  list = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const threads = await this.service.listThreads(req.params.projectId, req.user._id.toString());
      res.json({ success: true, data: threads });
    } catch (err) {
      next(err as Error);
    }
  };

  get = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const thread = await this.service.getThread(req.params.id, req.user._id.toString());
      res.json({ success: true, data: thread });
    } catch (err) {
      next(err as Error);
    }
  };

  postMessage = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const msg = await this.service.postMessage(req.params.id, req.user._id.toString(), req.body);
      res.status(201).json({ success: true, data: msg });
    } catch (err) {
      next(err as Error);
    }
  };

  listMessages = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const messages = await this.service.listMessages(req.params.id, req.user._id.toString());
      res.json({ success: true, data: messages });
    } catch (err) {
      next(err as Error);
    }
  };
}
