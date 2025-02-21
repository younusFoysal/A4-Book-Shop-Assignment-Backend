import { Response } from 'express';

type Tresponse<T> = {
  statusCode: number;
  success: boolean;
  message?: string;
  data?: T;
};

const SendResponse = <T>(res: Response, data: Tresponse<T>) => {
  res.status(data.statusCode).json({
    success: data.success,
    message: data.message,
    statusCode: data.statusCode,
    data: data.data,
  });
};

export default SendResponse;
