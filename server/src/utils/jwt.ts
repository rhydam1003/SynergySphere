import jwt, { SignOptions, Secret } from 'jsonwebtoken';
import config from '../config/env';

interface TokenPayload {
  userId: string;
  email: string;
  roles: string[];
}

export const generateToken = (payload: TokenPayload): string => {
  const options: SignOptions = {
    expiresIn: config.JWT_EXPIRES_IN as unknown as SignOptions['expiresIn'],
  };
  return jwt.sign(payload, config.JWT_SECRET as unknown as Secret, options);
};

export const generateRefreshToken = (payload: TokenPayload): string => {
  const options: SignOptions = {
    expiresIn: config.JWT_REFRESH_EXPIRES_IN as unknown as SignOptions['expiresIn'],
  };
  const secret = (config.JWT_REFRESH_SECRET || config.JWT_SECRET) as unknown as Secret;
  return jwt.sign(payload, secret, options);
};

export const verifyToken = (token: string): TokenPayload => {
  return jwt.verify(token, config.JWT_SECRET as unknown as Secret) as TokenPayload;
};

export const verifyRefreshToken = (token: string): TokenPayload => {
  const secret = (config.JWT_REFRESH_SECRET || config.JWT_SECRET) as unknown as Secret;
  return jwt.verify(token, secret) as TokenPayload;
};
