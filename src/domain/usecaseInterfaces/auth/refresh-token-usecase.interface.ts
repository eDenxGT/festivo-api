export interface IRefreshTokenUseCase {
  execute(refresh_token: string): {
    role: string;
    access_token: string;
  };
}
