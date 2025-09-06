import { Response, NextFunction } from 'express';
import { AuthRequest } from './auth.middleware';
import { AuthorizationError } from '../utils/errors';

export const authorize = (...allowedRoles: string[]) => {
  return (req: AuthRequest, _res: Response, next: NextFunction): void => {
    if (!req.user) {
      return next(new AuthorizationError('User not authenticated'));
    }

    const hasRole = req.user.roles.some((role: string) => allowedRoles.includes(role));
    
    if (!hasRole) {
      return next(new AuthorizationError('Insufficient permissions'));
    }

    next();
  };
};
