import cors from 'cors';
import dotenv from 'dotenv';
import express, { Express } from 'express';
import helmet from 'helmet';
import path from 'path';
import { pino } from 'pino';
import swaggerUi from 'swagger-ui-express';

import errorHandler from '@common/middleware/errorHandler';
import { generateOpenAPIDocument } from '@common/middleware/openAPIDocument';
import rateLimiter from '@common/middleware/rateLimiter';
import requestLogger from '@common/middleware/requestLogger';
import { getCorsOrigin } from '@common/utils/envConfig';
import { healthCheckRouter } from '@modules/healthCheck/healthCheckRouter';
import { userRouter } from '@modules/user/userRouter';

dotenv.config({
  path: path.resolve(__dirname, '../.env'),
});

const logger = pino({ name: 'server start' });
const app: Express = express();
const corsOrigin = getCorsOrigin();

// Middlewares
app.use(cors({ origin: [corsOrigin], credentials: true }));
app.use(helmet());
app.use(rateLimiter);

// Request logging
app.use(requestLogger());

// Routes
app.use('/health-check', healthCheckRouter);
app.use('/users', userRouter);

// Swagger UI
const openAPIDocument = generateOpenAPIDocument();
app.use('/', swaggerUi.serve, swaggerUi.setup(openAPIDocument));

// Error handlers
app.use(errorHandler());

export { app, logger };
