import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import { StatusCodes } from 'http-status-codes';
import { z } from 'zod';

import { ServiceResponseSchema } from '@common/models/serviceResponse';

const HealthCheckResponseSchema = ServiceResponseSchema(z.null());
const healthCheckRegistry = new OpenAPIRegistry();

// Define and register health check API Route
healthCheckRegistry.registerPath({
  method: 'get',
  path: '/health-check',
  tags: ['Health Check'],
  description: 'Health check endpoint',
  summary: 'Health Check',
  operationId: 'getHealthCheck',
  responses: {
    [StatusCodes.OK]: {
      description: 'Service is healthy',
      content: {
        'application/json': {
          schema: HealthCheckResponseSchema,
        },
      },
    },
  },
});

export { healthCheckRegistry };
