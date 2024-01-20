import express, { Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';

import { ResponseStatus, ServiceResponse } from '@common/models/serviceResponse';
import { handleServiceResponse } from '@common/utils/httpHandlers';

export const healthCheckRouter: Router = (() => {
  const router = express.Router();

  router.get('/', (_req: Request, res: Response) => {
    const serviceResponse = new ServiceResponse(ResponseStatus.Success, 'Service is healthy', null, StatusCodes.OK);
    handleServiceResponse(serviceResponse, res);
  });

  return router;
})();
