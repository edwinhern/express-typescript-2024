import express from "express";

import { errorHandlers } from "./error-handler";
import { create as healthCheckRoutes } from "./health-check/";
import { requestLogger } from "./request-logger";

export function middlewares() {
  const router = express.Router();

  // HealthCheck endpoint - expose before auth
  router.use("/health-check", healthCheckRoutes());

  // Hello World endpoint - expose before auth
  router.get("/hello", (_req, res) => {
    res.json({ message: "Hello World!" });
  });

  // Request logging
  router.use(requestLogger());

  // Error handlers
  router.use(errorHandlers());

  return router;
}
