import { Request, Response } from 'express';
import { inject, injectable } from 'tsyringe';
import { UserSignUpDTO } from '../../application/dtos/user/input/signup.dto';
import { OrganizerSignUpDTO } from '../../application/dtos/organizer/input/signup.dto';
import { ISignUpUserUseCase } from '../../domain/usecaseInterfaces/auth/signup-user-usecase.interface';
import { handleSuccessResponse } from '../../shared/utils/helpers/response.handler';
import { SUCCESS_MESSAGES } from '../../shared/constants/success-messages.constants';
import { HTTP_STATUS } from '../../shared/constants';
import { ISignInUserUseCase } from '../../domain/usecaseInterfaces/auth/signin-user-usecase.interface';
import { UserSignInDTO } from '../../application/dtos/user/input/signin.dto';
import {
  clearAuthCookies,
  setAuthCookies,
  updateCookieWithAccessToken
} from '../../shared/utils/helpers/cookie.helper';
import { CustomRequest } from '../middlewares/auth.middleware';
import { ERROR_MESSAGES } from '../../shared/constants/error-messages.constants';
import { IRefreshTokenUseCase } from '../../domain/usecaseInterfaces/auth/refresh-token-usecase.interface';

@injectable()
export class AuthController {
  constructor(
    @inject('ISignUpUserUseCase')
    private _signUpUserUseCase: ISignUpUserUseCase,
    @inject('ISignInUserUseCase')
    private _signInUserUseCase: ISignInUserUseCase,
    @inject('IRefreshTokenUseCase')
    private _refreshTokenUseCase: IRefreshTokenUseCase
  ) {}

  signUp = async (req: Request, res: Response): Promise<void> => {
    const data: UserSignUpDTO | OrganizerSignUpDTO = req.body;

    await this._signUpUserUseCase.execute(data);

    handleSuccessResponse(
      res,
      HTTP_STATUS.CREATED,
      SUCCESS_MESSAGES.SIGNUP_SUCCESSFUL
    );
  };

  signIn = async (req: Request, res: Response) => {
    const data: UserSignInDTO = req.body;

    const userData = await this._signInUserUseCase.execute(data);

    const { accessToken, refreshToken, ...dataToSend } = userData;

    setAuthCookies(res, accessToken, refreshToken);

    handleSuccessResponse(
      res,
      HTTP_STATUS.OK,
      SUCCESS_MESSAGES.SIGNIN_SUCCESSFUL,
      dataToSend
    );
  };

  handleTokenRefresh = (req: Request, res: Response): void => {
    try {
      const refreshToken = (req as CustomRequest).user.refresh_token;
      const newTokens = this._refreshTokenUseCase.execute(refreshToken);

      updateCookieWithAccessToken(res, newTokens.access_token);

      handleSuccessResponse(
        res,
        HTTP_STATUS.OK,
        SUCCESS_MESSAGES.ACCESS_TOKEN_REFRESHED
      );
    } catch {
      clearAuthCookies(res);
      res.status(HTTP_STATUS.UNAUTHORIZED).json({
        message: ERROR_MESSAGES.CLIENT.INVALID_TOKEN
      });
    }
  };

  logoutUser = async (req: Request, res: Response) => {
    clearAuthCookies(res);
    handleSuccessResponse(res, HTTP_STATUS.OK, SUCCESS_MESSAGES.LOGOUT_SUCCESS);
  };
}
