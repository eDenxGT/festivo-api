import { NextFunction, Request, RequestHandler, Response } from 'express';
import { HTTP_STATUS } from '../../shared/constants';
import { ERROR_MESSAGES } from '../../shared/constants/error-messages.constants';

export const notFound: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(HTTP_STATUS.NOT_FOUND).json({
    message: ERROR_MESSAGES.CLIENT.NOT_FOUND
  });
};
