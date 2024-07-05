
import bcrypt from 'bcryptjs';
import { User } from './user.model';
import { TUser } from './user.interface';

export const createUser = async (email: string, password: string, role: string): Promise<TUser | null> => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user =await new User({ email, password: hashedPassword, role });
  return user.save();
};

export const findUserByEmail = async (email: string): Promise<TUser | null> => {
  return User.findOne({ email });
};

export const validatePassword = async (inputPassword: string, userPassword: string): Promise<boolean> => {
  return bcrypt.compare(inputPassword, userPassword);
};
