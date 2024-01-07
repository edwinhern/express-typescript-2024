import express, { Router } from 'express';

import { errorHandlers } from '@common/middleware/errorHandler';
import { requestLogger } from '@common/middleware/requestLogger';
import { healthCheckRouter } from '@modules/healthCheck/healthCheckRoutes';
import { usersRouter } from '@modules/user/userRoutes';

export function middlewares() {
  const router: Router = express.Router();

  // Request logging
  router.use(requestLogger());

  // HealthCheck endpoint - expose before auth
  router.use('/health-check', healthCheckRouter);

  // Application routes
  router.use('/users', usersRouter);

  // Error handlers
  router.use(errorHandlers());

  return router;
}
