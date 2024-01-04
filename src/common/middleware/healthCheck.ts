import express from 'express';

type HealthCheckGetAllRequestParams = Record<string, never>;
type HealthCheckGetAllRequestBody = Record<string, never>;
type HealthCheckGetAllResponseBody = {
  message: string;
};

export function create() {
  const router = express.Router();

  router.get<HealthCheckGetAllRequestParams, HealthCheckGetAllResponseBody, HealthCheckGetAllRequestBody>(
    '/',
    (_req, res) => {
      res.sendStatus(200);
    }
  );

  return router;
}
