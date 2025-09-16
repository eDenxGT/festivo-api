import { JwtPayload } from 'jsonwebtoken';
import { JwtService } from '../../infrastructure/services/jwt.service';
import { NextFunction, Request, Response } from 'express';
import { HTTP_STATUS } from '../../shared/constants';
import { ERROR_MESSAGES } from '../../shared/constants/error-messages.constants';
import logger from '../../shared/utils/logger';

const tokenService = new JwtService();

export interface CustomJwtPayload extends JwtPayload {
  id: string;
  email: string;
  role: string;
  access_token: string;
  refresh_token: string;
}

export interface CustomRequest extends Request {
  user: CustomJwtPayload;
}

//* ─────────────────────────────────────────────────────────────
//*                  🛠️ VerifyAuth Middleware
//* ─────────────────────────────────────────────────────────────
export const verifyAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = extractToken(req);
    if (!token) {
      res.status(HTTP_STATUS.UNAUTHORIZED).json({
        success: false,
        message: ERROR_MESSAGES.CLIENT.UNAUTHORIZED
      });
      return;
    }

    const user = tokenService.verifyAccessToken(
      token.access_token
    ) as CustomJwtPayload;
    if (!user || !user.id) {
      res.status(HTTP_STATUS.UNAUTHORIZED).json({
        message: ERROR_MESSAGES.CLIENT.UNAUTHORIZED
      });
      return;
    }
    (req as CustomRequest).user = {
      ...user,
      access_token: token.access_token,
      refresh_token: token.refresh_token
    };
    next();
  } catch (error: any) {
    if (error.name === 'TokenExpiredError') {
      logger.error(error);
      res.status(HTTP_STATUS.UNAUTHORIZED).json({
        message: ERROR_MESSAGES.CLIENT.TOKEN_EXPIRED
      });
      return;
    }

    res.status(HTTP_STATUS.UNAUTHORIZED).json({
      message: ERROR_MESSAGES.CLIENT.INVALID_TOKEN
    });
    return;
  }
};

//* ─────────────────────────────────────────────────────────────
//*                 🛠️ Extract Token Helper Fn
//* ─────────────────────────────────────────────────────────────
const extractToken = (
  req: Request
): { access_token: string; refresh_token: string } | null => {
  return {
    access_token: req.cookies?.[`x-access-token`] ?? null,
    refresh_token: req.cookies?.[`x-refresh-token`] ?? null
  };
};

//* ─────────────────────────────────────────────────────────────
//*                 🛠️ Decode Token Middleware
//* ─────────────────────────────────────────────────────────────
export const decodeToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = extractToken(req);

    if (!token) {
      res.status(HTTP_STATUS.UNAUTHORIZED).json({
        message: ERROR_MESSAGES.CLIENT.UNAUTHORIZED
      });
      return;
    }

    const user = tokenService.decodeAccessToken(token?.access_token);
    // console.log(`Decoded`, user);
    (req as CustomRequest).user = {
      id: user?.id,
      email: user?.email,
      role: user?.role,
      access_token: token.access_token,
      refresh_token: token.refresh_token
    };
    next();
  } catch (error) {}
};
