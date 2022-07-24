import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '../../config/auth';
import AppError from '../../errors';

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT Token is missing.');
  }
  const [, token] = authHeader.split(' '); // para espacar o tokem

  try {
    const decodeToken = verify(token, authConfig.jwt.secret);

    const { sub } = decodeToken as ITokenPayload;

    req.user = {
      id: sub,
    };

    return next();
  } catch (error) {
    throw new AppError('Invalid JWT Token.');
  }
}

// funcao para autenticar usuarios
