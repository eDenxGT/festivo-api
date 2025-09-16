import { Response } from 'express';

//  success response handler
export const handleSuccessResponse = (
  res: Response,
  statusCode: number,
  message: string,
  data?: any
) => {
  const response: any = {
    success: true,
    message
  };

  if (data && Object.keys(data).length > 0) {
    response.data = data;
  }

  return res.status(statusCode).json(response);
};
