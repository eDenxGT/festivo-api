import { JwtPayload } from 'jsonwebtoken';
import { JWTPayloadData } from '../../infrastructure/services/jwt.service';

export interface IJwtService {
  generateAccessToken(payload: JWTPayloadData): string;
  generateRefreshToken(payload: JWTPayloadData): string;
  verifyAccessToken(token: string): string | JwtPayload | null;
  verifyRefreshToken(token: string): string | JwtPayload | null;
  decodeAccessToken(token: string): JwtPayload | null;
}
