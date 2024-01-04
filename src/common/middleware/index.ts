import express, { Router } from 'express';

import { usersRouter } from '../../modules/user/userRoutes';
import { errorHandlers } from './errorHandler';
import { create as healthCheckRoutes } from './healthCheck';
import { requestLogger } from './requestLogger';

export function middlewares() {
  const router: Router = express.Router();

  // HealthCheck endpoint - expose before auth
  router.use('/health-check', healthCheckRoutes());

  // Application routes
  router.use('/users', usersRouter);

  // Request logging
  router.use(requestLogger());

  // Error handlers
  router.use(errorHandlers());

  return router;
}
