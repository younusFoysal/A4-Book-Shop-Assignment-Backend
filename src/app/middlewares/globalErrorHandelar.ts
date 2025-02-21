/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { ErrorRequestHandler } from 'express';
import { TErrorSources } from '../interface/error';
import { ZodError } from 'zod';
import handleZodError from '../errors/handleZodError';
import handleValidationError from '../errors/handleValidationError';
import handleCastError from '../errors/handleCastError';

import handleDuplicateError from '../errors/handleDuplicateError';
import config from '../config';
import AppError from '../errors/AppError';

// eslint-disable-next-line @typescript-eslint/no-explicit-any, no-unused-vars
export const globalErrorHandelar: ErrorRequestHandler = (
  err,
  req,
  res,
  next,
) => {
  let statusCode = 500;
  let message = 'Something went wrong';
  let errorSources: TErrorSources = [
    {
      path: '',
      message: 'Something went wrong',
    },
  ];

  if (err instanceof ZodError) {
    const simpliedError = handleZodError(err);
    message = simpliedError.message;
    errorSources = simpliedError.errorSources;
    statusCode = simpliedError.statusCode;
  } else if (err?.name === 'ValidationError') {
    const simpliedError = handleValidationError(err);
    message = simpliedError.message;
    errorSources = simpliedError.errorSources;
    statusCode = simpliedError.statusCode;
  } else if (err?.name === 'CastError') {
    const simpliedError = handleCastError(err);
    message = simpliedError.message;
    errorSources = simpliedError.errorSources;
    statusCode = simpliedError.statusCode;
  } else if (err?.code === 11000) {
    const simpliedError = handleDuplicateError(err);
    message = simpliedError.message;
    errorSources = simpliedError.errorSources;
    statusCode = simpliedError.statusCode;
  } else if (err instanceof AppError) {
    statusCode = err?.statusCode;
    message = err.message;
    errorSources = [
      {
        path: '',
        message: err?.message,
      },
    ];
  } else if (err instanceof Error) {
    message = err.message;
    errorSources = [
      {
        path: '',
        message: err?.message,
      },
    ];
  }

  return res.status(statusCode).json({
    statusCode,
    success: false,
    message,
    errorSources,
    err,
    stack: config.NODE_ENV === 'development' ? err?.stack : null,
  });
};
