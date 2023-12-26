import express from "express";

import {
  HealthCheckGetAllRequestBody,
  HealthCheckGetAllRequestParams,
  HealthCheckGetAllResponseBody,
} from "./api-health-check";

export function create() {
  const router = express.Router();

  router.get<HealthCheckGetAllRequestParams, HealthCheckGetAllResponseBody, HealthCheckGetAllRequestBody>(
    "/",
    (_req, res) => {
      res.sendStatus(200);
    },
  );

  return router;
}
