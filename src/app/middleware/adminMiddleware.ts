
import { Request, Response, NextFunction } from 'express';

export const isAdmin = (req: Request, res: Response, next: NextFunction): void => {
  const userRole = (req as any).decoded.role;

  if (userRole !== 'admin') {
    res.status(403).send({ message: 'Access denied. Admin role required.' });
    return;
  }

  next();
};
