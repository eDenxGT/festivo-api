import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { NextFunction, Request, Response } from 'express';
import { AppError } from '../../shared/errors/AppError';
import { ERROR_MESSAGES } from '../../shared/constants/error-messages.constants';
import { HTTP_STATUS } from '../../shared/constants';

export const validateDTO = <T extends object>(DTOClass: new () => T) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const dtoObject = plainToInstance(DTOClass, req.body);

    const errors = await validate(dtoObject);

    if (errors.length > 0) {
      throw new AppError(
        ERROR_MESSAGES.CLIENT.VALIDATION_FAILED,
        HTTP_STATUS.BAD_REQUEST,
        errors.map((err) => ({
          property: err.property,
          constraints: err.constraints
        }))
      );
    }

    req.body = dtoObject;
    next();
  };
};
