// controllers/userController.ts
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { createUser, findUserByEmail, validatePassword } from './user.services';
import config from '../../config';

const JWT_SECRET = config.port as string; 

export const registerUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password, role } = req.body;
  

  try {
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      res.status(400).send({ message: 'User already exists' });
      return;
    }

    const userRole = role || 'user'; 
   
    const user = await createUser(email, password, userRole);
    
    res.status(201).send({ message: 'User created successfully', user });
  } catch (error) {
    res.status(500).send({ message: 'Internal server error', error });
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const user = await findUserByEmail(email);
    if (!user) {
      res.status(400).send({ message: 'Invalid email or password' });
      return;
    }

    const isValidPassword = await validatePassword(password, user.password);
    if (!isValidPassword) {
      res.status(400).send({ message: 'Invalid email or password' });
      return;
    }

    const token = jwt.sign({ email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
    res.status(200).send({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).send({ message: 'Internal server error', error });
  }
};
