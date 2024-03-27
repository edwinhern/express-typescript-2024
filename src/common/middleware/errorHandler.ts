import { ErrorRequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

const errorHandler: ErrorRequestHandler = (err, _req, res, next) => {
  try {
    const statusCode: number = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
    const message: string = err.message || 'An unexpected error occurred';

    res.locals.err = err;
    res.status(statusCode).json({ message });
  } catch (error) {
    next(error);
  }
};

export default errorHandler;
