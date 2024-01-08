import { randomUUID } from 'crypto';
import { Request, RequestHandler, Response } from 'express';
import { IncomingMessage, ServerResponse } from 'http';
import { LevelWithSilent } from 'pino';
import { CustomAttributeKeys, Options, pinoHttp } from 'pino-http';

import { getNodeEnv } from '@common/utils/envConfig';

type PinoCustomProps = {
  request: Request;
  response: Response;
  err: Error;
  responseBody: unknown;
};

const requestLogger = (options?: Options): RequestHandler[] => {
  const pinoOptions: Options = {
    customProps: customProps as unknown as Options['customProps'],
    redact: ['request.headers', 'response.headers'],
    genReqId,
    customLogLevel,
    customSuccessMessage,
    customReceivedMessage: (req) => `request received: ${req.method}`,
    customErrorMessage: (_req, res) => `request errored with status code: ${res.statusCode}`,
    customAttributeKeys,
    ...options,
  };
  return [responseBodyMiddleware, pinoHttp(pinoOptions)];
};

const customAttributeKeys: CustomAttributeKeys = {
  req: 'request',
  res: 'response',
  err: 'error',
  responseTime: 'timeTaken',
};

const customProps = (req: Request, res: Response): PinoCustomProps => ({
  request: req,
  response: res,
  err: res.locals.err,
  responseBody: res.locals.responseBody,
});

const responseBodyMiddleware: RequestHandler = (_req, res, next) => {
  const env = getNodeEnv() !== 'production';
  if (env) {
    const originalSend = res.send;
    res.send = function (content) {
      res.locals.responseBody = content;
      res.send = originalSend;
      return originalSend.call(res, content);
    };
  }
  next();
};

const customLogLevel = (_req: IncomingMessage, res: ServerResponse<IncomingMessage>, err?: Error): LevelWithSilent => {
  if (res.statusCode >= 400 && res.statusCode < 500) return 'warn';
  if (res.statusCode >= 500 || err) return 'error';
  if (res.statusCode >= 300 && res.statusCode < 400) return 'silent';
  return 'info';
};

const customSuccessMessage = (req: IncomingMessage, res: ServerResponse<IncomingMessage>) => {
  if (res.statusCode === 404) return 'resource not found';
  return `${req.method} completed`;
};

const genReqId = (req: IncomingMessage, res: ServerResponse<IncomingMessage>) => {
  const existingID = req.id ?? req.headers['x-request-id'];
  if (existingID) return existingID;
  const id = randomUUID();
  res.setHeader('X-Request-Id', id);
  return id;
};

export default requestLogger;
