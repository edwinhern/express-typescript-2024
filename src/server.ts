import cors from "cors";
import express, { Express } from "express";
import helmet from "helmet";
import { pino } from "pino";
import { pinoHttp } from "pino-http";

import { middlewares } from "./middleware";

const logger = pino({ name: "server start" });
const app: Express = express();

// Setup Middlewares
app.use(cors({ credentials: true }));
app.use(pinoHttp({ logger }));
app.use(helmet());
app.use(middlewares());

export { app, logger };
