import compression from "compression";
import cors from "cors";
import express, { Express } from "express";
import helmet from "helmet";
import { pino } from "pino";
import { pinoHttp } from "pino-http";

import { middlewares } from "./middleware";
import compressFilter from "./utils/compress-filter";
import { getCorsOrigin } from "./utils/env";

const logger = pino({ name: "server start" });
const app: Express = express();
const cors_origin = getCorsOrigin();

// Setup Middlewares
app.use(cors({ origin: [cors_origin], credentials: true }));
app.use(pinoHttp({ logger }));
app.use(helmet());
app.use(compression({ filter: compressFilter }));
app.use(middlewares());

export { app, logger };
