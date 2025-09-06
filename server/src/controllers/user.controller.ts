import { Response, NextFunction } from 'express';
import { UserRepository } from '../repositories/user.repository';
import { AuthRequest } from '../middlewares/auth.middleware';

export class UserController {
  constructor(private repo: UserRepository) {}

  list = async (_req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const users = await this.repo.findAll();
      res.json({ success: true, data: users });
    } catch (err) {
      next(err as Error);
    }
  };
}
