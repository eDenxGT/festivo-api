import { NextFunction, Request, Response } from 'express';
import { AppError } from '../../shared/errors/AppError';
import logger from '../../shared/utils/logger';
import { HTTP_STATUS } from '../../shared/constants';
import { ERROR_MESSAGES } from '../../shared/constants/error-messages.constants';

export const errorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  // console.log(err);
  if (err instanceof AppError) {
    logger.error(err.message, err.details);

    res.status(err.statusCode).json({
      message: err.message,
      errors: err.details || []
    });
    return;
  }

  logger.error((err as Error).message);
  res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
    message:
      (err as Error).message ?? ERROR_MESSAGES.SERVER.INTERNAL_SERVER_ERROR
  });
};
