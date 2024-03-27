import { defaultMetadataStorage } from 'class-transformer/cjs/storage';
import { validationMetadatasToSchemas } from 'class-validator-jsonschema';
import express from 'express';
import { getMetadataArgsStorage } from 'routing-controllers';
import { routingControllersToSpec } from 'routing-controllers-openapi';
import swaggerUi from 'swagger-ui-express';

import loadControllers from '@/common/utils/controllerLoader';
import { env } from '@/config';

export default async function initializeSwagger(app: express.Application) {
  const schemas: any = validationMetadatasToSchemas({
    classTransformerMetadataStorage: defaultMetadataStorage,
    refPointerPrefix: '#/components/schemas/',
  });

  const storage = getMetadataArgsStorage();
  const spec = routingControllersToSpec(
    storage,
    {
      controllers: await loadControllers(),
      cors: { origin: env.CORS_ORIGIN, credentials: env.CORS_CREDENTIALS },
      routePrefix: env.ROUTE_PREFIX,
      defaultErrorHandler: false,
    },
    {
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
    }
  );

  app.get('/swagger.json', (_req, res) => res.json(spec));
  app.use('/', swaggerUi.serve, swaggerUi.setup(spec));
}
