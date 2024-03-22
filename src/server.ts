import 'reflect-metadata';

import express, { Express } from 'express';
import helmet from 'helmet';
import { pino } from 'pino';
import { useExpressServer } from 'routing-controllers';

import { HealthCheckController } from '@/api/healthCheck/healthCheckRouter';
import { UserController } from '@/api/user/userRouter';
import errorHandler from '@/common/middleware/errorHandler';
import rateLimiter from '@/common/middleware/rateLimiter';
import requestLogger from '@/common/middleware/requestLogger';
import { env } from '@/config';

class ExpressServer {
  private app: Express;

  constructor(Controllers: Function[]) {
    this.app = express();

    this.initializeMiddlewares();
    this.initializeRoutes(Controllers);
    this.initializeErrorHandling();
  }

  public getServer() {
    return this.app;
  }

  public start() {
    return this.app.listen(env.PORT, () => {
      const { NODE_ENV, HOST, PORT } = env;
      logger.info(`🚀 Server (${NODE_ENV}) running on port http://${HOST}:${PORT}`);
    });
  }

  private initializeMiddlewares() {
    // Set the application to trust the reverse proxy
    this.app.set('trust proxy', true);

    // General middlewares
    this.app.use(helmet());
    this.app.use(rateLimiter);
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(requestLogger);
  }

  private initializeRoutes(controllers: Function[]) {
    const { CORS_ORIGIN, CORS_CREDENTIALS } = env;
    useExpressServer(this.app, {
      routePrefix: '/api',
      cors: { origin: CORS_ORIGIN, credentials: CORS_CREDENTIALS },
      controllers: controllers,
      defaultErrorHandler: false,
    });
  }

  private initializeErrorHandling() {
    this.app.use(errorHandler);
  }
}

const logger = pino({ name: 'server start' });
const app = new ExpressServer([HealthCheckController, UserController]);

export { app, logger };
