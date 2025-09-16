import asyncHandler from 'express-async-handler';
import { validateDTO } from '../middlewares/validate-dto.middleware';
import { BaseRoute } from './base/base.route';
import { authController } from '../../infrastructure/di/resolver';
import { UserSignUpDTO } from '../../application/dtos/user/input/signup.dto';
import { UserSignInDTO } from '../../application/dtos/user/input/signin.dto';

export class AuthRoutes extends BaseRoute {
  constructor() {
    super();
  }

  protected initializeRoutes(): void {
    //* ─────────────────────────────────────────────────────────────
    //*             🛠️ User & Organizer's Auth Endpoints
    //* ─────────────────────────────────────────────────────────────
    this.router.post(
      '/signup',
      validateDTO(UserSignUpDTO),
      asyncHandler(authController.signUp)
    );

    this.router.post(
      '/signin',
      validateDTO(UserSignInDTO),
      asyncHandler(authController.signIn)
    );

    //* ─────────────────────────────────────────────────────────────
    //*                   🛠️ User Auth Endpoints
    //* ─────────────────────────────────────────────────────────────
  }
}
