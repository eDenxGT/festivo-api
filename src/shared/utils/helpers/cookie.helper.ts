import { Response } from 'express';
import envConfig from '../../config';

const accessTokenName = 'x-access-token';
const refreshTokenName = 'x-refresh-token';

export const setAuthCookies = (
  res: Response,
  accessToken: string,
  refreshToken: string
) => {
  const isProduction = envConfig.server.NODE_ENV === 'production';

  res.cookie(accessTokenName, accessToken, {
    httpOnly: true,
    secure: isProduction,
    sameSite: 'strict'
  });

  res.cookie(refreshTokenName, refreshToken, {
    httpOnly: true,
    secure: isProduction,
    sameSite: 'strict'
  });
};

export const updateCookieWithAccessToken = (
  res: Response,
  accessToken: string
) => {
  const isProduction = envConfig.server.NODE_ENV === 'production';
  res.cookie(accessTokenName, accessToken, {
    httpOnly: true,
    secure: isProduction,
    sameSite: 'strict'
  });
};

export const clearAuthCookies = (res: Response) => {
  res.clearCookie(accessTokenName);
  res.clearCookie(refreshTokenName);
};
