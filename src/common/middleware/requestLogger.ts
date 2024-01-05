import { randomUUID } from 'crypto';
import { RequestHandler, Response } from 'express';
import type { ClientRequest, IncomingMessage } from 'http';
import { Options, pinoHttp } from 'pino-http';

import { getNodeEnv } from '~/common/utils/envConfig';

type PinoCustomProps = {
  err: Error;
  req: ClientRequest;
  res: IncomingMessage;
  responseBody: unknown;
};

type ResponseLocalsPino = {
  err: Error;
  proxyReq: SerializedClientRequest;
  proxyRes: SerializedIncomingResponse;
  responseBody: unknown;
};

type SerializedClientRequest = {
  headers: string;
  host: string;
  method: string;
  path: string;
  time: number;
};

type SerializedIncomingResponse = {
  duration?: number;
  headers: string;
  statusCode?: number;
  time: number;
};

export const requestLogger = (options?: Options): RequestHandler[] => {
  const env = getNodeEnv();

  const pinoOptions: Options = {
    customProps: customProps as unknown as Options['customProps'],
    redact: ['req.headers.auth', 'req.headers.authorization'],
    serializers: {
      req(req) {
        if (shouldLogBody(env)) {
          req.body = req.raw.body;
        }
        return req;
      },
      res(res) {
        if (shouldLogBody(env)) {
          res.body = getResponseLocalsPinoValue(res, 'responseBody');
        }
        return res;
      },
      ...options?.serializers,
    },
    genReqId: () => randomUUID(),
    ...options,
  };
  const pinoRequestHandler = pinoHttp(pinoOptions);
  return [saveResponseBodyRequestHandler, pinoRequestHandler];
};

const saveResponseBodyRequestHandler: RequestHandler = (_req, res, next) => {
  // Initialize res.locals['pino'] if it doesn't exist
  if (!res.locals['pino']) {
    res.locals['pino'] = {};
  }

  const originalSend = res.send;
  res.send = function (content) {
    // Store the response body in locals
    setCustomProp(res, 'responseBody', content);

    // Restore the original send function
    res.send = originalSend;
    return originalSend.call(res, content);
  };
  next();
};

export function setCustomProp<TKey extends keyof PinoCustomProps>(
  res: Response,
  key: TKey,
  value: PinoCustomProps[TKey]
) {
  setCustomProps(res, {
    [key]: value,
  });
}

function setCustomProps(res: Response, updates: Partial<ResponseLocalsPino>) {
  const currentProps = (res.locals['pino'] as Partial<ResponseLocalsPino>) || {};
  res.locals['pino'] = { ...currentProps, ...updates };
}

function shouldLogBody(env: ReturnType<typeof getNodeEnv>) {
  return env !== 'production';
}

function getResponseLocalsPinoValue<key extends keyof ResponseLocalsPino>(
  res: Response,
  key: key
): ResponseLocalsPino[key] | undefined {
  return res?.locals?.pino?.[key];
}

const customProps = (_req: IncomingMessage, res: Response) => ({
  proxyReq: getResponseLocalsPinoValue(res, 'proxyReq'),
  proxyRes: getResponseLocalsPinoValue(res, 'proxyRes'),
});
