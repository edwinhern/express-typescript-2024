import express from 'express';

import { applicationRouter } from '../routes';
import { errorHandlers } from './error-handler';
import { create as healthCheckRoutes } from './health-check/';
import { requestLogger } from './request-logger';

export function middlewares() {
  const router = express.Router();

  // HealthCheck endpoint - expose before auth
  router.use('/health-check', healthCheckRoutes());

  // Application routes
  router.use(applicationRouter);

  // Request logging
  router.use(requestLogger());

  // Error handlers
  router.use(errorHandlers());

  return router;
}
