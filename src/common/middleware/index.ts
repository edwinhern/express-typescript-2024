import express, { Router } from 'express';

import { errorHandlers } from '@common/middleware/errorHandler';
import { create as healthCheckRoutes } from '@common/middleware/healthCheck';
import { requestLogger } from '@common/middleware/requestLogger';
import { usersRouter } from '@modules/user/userRoutes';

export function middlewares() {
  const router: Router = express.Router();

  // Request logging
  router.use(requestLogger());

  // HealthCheck endpoint - expose before auth
  router.use('/health-check', healthCheckRoutes());

  // Application routes
  router.use('/users', usersRouter);

  // Error handlers
  router.use(errorHandlers());

  return router;
}
