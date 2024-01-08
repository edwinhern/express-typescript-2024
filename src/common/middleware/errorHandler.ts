import { ErrorRequestHandler, RequestHandler } from 'express';

const unexpectedRequest: RequestHandler = (_req, res) => {
  res.sendStatus(404);
};

const addErrorToRequestLog: ErrorRequestHandler = (err, _req, res, next) => {
  res.locals.err = err;
  next(err);
};

const defaultErrorRequestHandler: ErrorRequestHandler = (_err, _req, res) => {
  res.sendStatus(500);
};

export default () => [unexpectedRequest, addErrorToRequestLog, defaultErrorRequestHandler];
