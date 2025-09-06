import { Response, NextFunction } from 'express';
import { NotificationService } from '../services/notification.service';
import { AuthRequest } from '../middlewares/auth.middleware';

export class NotificationController {
  constructor(private service: NotificationService) {}

  list = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const items = await this.service.list(req.user._id.toString());
      res.json({ success: true, data: items });
    } catch (err) {
      next(err as Error);
    }
  };

  markRead = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const item = await this.service.markRead(req.params.id, req.user._id.toString());
      res.json({ success: true, data: item });
    } catch (err) {
      next(err as Error);
    }
  };

  markAllRead = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const count = await this.service.markAllRead(req.user._id.toString());
      res.json({ success: true, data: { updated: count } });
    } catch (err) {
      next(err as Error);
    }
  };
}
