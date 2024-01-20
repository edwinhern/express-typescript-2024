import { ErrorRequestHandler, RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

const unexpectedRequest: RequestHandler = (_req, res) => {
  res.sendStatus(StatusCodes.NOT_FOUND);
};

const addErrorToRequestLog: ErrorRequestHandler = (err, _req, res, next) => {
  res.locals.err = err;
  next(err);
};

const defaultErrorRequestHandler: ErrorRequestHandler = (_err, _req, res) => {
  res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
};

export default () => [unexpectedRequest, addErrorToRequestLog, defaultErrorRequestHandler];
