// authMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config';

const JWT_SECRET = config.port as string;

export const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    res.status(401).send({ message: 'Access denied. No token provided.' });
    return;
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      res.status(401).send({ message: 'Invalid token' });
      return;
    }

    // Attach decoded payload to request object
    (req as any).decoded = decoded;
    next();
  });
};
