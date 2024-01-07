import compression from 'compression';
import cors from 'cors';
import dotenv from 'dotenv';
import express, { Express } from 'express';
import helmet from 'helmet';
import path from 'path';
import { pino } from 'pino';

import { middlewares } from '@common/middleware';
import compressFilter from '@common/utils/compressFilter';
import { getCorsOrigin } from '@common/utils/envConfig';

dotenv.config({
  path: path.resolve(__dirname, '../.env'),
});

const logger = pino({ name: 'server start' });
const app: Express = express();
const corsOrigin = getCorsOrigin();

// Setup Middlewares
app.use(cors({ origin: [corsOrigin], credentials: true }));
app.use(helmet());
app.use(compression({ filter: compressFilter }));
app.use(middlewares());

export { app, logger };
