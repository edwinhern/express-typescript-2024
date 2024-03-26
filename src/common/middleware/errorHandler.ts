import { ErrorRequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

const errorHandler: ErrorRequestHandler = (err, _req, res, next) => {
  const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;

  res.locals.err = err;
  res.status(statusCode).json({
    message: err ? err.message : 'An unexpected error occurred',
  });
  next(err);
};

export default errorHandler;
