import 'reflect-metadata';

import { defaultMetadataStorage } from 'class-transformer/cjs/storage';
import { validationMetadatasToSchemas } from 'class-validator-jsonschema';
import express from 'express';
import helmet from 'helmet';
import { pino } from 'pino';
import { getMetadataArgsStorage, RoutingControllersOptions, useExpressServer } from 'routing-controllers';
import { routingControllersToSpec } from 'routing-controllers-openapi';
import swaggerUi from 'swagger-ui-express';

import * as controllers from '@/api';
import errorHandler from '@/common/middleware/errorHandler';
import rateLimiter from '@/common/middleware/rateLimiter';
import requestLogger from '@/common/middleware/requestLogger';
import { env } from '@/config';

class ExpressServer {
  public static instance = new ExpressServer();
  public static logger = pino({ name: 'server start' });

  private app: express.Application;
  private routeControllerOptions: RoutingControllersOptions;

  constructor() {
    const controllersArr = Object.values(controllers).map((ele) => ele);

    this.app = express();
    this.routeControllerOptions = {
      controllers: controllersArr,
      cors: { origin: env.CORS_ORIGIN, credentials: env.CORS_CREDENTIALS },
      routePrefix: env.ROUTE_PREFIX,
      defaultErrorHandler: false,
    };

    this.initializeMiddlewares();
    this.initializeRoutes();
    this.initializeSwagger();
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

  private initializeRoutes() {
    useExpressServer(this.app, this.routeControllerOptions);
  }

  private initializeSwagger() {
    const schemas: any = validationMetadatasToSchemas({
      classTransformerMetadataStorage: defaultMetadataStorage,
      refPointerPrefix: '#/componentsnpm/schemas/',
    });

    const storage = getMetadataArgsStorage();
    const spec = routingControllersToSpec(storage, this.routeControllerOptions, {
      components: {
        schemas,
        securitySchemes: {
          bearerAuth: {
            type: 'apiKey',
            scheme: 'bearer',
            in: 'header',
            name: 'Authorization',
          },
        },
      },
      externalDocs: {
        description: 'View the raw OpenAPI Specification in JSON format',
        url: '/swagger.json',
      },
      info: {
        title: 'Swagger API',
        version: '1.0.0',
      },
    });

    this.app.get('/swagger.json', (_req, res) => res.send(spec));
    this.app.use('/', swaggerUi.serve, swaggerUi.setup(spec));
  }

  private initializeErrorHandling() {
    this.app.use(errorHandler);
  }
}

const logger = pino({ name: 'server start' });
const app = new ExpressServer();

export { app, logger };
