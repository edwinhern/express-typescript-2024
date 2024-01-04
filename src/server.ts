import compression from 'compression';
import cors from 'cors';
import dotenv from 'dotenv';
import express, { Express } from 'express';
import helmet from 'helmet';
import path from 'path';
import { pino } from 'pino';
import { pinoHttp } from 'pino-http';

import { middlewares } from './common/middleware';
import compressFilter from './common/utils/compressFilter';
import { getCorsOrigin } from './common/utils/envConfig';

dotenv.config({
  path: path.resolve(__dirname, '../.env'),
});

const logger = pino({ name: 'server start' });
const app: Express = express();
const cors_origin = getCorsOrigin();

// Setup Middlewares
app.use(cors({ origin: [cors_origin], credentials: true }));
app.use(pinoHttp({ logger }));
app.use(helmet());
app.use(compression({ filter: compressFilter }));
app.use(middlewares());

export { app, logger };
