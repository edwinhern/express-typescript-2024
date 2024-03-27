import 'reflect-metadata';

import express, { Application } from 'express';
import { pino } from 'pino';
import { useExpressServer } from 'routing-controllers';

import initializeMiddlewares from '@/common/middleware';
import errorHandler from '@/common/middleware/errorHandler';
import loadControllers from '@/common/utils/controllerLoader';
import { env } from '@/config';
import initializeSwagger from '@/config/swaggerSetup';

class ExpressServer {
  public static logger = pino({ name: 'ServerStart' });
  public app: Application;

  constructor() {
    this.app = express();
    this.initializeMiddlewares();
    this.initializeRoutes();
    this.initializeSwagger();
    this.initializeErrorHandling();
  }

  private initializeMiddlewares() {
    initializeMiddlewares(this.app);
  }

  private async initializeRoutes() {
    useExpressServer(this.app, {
      controllers: await loadControllers(),
      cors: { origin: env.CORS_ORIGIN, credentials: env.CORS_CREDENTIALS },
      routePrefix: env.ROUTE_PREFIX,
      defaultErrorHandler: false,
    });
  }

  private initializeSwagger() {
    initializeSwagger(this.app);
  }

  private initializeErrorHandling() {
    this.app.use(errorHandler);
  }

  public start() {
    return this.app.listen(env.PORT, () => {
      const { NODE_ENV, HOST, PORT } = env;
      ExpressServer.logger.info(`🚀 Server (${NODE_ENV}) running on port http://${HOST}:${PORT}`);
    });
  }
}

export const server = new ExpressServer();
export const logger = ExpressServer.logger;
