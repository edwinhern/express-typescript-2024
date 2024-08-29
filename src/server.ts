import cors from "cors";
import express, { type Express, type Request, type Response } from "express";
import helmet from "helmet";
import { pino } from "pino";
import swaggerUi from "swagger-ui-express";

import { RegisterRoutes } from "@/api/generated/routes";
import { errorHandlers, notFoundHandler } from "@/common/middleware/errorHandler";
// import rateLimiter from "@/common/middleware/rateLimiter";
import requestLogger from "@/common/middleware/requestLogger";
import { env } from "@/common/utils/envConfig";
import buildApiSpecAndRoutes from "@/common/utils/tsoa-generator";

const logger = pino({ name: "server start" });
const app: Express = express();

// Set the application to trust the reverse proxy
app.set("trust proxy", true);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));
app.use(helmet());
// app.use(rateLimiter);

// Request logging
app.use(requestLogger);

if (env.isDevelopment) await buildApiSpecAndRoutes();

// Routes
RegisterRoutes(app);

// Swagger UI
app.use("/", swaggerUi.serve, async (_req: Request, res: Response) => {
  return res.send(swaggerUi.generateHTML(await import("./api/generated/swagger.json")));
});

// Not found handler
app.use(notFoundHandler);
// Error handlers
app.use(errorHandlers);

export { app, logger };
