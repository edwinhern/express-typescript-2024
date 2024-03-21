import cors from 'cors';
import express, { Express } from 'express';
import helmet from 'helmet';
import path from 'path';
import { pino } from 'pino';

import { healthCheckRouter } from '@/api/healthCheck/healthCheckRouter';
import { userRouter } from '@/api/user/userRouter';
import { openAPIRouter } from '@/api-docs/openAPIRouter';
import errorHandler from '@/common/middleware/errorHandler';
import rateLimiter from '@/common/middleware/rateLimiter';
import requestLogger from '@/common/middleware/requestLogger';
import { env } from '@/common/utils/envConfig';

class ExpressServer {
  private app: Express;

  constructor() {
    this.app = express();
    this.initializeMiddlewares();
    this.initializeRoutes();
    this.initializeErrorHandling();
    this.configureAssets();
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
    this.app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));
    this.app.use(helmet());
    this.app.use(rateLimiter);
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(requestLogger);
  }

  private initializeRoutes() {
    this.app.use('/health-check', healthCheckRouter);
    this.app.use('/users', userRouter);
    this.app.use(openAPIRouter);
  }

  private initializeErrorHandling() {
    this.app.use(errorHandler());
  }

  private configureAssets() {
    this.app.use(express.static(path.join(__dirname, '../public')));
  }
}

const logger = pino({ name: 'server start' });
const app = new ExpressServer();

export { app, logger };
