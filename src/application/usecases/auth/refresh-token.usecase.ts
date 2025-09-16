import { inject, injectable } from 'tsyringe';
import { IRefreshTokenUseCase } from '../../../domain/usecaseInterfaces/auth/refresh-token-usecase.interface';
import { IJwtService } from '../../../domain/serviceInterfaces/jwt-service.interface';
import { AppError } from '../../../shared/errors/AppError';
import { ERROR_MESSAGES } from '../../../shared/constants/error-messages.constants';
import { HTTP_STATUS } from '../../../shared/constants';
import { JWTPayloadData } from '../../../infrastructure/services/jwt.service';

@injectable()
export class RefreshTokenUseCase implements IRefreshTokenUseCase {
  constructor(@inject('IJwtService') private _jwtService: IJwtService) {}

  execute(refresh_token: string): { role: string; access_token: string } {
    const payload = this._jwtService.verifyRefreshToken(refresh_token);
    if (!payload) {
      throw new AppError(
        ERROR_MESSAGES.CLIENT.INVALID_TOKEN,
        HTTP_STATUS.BAD_REQUEST
      );
    }

    return {
      role: (payload as JWTPayloadData).role,
      access_token: this._jwtService.generateAccessToken({
        id: (payload as JWTPayloadData).id,
        email: (payload as JWTPayloadData).email,
        role: (payload as JWTPayloadData).role
      })
    };
  }
}
