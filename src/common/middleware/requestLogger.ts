import { randomUUID } from "node:crypto";
import type { IncomingMessage, ServerResponse } from "node:http";
import type { Request, RequestHandler, Response } from "express";
import { StatusCodes, getReasonPhrase } from "http-status-codes";
import type { LevelWithSilent } from "pino";
import { type CustomAttributeKeys, type Options, pinoHttp } from "pino-http";

import { env } from "@/common/utils/envConfig";

enum LogLevel {
  Fatal = "fatal",
  Error = "error",
  Warn = "warn",
  Info = "info",
  Debug = "debug",
  Trace = "trace",
  Silent = "silent",
}

type PinoCustomProps = {
  request: Request;
  response: Response;
  error: Error;
  responseBody: unknown;
};

const requestLogger = (options?: Options): RequestHandler[] => {
  const pinoOptions: Options = {
    enabled: env.isProduction,
    customProps: customProps as unknown as Options["customProps"],
    redact: [],
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
  req: "request",
  res: "response",
  err: "error",
  responseTime: "timeTaken",
};

const customProps = (req: Request, res: Response): PinoCustomProps => ({
  request: req,
  response: res,
  error: res.locals.err,
  responseBody: res.locals.responseBody,
});

const responseBodyMiddleware: RequestHandler = (_req, res, next) => {
  const isNotProduction = !env.isProduction;
  if (isNotProduction) {
    const originalSend = res.send;
    res.send = (content) => {
      res.locals.responseBody = content;
      res.send = originalSend;
      return originalSend.call(res, content);
    };
  }
  next();
};

const customLogLevel = (_req: IncomingMessage, res: ServerResponse<IncomingMessage>, err?: Error): LevelWithSilent => {
  if (err || res.statusCode >= StatusCodes.INTERNAL_SERVER_ERROR) return LogLevel.Error;
  if (res.statusCode >= StatusCodes.BAD_REQUEST) return LogLevel.Warn;
  if (res.statusCode >= StatusCodes.MULTIPLE_CHOICES) return LogLevel.Silent;
  return LogLevel.Info;
};

const customSuccessMessage = (req: IncomingMessage, res: ServerResponse<IncomingMessage>) => {
  if (res.statusCode === StatusCodes.NOT_FOUND) return getReasonPhrase(StatusCodes.NOT_FOUND);
  return `${req.method} completed`;
};

const genReqId = (req: IncomingMessage, res: ServerResponse<IncomingMessage>) => {
  const existingID = req.id ?? req.headers["x-request-id"];
  if (existingID) return existingID;
  const id = randomUUID();
  res.setHeader("X-Request-Id", id);
  return id;
};

export default requestLogger();
