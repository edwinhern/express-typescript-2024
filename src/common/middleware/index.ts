import express from 'express';
import helmet from 'helmet';

import rateLimiter from '@/common/middleware/rateLimiter';
import requestLogger from '@/common/middleware/requestLogger';

export default function initializeMiddlewares(app: express.Application) {
  // Set the application to trust the reverse proxy
  app.set('trust proxy', true);

  // General middlewares
  app.use(helmet());
  app.use(rateLimiter);
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(requestLogger);
}
