import jwt, { JwtPayload, Secret } from 'jsonwebtoken';
import { injectable } from 'tsyringe';
import envConfig from '../../shared/config';
import { IJwtService } from '../../domain/serviceInterfaces/jwt-service.interface';
import logger from '../../shared/utils/logger';

export interface JWTPayloadData {
  id: string;
  email: string;
  role: string;
}

export interface ResetTokenPayload extends JwtPayload {
  email: string;
}

@injectable()
export class JwtService implements IJwtService {
  private _accessSecret: Secret;
  private _refreshSecret: Secret;

  constructor() {
    this._accessSecret = envConfig.jwt.ACCESS_SECRET_KEY;
    this._refreshSecret = envConfig.jwt.REFRESH_SECRET_KEY;
  }

  generateAccessToken(payload: JWTPayloadData): string {
    return jwt.sign(payload, this._accessSecret, {
      expiresIn: '15m'
    });
  }
  generateRefreshToken(payload: JWTPayloadData): string {
    return jwt.sign(payload, this._refreshSecret, {
      expiresIn: '7d'
    });
  }
  verifyAccessToken(token: string): JwtPayload | null {
    try {
      return jwt.verify(token, this._accessSecret) as JwtPayload;
    } catch (error) {
      logger.error('Access token verification failed:', error);
      return null;
    }
  }
  verifyRefreshToken(token: string): string | JwtPayload | null {
    try {
      return jwt.verify(token, this._refreshSecret) as JwtPayload;
    } catch (error) {
      logger.error('Access token verification failed:', error);
      return null;
    }
  }
  decodeAccessToken(token: string): JwtPayload | null {
    try {
      return jwt.decode(token) as JwtPayload;
    } catch (error) {
      logger.error('Access token decoding failed', error);
      return null;
    }
  }
}
