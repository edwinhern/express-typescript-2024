import { ErrorRequestHandler, RequestHandler } from 'express';

import { setCustomProp } from '~/common/middleware/requestLogger';

export function errorHandlers() {
  return [unexpectedRequest, addErrorToRequestLog, defaultErrorRequestHandler];
}

const unexpectedRequest: RequestHandler = (_req, res) => {
  res.sendStatus(404);
};

const addErrorToRequestLog: ErrorRequestHandler = (err, _req, res, next) => {
  setCustomProp(res, 'err', err);
  next(err);
};

const defaultErrorRequestHandler: ErrorRequestHandler = (_err, _req, res) => {
  res.sendStatus(500);
};
